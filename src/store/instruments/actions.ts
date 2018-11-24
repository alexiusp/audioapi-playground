import { Action, ActionCreator } from 'redux';
import { ID, ILegacyInstrument, InstrumentEnum } from '../../models/base';
import { OscillatorType } from '../../models/types';
import { EnvelopeAction } from './actions/envelope';
import { MidiKeyboardAction } from './actions/keyboard';
import { OscillatorAction } from './actions/oscillator';

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

export type InstrumentAction =
  ICreateInstrumentAction |
  OscillatorAction |
  EnvelopeAction |
// legacy actions:
  IAddInstrumentAction |
  ISetOutputInstrumentAction |
  MidiKeyboardAction;

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
