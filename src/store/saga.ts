import { fork } from 'redux-saga/effects'
import masterSaga from './master/saga';

export default function* rootSaga() {
  yield fork(masterSaga);
}
