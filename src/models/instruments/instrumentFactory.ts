import { IInstrument, InstrumentEnum, ISimpleOscillator, IEnvelopedOscillator } from '../base';
import Rack from '../instrumentsRack';
import SimpleOscillator from './simpleOscillator';
import EnvelopedOscillator from './envelopedOscillator';

export function buildSimpleOscillator(data: ISimpleOscillator) {
  const instrument = new SimpleOscillator(Rack.context, data.id, data.volume, data.oscillatorType);
  if (data.output) {
    instrument.connect(data.output);
  }
  return instrument;
}

export function buildEnvelopedOscillator(data: IEnvelopedOscillator) {
  const instrument = new EnvelopedOscillator(Rack.context, data.id, data.volume, data.oscillatorType, data.frequency, data.envelope);
  if (data.output) {
    instrument.connect(data.output);
  }
  return instrument;
}

export function buildInstrument(data: IInstrument) {
  switch (data.instrument) {
    case InstrumentEnum.SimpleOscillator:
      return buildSimpleOscillator(data as ISimpleOscillator);
    case InstrumentEnum.EnvelopedOscillator:
      return buildEnvelopedOscillator(data as IEnvelopedOscillator);
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
