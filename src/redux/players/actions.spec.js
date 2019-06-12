import { FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAILURE } from './constants';
import axios from 'axios';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { mockMessageBuilder } from 'helpers/testHelper';
import { fetchEntitiesByPayee } from './EntityActions';

const mockStore = configureStore([thunk]);
const store = mockStore();
const requestMock = {
  get: sinon.stub()
};
let sinonSandbox = sinon.createSandbox();
let helperGet = sinonSandbox.stub(axios, 'get');

describe('Redux entity actions', () => {
  afterEach(() => {
    store.clearActions();
    requestMock.get.reset();
    sinonSandbox.reset();
  });

  test('sucessfully fetch entities by Payee', () => {
    const message = {
      data: {
        data: [{ M: 1 }, { I: 2 }, { D: 3 }]
      }
    };
    const expectedActions = [
      {
        type: FETCH_PLAYERS
      },
      {
        type: FETCH_PLAYERS_SUCCESS,
        entities: [{ M: 1 }, { I: 2 }, { D: 3 }]
      }
    ];
    const searchText = 123;
    mockMessageBuilder(message, true, helperGet, requestMock.get);

    store.dispatch(fetchEntitiesByPayee(searchText));

    return Promise.resolve(requestMock).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions[0]);
      expect(helperGet.calledOnce).toBe(true);
      expect(helperGet.args[0][0]).toBe('/entities/search?id=123');
    });
  });
});
