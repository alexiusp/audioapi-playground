import { Instrument, InstrumentEnum, IInstrument, Module, ModuleEnum, IEnvelope, IOscillator, IMidiKeyboard, ILFO } from '../../models/base';

export function normalizeInstrument(instrument: Instrument) {
  switch (instrument.name) {
    case InstrumentEnum.EnvelopedOscillator: {
      const { id, name, envelope, oscillator } = instrument;
      return {
        id,
        name,
        modules: [envelope.id, oscillator.id],
      } as IInstrument;
    }
    case InstrumentEnum.PolyphonicSynth: {
      const { id, name, envelope, keyboard, lfo, oscillator } = instrument;
      return {
        id,
        name,
        modules: [envelope.id, keyboard.id, lfo.id, oscillator.id],
      } as IInstrument;
    }
    case InstrumentEnum.EnvelopedOscillatorLfo: {
      const { id, name, envelope, lfo, oscillator } = instrument;
      return {
        id,
        name,
        modules: [envelope.id, lfo.id, oscillator.id],
      } as IInstrument;
    }
  }
}

export function normalizeModule(module: Module) {
  const connected = module.connected;
  switch (module.name) {
    case ModuleEnum.Envelope: {
      const { id, name, attack, decay, sustain, release } = module;
      return {
        id,
        name,
        attack,
        decay,
        sustain,
        release,
        connected,
      } as IEnvelope;
    }
    case ModuleEnum.Oscillator: {
      const { id, name, frequency, gain, type } = module;
      return {
        id,
        name,
        frequency,
        gain,
        type,
        connected,
      } as IOscillator;
    }
    case ModuleEnum.MidiKeyboard: {
      const { id, name, start, end, keys } = module;
      return {
        id,
        name,
        start,
        end,
        keys,
        connected,
      } as IMidiKeyboard;
    }
    case ModuleEnum.LFO: {
      const { id, name, frequency, type } = module;
      return {
        id,
        name,
        frequency,
        type,
        connected,
      } as ILFO;
    }
  }
}