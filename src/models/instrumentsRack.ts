import { IOutputInstrument, IInstrument } from './base';
import { MasterMixer } from './master';
import SimpleOscillator from './instruments/simpleOscillator';

export class InstrumentsRack {
  public instruments: Map<string, IInstrument>;

  private context: AudioContext;
  public master: MasterMixer;

  constructor() {
    this.instruments = new Map<string, IInstrument>();
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.master = new MasterMixer(ctx);
    this.context = ctx;
  }

  public addInstrument(instrument: IInstrument) {
    this.instruments.set(instrument.id, instrument);
  }

  initDefault() {
    // initialize default configuration
    const osc = new SimpleOscillator(this.context);
    osc.connect(this.master.getInput());
    this.addInstrument(osc);
  }

}
