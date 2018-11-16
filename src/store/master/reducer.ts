import IMasterState from './state';
import { MasterAction, MASTER_PLAY_START, MASTER_PLAY_STOP, MASTER_VOLUME_CHANGE } from './actions';

export const initialMasterState: IMasterState = {
  volume: 100,
  playing: false,
}

export function master(state: IMasterState = initialMasterState, action: MasterAction) {
  switch (action.type) {
    case MASTER_PLAY_START:
      return {
        ...state,
        playing: true,
      }
    case MASTER_PLAY_STOP:
      return {
        ...state,
        playing: false,
      }
    case MASTER_VOLUME_CHANGE: {
      const volume = action.payload;
      return {
        ...state,
        volume,
      }
    }
  }
  return state;
}
