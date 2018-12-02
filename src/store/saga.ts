import { all, fork } from 'redux-saga/effects'
import masterSaga from './master/saga';

export default function* rootSaga() {
  yield all([
    yield fork(masterSaga),
  ]);
}
