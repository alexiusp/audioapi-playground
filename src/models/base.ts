import { getUID } from '../utils/utils';

export type ID = string;
export type Time = number;// [0..Infinity)
export type Level = number;// [0..1]
export type Frequency = number;

// common abstract models

// base model with id
export interface IBase {
  id: ID;
}

// device or parameter where we can connect to
export interface IInputDevice {
  input: AudioNode;
}

// base audio device wrapper class
export class BaseAudioDevice implements IBase {
  public id: ID;
  private _context: AudioContext;
  protected output: GainNode;
  constructor(ctx: AudioContext, prefix?: string) {
    this.id = getUID(prefix);
    this._context = ctx;
    this.output = ctx.createGain();
  }
  get context() {
    return this._context;
  }
  connect(target: AudioNode) {
    this.output.connect(target);
  }
  disconnect(target: AudioNode) {
    this.output.disconnect(target);
  }
}

// base module with controls
export interface IModule {
  start: (time?: Time) => void;
  stop: (time?: Time) => void;
}

// ADSR envelope model
export interface IEnvelope extends IBase {
  attack: Time;
  decay: Time;
  sustain: Level;
  release: Time;
}

// basic oscillator parameters model
export interface IOscillator extends IBase {
  type: OscillatorType;
  frequency: Frequency;
  gain: Level;
}

// union type of all existing modules
export type Module = IEnvelope | IOscillator;

export interface IInstrument extends IBase {
  name: InstrumentEnum,
}

// instrument - container for modules
export interface IEnvelopedOscillator extends IInstrument {
  name: InstrumentEnum.EnvelopedOscillator;
  envelope: IEnvelope;
  oscillator: IOscillator;
}

export type Instrument = IEnvelopedOscillator;

export enum InstrumentEnum {
  EnvelopedOscillator = 'Enveloped Oscillator',
}

// exports its properties to save in state
export interface IStateful<T extends Instrument | Module> {
  normalize: () => T;
}




















export enum LegacyInstrumentEnum {
  MasterMixer,
  SimpleOscillator,
  EnvelopedOscillator,
  MonophonicSynth,
}

export type LegacyInstrumentType = "Input" | "Output" | "InOut";

export interface IBaseInstrument extends IBase {
  instrument: LegacyInstrumentEnum;
}
export interface IInput extends IBaseInstrument {
  type: "Input";
}
export interface IOutput extends IBaseInstrument {
  output?: ID;
  type: "Output";
}
export type IConnectable = IInput | IOutput;

export interface IGain extends IBaseInstrument {
  volume: Level;
}

// oscillator model
export interface ILegacyOscillator extends IBaseInstrument {
  oscillatorType: OscillatorType;
  frequency: Frequency;
}
// instrument with envelope
export interface IEnveloped extends IBaseInstrument {
  envelope: IEnvelope;
}
// instrument with mide-keyboard
export interface IMidiKeyboard extends IBaseInstrument {
  keyboard: MidiKeyboardState;
}

// behavior models
export interface IPlayable {
  play: (freq?: Frequency) => void;
}

export interface IOutputInstrument extends IOutput {
  connect: (output: ID) => void;
  disconnect: () => void;
}

export interface IInputInstrument extends IInput {
  getInput: () => AudioNode;
}

export interface ISimpleOscillator extends IOutputInstrument, IGain, IPlayable, ILegacyOscillator { }
export interface ILegacyEnvelopedOscillator extends ISimpleOscillator, IEnveloped { }
export interface IMonophonicSynth extends ILegacyEnvelopedOscillator, IMidiKeyboard { }
export interface IMasterMixer extends IInputInstrument, IPlayable { }
export type ILegacyInstrument = IMonophonicSynth | ILegacyEnvelopedOscillator | ISimpleOscillator | IMasterMixer;


export type KeyboardKeyType = 'white' | 'black';

export interface KeyboardKey {
  midiNumber: number;
  fullName: string;
  shortName: string;
  type: KeyboardKeyType;
  frequency: Frequency;
}

export interface MidiKeyboardState {
  // amount of simultaneously playable sounds
  sounds: number;
  // starting note of keyboard
  start: number;
  // end note of keyboard
  end: number;
  // mide-keyboard keys state
  keys: {
    [midiNumber: number]: number;
  },
}
