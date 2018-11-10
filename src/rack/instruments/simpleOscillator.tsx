import * as React from 'react';
import { Button, Glyphicon, Panel } from 'react-bootstrap';

import SimpleOscillator from '../../models/instruments/simpleOscillator';
import { ID, IOutput, IInput } from '../../models/base';
import OutputSelector from '../controls/outputSelector';
import { Callback, DataCallback } from '../../models/types';
import IState from '../../store/state';
import { connect } from 'react-redux';
import { getInstrument, getOutputs } from '../../store/instruments/selectors';
import { startPlayInstrumentAction } from '../../store/instruments/actions';
import { Dispatch } from 'redux';
import Rack from '../../models/instrumentsRack';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  instrument: IOutput;
  outputs: IInput[];
  onPlay: Callback;
  onSelectOutput: DataCallback;
}

export function SimpleOscillatorUI(props: Props) {
  const osc = props.instrument as SimpleOscillator;
  const outputs = [Rack.master, ...props.outputs];
  /*
  const selectOutput = (eventKey: string) => {
    console.log('selectOutput', eventKey);
    if (eventKey === '0') {
      osc.disconnect();
      console.log('disconnect', osc.output);
    } else {
      osc.connect(props.rack.outputs.get(eventKey as string)!);
      console.log('connect', osc.output);
    }
  }
  */
  return (
    <Panel className="instrument simple-oscillator">
      <Panel.Heading>SimpleOscillator {osc.id}</Panel.Heading>
      <div>
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
  const instrument = getInstrument(state, ownProps.id) as IOutput;
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
    onSelectOutput: (output: ID) => console.log('onSelectOutput', id, output),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleOscillatorUI);
