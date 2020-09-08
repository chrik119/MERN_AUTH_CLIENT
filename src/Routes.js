import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';
import Activate from './Auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './Auth/PrivateRoute';
import AdminRoute from './Auth/AdminRoute';
import Forgot from './Auth/Forgot';
import Reset from './Auth/Reset';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin" exact component={Admin} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;