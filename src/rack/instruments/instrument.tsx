import * as React from 'react';

import { ID, InstrumentEnum } from '../../models/base';
import { connect } from 'react-redux';
import IState from '../../store/state';
import { getInstrument } from '../../store/instruments/selectors';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  name: InstrumentEnum;
}

export function Instrument(props: Props) {
  switch (props.name) {
    case InstrumentEnum.EnvelopedOscillator:
      return (<div>{props.name}</div>);
  }
}

export const mapStateToProps = (state: IState, props: OwnProps) => {
  const instrument = getInstrument(state, props.id);
  return {
    name: instrument.name,
  }
}

export default connect(mapStateToProps)(Instrument);
