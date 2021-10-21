import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routes/Routes';
import { LOGOUT } from './actions/types';
import { SnackbarUtilsConfigurator } from './utils/snackbar'
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';


const App = () => {
  useEffect(() => {
    // check for token in LocalStorage to resume logged in status
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from every tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <SnackbarProvider maxSnack={3}>
          <SnackbarUtilsConfigurator />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/landing" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </SnackbarProvider>
      </Router>
    </Provider>
  );
};

export default App;
