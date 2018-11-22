import { IInput, ILegacyInstrument, IInstrument, Module } from '../../models/base';

export default interface IInstrumentsState {
  modules: {
    [id: string]: Module;
  },
  instruments: {
    [id: string]: IInstrument;
  }
  // legacy state
  outputs: IInput[];
  legacyInstruments: {
    [id: string]: ILegacyInstrument;
  }
}
