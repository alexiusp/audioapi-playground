import { ADSREnvelope, MidiKeyboardState } from './base';

export function buildEnvelope(attack = 0.05, decay = 0.05, sustain = 0.8, release = 0.3) {
  return {
    attack,
    decay,
    sustain,
    release,
  } as ADSREnvelope;
}

export function buildKeyboard(start = 60, end = 83, sounds = 1) {
  return {
    sounds,
    start,
    end,
    keys: {},
  } as MidiKeyboardState;
}
