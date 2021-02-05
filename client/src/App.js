import './App.css';

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path='/' component={Landing}/>
        <section>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
