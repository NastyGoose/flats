import React from 'react';
import PropTypes from 'prop-types';
// material-ui stuff
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography align="center" variant="h5" component="h3">
          Добро пожаловать!
        </Typography>
        <br />
        <Typography align="center" variant="subheading" component="h3">
          Этот сервис создан при помощи React, Express, Mongo и Node.js.
          Суть приложения заключается в парсинге данных с других сайтов по сьему жилья и обработке этой информации.
          <br />
        (:
        </Typography>
      </Paper>
    </div>
  );
}
PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
