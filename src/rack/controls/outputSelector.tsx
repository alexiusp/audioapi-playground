import * as React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { DataCallback } from '../../models/types';
import { IInputInstrument } from '../../models/base';

export interface Props {
  id: string;
  active?: IInputInstrument;
  options?: Map<string, IInputInstrument>;
  onSelect: DataCallback<string>;
}

export default function OutputSelector(props: Props) {
  let outputOptions: JSX.Element[] = [
    (<MenuItem active={!props.active} key="0" eventKey={0}>None</MenuItem>)
  ];
  if (props.options && props.options.size > 0) {
    props.options.forEach((instrument: IInputInstrument) => {
      const isActive = props.active && (props.active.id === instrument.id);
      outputOptions.push(
        <MenuItem
          active={isActive}
          key={instrument.id}
          eventKey={instrument.id}>
          {instrument.id}
        </MenuItem>
      );
    });
  }
  const title = props.active ? props.active.id : 'None';
  return (
    <DropdownButton
      onSelect={(eventKey: any) => props.onSelect(eventKey.toString())}
      title={`Output: ${title}`}
      id={props.id}>
      {outputOptions}
    </DropdownButton>
  )
}
