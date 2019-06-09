import { connect } from 'react-redux';
import { fetchData } from '../../../redux/players/actions';
import makeGetSortedPlayersByFilters from '../../../redux/players/selectors';
import PlayersTable from './PlayersTable';

const makeMapStateToProps = () => {
  const getPlayersByFilters = makeGetSortedPlayersByFilters();
  const mapStateToProps = (state, props) => {
    return {
      players: getPlayersByFilters(state, props)
    }
  }
  return mapStateToProps
};

const mapDispatchToProps = {
  fetchData
};

export default connect(makeMapStateToProps, mapDispatchToProps)(PlayersTable);