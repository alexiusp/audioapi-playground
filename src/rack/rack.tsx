import { map } from 'lodash';
import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import './rack.css';

import { LegacyInstrumentEnum, IBaseInstrument, ID } from '../models/base';
import IState from '../store/state';
import { getLegacyInstrumentsList, getInstrumentIdList } from '../store/instruments/selectors';
import SimpleOscillatorUI from './instruments/simpleOscillator';
import MonophonicSynthUI from './instruments/monophonicSynth';
import Instrument from './instruments/instrument';

export interface Props {
  instruments: ID[];
  // legacy
  legacy: IBaseInstrument[];
}

export class RackUI extends React.Component<Props> {

  renderLegacyInstrument(instrument: IBaseInstrument) {
    if ((instrument as IBaseInstrument).instrument !== undefined) {
      switch ((instrument as IBaseInstrument).instrument) {
        case LegacyInstrumentEnum.SimpleOscillator:
          return (
            <SimpleOscillatorUI id={instrument.id} key={instrument.id} />
          );
        case LegacyInstrumentEnum.MonophonicSynth:
          return (
            <MonophonicSynthUI id={instrument.id} key={instrument.id} />
          );
      }
    }
    return null;
  }

  render() {
    const legacyInstruments = [];
    for (let instrument of this.props.legacy) {
      legacyInstruments.push(this.renderLegacyInstrument(instrument));
    }
    const instruments = map(this.props.instruments, id => <Instrument id={id} key={id} />);
    return (
      <Panel>
        <div className="instruments-rack">
          {instruments}
          {legacyInstruments}
        </div>
      </Panel>
    );
  }
}

export const mapStateToProps = (state: IState) => {
  const legacy = getLegacyInstrumentsList(state);
  const instruments = getInstrumentIdList(state);
  return {
    instruments,
    legacy,
  }
}

export default connect(mapStateToProps)(RackUI);
