import { Action, ActionCreator } from 'redux';

import { ID } from '../../models/types';
import { EnvelopeAction } from './actions/envelope';
import { MidiKeyboardAction } from './actions/keyboard';
import { OscillatorAction } from './actions/oscillator';
import { InstrumentAction } from './actions/instrument';

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
  ISetOutputInstrumentAction |
  MidiKeyboardAction;
