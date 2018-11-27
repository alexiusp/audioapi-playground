import { IInstrument, IModule } from '../../models/base';

export default interface IInstrumentsState {
  // refactored state
  modules: {
    [id: string]: IModule;
  },
  instruments: {
    [id: string]: IInstrument;
  }
}
