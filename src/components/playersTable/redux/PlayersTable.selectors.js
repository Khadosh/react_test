import intersection from 'array-intersection';
import { calculateAge} from '../../../helpers/dateHelper';
import { createSelector } from 'reselect';

export const getAllPlayers = (store, filters) => [store.PlayersTable.players, filters];

export const getSortBy = (store, filters) => filters.sortBy;

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
  ([players, sortBy]) => players.sort((a, b) => {
    if(a[sortBy] < b[sortBy]) return -1;
    if(a[sortBy] > b[sortBy]) return 1;
    return 0;
  }));

export default makeGetSortedPlayersByFilters;