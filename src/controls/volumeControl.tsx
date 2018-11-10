import * as React from 'react';
import { DataCallback } from '../models/types';

export interface Props {
  className: string;
  volume: number;
  onVolumeChange: DataCallback<number>;
}

export default function VolumeControl(props: Props) {
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = +e.target.value / 100;
    props.onVolumeChange(volume);
  }
  const volume = Math.ceil(props.volume * 100).toString();
  const className = `volume-control ${props.className}`;
  return (
    <div className={className}>
      <label htmlFor="volume-control">Volume:</label>
      <input
        name="volume-control"
        type="range"
        min="0"
        max="100"
        step="1"
        defaultValue={volume}
        onChange={changeVolume} />
      <span>{volume}</span>
    </div>
  )
}
