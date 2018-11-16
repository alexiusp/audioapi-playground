import * as React from 'react';
import { Navbar, Glyphicon, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './masterMixer.css';

import Rack from '../models/instrumentsRack';
import { Callback, DataCallback } from '../models/types';
import { startPlayAction, stopPlayAction, changeVolumeAction } from '../store/master/actions';
import { getVolume, isPlaying } from '../store/master/selectors';
import IState from '../store/state';
import VolumeControl from '../controls/volumeControl';
import RoundKnob from '../controls/roundKnob';

export interface Props {
  onPlay: Callback;
  onStop: Callback;
  onVolumeChange: DataCallback<number>;
  playing: boolean;
  volume: number;
}

export class MasterMixerComponent extends React.Component<Props> {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private canvasContext?: CanvasRenderingContext2D;
  private drawHandle?: number;

  constructor(props: Props) {
    super(props);
    this.canvas = React.createRef();
  }

  public componentDidMount() {
    const canvas = this.canvas.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.canvasContext = ctx;
        this.prepareCanvas();
        return;
      }
    }
    throw new Error('can not get rendering context!');
  }

  prepareCanvas() {
    const ctx = this.canvasContext!;
    const WIDTH = ctx.canvas.width;
    const HEIGHT = ctx.canvas.height;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);
    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();
  }

  draw = () => {
    this.drawHandle = requestAnimationFrame(this.draw);
    const ctx = this.canvasContext!;
    const WIDTH = ctx.canvas.width;
    const HEIGHT = ctx.canvas.height;
    const data = Rack.master.getAnalyserData();
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    const sliceWidth = WIDTH * 1.0 / data.length;
    let x = 0;
    for (var i = 0; i < data.length; i++) {

      var v = data[i] / 128.0;
      var y = v * HEIGHT / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();
  }

  playToggle = () => {
    if (this.props.playing) {
      console.log('MasterMixerUI -> stop');
      this.props.onStop();
      if (this.drawHandle) {
        cancelAnimationFrame(this.drawHandle);
      }
    } else {
      console.log('MasterMixerUI -> play');
      this.props.onPlay();
      this.draw();
    }
  }

  render() {
    return (
      <Navbar fluid fixedBottom={true} className="master-mixer">
        <div className="mixer-panel">
          <Button
            className="mixer-control"
            active={this.props.playing}
            bsSize="small"
            bsStyle="primary"
            onClick={this.playToggle}>
            <Glyphicon glyph="play" />
          </Button>
          <RoundKnob value={this.props.volume} onUpdate={this.props.onVolumeChange} />
          <VolumeControl
            volume={this.props.volume}
            onVolumeChange={this.props.onVolumeChange}
            className="mixer-control"/>
          <div className="mixer-control">
            <canvas id="master-visualizer" ref={this.canvas} />
          </div>
        </div>
      </Navbar>
    );
  }
}

export const mapStateToProps = (state: IState) => ({
  volume: getVolume(state),
  playing: isPlaying(state),
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPlay: () => dispatch(startPlayAction()),
  onStop: () => dispatch(stopPlayAction()),
  onVolumeChange: (volume: number) => dispatch(changeVolumeAction(volume)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterMixerComponent);
