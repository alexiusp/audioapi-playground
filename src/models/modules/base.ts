import { Time } from '../base';

export interface IModule {
  start: (time?: Time) => void;
  stop: (time?: Time) => void;
}
