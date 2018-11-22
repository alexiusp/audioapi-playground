import { IEnvelope, BaseAudioDevice, IInputDevice, IPlayable, Level, Time, ModuleEnum } from '../base';

export class Envelope extends BaseAudioDevice implements IEnvelope, IInputDevice, IPlayable {
  name: ModuleEnum.Envelope;

  private _attack : Time;
  public get attack() : Time {
    return this._attack;
  }
  public set attack(v : Time) {
    this._attack = v;
  }

  private _decay : Time;
  public get decay() : Time {
    return this._decay;
  }
  public set decay(v : Time) {
    this._decay = v;
  }

  private _sustain : Level;
  public get sustain() : Level {
    return this._sustain;
  }
  public set sustain(v : Level) {
    this._sustain = v;
  }

  private _release : Time;
  public get release() : Time {
    return this._release;
  }
  public set release(v : Time) {
    this._release = v;
  }

  input: GainNode;

  constructor(ctx: AudioContext) {
    super(ctx);
    this._attack = 0;
    this._decay = 0;
    this._sustain = 1;
    this._release = 0;
    this.input = this.output;
    this.input.gain.value = 0;
    this.name = ModuleEnum.Envelope;
  }

  public setEnvelope(attack: Time, decay: Time, sustain: Level, release: Time) {
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
  }

  public start(time?: Time) {
    const startTime = time || this.context.currentTime;
    this.input.gain.setValueAtTime(0, startTime);
    // attack
    const attackTime = startTime + this.attack;
    this.input.gain.linearRampToValueAtTime(1, attackTime);
    // decay to sustain
    const decayTime = attackTime + this.decay;
    this.input.gain.linearRampToValueAtTime(this.sustain, decayTime);
  }

  public stop(time?: Time) {
    const stopTime = time || this.context.currentTime;
    // release phase start
    const releaseTime = stopTime + this.release;
    this.input.gain.linearRampToValueAtTime(0, releaseTime);
    return releaseTime;
  }

}
