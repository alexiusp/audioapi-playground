import { EnvelopeAction } from './actions/envelope';
import { MidiKeyboardAction } from './actions/keyboard';
import { OscillatorAction } from './actions/oscillator';
import { InstrumentAction } from './actions/instrument';

export type InstrumentsAction =
  InstrumentAction |
  OscillatorAction |
  EnvelopeAction |
  MidiKeyboardAction;
