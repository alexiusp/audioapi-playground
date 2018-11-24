import { Action, ActionCreator } from 'redux';
import { ID, ILegacyInstrument } from '../../models/base';
import { EnvelopeAction } from './actions/envelope';
import { MidiKeyboardAction } from './actions/keyboard';
import { OscillatorAction } from './actions/oscillator';
import { InstrumentAction } from './actions/instrument';

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

export type InstrumentsAction =
  InstrumentAction |
  OscillatorAction |
  EnvelopeAction |
// legacy actions:
  IAddInstrumentAction |
  ISetOutputInstrumentAction |
  MidiKeyboardAction;
