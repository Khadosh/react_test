import { FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAILURE } from './constants';

const initialState = {
  fetchingPlayers: false,
  players: []
};

const TestReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_PLAYERS:
      return { ...state, fetchingPlayers: true };

    case FETCH_PLAYERS_SUCCESS:
      return { ...state, players: action.payload, fetchingPlayers: false };

    case FETCH_PLAYERS_FAILURE:
      return { ...state, players: [], fetchingPlayers: false };

    default:
      return state;
  }
}

export default TestReducer;