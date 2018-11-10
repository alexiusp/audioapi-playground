import * as React from 'react';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Rack from '../../models/instrumentsRack';
import SimpleOscillator from '../../models/instruments/simpleOscillator';
import { ID, IOutput, IInput } from '../../models/base';
import { Callback, DataCallback } from '../../models/types';
import { getInstrument, getOutputs } from '../../store/instruments/selectors';
import IState from '../../store/state';
import {
  startPlayInstrumentAction,
  setOutputInstrumentAction,
  changeVolumeInstrumentAction,
} from '../../store/instruments/actions';
import OutputSelector from '../../controls/outputSelector';
import VolumeControl from '../../controls/volumeControl';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  instrument: IOutput;
  outputs: IInput[];
  onPlay: Callback;
  onSelectOutput: DataCallback;
  onChangeVolume: DataCallback<number>;
}

export function SimpleOscillatorUI(props: Props) {
  const osc = props.instrument as SimpleOscillator;
  const outputs = [Rack.master, ...props.outputs];
  return (
    <Panel className="instrument simple-oscillator">
      <Panel.Heading>SimpleOscillator {osc.id}</Panel.Heading>
      <div>
        <VolumeControl volume={osc.volume} onVolumeChange={props.onChangeVolume} />
        <OutputSelector
          id={`${osc.id}-output-select`}
          active={osc.output}
          options={outputs}
          onSelect={props.onSelectOutput} />
        <Button onClick={props.onPlay}><Glyphicon glyph="play" /></Button>
      </div>
    </Panel>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const instrument = getInstrument(state, ownProps.id) as SimpleOscillator;
  const outputs = getOutputs(state);
  return {
    instrument,
    outputs,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
    onPlay: () => dispatch(startPlayInstrumentAction(id)),
    onSelectOutput: (output: ID) => dispatch(setOutputInstrumentAction(id, output)),
    onChangeVolume: (volume: number) => dispatch(changeVolumeInstrumentAction(id, volume)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleOscillatorUI);
