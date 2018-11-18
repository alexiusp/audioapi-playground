import { InstrumentEnum, ID, ADSREnvelope, Time, Level } from '../base';
import SimpleOscillator from './simpleOscillator';

export default class EnvelopedOscillator extends SimpleOscillator {
  instrument = InstrumentEnum.EnvelopedOscillator;
  type: "Output" = "Output";
  output?: ID;
  oscillator?: OscillatorNode;
  gain?: GainNode;

  constructor(
    protected context: AudioContext,
    public id: ID,
    public volume: number = 1,
    public oscillatorType: OscillatorType = 'sine',
    public frequency: number = 440,
    public envelope: ADSREnvelope = {
      attack: 0,
      decay: 0.1,
      sustain: 0.8,
      release: 0.1,
    }
  ) {
    super(context, id, volume, oscillatorType, frequency);
  }

  setAttack = (attack: Time) => {
    this.envelope.attack = attack;
  }

  setDecay = (decay: Time) => {
    this.envelope.decay = decay;
  }

  setSustain = (sustain: Level) => {
    this.envelope.sustain = sustain;
  }

  setRelease = (release: Time) => {
    this.envelope.release = release;
  }

  play = (freq?: number) => {
    this.init(freq);
    console.log('osc.play', this.frequency, this.volume);

    // attack
    const attackTime = this.context.currentTime + this.envelope.attack;
    this.gain!.gain.linearRampToValueAtTime(this.volume, attackTime);
    // decay to sustain
    const decayTime = attackTime + this.envelope.decay;
    const volume = this.envelope.sustain * this.volume;
    this.gain!.gain.linearRampToValueAtTime(volume, decayTime);
    // start oscillator (sustain mode)
    this.oscillator!.start();
  }

  stop() {
    // release phase start
    const releaseTime = this.context.currentTime + this.envelope.release;
    this.gain!.gain.linearRampToValueAtTime(0, releaseTime);
    this.oscillator!.stop(releaseTime);
  }

}
