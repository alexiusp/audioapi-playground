import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';

import { DataCallback } from '../models/types';
import { throttledChangeHandler } from '../utils/utils';
import { Level } from '../models/base';

export interface Props {
  className?: string;
  volume: number;
  onVolumeChange: DataCallback<number>;
}

export default class VolumeControl extends React.Component<Props> {

  changeVolume = throttledChangeHandler((value: Level) => this.props.onVolumeChange(value / 100));

  public render() {
    const props = this.props;
    const volume = Math.ceil(props.volume * 100).toString();
    const className = `volume-control ${props.className}`;
    let label = (<Glyphicon glyph="volume-off" />);
    if (props.volume > 0) {
      label = props.volume > 0.5 ? (<Glyphicon glyph="volume-up" />) : (<Glyphicon glyph="volume-down" />);
    }
    return (
      <div className={className}>
        <label htmlFor="volume-control">{label}</label>
        <input
          name="volume-control"
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={volume}
          onChange={this.changeVolume} />
        <span>{volume}</span>
      </div>
    )
  }
}
