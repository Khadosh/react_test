import React, { useState } from 'react';
import { func } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
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
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    backgroundColor: "#2196f3"
  },
  input: {
    display: 'none'
  }
}));

const positions = [
  '',
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
    setAge(formAge);
  }

  const handleSetName = evt => {
    const value = evt.target.value;
    if ((/^[A-Za-z]*$/gi).test(value)) {
      setFormName(evt.target.value)
    }
  }

  return (
    <form onSubmit={ handleOnSubmit }>
      <TextField
        id="input-name"
        label="Name"
        className={classes.textField}
        value={formName}
        onChange={handleSetName}
        margin="normal"
        pattern="[A-Za-z]+"
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

      <TextField
        id="input-ge"
        label="Age"
        type="Number"
        className={classes.textField}
        value={formAge}
        onChange={evt => setFormAge(evt.target.value)}
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  )
}

PlayersFinderForm.propTypes = {
  setName: func.isRequired,
  setPosition: func.isRequired,
  setAge: func.isRequired
}

export default PlayersFinderForm;