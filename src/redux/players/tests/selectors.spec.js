import makeGetSortedPlayersByFilters, {
  getAllPlayers,
  getSortBy,
  getPlayersByName,
  getPlayersByPosition,
  getPlayersByAge,
  getPlayersByFilters
} from '../selectors';
import { mockData } from './mockData';

const store = {
  Players: {
    players: mockData
  }
};

const baseProps = { sortBy: 'name', sortOrder: 'desc'};
const setProps = args => Object.assign({}, baseProps, args);

describe('Selectors suite', () => {
  it('getAllPlayers', () => {
    expect(getAllPlayers(store, setProps())).toStrictEqual([mockData, baseProps]);
  });
  it('getSortBy', () => {
    expect(getSortBy(store, setProps())).toStrictEqual(baseProps);
  });
  it('getPlayersByName', () => {
    expect(getPlayersByName(store, setProps({ name: 'Romelu' }))).toStrictEqual([mockData[0]]);
  });
  it('getPlayersByPosition', () => {
    expect(getPlayersByPosition(store, setProps({ position: 'Keeper' }))).toStrictEqual([mockData[1], mockData[2]]);
  });
  it('getPlayersByAge', () => {
    expect(getPlayersByAge(store, setProps({ age: 26 }))).toStrictEqual([mockData[0]]);
  });
  it('getPlayersByFilters', () => {
    const addedProps = setProps({
      name: 'Romelu',
      position: 'Centre-Forward',
      age: 26
    });

    expect(getPlayersByFilters(store, addedProps)).toStrictEqual([[mockData[0]], baseProps]);
  });
  it('makeGetSortedPlayersByFilters', () =>{
    const selectorInstance = makeGetSortedPlayersByFilters();
    expect(selectorInstance(store, setProps({
      name: '',
      age: 0,
      position: 'Keeper',
      sortOrder: 'asc'
    }))).toStrictEqual([mockData[2], mockData[1]]);
  });
});