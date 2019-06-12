import { FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS } from '../constants';
import { fetchData } from '../actions';
import axios from 'axios';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import mockData from './mockData';

const mockStore = configureStore([thunk]);
const store = mockStore();
const requestMock = {
  get: sinon.stub()
};
let sinonSandbox = sinon.createSandbox();
let helperGet = sinonSandbox.stub(axios, 'get');

describe('actions suite', () => {
  afterEach(() => {
    store.clearActions();
    requestMock.get.reset();
    sinonSandbox.reset();
  });

  test('sucessfully fetchData for players', () => {
    const message = {
      data: {
        mockData
      }
    };
    const expectedActions = [
      {
        type: FETCH_PLAYERS
      },
      {
        type: FETCH_PLAYERS_SUCCESS,
        payload: mockData
      }
    ];

    helperGet.returns(new Promise(resolve => resolve(message)));
    requestMock.get.returns(helperGet);

    store.dispatch(fetchData());

    return Promise.resolve(requestMock).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(helperGet.calledOnce).toBe(true);
      expect(helperGet.args[0][0]).toBe('https://football-players-b31f2.firebaseio.com/players.json');
    });
  });
});
