import { Action, ActionCreator } from 'redux';
import { ID, IInstrument } from '../../models/base';

export const INSTRUMENT_ADD = 'INSTRUMENT_ADD';
export type INSTRUMENT_ADD = typeof INSTRUMENT_ADD;
export interface IAddInstrumentAction extends Action<INSTRUMENT_ADD> {
  type: INSTRUMENT_ADD;
  payload: IInstrument;
}
export const addInstrumentAction: ActionCreator<IAddInstrumentAction> = (instrument: IInstrument) => ({
  type: INSTRUMENT_ADD,
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

export const INSTRUMENT_SET_OUTPUT = 'INSTRUMENT_SET_OUTPUT';
export type INSTRUMENT_SET_OUTPUT = typeof INSTRUMENT_SET_OUTPUT;
export interface ISetOutputInstrumentAction extends Action<INSTRUMENT_SET_OUTPUT> {
  type: INSTRUMENT_SET_OUTPUT;
  payload: {
    id: ID;
    output: ID | null;
  };
}
export const setOutputInstrumentAction: ActionCreator<ISetOutputInstrumentAction> = (id: ID, output: ID | null) => ({
  type: INSTRUMENT_SET_OUTPUT,
  payload: {
    id,
    output,
  },
});

export const INSTRUMENT_VOLUME_CHANGE = 'INSTRUMENT_VOLUME_CHANGE';
export type INSTRUMENT_VOLUME_CHANGE = typeof INSTRUMENT_VOLUME_CHANGE;
export interface IChangeVolumeInstrumentAction extends Action<INSTRUMENT_VOLUME_CHANGE> {
  type: INSTRUMENT_VOLUME_CHANGE;
  payload: {
    id: ID,
    volume: number
  };
}
export const changeVolumeInstrumentAction: ActionCreator<IChangeVolumeInstrumentAction> = (id: ID, volume: number) => ({
  type: INSTRUMENT_VOLUME_CHANGE,
  payload: {
    id,
    volume,
  },
});

export type InstrumentAction =
  IAddInstrumentAction |
  IChangeVolumeInstrumentAction |
  IStartPlayInstrumentAction |
  ISetOutputInstrumentAction;
