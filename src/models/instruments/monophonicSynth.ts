import { LegacyEnvelopedOscillator } from './envelopedOscillator';
import { InstrumentEnum } from '../base';

export default class MonophonicSynth extends LegacyEnvelopedOscillator {
  instrument = InstrumentEnum.MonophonicSynth;
}
