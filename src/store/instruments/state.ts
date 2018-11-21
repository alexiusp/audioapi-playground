import { IInput, ILegacyInstrument, Instrument } from '../../models/base';

export default interface IInstrumentsState {
  outputs: IInput[];
  instruments: {
    [id: string]: ILegacyInstrument | Instrument;
  }
}
