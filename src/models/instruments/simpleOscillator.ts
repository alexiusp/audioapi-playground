import { getUID } from '../../utils/utils';
import { IOutputInstrument, InstrumentType, IInputInstrument } from '../base';

export default class SimpleOscillator implements IOutputInstrument {
  id: string;
  name = 'SimpleOscillator';
  type = InstrumentType.SimpleOscillator;
  output?: IInputInstrument;
  context: AudioContext;
  oscillator?: OscillatorNode;
  gain?: GainNode;

  constructor(ctx: AudioContext) {
    this.id = getUID('osc');
    this.context = ctx;
  }

  private init() {
    console.log('osc.init', this.context);
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = 'sine';
    this.gain = this.context.createGain();
    this.gain.gain.value = 0;
    this.oscillator.connect(this.gain);
    if (this.output) {
      this.gain.connect(this.output.getInput());
    }
  }

  connect(output: IInputInstrument) {
    this.output = output;
  }

  play(freq: number = 440, time: number = 1) {
    console.log('osc.play', freq, time);
    this.init();

    this.oscillator!.frequency.value = freq;
    const startTime = this.context.currentTime;

    this.gain!.gain.setValueAtTime(1, startTime);
    this.oscillator!.start(startTime);
    this.stop(time);
  }

  private stop(time: number) {
    const stopTime = this.context.currentTime + time;
    this.gain!.gain.exponentialRampToValueAtTime(0.001, stopTime);
    this.oscillator!.stop(stopTime);
  }
}