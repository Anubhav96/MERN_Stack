import React, { Fragment, useEffect } from 'react';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/profile/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store/store';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import * as actions from './store/actions/index';

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
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/profiles'
                                component={Profiles}
                            />
                            <Route
                                exact
                                path='/profile/:id'
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/create-profile'
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/edit-profile'
                                component={EditProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/add-experience'
                                component={AddExperience}
                            />
                            <PrivateRoute
                                exact
                                path='/add-education'
                                component={AddEducation}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
