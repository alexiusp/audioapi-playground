import IInstrumentsState from './state';
import { InstrumentEnum, IOutput, IGain, IConnectable, IInput, IInstrument, IOscillator, IEnvelopedOscillator } from '../../models/base';
import { InstrumentAction, INSTRUMENT_ADD, INSTRUMENT_SET_OUTPUT, INSTRUMENT_VOLUME_CHANGE, INSTRUMENT_SET_OSCILLATOR_TYPE, INSTRUMENT_SET_OSCILLATOR_FREQUENCY } from './actions';
import { INSTRUMENT_ENVELOPE_ATTACK_SET, INSTRUMENT_ENVELOPE_DECAY_SET, INSTRUMENT_ENVELOPE_SUSTAIN_SET, INSTRUMENT_ENVELOPE_RELEASE_SET } from './actions/envelope';

export const initialInstrumentsState: IInstrumentsState = {
  instruments: {},
  outputs: [],
};

export function applyInstrumentToState(instrument: IInstrument, state: IInstrumentsState) {
  const instruments = {
    ...state.instruments,
    [instrument.id]: {
      ...instrument,
    }
  }
  return {
    ...state,
    instruments,
  }
}

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
      return applyInstrumentToState(instrument as IInstrument, state);
    }
    case INSTRUMENT_VOLUME_CHANGE: {
      const { id, volume } = action.payload;
      const instrument = state.instruments[id] as IGain;
      instrument.volume = volume;
      return applyInstrumentToState(instrument as IInstrument, state);
    }
    case INSTRUMENT_SET_OSCILLATOR_TYPE: {
      const { id, type } = action.payload;
      const instrument = state.instruments[id] as IOscillator;
      instrument.oscillatorType = type;
      return applyInstrumentToState(instrument as IInstrument, state);
    }
    case INSTRUMENT_SET_OSCILLATOR_FREQUENCY: {
      const { id, freq } = action.payload;
      const instrument = state.instruments[id] as IOscillator;
      instrument.frequency = freq;
      return applyInstrumentToState(instrument as IInstrument, state);
    }
    case INSTRUMENT_ENVELOPE_ATTACK_SET: {
      const { id, attack } = action.payload;
      const instrument = state.instruments[id] as IEnvelopedOscillator;
      instrument.envelope.attack = attack;
      return applyInstrumentToState(instrument, state);
    }
    case INSTRUMENT_ENVELOPE_DECAY_SET: {
      const { id, decay } = action.payload;
      const instrument = state.instruments[id] as IEnvelopedOscillator;
      instrument.envelope.decay = decay;
      return applyInstrumentToState(instrument, state);
    }
    case INSTRUMENT_ENVELOPE_SUSTAIN_SET: {
      const { id, sustain } = action.payload;
      const instrument = state.instruments[id] as IEnvelopedOscillator;
      instrument.envelope.sustain = sustain;
      return applyInstrumentToState(instrument, state);
    }
    case INSTRUMENT_ENVELOPE_RELEASE_SET: {
      const { id, release } = action.payload;
      const instrument = state.instruments[id] as IEnvelopedOscillator;
      instrument.envelope.release = release;
      return applyInstrumentToState(instrument, state);
    }
  }
  return state;
}
