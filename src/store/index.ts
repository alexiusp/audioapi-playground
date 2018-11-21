import { Store, Action, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { getUID } from '../utils/utils';
import IState from './state';
import reducer from './reducer';
import rootSaga from './saga';
import { addInstrumentAction, createInstrumentAction } from './instruments/actions';
import {
  LegacyInstrumentEnum,
  ISimpleOscillator,
  ILegacyEnvelopedOscillator,
  IMonophonicSynth,
  InstrumentEnum,
} from '../models/base';
import { buildEnvelope, buildKeyboard } from '../models/helpers';

const sagaMiddleware = createSagaMiddleware();
const store: Store<IState, Action> = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

// new instrument creation
store.dispatch(createInstrumentAction(InstrumentEnum.EnvelopedOscillator));
// legacy instrument creation
/*
store.dispatch(addInstrumentAction({
  id: getUID('osc'),
  instrument: LegacyInstrumentEnum.SimpleOscillator,
  type: "Output",
  output: 'master',
  volume: 1,
  oscillatorType: 'sine',
  frequency: 440,
} as ISimpleOscillator))
store.dispatch(addInstrumentAction({
  id: getUID('envosc'),
  instrument: LegacyInstrumentEnum.EnvelopedOscillator,
  type: "Output",
  output: 'master',
  volume: 1,
  oscillatorType: 'sine',
  frequency: 440,
  envelope: buildEnvelope(0.1, 0.1, 0.8, 0.1),
} as ILegacyEnvelopedOscillator));
*/
store.dispatch(addInstrumentAction({
  id: getUID('monosynth'),
  instrument: LegacyInstrumentEnum.MonophonicSynth,
  type: "Output",
  output: 'master',
  volume: 1,
  oscillatorType: 'sine',
  frequency: 220,
  envelope: buildEnvelope(),
  keyboard: buildKeyboard(),
} as IMonophonicSynth));
export default store;