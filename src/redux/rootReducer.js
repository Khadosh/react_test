import { combineReducers } from 'redux';
import PlayersTable from '../components/playerFinder/playersTable/redux/PlayersTable.reducer';

const rootReducer = combineReducers({
  PlayersTable
});

export default rootReducer;