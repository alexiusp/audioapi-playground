import { IEnvelope, IInputDevice, IPlayable, ModuleEnum, IInputTarget } from '../base';
import { OutputAudioDevice } from "../base/OutputAudioDevice";
import { Level, Time } from '../types';
import { Gain } from '../base/gain';

export class Envelope extends OutputAudioDevice implements IEnvelope, IInputDevice, IInputTarget, IPlayable {
  name: ModuleEnum.Envelope;

  private _attack: Time;
  public get attack(): Time {
    return this._attack;
  }
  public set attack(v: Time) {
    this._attack = v;
  }

  private _decay: Time;
  public get decay(): Time {
    return this._decay;
  }
  public set decay(v: Time) {
    this._decay = v;
  }

  private _sustain: Level;
  public get sustain(): Level {
    return this._sustain;
  }
  public set sustain(v: Level) {
    this._sustain = v;
  }

  private _release: Time;
  public get release(): Time {
    return this._release;
  }
  public set release(v: Time) {
    this._release = v;
  }

  input: Gain;
  getInput = () => this.input.getInput();

  constructor(ctx: AudioContext) {
    super(ctx);
    this.name = ModuleEnum.Envelope;
    this._attack = 0;
    this._decay = 0;
    this._sustain = 1;
    this._release = 0;
    this.input = this.output;
    this.input.volume = 0;
  }

  public setEnvelope(attack: Time, decay: Time, sustain: Level, release: Time) {
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
  }

  public start(time?: Time) {
    const startTime = time || this.context.currentTime;
    this.input.getInput().gain.setValueAtTime(0, startTime);
    // attack
    const attackTime = startTime + this.attack;
    this.input.getInput().gain.linearRampToValueAtTime(1, attackTime);
    // decay to sustain
    const decayTime = attackTime + this.decay;
    this.input.getInput().gain.linearRampToValueAtTime(this.sustain, decayTime);
    return decayTime;
  }

  public stop(time?: Time) {
    const stopTime = time || this.context.currentTime;
    // release phase start
    const releaseTime = stopTime + this.release;
    this.input.getInput().gain.linearRampToValueAtTime(0, releaseTime);
    return releaseTime;
  }

}
