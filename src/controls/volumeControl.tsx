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

  changeVolume = throttledChangeHandler((value: Level) => this.props.onVolumeChange(value));

  public render() {
    const props = this.props;
    const volume = props.volume.toString();
    const className = `volume-control ${props.className}`;
    let label = (<Glyphicon glyph="volume-off" />);
    if (props.volume > 0) {
      label = props.volume > 50 ? (<Glyphicon glyph="volume-up" />) : (<Glyphicon glyph="volume-down" />);
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
          value={volume}
          onChange={this.changeVolume} />
        <span>{volume}</span>
      </div>
    )
  }
}
