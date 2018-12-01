import { getUID } from '../../utils/utils';
import { ID } from '../types';
import { IBase } from '../base';

// base audio device wrapper class
export class BaseAudioDevice implements IBase {
  public id: ID;
  private _context: AudioContext;
  constructor(ctx: AudioContext, prefix?: string) {
    this.id = getUID(prefix);
    this._context = ctx;
  }
  get context() {
    return this._context;
  }
}