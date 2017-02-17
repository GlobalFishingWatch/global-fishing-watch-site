import { connect } from 'react-redux';

import MenuMobile from 'components/Shared/MenuMobile';
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuMobile);
