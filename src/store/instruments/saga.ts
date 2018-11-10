import { all, takeEvery } from 'redux-saga/effects'
import Rack from '../../models/instrumentsRack';
import { IStartPlayInstrumentAction, INSTRUMENT_PLAY_START, IAddInstrumentAction, INSTRUMENT_ADD, INSTRUMENT_SET_OUTPUT, ISetOutputInstrumentAction, IChangeVolumeInstrumentAction, INSTRUMENT_VOLUME_CHANGE, INSTRUMENT_SET_OSCILLATOR_TYPE, ISetOscillatorTypeInstrumentAction } from './actions';
import InstrumentFactory from '../../models/instruments/instrumentFactory';

export function* instrumentPlaySaga(action: IStartPlayInstrumentAction) {
  const id = action.payload;
  const instrument = yield Rack.getInstrument(id);
  if (instrument && instrument.play) {
    instrument.play();
  }
}

export function* instrumentAddSaga(action: IAddInstrumentAction) {
  const instrumentData = action.payload;
  const instrument = yield InstrumentFactory.buildInstrument(instrumentData);
  yield Rack.addInstrument(instrument);
}

export function* instrumentSetOutputSaga(action: ISetOutputInstrumentAction) {
  const { id, output } = action.payload;
  const instrument = yield Rack.getInstrument(id);
  if (output) {
    yield instrument.connect(output)
  } else {
    yield instrument.disconnect();
  }
}

export function* instrumentSetVolumeSaga(action: IChangeVolumeInstrumentAction) {
  const { id, volume } = action.payload;
  const instrument = yield Rack.getInstrument(id);
  instrument.volume = volume;
}

export function* instrumentSetOscillatorTypeSaga(action: ISetOscillatorTypeInstrumentAction) {
  const { id, type } = action.payload;
  const instrument = yield Rack.getInstrument(id);
  instrument.oscillatorType = type;
}

export default function* instrumentsSaga() {
  return yield all([
    yield takeEvery(INSTRUMENT_PLAY_START, instrumentPlaySaga),
    yield takeEvery(INSTRUMENT_ADD, instrumentAddSaga),
    yield takeEvery(INSTRUMENT_SET_OUTPUT, instrumentSetOutputSaga),
    yield takeEvery(INSTRUMENT_VOLUME_CHANGE, instrumentSetVolumeSaga),
    yield takeEvery(INSTRUMENT_SET_OSCILLATOR_TYPE, instrumentSetOscillatorTypeSaga),
  ]);
}
