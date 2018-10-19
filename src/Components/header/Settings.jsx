import React from 'react';
import PropTypes from 'prop-types';
// material-ui stuff
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
// material-ui stuff
import {
  Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelActions, ExpansionPanelSummary,
  Button, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Slider from '@material-ui/lab/Slider';
// redux stuff
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { changeFilter } from '../../Redux/actions/settings.action';

const customTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      track: {
        backgroundColor: 'grey',
      },
      thumb: {
        backgroundColor: 'whitesmoke',
        border: '1.5px solid indianred',
        activated: {
          boxShadow: '0 0 0 18px rgba(234, 64, 98, 0.16)',
        },
        hover: {
          boxShadow: '0 0 0 9px rgba(234, 64, 98, 0.16)',
        },
      },
    },
  },
});

const styles = theme => ({
  slider: {
    padding: '22px 0px',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class Settings extends React.Component {
  state = {
    sortBy: '',
    orderBy: null,
    chunksSize: 20,
  };

  handleSortChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  handleOrderChange = (event) => {
    this.setState({ orderBy: parseInt(event.target.value, 10) });
  };

  handleSliderChange = (event, value) => {
    this.setState({ chunksSize: value });
  };

  handleClick = () => {
    const filter = {
      sortBy: this.state.sortBy,
      orderBy: this.state.orderBy,
      chunksSize: this.state.chunksSize,
    };
    this.props.changeFilter({
      filter,
      index: this.props.index,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>Filter</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <FormControl component="fieldset1" className={classes.formControl}>
                <FormLabel component="legend">Sort by</FormLabel>
                <RadioGroup
                  aria-label="sorter"
                  name="sorter1"
                  className={classes.group}
                  value={this.state.sortBy}
                  onChange={this.handleSortChange}
                >
                  <FormControlLabel value="Price" control={<Radio />} label="Price" />
                  <FormControlLabel value="Date" control={<Radio />} label="Update Date" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={classes.column}>
              <FormControl component="fieldset2" className={classes.formControl}>
                <FormLabel component="legend">Order by</FormLabel>
                <RadioGroup
                  aria-label="order"
                  name="order1"
                  className={classes.group}
                  value={this.state.orderBy}
                  onChange={this.handleOrderChange}
                >
                  <FormControlLabel value={1} control={<Radio />} label="Ascend" />
                  <FormControlLabel value={-1} control={<Radio />} label="Descend" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={classes.column}>
              <Typography
                variant="caption"
                align="center"
              >
                {this.state.chunksSize}
              </Typography>
              <MuiThemeProvider theme={customTheme}>
                <Slider
                  color="red"
                  classes={{ container: classes.slider }}
                  value={this.state.chunksSize}
                  min={4}
                  max={40}
                  step={4}
                  onChange={this.handleSliderChange}
                />
              </MuiThemeProvider>
              <Typography variant="caption">
                Select how many flats will be displayed per page.
              </Typography>
            </div>
            <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your preferences here.
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button
              style={{
                color: 'mediumvioletred',
              }}
              onClick={this.handleClick}
              size="small"
              color="primary"
            >
              Apply
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    index: state.actions.pageIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFilter: bindActionCreators(changeFilter, dispatch),
  };
}

Settings.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Settings));
