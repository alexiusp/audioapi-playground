import { ILegacyInstrument, InstrumentEnum, ISimpleOscillator, IEnvelopedOscillator, IMonophonicSynth } from '../base';
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

export function buildEnvelopedOscillator(data: IEnvelopedOscillator) {
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
    case InstrumentEnum.SimpleOscillator:
      return buildSimpleOscillator(data as ISimpleOscillator);
    case InstrumentEnum.EnvelopedOscillator:
      return buildEnvelopedOscillator(data as IEnvelopedOscillator);
    case InstrumentEnum.MonophonicSynth:
      return buildMonophonicSynth(data as IMonophonicSynth);
    case InstrumentEnum.MasterMixer:
      return Rack.master;
  }
}

const InstrumentFactory = {
  buildSimpleOscillator,
  buildEnvelopedOscillator,
  buildInstrument,
}
export default InstrumentFactory;
