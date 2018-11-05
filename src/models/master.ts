import { getUID } from '../utils/utils';
import { BaseAudioDevice, IInputInstrument, InstrumentType } from './base';

export class MasterMixer extends BaseAudioDevice implements IInputInstrument {
  id: string;
  type = InstrumentType.MasterMixer;
  // osciloscope/frequency bar graph
  private analyser: AnalyserNode;
  // master volume control
  private gain: GainNode;
  // volume value control
  private volume: number;
  // on/off control
  private _isOn: boolean;

  constructor(ctx: AudioContext) {
    super(ctx);
    this.id = getUID('osc');
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 4096;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    // this.analyser.smoothingTimeConstant = 0.85;
    // this.analyser.smoothingTimeConstant = 0;
    this.gain = ctx.createGain();
    this.gain.gain.value = 0;
    this.analyser.connect(this.gain);
    this.gain.connect(ctx.destination);
    // default initial state
    this.volume = 1;
    this._isOn = false;
  }

  public getAnalyserData() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  getInput() {
    return this.analyser;
  }

  public setVolume(volume: number) {
    // console.log('setVolume', volume);
    this.volume = volume;
    if (this._isOn) {
      this.gain.gain.setValueAtTime(volume, this.context.currentTime);
    }
  }

  public getVolume() {
    // console.log('getVolume', this.volume);
    return this.volume;
  }

  public isOn() {
    return this._isOn;
  }

  public play() {
    console.log('MasterMixer.play');
    this.gain.gain.value = this.volume;
    this._isOn = true;
  }

  public stop() {
    console.log('MasterMixer.stop');
    this.gain.gain.value = 0;
    this._isOn = false;
  }

}
