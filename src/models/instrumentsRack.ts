import { ILegacyInstrument, IInputInstrument, ID, IInput, IConnectable } from './base';
import { MasterMixer } from './master';

export class InstrumentsRack {
  // all instruments map
  public instruments: Map<ID, ILegacyInstrument>;
  // possible outputs (instruments with inputs)
  public outputs: Map<ID, IInput>;

  public context: AudioContext;
  public master: MasterMixer;

  constructor() {
    this.instruments = new Map<ID, ILegacyInstrument>();
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.master = new MasterMixer(ctx);
    this.context = ctx;
    this.outputs = new Map<ID, IInputInstrument>();
    this.outputs.set(this.master.id, this.master);
  }

  public addInstrument(instrument: ILegacyInstrument) {
    this.instruments.set(instrument.id, instrument);
    // if instrument has input - add it to the outputs map
    if ((instrument as IConnectable).type && (instrument as IConnectable).type === "Input") {
      this.outputs.set(instrument.id, instrument as IInputInstrument);
    }
  }

  public getInstrument(id: ID) {
    // console.log('getInstrument', id, this.instruments.has(id));
    return this.instruments.get(id);
  }

  public getOutput(id: ID) {
    // console.log('getOutput', id, this.outputs.has(id));
    return this.outputs.get(id);
  }

}

const Rack = new InstrumentsRack();
export default Rack;
