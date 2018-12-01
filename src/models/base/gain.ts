import { IInputTarget, IOutputConnect } from '../base';
import { BaseAudioDevice } from "../base/BaseAudioDevice";
import { Level } from '../types';

export class Gain extends BaseAudioDevice implements IInputTarget, IOutputConnect {

  private gain: GainNode;

  public get volume() : Level {
    const volume = this.gain.gain.value;
    return parseFloat(volume.toFixed(2));
  }
  public set volume(v : Level) {
    this.gain.gain.setValueAtTime(v, this.context.currentTime);
  }

  constructor(ctx: AudioContext) {
    super(ctx, 'gain');
    this.gain = ctx.createGain();
  }

  public getInput = () => {
    return this.gain;
  }

  public connect = (target: IInputTarget) => {
    this.gain.connect(target.getInput() as AudioNode);
  }

  public disconnect = (target: IInputTarget) => {
    this.gain.disconnect(target.getInput() as AudioNode);
  }

}
