import { SimpleOscillator } from './instruments/simpleOscillator';

export class AudioFactory {
  public ctx: AudioContext;

  private _isOn : boolean;
  public get isOn() : boolean {
    return this._isOn;
  }

  private oscillator: SimpleOscillator;
  private analyser: AnalyserNode;
  constructor() {
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = ctx.createAnalyser();
    this.oscillator = new SimpleOscillator(ctx, this.analyser);
    this.analyser.fftSize = 4096;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    // this.analyser.smoothingTimeConstant = 0.85;
    this.analyser.smoothingTimeConstant = 0;
    this.ctx = ctx;
    this._isOn = false;
  }

  public getAnalyserData() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  public start() {
    if(!this._isOn) {
      console.log('started');
      this.oscillator.play(440, 1);
      this._isOn = true;
    }
  }

  public end() {
    if(this._isOn) {
      this._isOn = false;
    }
  }
}
