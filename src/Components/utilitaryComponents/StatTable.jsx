import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography,
} from '@material-ui/core/';
import connect from 'react-redux/es/connect/connect';

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
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const rows = props => [
  {
    id: 0,
    name: 'Recently viewed flats',
    value: props.cookies.get('recentIDs') ? props.cookies.get('recentIDs').length : 0,
  },
  {
    id: 1,
    name: 'Liked flats',
    value: props.favoriteFlats ? props.favoriteFlats.length : 0,
  },
  {
    id: 2,
    name: 'Days since registration',
    value: 'in progress..',
  },
];

function CustomizedTable(props) {
  const { classes } = props;
  console.log(props);
  return (
    [<Typography
      align="center"
      variant="h2"
      component="h3"
    >
      Look at your statistic!
    </Typography>,

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Info</CustomTableCell>
              <CustomTableCell numeric>Value</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows(props).map(row => (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell numeric>{row.value}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>,
    ]
  );
}

function mapStateToProps(state, ownProps) {
  return {
    cookies: ownProps.cookies,
    favoriteFlats: state.auth.favoriteFlats,
  };
}

CustomizedTable.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  classes: PropTypes.object.isRequired,
  favoriteFlats: PropTypes.array.isRequired,
};

export default withCookies(connect(mapStateToProps)(withStyles(styles)(CustomizedTable)));
