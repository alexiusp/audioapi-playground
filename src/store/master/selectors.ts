import IState from '../state';

export const getMaster = (state: IState) => state.master;

export const isPlaying = (state: IState) => getMaster(state).playing;

export const getVolume = (state: IState) => getMaster(state).volume;
