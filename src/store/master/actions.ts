import { Action, ActionCreator } from 'redux';

export const MASTER_PLAY_START = 'MASTER_PLAY_START';
export type MASTER_PLAY_START = typeof MASTER_PLAY_START;
export interface IStartPlayAction extends Action<MASTER_PLAY_START> {
  type: MASTER_PLAY_START;
}
export const startPlayAction: ActionCreator<IStartPlayAction> = () => ({
  type: MASTER_PLAY_START,
});

export const MASTER_PLAY_STOP = 'MASTER_PLAY_STOP';
export type MASTER_PLAY_STOP = typeof MASTER_PLAY_STOP;
export interface IStopPlayAction extends Action<MASTER_PLAY_STOP> {
  type: MASTER_PLAY_STOP;
}
export const stopPlayAction: ActionCreator<IStopPlayAction> = () => ({
  type: MASTER_PLAY_STOP,
});

export const MASTER_VOLUME_CHANGE = 'MASTER_VOLUME_CHANGE';
export type MASTER_VOLUME_CHANGE = typeof MASTER_VOLUME_CHANGE;
export interface IChangeVolumeAction extends Action<MASTER_VOLUME_CHANGE> {
  type: MASTER_VOLUME_CHANGE;
  payload: number;
}
export const changeVolumeAction: ActionCreator<IChangeVolumeAction> = (volume: number) => ({
  type: MASTER_VOLUME_CHANGE,
  payload: volume,
});

export type PlayControlAction = IStartPlayAction | IStopPlayAction;
export type MasterAction = PlayControlAction | IChangeVolumeAction;
