import intersection from 'array-intersection';
import { calculateAge} from '../../../helpers/dateHelper';
import { createSelector } from 'reselect';

export const getAllPlayers = (store, filters) => [store.PlayersTable.players, filters];

export const getSortBy = (store, filters) => ({
  sortBy: filters.sortBy,
  sortOrder: filters.sortOrder
});

export const getPlayersByName = createSelector(
  [getAllPlayers],
  ([allPlayers, filters]) => allPlayers.filter(player => player.name.toLowerCase().includes(filters.name.toLowerCase())));

export const getPlayersByPosition = createSelector(
  [getAllPlayers],
  ([allPlayers, filters]) => allPlayers.filter(player => player.position.includes(filters.position)));

export const getPlayersByAge = createSelector(
  [getAllPlayers],
  ([allPlayers, filters]) => allPlayers.filter(
    player => filters.age > 0
      ? calculateAge(player.dateOfBirth) === parseInt(filters.age)
      : calculateAge(player.dateOfBirth) > 0
  ));

export const getPlayersByFilters = createSelector(
  [getSortBy, getPlayersByAge, getPlayersByName, getPlayersByPosition],
  (sortBy, playersByAge, playersByName, playersByPostion) =>
    [intersection(playersByAge, playersByName, playersByPostion), sortBy]
);

const makeGetSortedPlayersByFilters = () => createSelector(
  [getPlayersByFilters],
  ([players, sort]) => players.sort((a, b) => {
    const isDesc = sort.sortOrder === 'desc';
    let sortOrder = 0;
    if(a[sort.sortBy] < b[sort.sortBy]) sortOrder = isDesc ? -1 : 1;
    if(a[sort.sortBy] > b[sort.sortBy]) sortOrder = isDesc ? 1 : -1;

    return sort.sortBy === 'dateOfBirth' ? sortOrder * -1 : sortOrder;
  }));

export default makeGetSortedPlayersByFilters;