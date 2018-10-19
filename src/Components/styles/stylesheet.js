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
  },
  identifiers: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
  },
});
