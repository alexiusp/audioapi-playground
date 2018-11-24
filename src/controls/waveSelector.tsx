import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './waveSelector.css';

import { DataCallback, OscillatorTypeEnum, ID } from '../models/types';
import { getUID } from '../utils/utils';

export interface Props {
  selected: OscillatorType;
  id?: ID;
  onSelect: DataCallback<any>;
}

export function SineWave() {
  return (
    <svg className="wave-type" width="32px" height="16px" viewBox="0 0 200 100">
      <path strokeWidth="3" fill="none" d="M0 50 C 40 10, 60 10, 100 50 C 140 90, 160 90, 200 50" />
    </svg>
  );
}

export function SquareWave() {
  return (
    <svg className="wave-type" width="32px" height="16px" viewBox="0 0 200 100">
      <path strokeWidth="3" fill="none" d="M0 50 L 0 0, 100 0, 100 100, 200 100, 200 50" />
    </svg>
  );
}

export function TriangleWave() {
  return (
    <svg className="wave-type" width="32px" height="16px" viewBox="0 0 200 100">
      <path strokeWidth="3" fill="none" d="M0 50 L 50 0, 150 100, 200 50" />
    </svg>
  );
}

export function SawtoothWave() {
  return (
    <svg className="wave-type" width="32px" height="16px" viewBox="0 0 200 100">
      <path strokeWidth="3" fill="none" d="M0 50 L 100 0, 100 100, 200 50" />
    </svg>
  );
}

export default function WaveSelector(props: Props) {
  const { selected } = props;
  const id = props.id || getUID('wave');
  let activeWave = <SineWave />;
  switch (selected) {
    case OscillatorTypeEnum.Square:
      activeWave = <SquareWave />;
      break;
    case OscillatorTypeEnum.Triangle:
      activeWave = <TriangleWave />;
      break;
    case OscillatorTypeEnum.Sawtooth:
      activeWave = <SawtoothWave />;
      break;
  }
  return (
    <DropdownButton
      className="wave-type-selector btn-block"
      onSelect={props.onSelect}
      title={activeWave}
      id={`${id}-type-selector`}>
      <MenuItem
        active={selected === OscillatorTypeEnum.Sine}
        eventKey={OscillatorTypeEnum.Sine}>
        <SineWave />
      </MenuItem>
      <MenuItem
        active={selected === OscillatorTypeEnum.Square}
        eventKey={OscillatorTypeEnum.Square}>
        <SquareWave />
      </MenuItem>
      <MenuItem
        active={selected === OscillatorTypeEnum.Triangle}
        eventKey={OscillatorTypeEnum.Triangle}>
        <TriangleWave />
      </MenuItem>
      <MenuItem
        active={selected === OscillatorTypeEnum.Sawtooth}
        eventKey={OscillatorTypeEnum.Sawtooth}>
        <SawtoothWave />
      </MenuItem>
    </DropdownButton>
  );
}
