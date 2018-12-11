import { OutputAudioDevice } from '../base/OutputAudioDevice';
import { IEnvelopedOscillatorLfo, InstrumentEnum, IOutputConnect } from '../base';
import { Envelope } from '../modules/envelope';
import { Oscillator } from '../modules/oscillator';
import { LFOOscillator } from '../modules/lfo';
import { Time } from '../types';

export default class EnvelopedOscillatorLfo extends OutputAudioDevice implements IOutputConnect, IEnvelopedOscillatorLfo {
  name: InstrumentEnum.EnvelopedOscillatorLfo;

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

  private _lfo : LFOOscillator;
  public get lfo() : LFOOscillator {
    return this._lfo;
  }
  public set lfo(v : LFOOscillator) {
    this._lfo = v;
  }

  constructor(ctx: AudioContext) {
    super(ctx);
    this.name = InstrumentEnum.EnvelopedOscillatorLfo;
    this._envelope = new Envelope(ctx);
    this._envelope.connect(this.output);
    this._oscillator = new Oscillator(ctx);
    this._oscillator.connect(this._envelope);
    this._lfo = new LFOOscillator(ctx);
    this._lfo.connect(this._oscillator, 'frequency');
  }

  public start(time?: Time) {
    this.envelope.start(time);
    this.oscillator.start(time);
    this.lfo.start(time);
    return time || 0;
  }

  public stop(time?: Time) {
    const releaseTime = this.envelope.stop(time);
    this.oscillator.stop(releaseTime);
    this.lfo.stop(releaseTime);
    return releaseTime;
  }

}
