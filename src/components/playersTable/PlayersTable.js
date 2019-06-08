/*eslint react-hooks/exhaustive-deps:off*/

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { calculateAge} from '../../helpers/dateHelper';
import { headers, StyledTableCell, Arrow } from './PlayersTableHeaders';
import './playersTable.scss';

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

const PlayersTable = ({ players, fetchData, handleSorting, sortBy, sortOrder }) => {
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
    </div>
  );
};

export default PlayersTable;