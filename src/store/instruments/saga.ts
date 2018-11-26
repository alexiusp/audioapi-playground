import { all, takeEvery } from 'redux-saga/effects'
import Rack from '../../models/instrumentsRack';
import { INSTRUMENT_SET_OUTPUT, ISetOutputInstrumentAction, } from './actions';

export function* instrumentSetOutputSaga(action: ISetOutputInstrumentAction) {
  const { id, output } = action.payload;
  const instrument = yield Rack.getInstrument(id);
  if (output) {
    yield instrument.connect(output)
  } else {
    yield instrument.disconnect();
  }
}

export default function* instrumentsSaga() {
  return yield all([
    yield takeEvery(INSTRUMENT_SET_OUTPUT, instrumentSetOutputSaga),
  ]);
}
