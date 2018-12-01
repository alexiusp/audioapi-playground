import { OutputAudioDevice, IPlayable, IOscillator, ModuleEnum, IInputTarget, BaseInputTarget } from '../base';
import { Frequency, Level, Time } from '../types';

export type OscillatorInputTarget = BaseInputTarget | 'frequency' | 'gain';

export class Oscillator extends OutputAudioDevice implements IOscillator, IInputTarget, IPlayable {
  name: ModuleEnum.Oscillator;

  private _type : OscillatorType;
  public get type() : OscillatorType {
    return this._type;
  }
  public set type(v : OscillatorType) {
    this._type  = v;
    if (this.osc) {
      this.osc.type = v;
    }
  }

  private _frequency : Frequency;
  public get frequency() : Frequency {
    return this._frequency;
  }
  public set frequency(v : Frequency) {
    this._frequency = v;
    if (this.osc) {
      this.osc.frequency.value = v;
    }
  }

  public get gain() : Level {
    const gain = this.output.gain.value;
    return parseFloat(gain.toFixed(2));
  }
  public set gain(v : Level) {
    this.output.gain.value = v;
  }

  constructor(ctx: AudioContext) {
    super(ctx);
    this._type = 'sine';
    this._frequency = 440;
    this.name = ModuleEnum.Oscillator;
  }

  public getInput(target: OscillatorInputTarget = 'default') {
    switch (target) {
      case 'frequency': {
        if (this.osc) {
          return this.osc;
        }
        throw new Error('Can not connect to stopped oscillator!');
      }
      case 'gain':
        return this.output.gain;
    }
    return this.output;
  }

  private osc?: OscillatorNode;
  protected init() {
    this.osc = this.context.createOscillator();
    this.osc.frequency.value = this.frequency;
    this.osc.type = this.type;
    this.osc.connect(this.output);
  }

  public start(time?: Time) {
    this.init();
    if (!this.osc) {
      throw new Error('Failed to create an Oscillator');
    }
    this.osc.start(time);
    return time || 0;
  }

  public stop(time?: Time) {
    if (!this.osc) {
      throw new Error('Can not stop an Oscillator when it was not started');
    }
    this.osc.stop(time);
    return time || 0;
  }

}
