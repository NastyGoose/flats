import React from 'react';
import PropTypes from 'prop-types';
// material-ui stuff
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  TextField, Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelActions, ExpansionPanelSummary,
  Button, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slider from '@material-ui/lab/Slider';
// redux stuff
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { changeFilter } from '../../Redux/actions/settings.action';
import { findFlat } from '../../Redux/actions/flats.action';
// local imports
import { settingsStyles } from '../styles/stylesheet';

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
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: 'indianred',
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid #c10f4e',
        },
      },
    },
  },
});

class Settings extends React.Component {
  state = {
    sortBy: '',
    orderBy: null,
    chunksSize: 20,
    findField: '',
    minPrice: 0,
    maxPrice: 999,
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

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = () => {
    const filter = {
      sortBy: this.state.sortBy,
      orderBy: this.state.orderBy,
      chunksSize: this.state.chunksSize,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      address: this.state.findField,
    };
    this.props.changeFilter({
      filter,
      index: 0,
    });
  };

  findFlat = () => {
    this.props.findFlat(this.state.findField, this.state.chunksSize, );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={customTheme}>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <Typography className={classes.heading}>Фильтр</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <div className={classes.column}>
                <FormControl component="fieldset1" className={classes.formControl}>
                  <FormLabel component="legend">Сортировать по</FormLabel>
                  <RadioGroup
                    aria-label="sorter"
                    name="sorter1"
                    className={classes.group}
                    value={this.state.sortBy}
                    onChange={this.handleSortChange}
                  >
                    <FormControlLabel value="Price" control={<Radio />} label="Цене" />
                    <FormControlLabel value="Date" control={<Radio />} label="Дате обновления" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={classes.column}>
                <FormControl component="fieldset2" className={classes.formControl}>
                  <FormLabel component="legend">В порядке</FormLabel>
                  <RadioGroup
                    aria-label="order"
                    name="order1"
                    className={classes.group}
                    value={this.state.orderBy}
                    onChange={this.handleOrderChange}
                  >
                    <FormControlLabel value={1} control={<Radio />} label="Возрастающем" />
                    <FormControlLabel value={-1} control={<Radio />} label="Убывающем" />
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
                <Slider
                  color="red"
                  classes={{ container: classes.slider }}
                  value={this.state.chunksSize}
                  min={4}
                  max={40}
                  step={4}
                  onChange={this.handleSliderChange}
                />
                <Typography variant="caption">
                Укажите сколько квартир будет отображаться на странице.
                </Typography>
              </div>
              <div className={classNames(classes.column, classes.helper)}>
                <Typography variant="caption">
                Укажите ваши препочтения здесь.
                </Typography>
              </div>
            </ExpansionPanelDetails>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                onChange={this.handleChange('findField')}
                value={this.state.findField}
                id="outlined-full-width"
                label="Найти"
                style={{ margin: 8, width: '80%' }}
                placeholder="Адрес"
                helperText="Впишите сюда искомый адрес!"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.prices}>
              <TextField
                id="standard-number"
                label="Минимальная цена"
                value={this.state.minPrice}
                onChange={this.handleChange('minPrice')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <Typography style={{ margin: 'auto 0', fontSize: '15px' }} align="center" variant="caption">
              Укажите ценовые границы
              </Typography>
              <TextField
                id="standard-number"
                label="Максимальная цена"
                value={this.state.maxPrice}
                onChange={this.handleChange('maxPrice')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </div>
            <Divider />
            <ExpansionPanelActions>
              <Link to="/page=0">
                <Button
                  style={{
                    color: 'mediumvioletred',
                  }}
                  onClick={this.handleClick}
                  size="small"
                  color="primary"
                >
              Применить
                </Button>
              </Link>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </MuiThemeProvider>
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
    findFlat: bindActionCreators(findFlat, dispatch),
  };
}

Settings.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  findFlat: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(settingsStyles)(Settings));
