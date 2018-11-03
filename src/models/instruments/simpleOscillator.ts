import { BaseInstrument } from './base';

export class SimpleOscillator implements BaseInstrument {
  context: AudioContext;
  oscillator?: OscillatorNode;
  gain?: GainNode;

  constructor(ctx: AudioContext) {
    this.context = ctx;
  }

  private init() {
    console.log('osc.init', this.context);
    this.oscillator = this.context.createOscillator();
    this.gain = this.context.createGain();
    this.oscillator.connect(this.gain);
    this.gain.connect(this.context.destination);
    this.oscillator.type = 'sine';
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