import { Action, ActionCreator } from 'redux';
import { ID } from '../../../models/base';
import { KeyboardKeyName } from '../../../models/types';

export const KEYBOARD_KEY_DOWN = 'KEYBOARD_KEY_DOWN';
export type KEYBOARD_KEY_DOWN = typeof KEYBOARD_KEY_DOWN;
export interface IKeyboardKeyDownAction extends Action<KEYBOARD_KEY_DOWN> {
  type: KEYBOARD_KEY_DOWN;
  payload: {
    id: ID;
    key: KeyboardKeyName;
    velocity: number;
  };
}
export const keyboardKeyDownAction: ActionCreator<IKeyboardKeyDownAction> = (id: ID, key: KeyboardKeyName, velocity: number = 127) => ({
  type: KEYBOARD_KEY_DOWN,
  payload: {
    id,
    key,
    velocity,
  },
});

export const KEYBOARD_KEY_UP = 'KEYBOARD_KEY_UP';
export type KEYBOARD_KEY_UP = typeof KEYBOARD_KEY_UP;
export interface IKeyboardKeyUpAction extends Action<KEYBOARD_KEY_UP> {
  type: KEYBOARD_KEY_UP;
  payload: {
    id: ID;
    key: KeyboardKeyName;
  };
}
export const keyboardKeyUpAction: ActionCreator<IKeyboardKeyUpAction> = (id: ID, key: KeyboardKeyName) => ({
  type: KEYBOARD_KEY_UP,
  payload: {
    id,
    key,
  },
});


export type MidiKeyboardAction =
  IKeyboardKeyDownAction |
  IKeyboardKeyUpAction;
