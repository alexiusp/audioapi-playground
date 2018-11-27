import { forEach } from 'lodash';
import IInstrumentsState from './state';
import { IInstrument, Module, IEnvelope, IOscillator, IPlayable } from '../../models/base';
import { InstrumentsAction, INSTRUMENT_SET_OUTPUT } from './actions';
import { KEYBOARD_KEY_DOWN, KEYBOARD_KEY_UP } from './actions/keyboard';
import Rack from '../../models/instrumentsRack';
import { normalizeInstrument, normalizeModule } from './normalizer';
import { MODULE_ENVELOPE_ATTACK_SET, MODULE_ENVELOPE_DECAY_SET, MODULE_ENVELOPE_SUSTAIN_SET, MODULE_ENVELOPE_RELEASE_SET } from './actions/envelope';
import { MODULE_OSCILLATOR_TYPE_SET, MODULE_OSCILLATOR_FREQUENCY_SET, MODULE_OSCILLATOR_VOLUME_SET, MODULE_OSCILLATOR_PLAY_START, MODULE_OSCILLATOR_PLAY_STOP } from './actions/oscillator';
import { Oscillator } from '../../models/modules/oscillator';
import { INSTRUMENT_CREATE, INSTRUMENT_PLAY_START, INSTRUMENT_PLAY_STOP } from './actions/instrument';
import { MidiKeyboard } from '../../models/modules/midiKeyboard';

export const initialInstrumentsState: IInstrumentsState = {
  modules: {},
  instruments: {},
};

function applyInstrumentToState(instrument: IInstrument, state: IInstrumentsState) {
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

function applyModuleToState(module: Module, state: IInstrumentsState) {
  const modules = {
    ...state.modules,
    [module.id]: {
      ...module,
    }
  }
  return {
    ...state,
    modules,
  }
}

export function instruments(state: IInstrumentsState = initialInstrumentsState, action: InstrumentsAction) {
  switch (action.type) {
    /*
    case INSTRUMENT_SET_OUTPUT: {
      const { id, output } = action.payload;
      let instruments = state.legacyInstruments;
      const instrument = instruments[id] as IOutput;
      if (output) {
        instrument.output = output;
      } else {
        delete instrument.output;
      }
      return applyInstrumentToState(instrument as ILegacyInstrument, state);
    }
    */
    // new actions
    case INSTRUMENT_CREATE: {
      const instrumentClass = action.payload;
      const instrument = Rack.createInstrument(instrumentClass);
      const normalizedInstrument = normalizeInstrument(instrument);
      let newState = applyInstrumentToState(normalizedInstrument, state);
      forEach(normalizedInstrument.modules, id => {
        const module = Rack.getModule(id);
        if (module) {
          const normalizedModule = normalizeModule(module);
          newState = applyModuleToState(normalizedModule, newState);
        }
      });
      return newState;
    }
    case MODULE_ENVELOPE_ATTACK_SET: {
      const { id, attack } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as IEnvelope).attack = attack;
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case MODULE_ENVELOPE_DECAY_SET: {
      const { id, decay } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as IEnvelope).decay = decay;
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case MODULE_ENVELOPE_SUSTAIN_SET: {
      const { id, sustain } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as IEnvelope).sustain = sustain;
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case MODULE_ENVELOPE_RELEASE_SET: {
      const { id, release } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as IEnvelope).release = release;
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case MODULE_OSCILLATOR_TYPE_SET: {
      const { id, type } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as IOscillator).type = type;
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case MODULE_OSCILLATOR_FREQUENCY_SET: {
      const { id, frequency } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as IOscillator).frequency = frequency;
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case MODULE_OSCILLATOR_VOLUME_SET: {
      const { id, volume } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as IOscillator).gain = volume;
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case MODULE_OSCILLATOR_PLAY_START: {
      const module = Rack.getModule(action.payload);
      if (module) {
        (module as Oscillator).start();
      }
      return state;
    }
    case MODULE_OSCILLATOR_PLAY_STOP: {
      const module = Rack.getModule(action.payload);
      if (module) {
        (module as Oscillator).stop();
      }
      return state;
    }
    case INSTRUMENT_PLAY_START: {
      const instrument = Rack.getInstrument(action.payload);
      if (instrument) {
        (instrument as IPlayable).start();
      }
      return state;
    }
    case INSTRUMENT_PLAY_STOP: {
      const instrument = Rack.getInstrument(action.payload);
      if (instrument) {
        (instrument as IPlayable).stop();
      }
      return state;
    }
    case KEYBOARD_KEY_DOWN: {
      const { id, key, velocity } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as MidiKeyboard).noteOn(key, velocity);
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
    case KEYBOARD_KEY_UP: {
      const { id, key } = action.payload;
      const module = Rack.getModule(id);
      if (module) {
        (module as MidiKeyboard).noteOff(key);
        const normalizedModule = normalizeModule(module);
        return applyModuleToState(normalizedModule, state);
      }
      break;
    }
  }
  return state;
}
