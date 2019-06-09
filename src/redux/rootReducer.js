import { combineReducers } from 'redux';
import Players from './players/reducer';

const rootReducer = combineReducers({
  Players
});

export default rootReducer;