export type ID = string;
export type Time = number;// [0..Infinity)
export type Level = number;// [0..1]
export type Frequency = number;

export enum InstrumentEnum {
  MasterMixer,
  SimpleOscillator,
  EnvelopedOscillator,
  MonophonicSynth,
}

export type InstrumentType = "Input" | "Output" | "InOut";

// data models
export interface IBaseInstrument {
  id: ID;
  instrument: InstrumentEnum;
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

export interface IOscillator extends IBaseInstrument {
  oscillatorType: OscillatorType;
  frequency: Frequency;
}
export interface IEnveloped extends IBaseInstrument {
  envelope: ADSREnvelope;
}
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

export interface ISimpleOscillator extends IOutputInstrument, IGain, IPlayable, IOscillator {}
export interface IEnvelopedOscillator extends ISimpleOscillator, IEnveloped {}
export interface IMonophonicSynth extends IEnvelopedOscillator, IMidiKeyboard {}
export interface IMasterMixer extends IInputInstrument, IPlayable {}
export type IInstrument = IMonophonicSynth | IEnvelopedOscillator | ISimpleOscillator | IMasterMixer;

export class BaseAudioDevice {
  context: AudioContext;
  constructor(ctx: AudioContext) {
    this.context = ctx;
  }
}

export interface ADSREnvelope {
  attack: Time;
  decay: Time;
  sustain: Level;
  release: Time;
}

export type KeyboardKeyType = 'white' | 'black';

export interface KeyboardKey {
  midiNumber: number;
  fullName: string;
  shortName: string;
  type: KeyboardKeyType;
  frequency: Frequency;
}

export interface MidiKeyboardState {
  start: number;
  end: number;
  keys: {
    [midiNumber: number]: boolean;
  },
}
