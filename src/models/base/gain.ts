import { IInputTarget, IOutputConnect, BaseInputTarget } from '../base';
import { BaseAudioDevice } from "../base/BaseAudioDevice";
import { Level } from '../types';

export class Gain extends BaseAudioDevice implements IInputTarget, IOutputConnect {

  private gain: GainNode;

  public get volume() : Level {
    const volume = this.gain.gain.value;
    return parseFloat(volume.toFixed(2));
  }
  public set volume(v : Level) {
    this.gain.gain.value = v;
  }

  constructor(ctx: AudioContext) {
    super(ctx, 'gain');
    this.gain = ctx.createGain();
  }

  public getInput = (which = 'default') => {
    return this.gain;
  }

  public connect = (target: IInputTarget, which: BaseInputTarget = 'default') => {
    this.gain.connect(target.getInput(which) as AudioNode);
  }

  public disconnect = (target: IInputTarget, which: BaseInputTarget = 'default') => {
    this.gain.disconnect(target.getInput(which) as AudioNode);
  }

}
