import { IMidiKeyboard, OutputAudioDevice, ModuleEnum } from '../base';
import { MidiKeysState, Velocity, NoteHandler } from '../types';

export class MidiKeyboard extends OutputAudioDevice implements IMidiKeyboard {
  name: ModuleEnum.MidiKeyboard;

  // starting note of keyboard
  private _start : number;
  public get start() : number {
    return this._start;
  }
  public set start(v : number) {
    this._start = v;
    this.buildKeys();
  }

  // end note of keyboard
  private _end : number;
  public get end() : number {
    return this._end;
  }
  public set end(v : number) {
    this._end = v;
    this.buildKeys();
  }

  private _keys: MidiKeysState;
  public get keys(): MidiKeysState {
    return {
      ...this._keys,
    };
  }

  constructor(ctx: AudioContext, start: number = 60, end: number = 83) {
    super(ctx);
    this.name = ModuleEnum.MidiKeyboard;
    this._start = start;
    this._end = end;
    this._keys = {};
    this.buildKeys();
    const emptyCallback = () => {
      console.log('Note callback not registered');
    }
    this.onNoteOn = emptyCallback;
    this.onNoteOff = emptyCallback;
  }

  private buildKeys() {
    this._keys = {};
    for (let key = this.start; key < this.end + 1; key++) {
      this._keys[key] = 0;
    }
  }

  public onNoteOn: NoteHandler;
  public onNoteOff: NoteHandler;
  public registerNoteHandlers(noteOn: NoteHandler, noteOff: NoteHandler) {
    this.onNoteOn = noteOn;
    this.onNoteOff = noteOff;
  }

  public noteOn(note: number, velocity: Velocity = 127) {
    console.log('noteOn', note, velocity);
    if ((note < this.start) || (note > this.end)) {
      throw new Error('Note not in the keyboard range!');
    }
    this._keys[note] = velocity;
    this.onNoteOn(note, velocity);
  }

  public noteOff(note: number) {
    if ((note < this.start) || (note > this.end)) {
      throw new Error('Note not in the keyboard range!');
    }
    this._keys[note] = 0;
    this.onNoteOff(note);
  }

}
