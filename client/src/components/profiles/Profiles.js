import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading }, auth: {user} }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const search = debounce((e) => {
    const searchTerm = e.target.value;

    if (searchTerm === '') {
      getProfiles();
    } else {
      getProfiles(searchTerm);
    }
  }, 800);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="text-primary">
            <i className="fa fa-users" /> Get in touch with other developers
          </h1>
          <div className="post-form">
            <form className="form my-1">
              <input
                type="text"
                placeholder="Search"
                name="search"
                onChange={search}
              />
            </form>
          </div>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles
              .filter((profile) => {
                if (profile.user._id === user._id) {
                  return false;
                } else {
                  return true;
                }
              })
              .map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
