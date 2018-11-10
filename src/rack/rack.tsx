import * as React from 'react';
import { Panel } from 'react-bootstrap';

import './rack.css';

import { InstrumentEnum, IBaseInstrument } from '../models/base';
import SimpleOscillatorUI from './instruments/simpleOscillator';
import SimpleOscillator from '../models/instruments/simpleOscillator';
import IState from '../store/state';
import { getInstrumentsList } from '../store/instruments/selectors';
import { connect } from 'react-redux';
import Rack from '../models/instrumentsRack';

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
