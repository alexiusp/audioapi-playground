import { IPlayable } from '../models/base';

// generic factory function
export function createModule<T extends IPlayable>(c: new () => T): T {
  return new c();
}
