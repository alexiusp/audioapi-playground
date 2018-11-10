import { IInput, IInstrument } from '../../models/base';

export default interface IInstrumentsState {
  outputs: IInput[];
  instruments: {
    [id: string]: IInstrument;
  }
}
