import { getUID } from '../utils/utils';
import { ID, Time, Level, Frequency, MidiKeysState, NoteHandler } from './types';

// common abstract models

// base model with id
export interface IBase {
  id: ID;
}

// device we can connect to
export interface IInputDevice {
  input: AudioNode;
}

export type BaseInputTarget = 'default';

// device with custom inputs
export interface IInputTarget {
  getInput: (which?: BaseInputTarget) => AudioNode | AudioParam;
}

// base audio device wrapper class
export class BaseAudioDevice implements IBase {
  public id: ID;
  private _context: AudioContext;
  constructor(ctx: AudioContext, prefix?: string) {
    this.id = getUID(prefix);
    this._context = ctx;
  }
  get context() {
    return this._context;
  }
}

export class OutputAudioDevice extends BaseAudioDevice {
  protected output: GainNode;
  protected connected: IInputTarget[];
  constructor(ctx: AudioContext, prefix?: string) {
    super(ctx, prefix);
    this.output = ctx.createGain();
    this.connected = [];
  }
  connect(target: AudioNode) {
    this.output.connect(target);
  }
  connectInput(target: IInputTarget) {
    const input = target.getInput('default');
    this.output.connect(input as AudioNode);
    this.connected.push(target);
  }
  disconnect(target: AudioNode) {
    this.output.disconnect(target);
  }
}

export class InputAudioDevice extends BaseAudioDevice implements IInputDevice, IInputTarget {
  input: GainNode;
  constructor(ctx: AudioContext, prefix?: string) {
    super(ctx, prefix)
    this.input = ctx.createGain();
  }
  getInput(target: BaseInputTarget = 'default') {
    return this.input;
  }
}

// base module/instrument with play controls
export interface IPlayable {
  start: (time?: Time) => Time;
  stop: (time?: Time) => Time;
}

/*
* Modules definitions
*/

// enumeration of existing modules
export enum ModuleEnum {
  Oscillator = 'OSC',
  Envelope = 'ADSR',
  MidiKeyboard = 'MIDIKeys',
}

// base store interface for module
export interface IModule extends IBase {
  name: ModuleEnum;
}

// ADSR envelope module model
export interface IEnvelope extends IModule {
  name: ModuleEnum.Envelope;
  attack: Time;
  decay: Time;
  sustain: Level;
  release: Time;
}

// base oscillator module model
export interface IOscillator extends IModule {
  name: ModuleEnum.Oscillator;
  type: OscillatorType;
  frequency: Frequency;
  gain: Level;
}

// midi keyboard module model
export interface IMidiKeyboard extends IModule {
  name: ModuleEnum.MidiKeyboard;
  // starting note of keyboard
  start: number;
  // end note of keyboard
  end: number;
  // midi-keyboard keys state
  keys: MidiKeysState;
}

// union type of all existing modules
export type Module = IEnvelope | IOscillator | IMidiKeyboard;

/*
* Instruments
*/

// enumeration of instruments
export enum InstrumentEnum {
  EnvelopedOscillator = 'Enveloped Oscillator',
  PolyphonicSynth = 'Polyphonic Synthesizer',
}

// store interface to represent instrument as container of modules
export interface IInstrument extends IBase {
  name: InstrumentEnum;
  modules: ID[];
}

// enveloped oscillator - basic oscillator
export interface IEnvelopedOscillator extends OutputAudioDevice, IPlayable {
  name: InstrumentEnum.EnvelopedOscillator;
  envelope: IEnvelope;
  oscillator: IOscillator;
}

// polyphonic synth - enveloped oscillator with midi keyboard
export interface IPolyphonicSynth extends OutputAudioDevice {
  name: InstrumentEnum.PolyphonicSynth;
  // amount of simultaneously playable sounds
  maxVoices: number;
  // midi keyboard module
  keyboard: IMidiKeyboard;
  // envelope used to controle the sound of keys
  envelope: IEnvelope;
  // oscillator to apply settings to voices
  oscillator: IOscillator;
}

// union type of all existing instruments
export type Instrument = IEnvelopedOscillator | IPolyphonicSynth;

// store interface for master mixer
export interface IMasterMixer extends InputAudioDevice, IPlayable {
  volume: Level;
  playing: boolean;
}









export enum LegacyInstrumentEnum {
  MasterMixer,
  SimpleOscillator,
  EnvelopedOscillator,
  MonophonicSynth,
}

export interface ILegacyBaseInstrument extends IBase {
  instrument: LegacyInstrumentEnum;
}
export interface IInput extends ILegacyBaseInstrument {
  type: "Input";
}

