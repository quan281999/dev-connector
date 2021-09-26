import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [searchProfiles, setSearchProfiles] = useState(null);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const search = debounce((e) => {
    const searchTerm = e.target.value;

    if (searchTerm === '') {
      setSearchProfiles(null);
    } else {
      const containSearchTerm = (profile) => {
        return profile.user.name.includes(searchTerm);
      }
  
      setSearchProfiles(profiles.filter(containSearchTerm));
    }
  }, 1000);

  const displayProfiles = searchProfiles ? searchProfiles : profiles;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className="fa fa-users" /> Browse and connect with
            developers
          </p>
          <div className='post-form'>
            <form
              className='form my-1'
            >
              <input
                type="text"
                placeholder="Search"
                name="search"
                onChange={search}
              />
            </form>
          </div>
          <div className='profiles'>
            {displayProfiles.length > 0 ? (
              displayProfiles.map(profile => (
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
