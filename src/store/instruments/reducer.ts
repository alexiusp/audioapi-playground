import { size } from 'lodash';
import IInstrumentsState from './state';
import { IOutput, IGain, IConnectable, IInput, ILegacyInstrument, ILegacyOscillator, ILegacyEnvelopedOscillator, IMidiKeyboard, InstrumentEnum, Instrument } from '../../models/base';
import { InstrumentAction, INSTRUMENT_ADD, INSTRUMENT_SET_OUTPUT, INSTRUMENT_VOLUME_CHANGE, INSTRUMENT_SET_OSCILLATOR_TYPE, INSTRUMENT_SET_OSCILLATOR_FREQUENCY, INSTRUMENT_CREATE } from './actions';
import { INSTRUMENT_ENVELOPE_ATTACK_SET, INSTRUMENT_ENVELOPE_DECAY_SET, INSTRUMENT_ENVELOPE_SUSTAIN_SET, INSTRUMENT_ENVELOPE_RELEASE_SET } from './actions/envelope';
import { KEYBOARD_KEY_DOWN, KEYBOARD_KEY_UP } from './actions/keyboard';
import { MIDINoteMap } from '../../utils/midi';
import Rack from '../../models/instrumentsRack';

export const initialInstrumentsState: IInstrumentsState = {
  instruments: {},
  outputs: [],
};

export function applyInstrumentToState(instrument: ILegacyInstrument | Instrument, state: IInstrumentsState) {
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
      return applyInstrumentToState(instrument as ILegacyInstrument, state);
    }
    case INSTRUMENT_VOLUME_CHANGE: {
      const { id, volume } = action.payload;
      const instrument = state.instruments[id] as IGain;
      instrument.volume = volume;
      return applyInstrumentToState(instrument as ILegacyInstrument, state);
    }
    case INSTRUMENT_SET_OSCILLATOR_TYPE: {
      const { id, type } = action.payload;
      const instrument = state.instruments[id] as ILegacyOscillator;
      instrument.oscillatorType = type;
      return applyInstrumentToState(instrument as ILegacyInstrument, state);
    }
    case INSTRUMENT_SET_OSCILLATOR_FREQUENCY: {
      const { id, freq } = action.payload;
      const instrument = state.instruments[id] as ILegacyOscillator;
      instrument.frequency = freq;
      return applyInstrumentToState(instrument as ILegacyInstrument, state);
    }
    case INSTRUMENT_ENVELOPE_ATTACK_SET: {
      const { id, attack } = action.payload;
      const instrument = state.instruments[id] as ILegacyEnvelopedOscillator;
      instrument.envelope.attack = attack;
      return applyInstrumentToState(instrument, state);
    }
    case INSTRUMENT_ENVELOPE_DECAY_SET: {
      const { id, decay } = action.payload;
      const instrument = state.instruments[id] as ILegacyEnvelopedOscillator;
      instrument.envelope.decay = decay;
      return applyInstrumentToState(instrument, state);
    }
    case INSTRUMENT_ENVELOPE_SUSTAIN_SET: {
      const { id, sustain } = action.payload;
      const instrument = state.instruments[id] as ILegacyEnvelopedOscillator;
      instrument.envelope.sustain = sustain;
      return applyInstrumentToState(instrument, state);
    }
    case INSTRUMENT_ENVELOPE_RELEASE_SET: {
      const { id, release } = action.payload;
      const instrument = state.instruments[id] as ILegacyEnvelopedOscillator;
      instrument.envelope.release = release;
      return applyInstrumentToState(instrument, state);
    }
    case KEYBOARD_KEY_DOWN: {
      const { id, key, velocity } = action.payload;
      const instrument = state.instruments[id] as IMidiKeyboard;
      const { end, keys, start, sounds } = instrument.keyboard;
      const pressedKeys = size(keys);
      console.log('KEYBOARD_KEY_DOWN', pressedKeys, sounds);
      if (pressedKeys < sounds) {
        const note = MIDINoteMap[key];
        keys[note.midiNumber] = velocity;
        instrument.keyboard = {
          end,
          keys,
          start,
          sounds,
        }
      }
      return applyInstrumentToState(instrument as ILegacyInstrument, state);
    }
    case KEYBOARD_KEY_UP: {
      const { id, key } = action.payload;
      const instrument = state.instruments[id] as IMidiKeyboard;
      const note = MIDINoteMap[key];
      const { end, keys, start, sounds } = instrument.keyboard;
      delete keys[note.midiNumber];
      instrument.keyboard = {
        end,
        keys,
        start,
        sounds,
      }
      return applyInstrumentToState(instrument as ILegacyInstrument, state);
    }
    // new actions
    case INSTRUMENT_CREATE: {
      const instrumentClass = action.payload;
      const instrument = Rack.createInstrument(instrumentClass);
      return applyInstrumentToState(instrument.normalize(), state);
    }
  }
  return state;
}
