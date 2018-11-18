import React from 'react';

import './roundKnob.css';
import { DataCallback } from '../models/types';

export interface State {
  active: boolean,
  x: number,
  y: number,
}

export interface Props {
  onUpdate: DataCallback<number>,
  min: number,
  max: number,
  step: number,
  value: number,
  radius: number,
  className?: string,
}

const mouseSensitivity = 0.05;

export default class RoundKnob extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    min: 0,
    max: 100,
    step: 1,
    radius: 20,
  };

  public state = {
    active: false,
    x: 0,
    y: 0,
  }

  deactivate = () => {
    // console.log('deactivate');
    this.setState({
      active: false,
    });
    document.removeEventListener('mouseup', this.deactivate);
    document.removeEventListener('mousemove', this.move);
  }

  activate = (e: React.MouseEvent<SVGGeometryElement>) => {
    const { screenX, screenY } = e;
    // console.log('activate');
    this.setState({
      x: screenX,
      y: screenY,
      active: true,
    });
    document.addEventListener('mouseup', this.deactivate);
    document.addEventListener('mousemove', this.move);
  }

  move = (e: MouseEvent) => {
    const { screenX, screenY } = e;
    const { min, max, step, value } = this.props;
    const oldValue = (value - min) / (max - min);
    const { x, y } = this.state;
    const deltaX = (screenX - x) * mouseSensitivity * step;
    const deltaY = (y - screenY) * mouseSensitivity * step;
    let newValue = Math.min(Math.max(oldValue + deltaX + deltaY, 0), 1);
    // console.log('move', deltaX, deltaY, oldValue, newValue);
    this.props.onUpdate((newValue * (max - min)) + min);
  }

  onWheel = (e: React.WheelEvent<SVGElement>) => {
    const { min, max, step, value } = this.props;
    const shift = (e.deltaY / (-150)) * step;
    let newValue = value + shift;
    newValue = (newValue > min) ? Math.min(newValue, max) : min;
    this.props.onUpdate(newValue);
  }

  render() {
    const { className, min, max, radius, value } = this.props;
    const circleRadius = radius - 2;
    const { active } = this.state;
    const viewBox = `-${radius} -${radius} ${radius * 2} ${radius * 2}`;
    const normalized = (value - min) / (max - min);
    const rotation = Math.ceil(normalized * 359);
    const label = value;
    const progress = (normalized) * 2 * Math.PI * (circleRadius);
    return (
      <svg
        className={'round-knob control ' + (className || '')}
        onWheel={this.onWheel}
        viewBox={viewBox}
        width={radius * 2} height={radius * 2}>
        <linearGradient id="grad1" x1="0" x2="0" y1="0" y2="1">
          <stop id="stop1" stopColor="#ffffff" offset="0%"/>
          <stop id="stop2" stopColor="#e0e0e0" offset="100%"/>
        </linearGradient>
        { active ? <circle fill="#000" fillOpacity="0.1" cx="1" cy="1" r={circleRadius} /> : null }
        <circle cx="0" cy="0" r={circleRadius - 1} fill="url(#grad1)" stroke="#ccc" strokeWidth="1" />
        <circle cx="0" cy="0" r={circleRadius} fill="none" stroke="#ee3333" strokeWidth="1" strokeDasharray={`${progress},20000`} transform="rotate(180)"/>
        <text x="0" y="3" fontSize={radius / 2} textAnchor="middle" fill="#333">{label}</text>
        <g
          transform={`rotate(${rotation})`}
          onMouseDown={this.activate}>
          <path d={`M -${radius - 3} 0 h 4 0`} stroke="#ee3333" strokeWidth="1"/>
          <circle cx="0" cy="0" r={radius} fill="#fff" fillOpacity="0" />
        </g>
      </svg>
    );
  }
}
