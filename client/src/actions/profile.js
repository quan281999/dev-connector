import api from '../utils/api';
import SnackbarUtils from '../utils/snackbar';

import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  GET_REPOS,
  NO_REPOS,
  CLEAR_PROFILES,
  PROFILE_LOADING
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LOADING
    })

    const res = await api.get('/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles =
  (search = null) =>
  async (dispatch) => {
    dispatch({
      type: PROFILE_LOADING
    })

    dispatch({ type: CLEAR_PROFILE });

    try {
      let res;
      if (!search) {
        res = await api.get('/profile');
      } else {
        res = await api.get(`/profile/?search=${search}`);
      }

      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LOADING
    })

    const res = await api.get(`/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LOADING
    })

    const res = await api.get(`/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_LOADING
      })
      
      const res = await api.post('/profile', formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      SnackbarUtils.success(edit ? 'PROFILE UPDATED' : 'PROFILE CREATED');
      
      history.push(`/profile/${getState().auth.user._id}`);
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => SnackbarUtils.error(error.msg.toUpperCase()));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Add Experience
export const addExperience = (formData, history) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_LOADING
    })

    const res = await api.put('/profile/experience', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    SnackbarUtils.success('EXPERIENCE ADDED');

    history.push(`/profile/${getState().auth.user._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => SnackbarUtils.error(error.msg.toUpperCase()));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_LOADING
    })

    const res = await api.put('/profile/education', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    SnackbarUtils.success('EDUCATION ADDED');

    history.push(`/profile/${getState().auth.user._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => SnackbarUtils.error(error.msg.toUpperCase()));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LOADING
    })

    const res = await api.delete(`/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    SnackbarUtils.success('EXPERIENCE REMOVED');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LOADING
    })
    
    const res = await api.delete(`/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    SnackbarUtils.success('EDUCATION REMOVE');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Clear profiles
export const clearProfiles = () => ({ type: CLEAR_PROFILES });

// Clear profile
export const clearProfile = () => ({ type: CLEAR_PROFILE });
