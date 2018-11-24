import { IInput, ILegacyInstrument, IInstrument, IModule } from '../../models/base';

export default interface IInstrumentsState {
  // refactored state
  modules: {
    [id: string]: IModule;
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
