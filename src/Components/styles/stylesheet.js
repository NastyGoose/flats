export const userInfo = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '@media screen and (max-width: 700px)': {
      borderBottom: '2px solid #9e1b1b',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
  },
  textField: {
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  itemWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
  },
  changeIcon: {
    margin: 'auto',
    marginBottom: 0,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  UserInfo: {
    display: 'flex',
    padding: '30px',
    justifyContent: 'space-evenly',
    '@media screen and (max-width: 700px)': {
      flexDirection: 'column',
    },
  },
  statistics: {
    '@media screen and (min-width: 700px)': {
      margin: 'auto',
    },
  },
  identifiers: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
  },
});

export const settingsStyles = theme => ({
  sortAndOrderLabels: {
    '@media screen and (max-width: 700px)': {
      textAlign: 'center',
    },
  },
  chunksLabel: {
    '@media screen and (max-width: 700px)': {
      textAlign: 'center',
      padding: '20px',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  prices: {
    display: 'flex',
    justifyContent: 'space-around',
    '@media screen and (max-width: 700px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
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
    '@media screen and (max-width: 700px)': {
      flexDirection: 'column',
    },
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    '@media screen and (min-width: 700px)': {
      borderLeft: `2px solid ${theme.palette.divider}`,
    },
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    '@media screen and (max-width: 700px)': {
      borderTop: `2px solid ${theme.palette.divider}`,
    },
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
