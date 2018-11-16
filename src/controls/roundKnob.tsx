import React, { Component } from 'react';

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
  value: number,
  radius: number,
}

export default class RoundKnob extends Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    min: 0,
    max: 100,
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
    const { clientX, clientY } = e;
    // console.log('activate');
    this.setState({
      x: clientX,
      y: clientY,
      active: true,
    });
    document.addEventListener('mouseup', this.deactivate);
    document.addEventListener('mousemove', this.move);
  }

  move = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { min, max, value } = this.props;
    const { x, y } = this.state;
    let deltaX = (clientX - x) / 2;
    deltaX = (deltaX < 0) ? Math.max(deltaX, -50) : Math.min(deltaX, 50);
    let deltaY = (clientY - y) / (-2);
    deltaY = (deltaY < 0) ? Math.max(deltaY, -50) : Math.min(deltaY, 50);
    const delta = deltaX + deltaY;
    let newValue = Math.ceil(value + delta);
    newValue = (newValue > min) ? Math.min(newValue, max) : min;
    // console.log('move', deltaX, deltaY, delta, newValue);
    this.props.onUpdate(newValue);
  }

  render() {
    const { min, max, radius, value } = this.props;
    const { active } = this.state;
    const viewBox = `-${radius} -${radius} ${radius * 2} ${radius * 2}`;
    const normalized = (value - min) / (max - min);
    const rotation = Math.ceil(normalized * 359);
    const label = Math.ceil(value);
    return (
      <svg className="round-knob control" viewBox={viewBox} width={radius * 2} height={radius * 2}>
        <linearGradient id="grad1" x1="0" x2="0" y1="0" y2="1">
          <stop id="stop1" stopColor="#ffffff" offset="0%"/>
          <stop id="stop2" stopColor="#e0e0e0" offset="100%"/>
        </linearGradient>
        { active ? <circle fill="#000" fillOpacity="0.1" cx="1" cy="1" r={radius - 3} /> : null }
        <circle cx="0" cy="0" r={radius - 3} fill="url(#grad1)" stroke="#ccc" strokeWidth="1" />
        <text x="0" y="2" fontSize={radius / 3} textAnchor="middle" fill="#333">{label}</text>
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
