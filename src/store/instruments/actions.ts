import { Action, ActionCreator } from 'redux';
import { ID, ILegacyInstrument } from '../../models/base';
import { OscillatorType } from '../../models/types';
import { EnvelopeAction } from './actions/envelope';
import { MidiKeyboardAction } from './actions/keyboard';

export const INSTRUMENT_ADD = 'INSTRUMENT_ADD';
export type INSTRUMENT_ADD = typeof INSTRUMENT_ADD;
export interface IAddInstrumentAction extends Action<INSTRUMENT_ADD> {
  type: INSTRUMENT_ADD;
  payload: ILegacyInstrument;
}
export const addInstrumentAction: ActionCreator<IAddInstrumentAction> = (instrument: ILegacyInstrument) => ({
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

export const INSTRUMENT_SET_OSCILLATOR_TYPE = 'INSTRUMENT_SET_OSCILLATOR_TYPE';
export type INSTRUMENT_SET_OSCILLATOR_TYPE = typeof INSTRUMENT_SET_OSCILLATOR_TYPE;
export interface ISetOscillatorTypeInstrumentAction extends Action<INSTRUMENT_SET_OSCILLATOR_TYPE> {
  type: INSTRUMENT_SET_OSCILLATOR_TYPE;
  payload: {
    id: ID;
    type: OscillatorType;
  };
}
export const setOscillatorTypeInstrumentAction: ActionCreator<ISetOscillatorTypeInstrumentAction> = (id: ID, type: OscillatorType) => ({
  type: INSTRUMENT_SET_OSCILLATOR_TYPE,
  payload: {
    id,
    type,
  },
});

export const INSTRUMENT_SET_OSCILLATOR_FREQUENCY = 'INSTRUMENT_SET_OSCILLATOR_FREQUENCY';
export type INSTRUMENT_SET_OSCILLATOR_FREQUENCY = typeof INSTRUMENT_SET_OSCILLATOR_FREQUENCY;
export interface ISetOscillatorFrequencyInstrumentAction extends Action<INSTRUMENT_SET_OSCILLATOR_FREQUENCY> {
  type: INSTRUMENT_SET_OSCILLATOR_FREQUENCY;
  payload: {
    id: ID;
    freq: number;
  };
}
export const setOscillatorFrequencyInstrumentAction: ActionCreator<ISetOscillatorFrequencyInstrumentAction> = (id: ID, freq: number) => ({
  type: INSTRUMENT_SET_OSCILLATOR_FREQUENCY,
  payload: {
    id,
    freq,
  },
});

export type InstrumentAction =
  IAddInstrumentAction |
  IChangeVolumeInstrumentAction |
  IStartPlayInstrumentAction |
  IStopPlayInstrumentAction |
  ISetOutputInstrumentAction |
  ISetOscillatorTypeInstrumentAction |
  ISetOscillatorFrequencyInstrumentAction |
  MidiKeyboardAction |
  EnvelopeAction;
