import React from 'react';
import { ArrowUpwardTwoTone, ArrowDownwardTwoTone } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const headers = [{
    sortBy: 'name',
    label: 'Player'
  },
  {
    sortBy: 'position',
    label: 'Position'
  },
  {
    sortBy: 'nationality',
    label: 'Nationality'
  },
  {
    sortBy: 'dateOfBirth',
    label: 'Age'
  }
];

export const Arrow = ({ sortOrder, isActive }) => {
  if (isActive) {
    return (
      <div className="players-table__arrow-container" >{
        sortOrder === 'desc'
          ? <ArrowDownwardTwoTone fontSize="small" />
          : <ArrowUpwardTwoTone fontSize="small" />
        }
      </div>
    );
  }

  return <div className="players-table__arrow-container" />;
};

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    '&:hover': { cursor: 'pointer' }
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);