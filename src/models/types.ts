export type DataCallback<T = any> = (arg: T) => void;

export type Callback = () => void;

export enum OscillatorTypeEnum {
  Sine = 'sine',
  Square = 'square',
  Triangle = 'triangle',
  Sawtooth = 'sawtooth',
  Custom = 'custom',
}
export type OscillatorType = 'sine'|'square'|'triangle'|'sawtooth'|'custom';