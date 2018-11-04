import * as React from 'react';
import { Navbar, Nav, NavItem, Glyphicon, Button } from 'react-bootstrap';

import './masterMixer.css';

import { MasterMixer } from '../models/master';
import { Callback } from '../models/types';

export interface Props {
  master: MasterMixer;
  onPlay?: Callback;
}

export interface State {
  isOn: boolean;
}

export default class MasterMixerUI extends React.Component<Props, State> {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private canvasContext?: CanvasRenderingContext2D;
  private drawHandle?: number;

  constructor(props: Props) {
    super(props);
    this.canvas = React.createRef();
    this.state = { isOn: false };
  }

  public componentDidMount() {
    const canvas = this.canvas.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.canvasContext = ctx;
        const WIDTH = ctx.canvas.width;
        const HEIGHT = ctx.canvas.height;
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.moveTo(0, HEIGHT/2);
        ctx.lineTo(WIDTH, HEIGHT/2);
        ctx.stroke();
        return;
      }
    }
    throw new Error('can not get rendering context!');
  }

  play() {
    this.setState({ isOn: true });
    console.log('MasterMixerUI.play');
    const master = this.props.master;
    master.play();
    if (this.props.onPlay) {
      this.props.onPlay();
    }
    this.draw();
  }

  stop() {
    this.setState({ isOn: false });
    console.log('MasterMixerUI.stop');
    this.props.master.stop();
    if (this.drawHandle) {
      cancelAnimationFrame(this.drawHandle);
    }
  }

  draw = () => {
    this.drawHandle = requestAnimationFrame(this.draw);
    const drawContext = this.canvasContext!;
    const WIDTH = drawContext.canvas.width;
    const HEIGHT = drawContext.canvas.height;
    const data = this.props.master.getAnalyserData();
    drawContext.fillRect(0, 0, WIDTH, HEIGHT);
    drawContext.beginPath();
    const sliceWidth = WIDTH * 1.0 / data.length;
    let x = 0;
    for(var i = 0; i < data.length; i++) {

      var v = data[i] / 128.0;
      var y = v * HEIGHT/2;

      if(i === 0) {
        drawContext.moveTo(x, y);
      } else {
        drawContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    drawContext.lineTo(WIDTH, HEIGHT/2);
    drawContext.stroke();
  }

  playToggle = () => {
    if (this.state.isOn) {
      this.stop();
    } else {
      this.play();
    }
  }

  changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = +e.target.value / 100;
    this.props.master.setVolume(volume);
  }

  render() {
    const volume = Math.ceil(this.props.master.getVolume() * 100).toString();
    const isOn = this.state.isOn;
    return (
      <Navbar fixedBottom={true} className="master-mixer">
        <div className="mixer-panel">
          <Button className="mixer-control" active={isOn} bsSize="small" bsStyle="primary" onClick={this.playToggle}><Glyphicon glyph="play" /></Button>
          <div className="mixer-control volume-control">
            <input type="range" defaultValue={volume} onChange={this.changeVolume} />
          </div>
          <div className="mixer-control">
            <canvas id="master-visualizer" ref={this.canvas} />
          </div>
        </div>
      </Navbar>
    );
  }

}
