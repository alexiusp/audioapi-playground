import { IOutput, IInstrument, InstrumentEnum } from '../base';
import SimpleOscillator from './simpleOscillator';
import Rack from '../instrumentsRack';

export function buildSimpleOscillator(data: IOutput) {
  const instrument = new SimpleOscillator(Rack.context, data.id);
  if (data.output) {
    instrument.connect(data.output);
  }
  return instrument;
}

export function buildInstrument(data: IInstrument) {
  switch (data.instrument) {
    case InstrumentEnum.SimpleOscillator:
      return buildSimpleOscillator(data as IOutput);
    case InstrumentEnum.MasterMixer:
      return Rack.master;
  }
}

const InstrumentFactory = {
  buildSimpleOscillator,
  buildInstrument,
}
export default InstrumentFactory;
