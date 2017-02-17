import { connect } from 'react-redux';
import Header from 'components/Shared/Header';
import { login, logout } from 'actions/user';

const mapStateToProps = state => ({
  loggedUser: state.user.loggedUser
});

const mapDispatchToProps = dispatch => ({
  login: () => {
    dispatch(login());
  },
  logout: () => {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
