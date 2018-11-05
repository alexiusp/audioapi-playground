import * as React from 'react';
import { Panel } from 'react-bootstrap';

import './rack.css';

import { IInstrument, InstrumentType } from '../models/base';
import { InstrumentsRack } from '../models/instrumentsRack';
import SimpleOscillatorUI from './instruments/simpleOscillator';

export interface Props {
  rack: InstrumentsRack;
}

export default class RackUI extends React.Component<Props> {

  renderInstrument(instrument: IInstrument) {
    switch (instrument.type) {
      case InstrumentType.SimpleOscillator:
        return (<SimpleOscillatorUI key={instrument.id} instrument={instrument} />);
    }
    return null;
  }

  render() {
    const instruments = [];
    for (let [id, instrument] of this.props.rack.instruments) {
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
