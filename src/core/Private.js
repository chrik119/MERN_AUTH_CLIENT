import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, getCookie, signout, updateUser } from '../Auth/helpers';

const Private = ({history}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile()
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log('Profile Update', response);
            const {role, name, email} = response.data;
            setValues({...values, role, name, email});
        }).catch(error => {
            console.log('Profile Update Error', error.response.data.error);
            if(error.response.status === 401){
                signout(() => {
                    history.push('/');
                });
            }
        });
    };

    const {name, email, role, password, buttonText} = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText: "Submitting"});
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            data: {name, password},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PROFILE UPDATE SUCCESS: ', response);
            updateUser(response, () => {
                setValues({...values, buttonText: 'Submitted'});
                toast.success('Profile Updated Successfully!');
            });
        })
        .catch(err => {
            console.log("PROFILE UPDATE ERROR: ", err.response.data.error);
            setValues({...values, buttonText: 'Submit'});
            toast.error(err.response.data.error);
        });
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="text" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled/>
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
                <h1 className="pt-5 text-center">Private</h1>
                <p className="lead text-center">Update Profile</p>
                {updateForm()}
            </div>
        </Layout>
    );
};

export default Private;