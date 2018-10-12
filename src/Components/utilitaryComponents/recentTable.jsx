import React from 'react';
import { Cookies } from 'react-cookie';
import PropTypes, { instanceOf } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    maxwidth: 700,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    maxWidth: 800,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, value) {
  id += 1;
  return {
    id, name, value,
  };
}

function RecentTable(props) {
  const { classes } = props;
  const { cookies } = props;
  const recentURLs = cookies.get('recentURLs') ? cookies.get('recentURLs') : [];
  const rows = recentURLs.map((curr, index) => createData(index, curr));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>№</CustomTableCell>
            <CustomTableCell>Link</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell>
                <a href={row.value}>
                  {row.value}
                </a>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

RecentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  cookies: instanceOf(Cookies).isRequired,
};

export default withStyles(styles)(RecentTable);
