import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {authenticate, isAuth} from './helpers';
import Google from './Google'

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const {email, password, buttonText} = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const informParent = response => {
        authenticate(response, () =>{
            setValues({...values, email: '', password: '', buttonText: 'Submitted'});
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText: "Submitting"});
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
        .then(response => {
            console.log('SIGNIN SUCCESS: ', response);
            //Save Response as cookie/localstorage
            authenticate(response, () =>{
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
                //toast.success(`Hey ${response.data.user.name}, Welcome Back!`);
            });
        })
        .catch(err => {
            console.log("SIGNIN ERROR: ", err.response.data);
            setValues({...values, buttonText: 'Submit', password: ''});
            toast.error(err.response.data.error);
        });
    };

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="p-3 text-center">Signin</h1>
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
                <Google informParent={informParent}/>
            </div>
        </Layout>
    );
};

export default Signin;