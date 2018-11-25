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

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  name: string;
  envelope: ID;
  keyboard: ID;
}

export function PolyphonicSynth(props: Props) {
  return (
    <Panel className="instrument polyphonic-synth">
      <Panel.Heading>{props.name} {props.id}</Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={12}>
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
  modules.forEach(id => {
    const module = getModule(state, id);
    if (module.name === ModuleEnum.Envelope) {
      envelope = id;
    } else {
      keyboard = id;
    }
  });
  return {
    name: instrument.name,
    envelope,
    keyboard,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolyphonicSynth);
