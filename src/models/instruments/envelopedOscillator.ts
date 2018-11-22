import { LegacyInstrumentEnum, ID, IEnvelope, Time, Level, BaseAudioDevice, IPlayable, IEnvelopedOscillator, InstrumentEnum, ModuleEnum } from '../base';
import SimpleOscillator from './simpleOscillator';
import { Envelope } from '../modules/envelope';
import { Oscillator } from '../modules/oscillator';

export default class EnvelopedOscillator extends BaseAudioDevice implements IPlayable, IEnvelopedOscillator {

  name = InstrumentEnum.EnvelopedOscillator;

  private _envelope : Envelope;
  public get envelope() : Envelope {
    return this._envelope;
  }
  public set envelope(v : Envelope) {
    this._envelope = v;
  }

  private _oscillator : Oscillator;
  public get oscillator() : Oscillator {
    return this._oscillator;
  }
  public set oscillator(v : Oscillator) {
    this._oscillator = v;
  }

  constructor(ctx: AudioContext) {
    super(ctx);
    this._envelope = new Envelope(ctx);
    this._oscillator = new Oscillator(ctx);
    this._oscillator.connect(this._envelope.input);
    this._envelope.connect(this.output);
  }

  public start(time?: Time) {
    this.envelope.start(time);
    this.oscillator.start(time);
  }

  public stop(time?: Time) {
    const releaseTime = this.envelope.stop(time);
    this.oscillator.stop(releaseTime);
  }

}

export class LegacyEnvelopedOscillator extends SimpleOscillator {
  instrument = LegacyInstrumentEnum.EnvelopedOscillator;
  type: "Output" = "Output";
  output?: ID;
  oscillator?: OscillatorNode;
  gain?: GainNode;

  constructor(
    protected context: AudioContext,
    public id: ID,
    public volume: number = 1,
    public oscillatorType: OscillatorType = 'sine',
    public frequency: number = 440,
    public envelope: IEnvelope = {
      id: 'Asd',
      name: ModuleEnum.Envelope,
      attack: 0,
      decay: 0.1,
      sustain: 0.8,
      release: 0.1,
    }
  ) {
    super(context, id, volume, oscillatorType, frequency);
  }

  setAttack = (attack: Time) => {
    this.envelope.attack = attack;
  }

  setDecay = (decay: Time) => {
    this.envelope.decay = decay;
  }

  setSustain = (sustain: Level) => {
    this.envelope.sustain = sustain;
  }

  setRelease = (release: Time) => {
    this.envelope.release = release;
  }

  play = (freq?: number) => {
    this.init(freq);
    console.log('osc.play', this.frequency, this.volume);

    // attack
    const attackTime = this.context.currentTime + this.envelope.attack;
    this.gain!.gain.linearRampToValueAtTime(this.volume, attackTime);
    // decay to sustain
    const decayTime = attackTime + this.envelope.decay;
    const volume = this.envelope.sustain * this.volume;
    this.gain!.gain.linearRampToValueAtTime(volume, decayTime);
    // start oscillator (sustain mode)
    this.oscillator!.start();
  }

  stop() {
    // release phase start
    const releaseTime = this.context.currentTime + this.envelope.release;
    this.gain!.gain.linearRampToValueAtTime(0, releaseTime);
    this.oscillator!.stop(releaseTime);
  }

}
