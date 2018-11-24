import { all, takeEvery } from 'redux-saga/effects'
import Rack from '../../models/instrumentsRack';
import { IAddInstrumentAction, INSTRUMENT_ADD, INSTRUMENT_SET_OUTPUT, ISetOutputInstrumentAction, } from './actions';
import InstrumentFactory from '../../models/instruments/instrumentFactory';
import { IKeyboardKeyDownAction, IKeyboardKeyUpAction, KEYBOARD_KEY_DOWN, KEYBOARD_KEY_UP } from './actions/keyboard';
import { MIDINoteMap } from '../../utils/midi';


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

export function* keyboardDownSaga(action: IKeyboardKeyDownAction) {
  const { id, key } = action.payload;
  const frequency = MIDINoteMap[key].frequency;
  const instrument = yield Rack.getInstrument(id);
  if (instrument && instrument.play) {
    instrument.play(frequency);
  }
}

export function* keyboardUpSaga(action: IKeyboardKeyUpAction) {
  const { id } = action.payload;
  const instrument = yield Rack.getInstrument(id);
  if (instrument && instrument.stop) {
    instrument.stop();
  }
}

export default function* instrumentsSaga() {
  return yield all([
    yield takeEvery(INSTRUMENT_ADD, instrumentAddSaga),
    yield takeEvery(INSTRUMENT_SET_OUTPUT, instrumentSetOutputSaga),
    yield takeEvery(KEYBOARD_KEY_DOWN, keyboardDownSaga),
    yield takeEvery(KEYBOARD_KEY_UP, keyboardUpSaga),
  ]);
}
