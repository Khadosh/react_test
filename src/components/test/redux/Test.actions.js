import { get } from 'axios';

export const fetchData = () => async dispatch => {
  const result = await get('https://football-players-b31f2.firebaseio.com/players.json');
  return dispatch({ type: 'FETCH_DATA_SUCCESS', payload: result.data });
}