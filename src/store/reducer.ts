import { combineReducers } from 'redux';

import { master } from './master/reducer';
import { instruments } from './instruments/reducer';

export default combineReducers({
  instruments,
  master,
});
