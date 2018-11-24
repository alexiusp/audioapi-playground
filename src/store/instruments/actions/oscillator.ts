import { Action, ActionCreator } from 'redux';
import { ID, Frequency, Level } from '../../../models/base';

export const MODULE_OSCILLATOR_TYPE_SET = 'MODULE_OSCILLATOR_TYPE_SET';
export type MODULE_OSCILLATOR_TYPE_SET = typeof MODULE_OSCILLATOR_TYPE_SET;
export interface ISetTypeOscillatorModuleAction extends Action<MODULE_OSCILLATOR_TYPE_SET> {
  type: MODULE_OSCILLATOR_TYPE_SET;
  payload: {
    id: ID,
    type: OscillatorType,
  };
}
export const setTypeOscillatorModuleAction: ActionCreator<ISetTypeOscillatorModuleAction> = (id: ID, type: OscillatorType) => ({
  type: MODULE_OSCILLATOR_TYPE_SET,
  payload: {
    id,
    type,
  },
});

export const MODULE_OSCILLATOR_FREQUENCY_SET = 'MODULE_OSCILLATOR_FREQUENCY_SET';
export type MODULE_OSCILLATOR_FREQUENCY_SET = typeof MODULE_OSCILLATOR_FREQUENCY_SET;
export interface ISetFrequencyOscillatorModuleAction extends Action<MODULE_OSCILLATOR_FREQUENCY_SET> {
  type: MODULE_OSCILLATOR_FREQUENCY_SET;
  payload: {
    id: ID;
    frequency: Frequency;
  };
}
export const setFrequencyOscillatorModuleAction: ActionCreator<ISetFrequencyOscillatorModuleAction> = (id: ID, frequency: Frequency) => ({
  type: MODULE_OSCILLATOR_FREQUENCY_SET,
  payload: {
    id,
    frequency,
  },
});


export const MODULE_OSCILLATOR_VOLUME_SET = 'MODULE_OSCILLATOR_VOLUME_SET';
export type MODULE_OSCILLATOR_VOLUME_SET = typeof MODULE_OSCILLATOR_VOLUME_SET;
export interface ISetVolumeOscillatorModuleAction extends Action<MODULE_OSCILLATOR_VOLUME_SET> {
  type: MODULE_OSCILLATOR_VOLUME_SET;
  payload: {
    id: ID,
    volume: Level,
  };
}
export const setVolumeOscillatorModuleAction: ActionCreator<ISetVolumeOscillatorModuleAction> = (id: ID, volume: Level) => ({
  type: MODULE_OSCILLATOR_VOLUME_SET,
  payload: {
    id,
    volume,
  },
});

export const MODULE_OSCILLATOR_PLAY_START = 'MODULE_OSCILLATOR_PLAY_START';
export type MODULE_OSCILLATOR_PLAY_START = typeof MODULE_OSCILLATOR_PLAY_START;
export interface IStartPlayOscillatorModuleAction extends Action<MODULE_OSCILLATOR_PLAY_START> {
  type: MODULE_OSCILLATOR_PLAY_START;
  payload: ID;
}
export const startPlayOscillatorModuleAction: ActionCreator<IStartPlayOscillatorModuleAction> = (id: ID) => ({
  type: MODULE_OSCILLATOR_PLAY_START,
  payload: id,
});

export const MODULE_OSCILLATOR_PLAY_STOP = 'MODULE_OSCILLATOR_PLAY_STOP';
export type INSTRUMENT_PLAY_STOP = typeof MODULE_OSCILLATOR_PLAY_STOP;
export interface IStopPlayOscillatorModuleAction extends Action<INSTRUMENT_PLAY_STOP> {
  type: INSTRUMENT_PLAY_STOP;
  payload: ID;
}
export const stopPlayOscillatorModuleAction: ActionCreator<IStopPlayOscillatorModuleAction> = (id: ID) => ({
  type: MODULE_OSCILLATOR_PLAY_STOP,
  payload: id,
});

export type OscillatorAction =
  IStartPlayOscillatorModuleAction |
  IStopPlayOscillatorModuleAction |
  ISetVolumeOscillatorModuleAction |
  ISetTypeOscillatorModuleAction |
  ISetFrequencyOscillatorModuleAction;
