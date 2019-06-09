/*eslint react-hooks/exhaustive-deps:off*/

import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { headers, StyledTableCell, Arrow } from './PlayersTableHeaders';
import { calculateAge} from '../../../helpers/dateHelper';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './PlayersTable.styles.js';
import './playersTable.scss';

const PlayersTable = ({ players, fetchData, handleSorting, sortBy, sortOrder }) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const fetchPlayers = async () => {
      try {
      await fetchData();
      setErrorMessage(false);
    }
    catch (err) {
      setErrorMessage('Something went wrong retrieving players information');
    }
  }

  const closeSnackbar = () => setErrorMessage('');

  useEffect(() => {
    const ac = new AbortController();
    setFetchingData(true);
    fetchPlayers();
    setFetchingData(false);
    return () => ac.abort();
  }, []);

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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={Boolean(errorMessage)}
        onClose={closeSnackbar}
        autoHideDuration={6000}
        ContentProps={{ 'aria-describedby': 'message-id'}}
        message={<span id="message-id">{errorMessage}</span>}
      >
        <SnackbarContent
          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon className={classes.errorIcon} />
              {errorMessage}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={closeSnackbar}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  );
};

export default PlayersTable;