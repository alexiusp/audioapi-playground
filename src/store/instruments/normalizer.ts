import { Instrument, InstrumentEnum, IInstrument, Module, ModuleEnum, IEnvelope, IOscillator } from '../../models/base';

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
  }
}

export function normalizeModule(module: Module) {
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
      } as IOscillator;
    }
  }
}