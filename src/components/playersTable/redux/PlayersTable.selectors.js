import intersection from 'array-intersection';
import { calculateAge} from '../../../helpers/dateHelper';
import { createSelector } from 'reselect';

export const getAllPlayers = (store) => store.PlayersTable.players;

export const getPlayersByName = (store, props) =>
  getAllPlayers(store)
    .filter(player => player.name.toLowerCase().includes(props.name.toLowerCase()));

export const getPlayersByPosition = (store, props) =>
  getAllPlayers(store, props)
    .filter(player => player.position.includes(props.position));

export const getPlayersByAge = (store, props) =>
  getAllPlayers(store, props)
    .filter(player => props.age > 0
      ? calculateAge(player.dateOfBirth) === parseInt(props.age)
      : calculateAge(player.dateOfBirth) > 0
    );

export const makeGetPlayersByFilters = () => {
  return createSelector(
    [getPlayersByAge, getPlayersByName, getPlayersByPosition],
    (playersByAge, playersByName, playersByPostion) => intersection(playersByAge, playersByName, playersByPostion)
  )
}