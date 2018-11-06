import * as React from 'react';
import { Button, Glyphicon, Panel, DropdownButton, MenuItem } from 'react-bootstrap';

import SimpleOscillator from '../../models/instruments/simpleOscillator';
import { IInstrument, IInputInstrument } from '../../models/base';
import { InstrumentsRack } from '../../models/instrumentsRack';
import OutputSelector from '../controls/outputSelector';
import { Callback } from '../../models/types';

export interface Props {
  rack: InstrumentsRack;
  instrument: IInstrument;
  onPlay: Callback;
}

export default function SimpleOscillatorUI(props: Props) {
  const osc = props.instrument as SimpleOscillator;
  const selectOutput = (eventKey: string) => {
    console.log('selectOutput', eventKey);
    if (eventKey === '0') {
      osc.disconnect();
      console.log('disconnect', osc.output);
    } else {
      osc.connect(props.rack.outputs.get(eventKey as string)!);
      console.log('connect', osc.output);
    }
  }
  return (
    <Panel className="instrument simple-oscillator">
      SimpleOscillator {osc.id}
      <OutputSelector
        id={`${osc.id}-output-select`}
        active={osc.output}
        options={props.rack.outputs}
        onSelect={selectOutput}
        />
      <Button onClick={() => props.onPlay()}><Glyphicon glyph="play" /></Button>
    </Panel>
  );
}
