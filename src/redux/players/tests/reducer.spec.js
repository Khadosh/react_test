import { FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAILURE } from '../constants';
import reducer from '../reducer';
import mockData from './mockData';

const initialState = {
  fetchingPlayers: false,
  players: []
};

const callReducer = (type, payload) => reducer([], { type, payload });

describe('reducer suite', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle FETCH_PLAYERS', () => {
    expect(callReducer(FETCH_PLAYERS)).toEqual({
      fetchingPlayers: true
    });
  });

  it('should handle FETCH_PLAYERS_SUCCESS', () => {
    expect(callReducer(FETCH_PLAYERS_SUCCESS, mockData)).toEqual({
      fetchingPlayers: false,
      players: mockData
    });
  });

  it('should handle FETCH_PLAYERS_FAILURE', () => {
    expect(callReducer(FETCH_PLAYERS_FAILURE)).toEqual(initialState);
  })
})