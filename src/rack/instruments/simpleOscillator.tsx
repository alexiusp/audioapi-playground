import * as React from 'react';
import { Button, Glyphicon, Panel } from 'react-bootstrap';

import SimpleOscillator from '../../models/instruments/simpleOscillator';
import { ID, IOutput } from '../../models/base';
// import OutputSelector from '../controls/outputSelector';
import { Callback } from '../../models/types';
import IState from '../../store/state';
import { connect } from 'react-redux';
import { getInstrument } from '../../store/instruments/selectors';
import { startPlayInstrumentAction } from '../../store/instruments/actions';
import { Dispatch } from 'redux';

export interface OwnProps {
  id: ID;
}
export interface Props extends OwnProps {
  instrument: IOutput;
  onPlay: Callback;
}

export function SimpleOscillatorUI(props: Props) {
  const osc = props.instrument as SimpleOscillator;
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
  <OutputSelector id={`${osc.id}-output-select`} active={osc.output} options={props.rack.outputs} onSelect={selectOutput}/>
  */
  return (
    <Panel className="instrument simple-oscillator">
      SimpleOscillator {osc.id}
      <Button onClick={() => props.onPlay()}><Glyphicon glyph="play" /></Button>
    </Panel>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const instrument = getInstrument(state, ownProps.id) as IOutput;
  return {
    instrument,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
    onPlay: () => dispatch(startPlayInstrumentAction(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleOscillatorUI);
