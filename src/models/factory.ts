import { SimpleOscillator } from './instruments/simpleOscillator';

export class AudioFactory {
  public ctx: AudioContext;

  private _isOn : boolean;
  public get isOn() : boolean {
    return this._isOn;
  }

  private oscillator: SimpleOscillator;
  constructor() {
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = new SimpleOscillator(ctx);
    this.ctx = ctx;
    this._isOn = false;
  }

  public start() {
    if(!this._isOn) {
      console.log('started');
      this.oscillator.play(880, 10);
      this._isOn = true;
    }
  }

  public end() {
    if(this._isOn) {
      this._isOn = false;
    }
  }
}
