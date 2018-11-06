export enum InstrumentType {
  MasterMixer,
  SimpleOscillator,
}

export interface IInstrument {
  id: string;
  name: string;
  type: InstrumentType;
}

export interface IOutputInstrument extends IInstrument {
  output?: IInputInstrument;
  connect: (output: IInputInstrument) => void;
  disconnect: () => void;
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
