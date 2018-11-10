import { IInputInstrument, InstrumentEnum, ID, ISimpleOscillator } from '../base';
import Rack from '../instrumentsRack';

export default class SimpleOscillator implements ISimpleOscillator {
  instrument = InstrumentEnum.SimpleOscillator;
  type: "Output" = "Output";
  output?: ID;
  oscillator?: OscillatorNode;
  gain?: GainNode;

  constructor(
    protected context: AudioContext,
    public id: ID,
    public volume: number = 1
    ) {
  }

  private init() {
    console.log('osc.init', this.id);
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = 'sine';
    this.gain = this.context.createGain();
    this.gain.gain.value = 0;
    this.oscillator.connect(this.gain);
    if (this.output) {
      const outputInstrument = Rack.getOutput(this.output) as IInputInstrument;
      this.gain.connect(outputInstrument.getInput());
    }
  }

  connect(output: ID) {
    this.output = output;
  }

  disconnect() {
    this.output = undefined;
  }

  play = (freq: number = 440, time: number = 1) => {
    console.log('osc.play', freq, time, this.volume);
    this.init();

    this.oscillator!.frequency.value = freq;
    const startTime = this.context.currentTime;

    this.gain!.gain.setValueAtTime(this.volume, startTime);
    this.oscillator!.start(startTime);
    this.stop(time);
  }

  private stop(time: number) {
    const stopTime = this.context.currentTime + time;
    this.gain!.gain.exponentialRampToValueAtTime(0.001, stopTime);
    this.oscillator!.stop(stopTime);
  }
}
