import { combineReducers } from 'redux';

import listReducer from './list_reducer';

const rootReducer = combineReducers({
  list: listReducer
});

export default rootReducer;
