import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';

import { DataCallback } from '../models/types';
import { throttledChangeHandler } from '../utils/utils';

export interface Props {
  className?: string;
  volume: number;
  onVolumeChange: DataCallback<number>;
}

export default class VolumeControl extends React.Component<Props> {

  changeVolume = throttledChangeHandler((value: string) => {
    const volume = parseInt(value, 10) / 100;
    this.props.onVolumeChange(volume);
  })

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
