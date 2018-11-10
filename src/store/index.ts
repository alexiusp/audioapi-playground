import { Store, Action, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import IState from './state';
import reducer from './reducer';
import rootSaga from './saga';
import { addInstrumentAction } from './instruments/actions';
import { InstrumentEnum, IOutput } from '../models/base';

const sagaMiddleware = createSagaMiddleware();
const store: Store<IState, Action> = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
store.dispatch(addInstrumentAction({
  id: 'asd',
  instrument: InstrumentEnum.SimpleOscillator,
  type: "Output",
} as IOutput))
export default store;