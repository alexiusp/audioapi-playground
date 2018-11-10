import { IInstrument, InstrumentEnum, ISimpleOscillator } from '../base';
import SimpleOscillator from './simpleOscillator';
import Rack from '../instrumentsRack';

export function buildSimpleOscillator(data: ISimpleOscillator) {
  const instrument = new SimpleOscillator(Rack.context, data.id, data.volume);
  if (data.output) {
    instrument.connect(data.output);
  }
  return instrument;
}

export function buildInstrument(data: IInstrument) {
  switch (data.instrument) {
    case InstrumentEnum.SimpleOscillator:
      return buildSimpleOscillator(data as ISimpleOscillator);
    case InstrumentEnum.MasterMixer:
      return Rack.master;
  }
}

const InstrumentFactory = {
  buildSimpleOscillator,
  buildInstrument,
}
export default InstrumentFactory;
