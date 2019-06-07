import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  menu: {
    width: 200,
  },
}));

const positions = [
  'Attacking Midfield',
  'Central Midfield',
  'Centre-Back',
  'Centre-Forward',
  'Defensive Midfield',
  'Keeper',
  'Left Midfield',
  'Left Wing',
  'Left-Back',
  'Right-Back'
];

const PlayersFinderForm = ({ setName, setPosition, setAge }) => {
  const classes = useStyles();
  const [ formName, setFormName] = useState('');
  const [ formPosition, setFormPosition] = useState('');
  const [ formAge, setFormAge] = useState('');

  const handleOnSubmit = evt => {
    evt.preventDefault();
    setName(formName);
    setPosition(formPosition);
    setAge(26);
  }

  return (
    <form onSubmit={ handleOnSubmit }>
      <TextField
        id="name"
        label="Name"
        className={classes.textField}
        value={formName}
        onChange={evt => setFormName(evt.target.value)}
        margin="normal"
      />
      <TextField
        id="select-position"
        select
        label="Position"
        className={classes.textField}
        value={formPosition}
        onChange={evt => setFormPosition(evt.target.value)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {positions.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </form>
  )
}

export default PlayersFinderForm;