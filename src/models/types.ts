export type ID = string;

export type Time = number;// [0..Infinity)

export type Level = number;// [0..1]

export type Frequency = number;

export type Velocity = number;// [0..127]

export type DataCallback<T = any> = (arg: T) => void;

export type Callback = () => void;

export enum OscillatorTypeEnum {
  Sine = 'sine',
  Square = 'square',
  Triangle = 'triangle',
  Sawtooth = 'sawtooth',
  Custom = 'custom',
}

export type KeyboardKeyName = string;

export type KeyboardKeyType = 'white' | 'black';

export interface KeyboardKey {
  midiNumber: number;
  fullName: string;
  shortName: string;
  type: KeyboardKeyType;
  frequency: Frequency;
}

export interface MidiKeysState {
  [midiNumber: number]: Velocity;
}

export type NoteHandler = (note: number, velocity?: Velocity) => void;
