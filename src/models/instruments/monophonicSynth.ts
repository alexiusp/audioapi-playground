import EnvelopedOscillator from './envelopedOscillator';
import { LegacyInstrumentEnum } from '../base';

export default class MonophonicSynth extends EnvelopedOscillator {
  instrument = LegacyInstrumentEnum.MonophonicSynth;
}
