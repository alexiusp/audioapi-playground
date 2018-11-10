import { forIn } from 'lodash';
import IState from '../state';
import { IBaseInstrument, ID } from '../../models/base';

export const getInstrumetsState = (state: IState) => state.instruments;

export const getInstrumentsList = (state: IState) => {
  const iState = getInstrumetsState(state);
  const instruments: IBaseInstrument[] = [];
  forIn(iState, (i: IBaseInstrument) => instruments.push(i));
  return instruments;
}

export const getInstrument = (state: IState, id: ID) => getInstrumetsState(state)[id];
