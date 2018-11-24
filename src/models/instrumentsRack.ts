import { ILegacyInstrument, IInputInstrument, ID, IInput, IConnectable, Instrument, InstrumentEnum, Module, BaseAudioDevice } from './base';
import { MasterMixer } from './master';
import EnvelopedOscillator from './instruments/envelopedOscillator';

export class InstrumentsRack {
  private instruments: Map<ID, Instrument>
  private modules: Map<ID, Module>
  // all instruments map
  public legacyInstruments: Map<ID, ILegacyInstrument>;
  // possible outputs (instruments with inputs)
  public outputs: Map<ID, IInput>;

  public context: AudioContext;
  public master: MasterMixer;

  constructor() {
    this.instruments = new Map();
    this.modules = new Map();
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.context = ctx;
    this.master = new MasterMixer(ctx);
    // legacy
    this.outputs = new Map<ID, IInputInstrument>();
    this.outputs.set(this.master.id, this.master);
    this.legacyInstruments = new Map<ID, ILegacyInstrument>();
  }

  public createInstrument(which: InstrumentEnum) {
    let instrument: Instrument;
    switch (which) {
      case InstrumentEnum.EnvelopedOscillator: {
        // instantiate instrument
        instrument = new EnvelopedOscillator(this.context);
        // add instrument to map
        this.instruments.set(instrument.id, instrument);
        // register modules
        const { envelope, oscillator } = instrument;
        this.modules.set(envelope.id, envelope);
        this.modules.set(oscillator.id, oscillator);
      }
    }
    (instrument! as BaseAudioDevice).connect(Rack.master.getInput());
    return instrument!;
  }

  public getInstrument(id: ID) {
    // console.log('getInstrument', id, this.instruments.has(id));
    return this.instruments.get(id);
  }

  public getModule(id: ID) {
    // console.log('getInstrument', id, this.instruments.has(id));
    return this.modules.get(id);
  }

  // legacy methods

  public addInstrument(instrument: ILegacyInstrument) {
    this.legacyInstruments.set(instrument.id, instrument);
    // if instrument has input - add it to the outputs map
    if ((instrument as IConnectable).type && (instrument as IConnectable).type === "Input") {
      this.outputs.set(instrument.id, instrument as IInputInstrument);
    }
  }


  public getOutput(id: ID) {
    // console.log('getOutput', id, this.outputs.has(id));
    return this.outputs.get(id);
  }

}

const Rack = new InstrumentsRack();
export default Rack;
