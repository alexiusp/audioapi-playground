import { KeyboardKey, Frequency } from '../models/base';

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
  const noteName = noteNames[midiNumber % 12];
  const octave = Math.floor(midiNumber / 12) - 1;
  const fullName = `${noteName}${octave}`;
  const midiNoteDefinition = {
    midiNumber,
    fullName,
    shortName: noteName,
    frequency: midiNoteNumberToFrequency(midiNumber),
  }
  MIDINoteMap[fullName] = midiNoteDefinition;
  MIDINoteIndex.push(midiNoteDefinition)
}
