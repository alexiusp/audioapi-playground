import * as React from 'react';
import { DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import { DataCallback } from '../models/types';
import { ID, IInput } from '../models/base';

export interface Props {
  id: string;
  active?: ID;
  options?: IInput[];
  onSelect: DataCallback;
}

export default function OutputSelector(props: Props) {
  let outputOptions: JSX.Element[] = [];
  if (props.options && props.options.length > 0) {
    outputOptions = props.options.map((instrument: IInput) => {
      const isActive = !!props.active && (props.active === instrument.id);
      return (
        <MenuItem
        active={isActive}
        key={instrument.id}
        eventKey={instrument.id}>
          {instrument.id}
        </MenuItem>
      );
    });
  }
  outputOptions.unshift(
    (<MenuItem active={!props.active} key="none" eventKey={null}>None</MenuItem>)
  )
  const outputTitle = props.active ? props.active : 'None';
  const title = (<span><Glyphicon glyph="random" /> {outputTitle}</span>);
  return (
    <DropdownButton
      onSelect={props.onSelect}
      title={title}
      id={props.id}>
      {outputOptions}
    </DropdownButton>
  )
}
