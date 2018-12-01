import { BaseAudioDevice } from './BaseAudioDevice';
import { IInputDevice, IInputTarget, BaseInputTarget } from '../base';
import { Gain } from './gain';

// device wich has an input to wich some other device can be connected
export class InputAudioDevice extends BaseAudioDevice implements IInputDevice, IInputTarget {

  input: Gain;

  constructor(ctx: AudioContext, prefix?: string) {
    super(ctx, prefix);
    this.input = new Gain(ctx);
  }

  getInput = () => this.input.getInput();

}