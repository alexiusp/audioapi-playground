import * as React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IInstrument, ModuleEnum } from '../../models/base';
import { ID } from '../../models/types';
import IState from '../../store/state';
import { getInstrument, getModule } from '../../store/instruments/selectors';
import Envelope from '../modules/Envelope';
import Keyboard from '../modules/keyboard/keyboard';
import Oscillator from '../modules/Oscillator';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  name: string;
  envelope: ID;
  keyboard: ID;
  oscillator: ID;
}

export function PolyphonicSynth(props: Props) {
  return (
    <Panel className="instrument polyphonic-synth">
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
      <Panel.Body>
        <Keyboard id={props.keyboard} />
      </Panel.Body>
    </Panel>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const instrument = getInstrument(state, ownProps.id) as IInstrument;
  const modules = instrument.modules;
  let envelope: string = '';
  let keyboard: string = '';
  let oscillator: string = '';
  modules.forEach(id => {
    const module = getModule(state, id);
    switch (module.name) {
      case ModuleEnum.Envelope:
        envelope = id;
        break;
      case ModuleEnum.MidiKeyboard:
        keyboard = id;
        break;
      case ModuleEnum.Oscillator:
        oscillator = id;
        break;
    }
  });
  return {
    name: instrument.name,
    envelope,
    keyboard,
    oscillator,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolyphonicSynth);
