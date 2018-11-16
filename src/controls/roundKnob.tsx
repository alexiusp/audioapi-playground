import React, { Component } from 'react';

import './roundKnob.css';

function normalize(min: number, max: number, value: number, delta: number) {
  let newValue = value + delta;
  newValue = (newValue > min) ? Math.min(newValue, max) : min;
  const normalized = (newValue - min) / (max - min);
  return normalized;
}

export default class RoundKnob extends Component {

  state = {
    min: 0,
    max: 100,
    active: false,
    value: 0,
    delta: 0,
    x: 0,
    y: 0,
  }

  deactivate = () => {
    const { delta, min, max, value } = this.state;
    const newValue = min + normalize(min, max, value, delta) * (max - min);
    console.log('deactivate', newValue);
    this.setState({
      active: false,
      value: newValue,
      delta: 0,
    });
    document.removeEventListener('mouseup', this.deactivate);
    document.removeEventListener('mousemove', this.move);
  }

  activate = (e: React.MouseEvent<SVGGeometryElement>) => {
    const { clientX, clientY } = e;
    console.log('activate');
    this.setState({
      x: clientX,
      y: clientY,
      active: true,
      delta: 0,
    });
    document.addEventListener('mouseup', this.deactivate);
    document.addEventListener('mousemove', this.move);
  }

  move = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { x, y } = this.state;
    let deltaX = clientX - x;
    deltaX = (deltaX < 0) ? Math.max(deltaX, -50) : Math.min(deltaX, 50);
    let deltaY = (clientY - y) * (-1);
    deltaY = (deltaY < 0) ? Math.max(deltaY, -50) : Math.min(deltaY, 50);
    const delta = deltaX + deltaY;
    console.log('move', deltaX, deltaY, delta);
    this.setState({ delta });
  }

  render() {
    const { active, delta, min, max, value } = this.state;
    const radius = 20;
    const viewBox = `-${radius} -${radius} ${radius * 2} ${radius * 2}`;
    const normalizedValue = normalize(min, max, value, delta);
    const rotation = Math.ceil(normalizedValue * 359);
    const label = Math.ceil(min + normalizedValue * (max - min));
    return (
      <div>
      <svg viewBox={viewBox} width={radius * 2} height={radius * 2}>
        { active ? <circle fill="#000" fillOpacity="0.4" cx="2" cy="2" r={radius} /> : null }
        <circle cx="0" cy="0" r={radius} fill="#fff" stroke="#333" strokeWidth="1" />
        <text x="0" y="3" textAnchor="middle">{label}</text>
        <g
          transform={`rotate(${rotation})`}
          onMouseDown={this.activate}>
          <path d={`M -${radius} 0 h 10 0`} stroke="#ee3333" strokeWidth="1"/>
          <circle cx="0" cy="0" r={radius} fill="#fff" fillOpacity="0" />
        </g>
      </svg>
      </div>
    );
  }
}
