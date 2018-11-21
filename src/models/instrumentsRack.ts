import { ILegacyInstrument, IInputInstrument, ID, IInput, IConnectable, Instrument, InstrumentEnum } from './base';
import { MasterMixer } from './master';
import EnvelopedOscillator from './instruments/envelopedOscillator';

export class InstrumentsRack {
  private instruments: Map<ID, Instrument>
  // all instruments map
  public legacyInstruments: Map<ID, ILegacyInstrument>;
  // possible outputs (instruments with inputs)
  public outputs: Map<ID, IInput>;

  public context: AudioContext;
  public master: MasterMixer;

  constructor() {
    this.instruments = new Map();
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.context = ctx;
    this.master = new MasterMixer(ctx);
    // legacy
    this.outputs = new Map<ID, IInputInstrument>();
    this.outputs.set(this.master.id, this.master);
    this.legacyInstruments = new Map<ID, ILegacyInstrument>();
  }

  public createInstrument(instrumentClass: InstrumentEnum) {
    switch (instrumentClass) {
      case InstrumentEnum.EnvelopedOscillator: {
        const instrument = new EnvelopedOscillator(this.context);
        this.instruments.set(instrument.id, instrument);
        return instrument;
      }
    }
  }

  // legacy methods
  public addInstrument(instrument: ILegacyInstrument) {
    this.legacyInstruments.set(instrument.id, instrument);
    // if instrument has input - add it to the outputs map
    if ((instrument as IConnectable).type && (instrument as IConnectable).type === "Input") {
      this.outputs.set(instrument.id, instrument as IInputInstrument);
    }
  }

  public getInstrument(id: ID) {
    // console.log('getInstrument', id, this.instruments.has(id));
    return this.legacyInstruments.get(id);
  }

  public getOutput(id: ID) {
    // console.log('getOutput', id, this.outputs.has(id));
    return this.outputs.get(id);
  }

}

const Rack = new InstrumentsRack();
export default Rack;
