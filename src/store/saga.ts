import { all, fork } from 'redux-saga/effects'
import masterSaga from './master/saga';
import instrumentsSaga from './instruments/saga';

export default function* rootSaga() {
  yield all([
    yield fork(masterSaga),
    yield fork(instrumentsSaga),
  ]);
}
