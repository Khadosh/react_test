import { FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAILURE } from './constants';
import { get } from 'axios';

export const fetchData = () => async dispatch => {
  dispatch({ type: FETCH_PLAYERS });
  try {
    const result = await get('https://football-players-b31f2.firebaseio.com/players.json');
    return dispatch({ type: FETCH_PLAYERS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: FETCH_PLAYERS_FAILURE });
    throw (error);
  }
}