import IInstrumentsState from './state';
import { InstrumentEnum, IOutput, IGain, IConnectable, IInput } from '../../models/base';
import { InstrumentAction, INSTRUMENT_ADD, INSTRUMENT_SET_OUTPUT, INSTRUMENT_VOLUME_CHANGE } from './actions';

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
      if ((instrument as IConnectable).type && (instrument as IConnectable).type === "Input") {
        outputs.push(instrument as IInput);
      }
      return {
        ...state,
        instruments,
        outputs,
      }
    }
    case INSTRUMENT_SET_OUTPUT: {
      const { id, output } = action.payload;
      let instruments = state.instruments;
      const instrument = instruments[id] as IOutput;
      if (output) {
        instrument.output = output;
      } else {
        delete instrument.output;
      }
      instruments = {
        ...instruments,
        [id]: {
          ...instrument,
        },
      }
      return {
        ...state,
        instruments,
      }
    }
    case INSTRUMENT_VOLUME_CHANGE: {
      const { id, volume } = action.payload;
      const instrument = state.instruments[id] as IGain;
      instrument.volume = volume;
      const instruments = {
        ...state.instruments,
        [id]: {
          ...instrument,
        }
      }
      return {
        ...state,
        instruments,
      }
    }
  }
  return state;
}
