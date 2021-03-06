import * as React from 'react';
import { connect } from 'react-redux';

import { ModuleEnum } from '../../models/base';
import { ID } from '../../models/types';
import { getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';

import Envelope from './Envelope';
import Keyboard from './Keyboard';
import LFO from './LFO';
import Oscillator from './Oscillator';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  name: ModuleEnum;
}

// HOC to render module
export function Module(props: Props) {
  switch (props.name) {
    case ModuleEnum.Envelope:
      return (<Envelope id={props.id} />);
    case ModuleEnum.Oscillator:
      return (<Oscillator id={props.id} />);
    case ModuleEnum.MidiKeyboard:
      return (<Keyboard id={props.id} />);
    case ModuleEnum.LFO:
      return (<LFO id={props.id} />);
  }
  return <div>Unknown module</div>
}

export const mapStateToProps = (state: IState, props: OwnProps) => {
  const module = getModule(state, props.id);
  return {
    name: module.name,
  }
}

export default connect(mapStateToProps)(Module);
