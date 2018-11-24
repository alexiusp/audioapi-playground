import { IInputInstrument, LegacyInstrumentEnum, ISimpleOscillator } from '../base';
import { ID, Level, Time } from '../types';
import Rack from '../instrumentsRack';

export default class SimpleOscillator implements ISimpleOscillator {
  instrument = LegacyInstrumentEnum.SimpleOscillator;
  type: "Output" = "Output";
  output?: ID;
  oscillator?: OscillatorNode;
  gain?: GainNode;

  constructor(
    protected context: AudioContext,
    public id: ID,
    public volume: Level = 1,
    public oscillatorType: OscillatorType = 'sine',
    public frequency: number = 440
    ) {
  }

  protected init(frequency?: number) {
    console.log('osc.init', this.id, this.oscillatorType);
    if (frequency) {
      this.frequency = frequency;
    }
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = this.oscillatorType;
    this.oscillator.frequency.value = this.frequency;
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

  play = (freq?: number) => {
    this.init(freq);
    console.log('osc.play', this.frequency, this.volume);

    const startTime = this.context.currentTime;

    this.gain!.gain.setValueAtTime(this.volume, startTime);
    this.oscillator!.start(startTime);
  }

  stop(time: Time = 0) {
    const stopTime = this.context.currentTime + time;
    this.gain!.gain.exponentialRampToValueAtTime(0.001, stopTime);
    this.oscillator!.stop(stopTime);
  }
}
