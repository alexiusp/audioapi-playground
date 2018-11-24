import { ILegacyInstrument, IInput, IConnectable, Instrument, InstrumentEnum, Module, BaseAudioDevice, OutputAudioDevice } from './base';
import { ID } from './types';
import { MasterMixer } from './master';
import EnvelopedOscillator from './instruments/envelopedOscillator';

export class InstrumentsRack {
  private instruments: Map<ID, Instrument>
  private modules: Map<ID, Module>

  public context: AudioContext;
  public master: MasterMixer;

  constructor() {
    this.instruments = new Map();
    this.modules = new Map();
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.context = ctx;
    this.master = new MasterMixer(ctx);
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
    (instrument! as OutputAudioDevice).connect(Rack.master.input);
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

}

const Rack = new InstrumentsRack();
export default Rack;
