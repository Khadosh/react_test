/*eslint react-hooks/exhaustive-deps:off*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { headers, StyledTableCell, Arrow } from './PlayersTableHeaders';
import { calculateAge} from '../../../helpers/dateHelper';

import ErrorSnackbar from '../../utils/ErrorSnackbar';

import Styles from './PlayersTable.styles.js';
import './playersTable.scss';

const fetchPlayers = async (fetchData, setFetchingData, setErrorMessage, signal) => {
  setFetchingData(true);
  try {
    await fetch(fetchData(), signal);
    setFetchingData(false);
    setErrorMessage('');
  } catch (err) {
    setFetchingData(false);
    setErrorMessage('Something went wrong retrieving players information');
  }
}

class PlayersTable extends PureComponent {
  abortController = new AbortController();

  state = {
    fetchingData: false,
    errorMessage: ''
  };

  componentDidMount = () => {
    fetchPlayers(
      this.props.fetchData,
      isFetching => this.setState({ fetchingData: isFetching }),
      errorMessage => this.setState({ errorMessage }),
      this.abortController.signal
    );
  };

  componentWillUnmount = () => {
    this.abortController.abort();
  }

  closeSnackbar = () => this.setState({ errorMessage: '' })

  render() {

    const { closeSnackbar } = this;
    const { fetchingData, errorMessage } = this.state;
    const { players, handleSorting, sortBy, sortOrder, classes } = this.props;

    return(
      <div className="players-table">
        {!fetchingData && (
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {
                  headers.map(header => (
                    <StyledTableCell key={header.label} onClick={ () => handleSorting(header.sortBy) }>
                      <Arrow { ...{ sortOrder, isActive: sortBy === header.sortBy } }/>
                      {header.label}
                    </StyledTableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
            {players.map(player => (
              <TableRow key={player.jerseyNumber}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.nationality}</TableCell>
                <TableCell>{calculateAge(player.dateOfBirth)}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        )}
        <ErrorSnackbar { ...{ closeSnackbar, errorMessage } } />
      </div>
    );
  }
}

PlayersTable.propTypes = {
  players: PropTypes.array.isRequired,
  handleSorting: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired
};

export default withStyles(Styles)(PlayersTable);