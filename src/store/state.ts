import IMasterState from './master/state';
import IInstrumentsState from './instruments/state';

export default interface IState {
  master: IMasterState;
  instruments: IInstrumentsState;
}
