import { findIndex } from 'lodash';

import { IPolyphonicSynth, IMidiKeyboard, OutputAudioDevice, InstrumentEnum } from '../base';
import { Frequency, Level, Velocity } from '../types';
import { Envelope } from '../modules/envelope';
import { MidiKeyboard } from '../modules/midiKeyboard';
import { Oscillator } from '../modules/oscillator';
import { MIDINoteIndex, frequencyToMidiNoteNumber } from '../../utils/midi';
import EnvelopedOscillator from './envelopedOscillator';

export default class PolyphonicSynth extends OutputAudioDevice implements IPolyphonicSynth {
  name: InstrumentEnum.PolyphonicSynth;

  keyboard: MidiKeyboard;

  private _envelope : Envelope;
  public get envelope() : Envelope {
    return this._envelope;
  }
  public set envelope(v : Envelope) {
    this._envelope = v;
  }

  // amount of simultaneously playable sounds
  private _maxVoices : number;
  public get maxVoices() : number {
    return this._maxVoices;
  }

  private _voices: EnvelopedOscillator[];
  private buildVoice(freq: Frequency, gain: Level) {
    const voice = new EnvelopedOscillator(this.context);
    voice.oscillator.frequency = freq;
    voice.oscillator.gain = gain;
    const { attack, decay, sustain, release } = this._envelope;
    voice.envelope.attack = attack;
    voice.envelope.decay = decay;
    voice.envelope.sustain = sustain;
    voice.envelope.release = release;
    voice.connect(this.output);
    return voice;
  }

  constructor(ctx: AudioContext) {
    super(ctx);
    this.name = InstrumentEnum.PolyphonicSynth;
    this._envelope = new Envelope(ctx);
    this._envelope.connect(this.output);
    this._maxVoices = 3;
    this._voices = [];
    this.keyboard = new MidiKeyboard(ctx);
    this.keyboard.registerNoteHandlers(this.noteOn, this.noteOff);
  }

  public noteOn = (note: number, velocity: Velocity = 127) => {
    // create a voice for a note
    const freq = MIDINoteIndex[note].frequency;
    const gain = velocity / 127;
    const voice = this.buildVoice(freq, gain);
    // remove first voice and deactive note if voices limit met
    if (this._voices.length + 1 > this._maxVoices) {
      const firstVoice: EnvelopedOscillator = this._voices.shift()!;
      firstVoice.stop();
    }
    this._voices.push(voice);
    voice.start();
  }

  public noteOff = (note: number) => {
    const freq = MIDINoteIndex[note].frequency;
    const voiceIndex = findIndex(this._voices, (osc: EnvelopedOscillator) => {
      return osc.oscillator.frequency === freq;
    });
    if (voiceIndex < 0) {
      throw new Error('Note was not pressed!');
    }
    const voice = this._voices.splice(voiceIndex, 1);
    voice[0].stop();
  }

}
