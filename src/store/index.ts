import { Store, Action, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import IState from './state';
import reducer from './reducer';
import rootSaga from './saga';
import { addInstrumentAction } from './instruments/actions';
import { InstrumentEnum, ISimpleOscillator } from '../models/base';
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
export default store;