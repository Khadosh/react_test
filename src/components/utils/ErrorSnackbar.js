import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  errorIcon: {
    fontSize: 20,
    opacity: 0.9,
    margin: `0 ${theme.spacing(1)}px -${theme.spacing(1/2)}px 0`,
  }
}));

const ErrorSnackbar = ({ errorMessage, closeSnackbar }) => {
  const classes = useStyles();

  return (
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
  );
};

ErrorSnackbar.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  closeSnackbar: PropTypes.func.isRequired
};

export default ErrorSnackbar;