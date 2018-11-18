import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import './rack.css';

import { InstrumentEnum, IBaseInstrument } from '../models/base';
import IState from '../store/state';
import { getInstrumentsList } from '../store/instruments/selectors';
import SimpleOscillatorUI from './instruments/simpleOscillator';
import EnvelopedOscillatorUI from './instruments/envelopedOscillator';
import MonophonicSynthUI from './instruments/monophonicSynth';

export interface Props {
  instruments: IBaseInstrument[];
}

export class RackUI extends React.Component<Props> {

  renderInstrument(instrument: IBaseInstrument) {
    switch (instrument.instrument) {
      case InstrumentEnum.SimpleOscillator:
        return (
          <SimpleOscillatorUI id={instrument.id} key={instrument.id} />
        );
      case InstrumentEnum.EnvelopedOscillator:
        return (
          <EnvelopedOscillatorUI id={instrument.id} key={instrument.id} />
        );
      case InstrumentEnum.MonophonicSynth:
        return (
          <MonophonicSynthUI id={instrument.id} key={instrument.id} />
        );
    }
    return null;
  }

  render() {
    const instruments = [];
    for (let instrument of this.props.instruments) {
      instruments.push(this.renderInstrument(instrument));
    }
    return (
      <Panel>
        <div className="instruments-rack">
          {instruments}
        </div>
      </Panel>
    );
  }
}

export const mapStateToProps = (state: IState) => {
  const instruments = getInstrumentsList(state);
  return {
    instruments,
  }
}

export default connect(mapStateToProps)(RackUI);
