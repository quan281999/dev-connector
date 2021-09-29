import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { clearPosts } from '../../actions/post';
import { clearProfiles, clearProfile } from '../../actions/profile'

const Navbar = ({ auth: { isAuthenticated, user }, logout, clearProfile, clearProfiles, clearPosts }) => {
  let id = null;
  if (user) {
    id = user._id;
  }

  const doLogout = () => {
    clearPosts();
    clearProfiles();
    clearProfile();
    logout();
  }

  const authLinks = (
    <ul>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to={`/profile/${id}`}>
          <span className="hide-sm">Profile</span>
        </Link>
      </li>
      <li>
        <a onClick={doLogout} href="#!">
          <span className="hide-sm">SignOut</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> <span className="brand">DevConnector</span>
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : null}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  clearProfiles: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, clearProfiles, clearProfile, clearPosts })(Navbar);
