import * as React from 'react';
import { connect } from 'react-redux';

import { ID, InstrumentEnum } from '../../models/base';
import { getInstrument } from '../../store/instruments/selectors';
import IState from '../../store/state';
import EnvelopedOscillator from './envelopedOscillator';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  name: InstrumentEnum;
}

// HOC to render instruments
export function Instrument(props: Props) {
  switch (props.name) {
    case InstrumentEnum.EnvelopedOscillator:
      return (<EnvelopedOscillator id={props.id} />);
  }
}

export const mapStateToProps = (state: IState, props: OwnProps) => {
  const instrument = getInstrument(state, props.id);
  return {
    name: instrument.name,
  }
}

export default connect(mapStateToProps)(Instrument);