import { KeyboardKey, KeyboardKeyType } from '../models/base';
import { Frequency } from '../models/types';

export const STANDART_TUNING = 440;

export function midiNoteNumberToFrequency(midiNumber: number, tuning = STANDART_TUNING) {
  return tuning * Math.pow(2, (midiNumber - 69) / 12);
}

export function frequencyToMidiNoteNumber(frequency: Frequency, tuning = STANDART_TUNING) {
  return Math.round(69 + 12 * Math.log2(frequency / tuning));
};

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const MIDINoteMap: {[note: string]: KeyboardKey} = {};
export const MIDINoteIndex: KeyboardKey[] = [];

for (let midiNumber = 0; midiNumber < 127; midiNumber++) {
  const index = midiNumber % 12;
  const noteName = noteNames[index];
  const octave = Math.floor(midiNumber / 12) - 1;
  const fullName = `${noteName}${octave}`;
  const type: KeyboardKeyType = [1, 3, 6, 8, 10].indexOf(index) >= 0 ? 'black' : 'white';
  const midiNoteDefinition = {
    midiNumber,
    type,
    fullName,
    shortName: noteName,
    frequency: midiNoteNumberToFrequency(midiNumber),
  }
  MIDINoteMap[fullName] = midiNoteDefinition;
  MIDINoteIndex.push(midiNoteDefinition)
}
