import { keys } from 'lodash';

import { ID } from '../../models/types';
import IState from '../state';

export const getInstrumetsState = (state: IState) => state.instruments;

export const getInstrumentsMap = (state: IState) => getInstrumetsState(state).instruments;

export const getInstrumentIdList = (state: IState) => keys(getInstrumentsMap(state));

export const getInstrument = (state: IState, id: ID) => getInstrumentsMap(state)[id];

export const getModulesMap = (state: IState) => getInstrumetsState(state).modules;

export const getModulesIdList = (state: IState) => keys(getModulesMap(state));

export const getModule = (state: IState, id: ID) => getModulesMap(state)[id];
