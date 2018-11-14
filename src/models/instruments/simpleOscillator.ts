import { IInputInstrument, InstrumentEnum, ID, ISimpleOscillator, Level, Time } from '../base';
import Rack from '../instrumentsRack';
import { OscillatorType } from '../types';

export default class SimpleOscillator implements ISimpleOscillator {
  instrument = InstrumentEnum.SimpleOscillator;
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

  protected init() {
    console.log('osc.init', this.id, this.oscillatorType);
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = this.oscillatorType;
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
    const frequency = freq || this.frequency;
    // temporary solution until start/stop properly implemented with mouse events
    console.log('osc.play', frequency, this.volume);
    this.init();

    this.oscillator!.frequency.value = frequency;
    const startTime = this.context.currentTime;

    this.gain!.gain.setValueAtTime(this.volume, startTime);
    this.oscillator!.start(startTime);
  }

  public stop(time: Time = 0) {
    const stopTime = this.context.currentTime + time;
    this.gain!.gain.exponentialRampToValueAtTime(0.001, stopTime);
    this.oscillator!.stop(stopTime);
  }
}
