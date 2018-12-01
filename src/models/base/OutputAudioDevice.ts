import { BaseAudioDevice } from './BaseAudioDevice';
import { IInputTarget, IOutputDevice, IOutputConnect } from '../base';
import { Gain } from './gain';

// Device wich has an output and can be connected to something
export class OutputAudioDevice extends BaseAudioDevice implements IOutputDevice, IOutputConnect {
  output: Gain;
  protected connected: IInputTarget[];
  constructor(ctx: AudioContext, prefix?: string) {
    super(ctx, prefix);
    this.output = new Gain(ctx);
    this.connected = [];
  }

  connect(target: IInputTarget) {
    this.output.connect(target);
  }

  disconnect(target: IInputTarget) {
    this.output.disconnect(target);
  }

}