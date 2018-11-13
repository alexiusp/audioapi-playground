import { ISimpleOscillator, InstrumentEnum, ID, IInputInstrument, ADSREnvelope, Time, Level } from '../base';
import Rack from '../instrumentsRack';
import SimpleOscillator from './simpleOscillator';

export default class EnvelopedOscillator extends SimpleOscillator {
  instrument = InstrumentEnum.SimpleOscillator;
  type: "Output" = "Output";
  output?: ID;
  oscillator?: OscillatorNode;
  gain?: GainNode;
  envelope: ADSREnvelope;

  constructor(
    protected context: AudioContext,
    public id: ID,
    public volume: number = 1,
    public oscillatorType: OscillatorType = 'sine',
    public frequency: number = 440
  ) {
    super(context, id, volume, oscillatorType, frequency);
    this.envelope = {
      attack: 0,
      decay: 0.1,
      sustain: volume,
      release: 0.1,
    }
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

  play = () => {
    console.log('osc.play', this.frequency, this.volume);
    this.init();
    this.oscillator!.frequency.value = this.frequency;

    // attack
    const attackTime = this.context.currentTime + this.envelope.attack;
    this.gain!.gain.linearRampToValueAtTime(1, attackTime);
    // decay to sustain
    const decayTime = attackTime + this.envelope.decay;
    this.gain!.gain.linearRampToValueAtTime(this.envelope.sustain, decayTime);
    // start playing
    this.oscillator!.start();
  }

  public stop() {
    // release phase start
    const releaseTime = this.context.currentTime + this.envelope.release;
    this.gain!.gain.linearRampToValueAtTime(0, releaseTime);
    this.oscillator!.stop(releaseTime);
  }

}
