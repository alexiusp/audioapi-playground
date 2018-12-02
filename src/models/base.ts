import { ID, Time, Level, Frequency, MidiKeysState, NoteHandler } from './types';
import { Gain } from './base/gain';
import { OutputAudioDevice } from './base/OutputAudioDevice';
import { InputAudioDevice } from './base/InputAudioDevice';

// common abstract models

// base model with id
export interface IBase {
  id: ID;
}

// device with input we can connect to
export interface IInputDevice {
  input: Gain;
}

export type BaseInputTarget = 'default';
// device with custom inputs
export interface IInputTarget extends IBase {
  getInput: (which?: BaseInputTarget) => AudioNode | AudioParam;
}

// device with output that can be connected to somewhere
export interface IOutputDevice {
  output: Gain;
}

export interface IConnected {
  connected: string[];
}

export interface IOutputConnect {
  connect: (target: IInputTarget, which: BaseInputTarget) => void;
  disconnect: (target: IInputTarget, which: BaseInputTarget) => void;
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
export interface IModule extends IBase, IConnected {
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
  // instrument name
  name: InstrumentEnum;
  // modules contained
  modules: ID[];
  // output Gain ID
  output: ID;
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
