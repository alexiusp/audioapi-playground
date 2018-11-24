import { all, select, takeEvery, takeLatest } from 'redux-saga/effects'

import Rack from '../../models/instrumentsRack';
import { MASTER_PLAY_START, MASTER_PLAY_STOP, PlayControlAction, MASTER_VOLUME_CHANGE, IChangeVolumeAction } from './actions';
import { getVolume } from './selectors';

export function* masterPlaySaga(action: PlayControlAction) {
  if (action.type === MASTER_PLAY_START) {
    const volume = yield select(getVolume);
    Rack.master.start(volume);
  } else {
    Rack.master.stop();
  }
}

export function* masterVolumeSaga(action: IChangeVolumeAction) {
  const volume = action.payload;
  yield Rack.master.volume = volume;
}

export default function* masterSaga() {
  return yield all([
    yield takeLatest(MASTER_VOLUME_CHANGE, masterVolumeSaga),
    yield takeEvery([MASTER_PLAY_START, MASTER_PLAY_STOP], masterPlaySaga),
  ]);
}
