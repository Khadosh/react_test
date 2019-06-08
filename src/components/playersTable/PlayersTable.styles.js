import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
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
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  errorIcon: {
    fontSize: 20,
    opacity: 0.9,
    margin: `0 ${theme.spacing(1)}px -${theme.spacing(1)/2}px 0`,
  }
}));