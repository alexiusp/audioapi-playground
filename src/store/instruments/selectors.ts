import { forIn } from 'lodash';
import IState from '../state';
import { IBaseInstrument, ID, IMidiKeyboard, Instrument } from '../../models/base';

export const getInstrumetsState = (state: IState) => state.instruments;

export const getLegacyInstrumentsMap = (state: IState) => getInstrumetsState(state).legacyInstruments;

export const getLegacyInstrumentsList = (state: IState) => {
  const instrumentMap = getLegacyInstrumentsMap(state);
  const instruments: IBaseInstrument[] = [];
  forIn(instrumentMap, (i: IBaseInstrument) => instruments.push(i));
  return instruments;
}

export const getLegacyInstrument = (state: IState, id: ID) => getLegacyInstrumentsMap(state)[id];

export const getOutputs = (state: IState) => getInstrumetsState(state).outputs;

export const getMidiKeyboard = (state: IState, id: ID) => {
  const instrument = getLegacyInstrument(state, id) as IMidiKeyboard;
  return instrument.keyboard;
}
