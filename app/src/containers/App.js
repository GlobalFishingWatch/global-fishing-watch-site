import { connect } from 'react-redux';
import App from 'components/App';
import { setToken, getLoggedUser } from 'actions/user';

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  getLoggedUser: () => dispatch(getLoggedUser())
});

export default connect(null, mapDispatchToProps)(App);
