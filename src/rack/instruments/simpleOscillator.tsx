import * as React from 'react';
import { Button, Glyphicon, Panel, DropdownButton, MenuItem } from 'react-bootstrap';

import SimpleOscillator from '../../models/instruments/simpleOscillator';
import { IInstrument, IInputInstrument } from '../../models/base';
import { InstrumentsRack } from '../../models/instrumentsRack';

export interface Props {
  rack: InstrumentsRack;
  instrument: IInstrument;
}

export default function SimpleOscillatorUI(props: Props) {
  const osc = props.instrument as SimpleOscillator;
  const play = () => {
    osc.play();
  }
  const output = osc.output ? osc.output.name : 'None';
  let outputOptions: JSX.Element[] = [
    (<MenuItem active={output === 'None'} key="0" eventKey={0}>None</MenuItem>)
  ];
  if (props.rack.outputs && props.rack.outputs.size > 0) {
    props.rack.outputs.forEach((instrument: IInputInstrument, id) => {
      const isActive = osc.output && !!osc.output.id;
      outputOptions.push(<MenuItem active={isActive} key={id} eventKey={id}>{instrument.name}</MenuItem>);
    });
  }
  const selectOutput = (eventKey: any) => {
    console.log('selectOutput', eventKey);
  }
  return (
    <Panel className="instrument simple-oscillator">
      SimpleOscillator {osc.id}
      <DropdownButton
        onSelect={selectOutput}
        title={`Output: ${output}`}
        id={`${osc.id}-output-select`}>
        {outputOptions}
      </DropdownButton>
      <Button onClick={play}><Glyphicon glyph="play" /></Button>
    </Panel>
  );
}
