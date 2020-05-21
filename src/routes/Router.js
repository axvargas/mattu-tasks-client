import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Component imports
import SignIn from '../components/auth/signin';
import SignUp from '../components/auth/signup';
import Projects from '../components/projects';
//PrivateRoutes
import PrivateRoute from '../components/private';
import PrivateSignIn from '../components/private/privateSignIn';
const Router = () => {
    return (
        <Switch>
            <PrivateSignIn exact path='/sign-in' component={SignIn}></PrivateSignIn>
            <Route exact path='/sign-up' component={SignUp}></Route>
            <PrivateRoute exact path='/projects' component={Projects}></PrivateRoute>
            <Redirect from="/" to="/sign-in" />
            {/*
            <Route component={NotFound}></Route> */}
        </Switch>
    );
}

export default Router;
