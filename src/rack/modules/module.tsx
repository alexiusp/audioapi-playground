import * as React from 'react';
import { connect } from 'react-redux';

import { ModuleEnum } from '../../models/base';
import { ID } from '../../models/types';
import { getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';

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
      return (<div>Envelope {props.name}</div>);
    case ModuleEnum.Oscillator:
      return (<div>Oscillator {props.name}</div>);
  }
}

export const mapStateToProps = (state: IState, props: OwnProps) => {
  const module = getModule(state, props.id);
  return {
    name: module.name,
  }
}

export default connect(mapStateToProps)(Module);
