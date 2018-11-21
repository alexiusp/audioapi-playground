import { LegacyEnvelopedOscillator } from './envelopedOscillator';
import { LegacyInstrumentEnum } from '../base';

export default class MonophonicSynth extends LegacyEnvelopedOscillator {
  instrument = LegacyInstrumentEnum.MonophonicSynth;
}
