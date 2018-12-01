import { InputAudioDevice, IMasterMixer } from './base';
import { Level } from './types';

export class MasterMixer extends InputAudioDevice implements IMasterMixer {

  private _playing : boolean;
  public get playing() : boolean {
    return this._playing;
  }
  public set playing(v : boolean) {
    this._playing = v;
  }

  private _volume : Level;
  public get volume() : Level {
    return this._volume;
  }
  public set volume(v : Level) {
    this.input.gain.setValueAtTime(v, this.context.currentTime);
    this._volume = v;
  }

  // osciloscope/frequency bar graph
  private analyser: AnalyserNode;

  constructor(ctx: AudioContext) {
    super(ctx);
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 4096;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    // this.analyser.smoothingTimeConstant = 0.85;
    // this.analyser.smoothingTimeConstant = 0;
    this.input.connect(this.analyser);
    this.analyser.connect(ctx.destination);
    this.input.gain.value = 0;
    this._volume = 0;
    this._playing = false;
  }

  public getAnalyserData() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  public start(volume: Level = 1) {
    this.playing = true;
    this.volume = volume;
    return 0;
  }

  public stop() {
    this.playing = false;
    this.volume = 0;
    return 0;
  }

}
