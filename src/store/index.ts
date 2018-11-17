import { Store, Action, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import IState from './state';
import reducer from './reducer';
import rootSaga from './saga';
import { addInstrumentAction } from './instruments/actions';
import { InstrumentEnum, ISimpleOscillator, IEnvelopedOscillator } from '../models/base';
import { getUID } from '../utils/utils';

const sagaMiddleware = createSagaMiddleware();
const store: Store<IState, Action> = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
store.dispatch(addInstrumentAction({
  id: getUID('osc'),
  instrument: InstrumentEnum.SimpleOscillator,
  type: "Output",
  output: 'master',
  volume: 1,
  oscillatorType: 'sine',
  frequency: 440,
} as ISimpleOscillator))
store.dispatch(addInstrumentAction({
  id: getUID('envosc'),
  instrument: InstrumentEnum.EnvelopedOscillator,
  type: "Output",
  output: 'master',
  volume: 1,
  oscillatorType: 'sine',
  frequency: 440,
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.8,
    release: 0.1,
  },
} as IEnvelopedOscillator))
export default store;