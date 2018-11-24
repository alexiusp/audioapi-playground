import * as React from 'react';
import { Button, Glyphicon, Panel, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, IInstrument, ModuleEnum } from '../../models/base';
import { Callback } from '../../models/types';
import { getInstrument, getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';
import Envelope from '../modules/Envelope';
import Oscillator from '../modules/Oscillator';
import { startPlayInstrumentAction, stopPlayInstrumentAction } from '../../store/instruments/actions/instrument';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  name: string;
  envelope: ID;
  oscillator: ID;
  onPlay: Callback;
  onStop: Callback;
}

export function EnvelopedOscillator(props: Props) {
  return (
    <Panel className="instrument enveloped-oscillator">
      <Panel.Heading>{props.name} {props.id}</Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={6}>
            <Oscillator id={props.oscillator} />
          </Col>
          <Col xs={6}>
            <Envelope id={props.envelope} />
          </Col>
        </Row>
      </Panel.Body>
      <Panel.Footer>
        <Button onMouseDown={props.onPlay} onMouseUp={props.onStop}><Glyphicon glyph="play" /></Button>
      </Panel.Footer>
    </Panel>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const instrument = getInstrument(state, ownProps.id) as IInstrument;
  const modules = instrument.modules;
  let envelope: string = '';
  let oscillator: string = '';
  modules.forEach(id => {
    const module = getModule(state, id);
    if (module.name === ModuleEnum.Envelope) {
      envelope = id;
    } else {
      oscillator = id;
    }
  });
  return {
    name: instrument.name,
    envelope,
    oscillator,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
    onPlay: () => dispatch(startPlayInstrumentAction(id)),
    onStop: () => dispatch(stopPlayInstrumentAction(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnvelopedOscillator);
