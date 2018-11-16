import { all, takeEvery } from 'redux-saga/effects'
import Rack from '../../models/instrumentsRack';
import { IStartPlayInstrumentAction, INSTRUMENT_PLAY_START, IAddInstrumentAction, INSTRUMENT_ADD, INSTRUMENT_SET_OUTPUT, ISetOutputInstrumentAction, IChangeVolumeInstrumentAction, INSTRUMENT_VOLUME_CHANGE, INSTRUMENT_SET_OSCILLATOR_TYPE, ISetOscillatorTypeInstrumentAction, ISetOscillatorFrequencyInstrumentAction, INSTRUMENT_SET_OSCILLATOR_FREQUENCY, INSTRUMENT_PLAY_STOP, IStopPlayInstrumentAction } from './actions';
import InstrumentFactory from '../../models/instruments/instrumentFactory';
import { EnvelopeAction, INSTRUMENT_ENVELOPE_ATTACK_SET, INSTRUMENT_ENVELOPE_DECAY_SET, INSTRUMENT_ENVELOPE_SUSTAIN_SET, INSTRUMENT_ENVELOPE_RELEASE_SET } from './actions/envelope';

export function* instrumentPlaySaga(action: IStartPlayInstrumentAction) {
  const id = action.payload;
  const instrument = yield Rack.getInstrument(id);
  if (instrument && instrument.play) {
    instrument.play();
  }
}

export function* instrumentStopSaga(action: IStopPlayInstrumentAction) {
  const id = action.payload;
  const instrument = yield Rack.getInstrument(id);
  if (instrument && instrument.stop) {
    instrument.stop();
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
  instrument.volume = volume / 100;
}

export function* instrumentSetOscillatorTypeSaga(action: ISetOscillatorTypeInstrumentAction) {
  const { id, type } = action.payload;
  const instrument = yield Rack.getInstrument(id);
  instrument.oscillatorType = type;
}

export function* instrumentSetOscillatorFrequencySaga(action: ISetOscillatorFrequencyInstrumentAction) {
  const { id, freq } = action.payload;
  const instrument = yield Rack.getInstrument(id);
  instrument.frequency = freq;
}

export function* instrumentSetEnvelopeSaga(action: EnvelopeAction) {
  const id = action.payload.id;
  const instrument = yield Rack.getInstrument(id);
  switch (action.type) {
    case INSTRUMENT_ENVELOPE_ATTACK_SET:
      const attack = action.payload.attack;
      instrument.setAttack(attack);
      break;
    case INSTRUMENT_ENVELOPE_DECAY_SET:
      const decay = action.payload.decay;
      instrument.setDecay(decay);
      break;
    case INSTRUMENT_ENVELOPE_SUSTAIN_SET:
      const sustain = action.payload.sustain;
      instrument.setSustain(sustain);
      break;
    case INSTRUMENT_ENVELOPE_RELEASE_SET:
      const release = action.payload.release;
      instrument.setRelease(release);
      break;
  }
}

export default function* instrumentsSaga() {
  return yield all([
    yield takeEvery(INSTRUMENT_PLAY_START, instrumentPlaySaga),
    yield takeEvery(INSTRUMENT_PLAY_STOP, instrumentStopSaga),
    yield takeEvery(INSTRUMENT_ADD, instrumentAddSaga),
    yield takeEvery(INSTRUMENT_SET_OUTPUT, instrumentSetOutputSaga),
    yield takeEvery(INSTRUMENT_VOLUME_CHANGE, instrumentSetVolumeSaga),
    yield takeEvery(INSTRUMENT_SET_OSCILLATOR_TYPE, instrumentSetOscillatorTypeSaga),
    yield takeEvery(INSTRUMENT_SET_OSCILLATOR_FREQUENCY, instrumentSetOscillatorFrequencySaga),
    yield takeEvery([
      INSTRUMENT_ENVELOPE_ATTACK_SET,
      INSTRUMENT_ENVELOPE_DECAY_SET,
      INSTRUMENT_ENVELOPE_SUSTAIN_SET,
      INSTRUMENT_ENVELOPE_RELEASE_SET,
    ], instrumentSetEnvelopeSaga),
  ]);
}
