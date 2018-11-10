import IInstrumentsState from './state';
import { InstrumentEnum, IOutput } from '../../models/base';
import { InstrumentAction, INSTRUMENT_ADD } from './actions';

export const initialInstrumentsState: IInstrumentsState = {
  instruments: {},
  outputs: [],
};

export function instruments(state: IInstrumentsState = initialInstrumentsState, action: InstrumentAction) {
  switch (action.type) {
    case INSTRUMENT_ADD: {
      const instrument = action.payload;
      const instruments = state.instruments;
      instruments[instrument.id] = instrument;
      const outputs = state.outputs;
      if (instrument.type && instrument.type === "Input") {
        outputs.push(instrument);
      }
      return {
        ...state,
        instruments,
        outputs,
      }
    }
  }
  return state;
}
