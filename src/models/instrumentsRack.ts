import { IOutputInstrument, IInstrument, IInputInstrument } from './base';
import { MasterMixer } from './master';
import SimpleOscillator from './instruments/simpleOscillator';

export class InstrumentsRack {
  // all instruments map
  public instruments: Map<string, IInstrument>;
  // possible outputs (instruments with inputs)
  public outputs: Map<string, IInputInstrument>;

  private context: AudioContext;
  public master: MasterMixer;

  constructor() {
    this.instruments = new Map<string, IInstrument>();
    // @ts-ignore
    const ctx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.master = new MasterMixer(ctx);
    this.context = ctx;
    this.outputs = new Map<string, IInputInstrument>();
    this.outputs.set(this.master.id, this.master);
  }

  public addInstrument(instrument: IInstrument) {
    this.instruments.set(instrument.id, instrument);
    // if instrument has input - add it to the outputs map
    if ((instrument as IInputInstrument).getInput) {
      this.outputs.set(instrument.id, instrument as IInputInstrument);
    }
  }

  initDefault() {
    // initialize default configuration
    const osc = new SimpleOscillator(this.context);
    osc.connect(this.master);
    this.addInstrument(osc);
  }

}

const Rack = new InstrumentsRack();
Rack.initDefault();
export default Rack;
