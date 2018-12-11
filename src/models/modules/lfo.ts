import { remove } from 'lodash';
import { ILFO, IPlayable, ModuleEnum, BaseInputTarget } from '../base';
import { Frequency, Level, Time } from '../types';
import { IOscillatorInputTarget, OscillatorInputTarget } from './oscillator';
import { BaseAudioDevice } from '../base/BaseAudioDevice';

export type OutputTarget = BaseInputTarget | 'frequency';

export class LFOOscillator extends BaseAudioDevice implements ILFO, IPlayable {
  name: ModuleEnum.LFO;
  connected: string[];

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

  constructor(ctx: AudioContext) {
    super(ctx);
    this.name = ModuleEnum.LFO;
    // default parameters
    this._type = 'sine';
    this._frequency = 5;
    this.connected = [];
    this._input = {};
  }

  private _input: {
    [name: string]: IOscillatorInputTarget;
  };
  private osc?: OscillatorNode;
  protected init() {
    const osc = this.context.createOscillator();
    osc.frequency.value = this.frequency;
    osc.type = this.type;
    if (this.connected.length > 0) {
      this.connected.forEach(name => {
        const input = this._input[name];
        const paramName = name.split('.')[1] as OscillatorInputTarget;
        osc.connect(input!.getInput(paramName) as AudioParam);
      });
    }
    this.osc = osc;
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

  connect(target: IOscillatorInputTarget, which: OscillatorInputTarget = 'frequency') {
    const name = `${target.id}.${which}`;
    this._input[name] = target;
    this.connected.push(name);
  }

  disconnect(target: IOscillatorInputTarget, which: OscillatorInputTarget = 'frequency') {
    const name = `${target.id}.${which}`;
    delete this._input[name];
    this.connected = remove(this.connected, name);
  }

}
