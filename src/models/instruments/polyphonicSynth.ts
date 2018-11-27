import { findIndex } from 'lodash';

import { IPolyphonicSynth, OutputAudioDevice, InstrumentEnum } from '../base';
import { Frequency, Level, Velocity } from '../types';
import { Envelope } from '../modules/envelope';
import { MidiKeyboard } from '../modules/midiKeyboard';
import { Oscillator } from '../modules/oscillator';
import { MIDINoteIndex } from '../../utils/midi';
import EnvelopedOscillator from './envelopedOscillator';

export default class PolyphonicSynth extends OutputAudioDevice implements IPolyphonicSynth {
  name: InstrumentEnum.PolyphonicSynth;

  keyboard: MidiKeyboard;

  private _oscillator : Oscillator;
  public get oscillator() : Oscillator {
    return this._oscillator;
  }
  public set oscillator(v : Oscillator) {
    this._oscillator = v;
  }

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

  private _voices: Map<number, EnvelopedOscillator>;
  private buildVoice(note: number, velocity: Velocity) {
    // create a voice for a note
    const freq = MIDINoteIndex[note].frequency;
    const gain = velocity / 127;
    const voice = new EnvelopedOscillator(this.context);
    voice.oscillator.type = this._oscillator.type;
    voice.oscillator.frequency = freq;
    voice.oscillator.gain = gain * this._oscillator.gain;
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
    this._oscillator = new Oscillator(ctx);
    this._maxVoices = 3;
    this._voices = new Map();
    this.keyboard = new MidiKeyboard(ctx);
    this.keyboard.registerNoteHandlers(this.noteOn, this.noteOff);
  }

  public noteOn = (note: number, velocity: Velocity = 127) => {
    const voice = this.buildVoice(note, velocity);
    // check if this voice already playing
    const duplicate = this._voices.get(note);
    if (duplicate) {
      duplicate.stop();
      this._voices.delete(note);
    }
    // remove first voice and deactive note if voices limit met
    if (this._voices.size + 1 > this._maxVoices) {
      const firstNote = Array.from(this._voices.keys())[0];
      const firstVoice = this._voices.get(firstNote);
      if (firstVoice) {
        firstVoice.stop();
        this._voices.delete(firstNote);
      }
    }
    voice.start();
    this._voices.set(note, voice);
  }

  public noteOff = (note: number) => {
    const voice = this._voices.get(note);
    if (voice) {
      voice.stop();
      this._voices.delete(note);
    }
  }

}
