import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Home from '../home/Home';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
