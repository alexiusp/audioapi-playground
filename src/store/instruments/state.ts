import { IBaseInstrument } from '../../models/base';

export default interface IInstrumentsState {
  [id: string]: IBaseInstrument;
}
