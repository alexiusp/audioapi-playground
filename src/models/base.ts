export enum InstrumentType {
  MasterMixer,
  SimpleOscillator,
}

export interface IInstrument {
  id: string;
  type: InstrumentType;
}

export interface IOutputInstrument extends IInstrument {
  output?: AudioNode;
  connect: (output: AudioNode) => void;
}

export interface IInputInstrument extends IInstrument {
  getInput: () => AudioNode;
}

export class BaseAudioDevice {
  context: AudioContext;
  constructor(ctx: AudioContext) {
    this.context = ctx;
  }
}
