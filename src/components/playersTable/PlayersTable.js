/*eslint react-hooks/exhaustive-deps:off*/

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from './redux/PlayersTable.actions';
import { getPlayers } from './redux/PlayersTable.selectors';
import { calculateAge} from '../../helpers/dateHelper';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = (store, props) => ({
  players: getPlayers(store, props)
});

const mapDispatchToProps = {
  fetchData
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflow: 'auto',
    maxHeight: 500
  },
  table: {
    minWidth: 650
  },
}));

const PlayersTable = ({ players, fetchData }) => {
  const [ fetchingData, setFetchingData ] = useState(false);
  const classes = useStyles();

  const fetchPlayers = () => {
    setFetchingData(true);
    fetchData();
    setFetchingData(false);
  }

  useEffect(() => {
    fetchPlayers()
  }, []);

  return (
    <div>
     {
       fetchingData
        ? 'loading'
        : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Nationality</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {
              players.map(player => (
                <TableRow key={player.jerseyNumber}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.nationality}</TableCell>
                  <TableCell>{calculateAge(player.dateOfBirth)}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        )
     }
     </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersTable);