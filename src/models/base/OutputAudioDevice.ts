import { remove } from 'lodash';
import { BaseAudioDevice } from './BaseAudioDevice';
import { IInputTarget, IOutputDevice, IOutputConnect, IConnected, BaseInputTarget } from '../base';
import { Gain } from './gain';

// Device wich has an output and can be connected to something
export class OutputAudioDevice extends BaseAudioDevice implements IOutputDevice, IOutputConnect, IConnected {

  output: Gain;

  connected: string[];

  constructor(ctx: AudioContext, prefix?: string) {
    super(ctx, prefix);
    this.output = new Gain(ctx);
    this.connected = [];
  }

  connect(target: IInputTarget, which: BaseInputTarget = 'default') {
    const name = `${target.id}.${which}`;
    this.connected.push(name);
    this.output.connect(target, which);
  }

  disconnect(target: IInputTarget, which: BaseInputTarget = 'default') {
    this.output.disconnect(target);
    const name = `${target.id}.${which}`;
    this.connected = remove(this.connected, name);
  }

}