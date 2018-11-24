import { Action, ActionCreator } from 'redux';
import { InstrumentEnum, ID } from '../../../models/base';

// instrument action after refactoring
export const INSTRUMENT_CREATE = 'INSTRUMENT_CREATE';
export type INSTRUMENT_CREATE = typeof INSTRUMENT_CREATE;
export interface ICreateInstrumentAction extends Action<INSTRUMENT_CREATE> {
  type: INSTRUMENT_CREATE;
  payload: InstrumentEnum;
}
export const createInstrumentAction: ActionCreator<ICreateInstrumentAction> = (instrument: InstrumentEnum) => ({
  type: INSTRUMENT_CREATE,
  payload: instrument,
});

export const INSTRUMENT_PLAY_START = 'INSTRUMENT_PLAY_START';
export type INSTRUMENT_PLAY_START = typeof INSTRUMENT_PLAY_START;
export interface IStartPlayInstrumentAction extends Action<INSTRUMENT_PLAY_START> {
  type: INSTRUMENT_PLAY_START;
  payload: ID;
}
export const startPlayInstrumentAction: ActionCreator<IStartPlayInstrumentAction> = (id: ID) => ({
  type: INSTRUMENT_PLAY_START,
  payload: id,
});

export const INSTRUMENT_PLAY_STOP = 'INSTRUMENT_PLAY_STOP';
export type INSTRUMENT_PLAY_STOP = typeof INSTRUMENT_PLAY_STOP;
export interface IStopPlayInstrumentAction extends Action<INSTRUMENT_PLAY_STOP> {
  type: INSTRUMENT_PLAY_STOP;
  payload: ID;
}
export const stopPlayInstrumentAction: ActionCreator<IStopPlayInstrumentAction> = (id: ID) => ({
  type: INSTRUMENT_PLAY_STOP,
  payload: id,
});

export type InstrumentAction =
  IStartPlayInstrumentAction |
  IStopPlayInstrumentAction |
  ICreateInstrumentAction;
