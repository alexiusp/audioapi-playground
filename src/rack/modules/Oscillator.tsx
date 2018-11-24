import * as React from 'react';
import { Button, Glyphicon, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './Oscillator.css';

import RoundKnob from '../../controls/roundKnob';
import WaveSelector from '../../controls/waveSelector';
import { ID, Frequency, Level, IOscillator } from '../../models/base';
import { DataCallback, Callback } from '../../models/types';
import { getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';
import { parseLevel } from '../../utils/utils';
import {
  setTypeOscillatorModuleAction,
  setFrequencyOscillatorModuleAction,
  setVolumeOscillatorModuleAction,
  startPlayOscillatorModuleAction,
  stopPlayOscillatorModuleAction,
} from '../../store/instruments/actions/oscillator';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  type: OscillatorType;
  frequency: Frequency;
  gain: Level;
  onSetOscType: DataCallback<OscillatorType>;
  onChangeFrequency: React.FormEventHandler<FormControl>;
  onChangeVolume: DataCallback<Level>;
}

export function Oscillator(props: Props) {
  return (
    <div className="osc-controls">
      <div>
        <WaveSelector id={props.id} selected={props.type} onSelect={props.onSetOscType} />
        <FormControl
          type="number"
          value={props.frequency}
          onChange={props.onChangeFrequency} />
      </div>
      <RoundKnob
        radius={35}
        min={0}
        max={1}
        step={0.01}
        value={props.gain}
        onUpdate={props.onChangeVolume}
        label="Gain"/>
    </div>
  );
}

export const mapStateToProps = (state: IState, props: OwnProps) => {
  const osc = getModule(state, props.id) as IOscillator;
  const { type, frequency, gain } = osc;
  return {
    type,
    frequency,
    gain,
  };
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
//    onSelectOutput: (output: ID) => dispatch(setOutputInstrumentAction(id, output)),
    onChangeVolume: (volume: Level) => dispatch(setVolumeOscillatorModuleAction(id, parseLevel(volume))),
    onSetOscType: (type: OscillatorType) => dispatch(setTypeOscillatorModuleAction(id, type)),
    onChangeFrequency: (e: React.FormEvent<FormControl>) => {
      const freq = parseFloat((e.target as HTMLInputElement).value);
      dispatch(setFrequencyOscillatorModuleAction(id, freq));
    },
  }
}
//              onChange={(e) => props.onChangeFrequency())} />

export default connect(mapStateToProps, mapDispatchToProps)(Oscillator);
