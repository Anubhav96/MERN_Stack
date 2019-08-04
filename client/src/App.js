import React, { Fragment, useEffect } from 'react';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { Provider } from 'react-redux';
import store from './store/store';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import * as actions from './store/actions/index';
import Routes from './components/routing/Routes';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(actions.loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Landing} />
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
