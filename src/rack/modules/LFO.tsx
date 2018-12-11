import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import WaveSelector from '../../controls/waveSelector';
import { ILFO } from '../../models/base';
import { ID, Frequency, DataCallback } from '../../models/types';
import { setTypeOscillatorModuleAction, setFrequencyOscillatorModuleAction } from '../../store/instruments/actions/oscillator';
import { getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';

export interface OwnProps {
  id: ID
}

export interface Props extends OwnProps {
  type: OscillatorType;
  frequency: Frequency;
  onSetOscType: DataCallback<OscillatorType>;
  onChangeFrequency: React.FormEventHandler<FormControl>;
}

export function LFO(props: Props) {
  return (
    <div className="osc-controls">
      <div>
        <WaveSelector id={props.id} selected={props.type} onSelect={props.onSetOscType} />
        <FormControl
          type="number"
          value={props.frequency}
          onChange={props.onChangeFrequency} />
      </div>
    </div>
  );
}

export const mapStateToProps = (state: IState, props: OwnProps) => {
  const lfo = getModule(state, props.id) as ILFO;
  const { type, frequency } = lfo;
  return {
    type,
    frequency,
  };
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
    onSetOscType: (type: OscillatorType) => dispatch(setTypeOscillatorModuleAction(id, type)),
    onChangeFrequency: (e: React.FormEvent<FormControl>) => {
      const freq = parseFloat((e.target as HTMLInputElement).value);
      dispatch(setFrequencyOscillatorModuleAction(id, freq));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LFO);
