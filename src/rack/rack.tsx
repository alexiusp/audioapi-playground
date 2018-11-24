import { map } from 'lodash';
import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import './rack.css';

import { LegacyInstrumentEnum, IBaseInstrument, ID } from '../models/base';
import IState from '../store/state';
import { getInstrumentIdList } from '../store/instruments/selectors';
import Instrument from './instruments/instrument';

export interface Props {
  instruments: ID[];
}

export class RackUI extends React.Component<Props> {

  render() {
    const instruments = map(this.props.instruments, id => <Instrument id={id} key={id} />);
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
  const instruments = getInstrumentIdList(state);
  return {
    instruments,
  }
}

export default connect(mapStateToProps)(RackUI);
