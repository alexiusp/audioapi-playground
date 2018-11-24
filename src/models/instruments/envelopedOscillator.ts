import {
  Time,
  BaseAudioDevice,
  IEnvelopedOscillator,
  InstrumentEnum,
} from '../base';
import { Envelope } from '../modules/envelope';
import { Oscillator } from '../modules/oscillator';

export default class EnvelopedOscillator extends BaseAudioDevice implements IEnvelopedOscillator {

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
    this.connect(ctx.destination);
  }

  public start(time?: Time) {
    console.log('instrument start');
    this.envelope.start(time);
    this.oscillator.start(time);
  }

  public stop(time?: Time) {
    const releaseTime = this.envelope.stop(time);
    this.oscillator.stop(releaseTime);
  }

}
