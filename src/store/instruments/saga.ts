import { all, takeEvery } from 'redux-saga/effects'
import Rack from '../../models/instrumentsRack';
import { IStartPlayInstrumentAction, INSTRUMENT_PLAY_START, IAddInstrumentAction, INSTRUMENT_ADD } from './actions';
import { IPlayable, IInstrument } from '../../models/base';
import InstrumentFactory from '../../models/instruments/instrumentFactory';

export function* instrumentPlaySaga(action: IStartPlayInstrumentAction) {
  const id = action.payload;
  const instrument = yield Rack.getInstrument(id);
  if (instrument && instrument.play) {
    (instrument as IPlayable).play();
  }
}

export function* instrumentAddSaga(action: IAddInstrumentAction) {
  const instrumentData = action.payload;
  const instrument = InstrumentFactory.buildInstrument(instrumentData);
  yield Rack.addInstrument(instrument);
}

export default function* instrumentsSaga() {
  return yield all([
    yield takeEvery(INSTRUMENT_PLAY_START, instrumentPlaySaga),
    yield takeEvery(INSTRUMENT_ADD, instrumentAddSaga),
  ]);
}
