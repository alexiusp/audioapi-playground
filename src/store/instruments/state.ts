import { IInput, IConnectable } from '../../models/base';

export default interface IInstrumentsState {
  outputs: IInput[];
  instruments: {
    [id: string]: IConnectable;
  }
}
