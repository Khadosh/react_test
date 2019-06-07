/*eslint react-hooks/exhaustive-deps:off*/

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from './redux/PlayersTable.actions';
import { makeGetPlayersByFilters } from './redux/PlayersTable.selectors';
import { calculateAge} from '../../helpers/dateHelper';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './playersTable.scss';

const makeMapStateToProps = () => {
  const getPlayersByFilters = makeGetPlayersByFilters();
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflow: 'auto'
  },
  table: {
    minWidth: 450
  },
  tableHead: {
    backgroundColor: theme.palette.common.black,
  },
  tableCell: {
    color: theme.palette.common.white,
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const PlayersTable = ({ players, fetchData }) => {
  const [ fetchingData, setFetchingData ] = useState(false);
  const classes = useStyles();

  const fetchPlayers = () => {
    setFetchingData(true);
    fetchData();
    setFetchingData(false);
  }

  useEffect(fetchPlayers, []);

  return (
    <div className="players-table">
      {!fetchingData && (
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <StyledTableCell>Player</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>Nationality</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
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
    </div>
  );
};

export default connect(makeMapStateToProps, mapDispatchToProps)(PlayersTable);