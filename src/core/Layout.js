import React, {Fragment, useReducer} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../Auth/helpers';

const Layout = ({children, match, history}) => {

    const isActive = path => {
        if(match.path === path){
            return {color: '#FFFFFF'};
        } else {
            return {color:'#C5C5C5'};
        }
    };

    const nav = () => {
        return (
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
                </li>
            {!isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>Signin</Link>
                    </li>
                </Fragment>
            )}
            {isAuth() && (
                <li className="nav-item">
                    {isAuth().role === 'admin' && (
                        <Link className="nav-link" style={isActive('/admin')} to='/admin'>
                            {isAuth().name}
                        </Link>
                    )}
                    {isAuth().role !== 'admin' && (
                        <Link className="nav-link" style={isActive('/private')} to='/private'>
                            {isAuth().name}
                        </Link>
                    )}
                </li>
            )}
            {isAuth() && (
                <li className="nav-item">
                    <span className="nav-link" style={isActive('NotActiveEver')} onClick={() => {
                        signout( () => {
                            history.push('/');
                        });
                    }}>
                        Signout
                    </span>
                </li>
            )}
            </ul>
        );
    };
    
    return (
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);