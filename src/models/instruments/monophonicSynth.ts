import EnvelopedOscillator from './envelopedOscillator';
import { InstrumentEnum } from '../base';

export default class MonophonicSynth extends EnvelopedOscillator {
  instrument = InstrumentEnum.MonophonicSynth;
}
