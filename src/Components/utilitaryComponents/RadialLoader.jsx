import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class RadialLoader extends React.PureComponent {
  state = {
    outOfTime: false,
  };


  render() {
    const { classes } = this.props;
    return (
      <div style={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        {
        this.state.outOfTime
          ? (
            <h1 align="center">
              {' '}
              Oops!
              <br />
              {' '}
              Something gone wrong!
              {' '}
            </h1>
          )
          : (
            <CircularProgress className={classes.progress} size={150} style={{ color: 'indianred' }}>
              {setTimeout(() => {
                console.log('timehascome!');
                this.setState({
                  outOfTime: true,
                });
              }, 10000)}
            </CircularProgress>
          )
      }
      </div>
    );
  }
}

RadialLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadialLoader);
