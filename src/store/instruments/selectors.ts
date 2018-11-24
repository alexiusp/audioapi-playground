import { forIn, keys } from 'lodash';

import { ILegacyBaseInstrument, IMidiKeyboard } from '../../models/base';
import { ID } from '../../models/types';
import IState from '../state';

export const getInstrumetsState = (state: IState) => state.instruments;

export const getInstrumentsMap = (state: IState) => getInstrumetsState(state).instruments;

export const getInstrumentIdList = (state: IState) => keys(getInstrumentsMap(state));

export const getInstrument = (state: IState, id: ID) => getInstrumentsMap(state)[id];

export const getModulesMap = (state: IState) => getInstrumetsState(state).modules;

export const getModulesIdList = (state: IState) => keys(getModulesMap(state));

export const getModule = (state: IState, id: ID) => getModulesMap(state)[id];

// legacy selectors

export const getLegacyInstrumentsMap = (state: IState) => getInstrumetsState(state).legacyInstruments;

export const getLegacyInstrumentsList = (state: IState) => {
  const instrumentMap = getLegacyInstrumentsMap(state);
  const instruments: ILegacyBaseInstrument[] = [];
  forIn(instrumentMap, (i: ILegacyBaseInstrument) => instruments.push(i));
  return instruments;
}

export const getLegacyInstrument = (state: IState, id: ID) => getLegacyInstrumentsMap(state)[id];

export const getOutputs = (state: IState) => getInstrumetsState(state).outputs;

export const getMidiKeyboard = (state: IState, id: ID) => {
  const instrument = getLegacyInstrument(state, id) as IMidiKeyboard;
  return instrument.keyboard;
}
