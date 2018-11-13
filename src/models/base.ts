export type ID = string;
export type Time = number;// [0..Infinity)
export type Level = number;// [0..1]

export enum InstrumentEnum {
  MasterMixer,
  SimpleOscillator,
  EnvelopedOscillator,
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
  frequency: number;
}

// behavior models
export interface IPlayable {
  play: () => void;
}

export interface IOutputInstrument extends IOutput {
  connect: (output: ID) => void;
  disconnect: () => void;
}

export interface IInputInstrument extends IInput {
  getInput: () => AudioNode;
}

export interface ISimpleOscillator extends IOutputInstrument, IGain, IPlayable, IOscillator {}
export interface IMasterMixer extends IInputInstrument, IPlayable {}
export type IInstrument = ISimpleOscillator | IMasterMixer;

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
