import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import SimpleOscillator from '../../models/instruments/simpleOscillator';
import { IInstrument } from '../../models/base';

export interface Props {
  instrument: IInstrument;
}

export default function SimpleOscillatorUI(props: Props) {
  const osc = props.instrument as SimpleOscillator;
  const play = () => {
    osc.play();
  }
  return (
    <div className="instrument simple-oscillator">
      SimpleOscillator {osc.id}
      <Button onClick={play}><Glyphicon glyph="play" /></Button>
    </div>
  );
}
