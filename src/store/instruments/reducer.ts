import IInstrumentsState from './state';
import { InstrumentEnum, IOutput } from '../../models/base';
import { InstrumentAction, INSTRUMENT_ADD } from './actions';

export const initialInstrumentsState: IInstrumentsState = {};

export function instruments(state: IInstrumentsState = initialInstrumentsState, action: InstrumentAction) {
  switch (action.type) {
    case INSTRUMENT_ADD: {
      const instrument = action.payload;
      return {
        ...state,
        [instrument.id]: instrument,
      }
    }
  }
  return state;
}
