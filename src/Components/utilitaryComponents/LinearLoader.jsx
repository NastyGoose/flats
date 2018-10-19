import React from 'react';
import PropTypes from 'prop-types';
// material-ui stuff
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
  colorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  barColorPrimary: {
    backgroundColor: '#00695C',
  },
};

function LinearLoader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
      <br />
      <LinearProgress
        classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
      />
    </div>
  );
}

LinearLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearLoader);
