import { forIn } from 'lodash';
import IState from '../state';
import { IBaseInstrument, ID, IMidiKeyboard } from '../../models/base';

export const getInstrumetsState = (state: IState) => state.instruments;

export const getInstrumentsMap = (state: IState) => getInstrumetsState(state).instruments;

export const getInstrumentsList = (state: IState) => {
  const instrumentMap = getInstrumentsMap(state);
  const instruments: IBaseInstrument[] = [];
  forIn(instrumentMap, (i: IBaseInstrument) => instruments.push(i));
  return instruments;
}

export const getInstrument = (state: IState, id: ID) => getInstrumentsMap(state)[id];

export const getOutputs = (state: IState) => getInstrumetsState(state).outputs;

export const getMidiKeyboard = (state: IState, id: ID) => {
  const instrument = getInstrument(state, id) as IMidiKeyboard;
  return instrument.keyboard;
}
