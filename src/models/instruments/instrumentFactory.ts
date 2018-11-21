import { ILegacyInstrument, LegacyInstrumentEnum, ISimpleOscillator, ILegacyEnvelopedOscillator, IMonophonicSynth } from '../base';
import Rack from '../instrumentsRack';
import SimpleOscillator from './simpleOscillator';
import {LegacyEnvelopedOscillator} from './envelopedOscillator';
import MonophonicSynth from './monophonicSynth';

export function buildSimpleOscillator(data: ISimpleOscillator) {
  const instrument = new SimpleOscillator(Rack.context, data.id, data.volume, data.oscillatorType);
  if (data.output) {
    instrument.connect(data.output);
  }
  return instrument;
}

export function buildEnvelopedOscillator(data: ILegacyEnvelopedOscillator) {
  const instrument = new LegacyEnvelopedOscillator(Rack.context, data.id, data.volume, data.oscillatorType, data.frequency, data.envelope);
  if (data.output) {
    instrument.connect(data.output);
  }
  return instrument;
}

export function buildMonophonicSynth(data: IMonophonicSynth) {
  const instrument = new MonophonicSynth(Rack.context, data.id, data.volume, data.oscillatorType, data.frequency, data.envelope);
  if (data.output) {
    instrument.connect(data.output);
  }
  return instrument;
}

export function buildInstrument(data: ILegacyInstrument) {
  switch (data.instrument) {
    case LegacyInstrumentEnum.SimpleOscillator:
      return buildSimpleOscillator(data as ISimpleOscillator);
    case LegacyInstrumentEnum.EnvelopedOscillator:
      return buildEnvelopedOscillator(data as ILegacyEnvelopedOscillator);
    case LegacyInstrumentEnum.MonophonicSynth:
      return buildMonophonicSynth(data as IMonophonicSynth);
    case LegacyInstrumentEnum.MasterMixer:
      return Rack.master;
  }
}

const InstrumentFactory = {
  buildSimpleOscillator,
  buildEnvelopedOscillator,
  buildInstrument,
}
export default InstrumentFactory;
