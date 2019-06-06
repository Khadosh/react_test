import { calculateAge} from '../../../helpers/dateHelper';

export const getPlayers = (store, props) => {
  return store.PlayersTable.players
    .filter(player => player.name.includes(props.name))
    .filter(player => player.position.includes(props.position))
    .filter(player => props.age > 0
      ? calculateAge(player.dateOfBirth) === props.age
      : calculateAge(player.dateOfBirth) > 0
    );
}