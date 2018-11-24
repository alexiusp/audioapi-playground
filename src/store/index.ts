import { Store, Action, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { InstrumentEnum } from '../models/base';
import IState from './state';
import reducer from './reducer';
import rootSaga from './saga';
import { createInstrumentAction } from './instruments/actions/instrument';

const sagaMiddleware = createSagaMiddleware();
const store: Store<IState, Action> = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

// create default instruments creation
store.dispatch(createInstrumentAction(InstrumentEnum.EnvelopedOscillator));
export default store;
