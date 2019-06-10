import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: 8,
    marginRight: 8,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    margin: 8,
    marginTop: 24,
    backgroundColor: "#2196f3"
  },
  input: {
    display: 'none'
  }
};

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

class PlayersFinderForm extends PureComponent {
  state = {
    formName: '',
    formPosition: '',
    formAge: ''
  }

  handleOnSubmit = evt => {
    evt.preventDefault();
    this.props.setName(this.state.formName);
    this.props.setPosition(this.state.formPosition);
    this.props.setAge(this.state.formAge);
  }

  setValue = (target, value) => this.setState({ [target]: value });

  handleSetName = evt => {
    const value = evt.target.value;
    if ((/^[A-Za-z]*$/gi).test(value)) {
      this.setValue('formName', value)
    }
  }

  render() {
    const {handleSetName} = this;
    const {formName, formPosition, formAge} = this.state;
    const {classes} = this.props;

    return (
      <form onSubmit={ this.handleOnSubmit }>
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
          onChange={evt => this.setValue('formPosition', evt.target.value)}
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
          onChange={evt => this.setValue('formAge', evt.target.value)}
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
    );
  }
}

PlayersFinderForm.propTypes = {
  setName: func.isRequired,
  setPosition: func.isRequired,
  setAge: func.isRequired
};

export default withStyles(styles)(PlayersFinderForm);