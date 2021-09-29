import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getCurrentProfile, getProfileById } from '../../actions/profile';
import { deleteAccount } from '../../actions/auth';

const Profile = ({ getCurrentProfile, getProfileById, profile: { profile }, match, auth }) => {
  useEffect(() => {
    if (auth.user._id === match.params.id) {
      getCurrentProfile();
    } else {
      getProfileById(match.params.id);
    }
  }, [auth.user._id, getCurrentProfile, getProfileById, match.params.id]);

  if (auth.user._id === match.params.id && !profile) {
    return (
      <Fragment>
        <h1 className="text-primary">You have not yet setup a profile, start create your profile now</h1>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {auth.user._id === profile.user._id ? 
            (
              <>
                <Link to='/edit-profile' className="btn btn-primary">
                  Edit Profile
                </Link>
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                  Delete Account
                </button>
              </>
            ) : (
              <Link to="/profiles" className="btn btn-secondary">
                Go Back
              </Link>
            )
          }
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-edu bg-white p-2" style={{position: 'relative'}}>
              <h2 className="text-primary" style={{position: 'relative'}}>
                Education
                <Link to="/add-education" style={{marginLeft: "1rem"}}>
                  <i className="fas fa-plus-circle" />
                </Link>
              </h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">
                Experience
                <Link to="/add-experience" style={{marginLeft: "1rem"}}>
                  <i className="fas fa-plus-circle" />
                </Link>
                </h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, getProfileById, deleteAccount })(Profile);
