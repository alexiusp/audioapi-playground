import { IModule } from '../models/base';

// generic factory function
export function createModule<T extends IModule>(c: new () => T): T {
  return new c();
}
