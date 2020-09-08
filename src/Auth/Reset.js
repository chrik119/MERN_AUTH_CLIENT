import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../core/Layout';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        token: '',
        buttonText: 'Reset Password'
    });

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);
        if(token){
            setValues({...values, name, token});
        }
    }, []);

    const {name, newPassword, token, buttonText} = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText: "Submitting"});
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {resetPasswordLink: token, newPassword}
        })
        .then(response => {
            console.log('Reset Password SUCCESS: ', response);
            toast.success(`${response.data.message}`);
            setValues({...values, buttonText: 'Requested'})
        })
        .catch(err => {
            console.log("Reset Password ERROR: ", err.response.data);
            setValues({...values, buttonText: 'Reset Password'});
            toast.error(err.response.data.error);
        });
    };

    const resetForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">New Password</label>
                <input onChange={handleChange('newPassword')} value={newPassword} type="password" className="form-control" required/>
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
                <h1 className="pt-5 text-center">Reset Password</h1>
                <p className="lead text-center">Hello {name}, please enter your new password</p>
                {resetForm()}
            </div>
        </Layout>
    );
};

export default Reset;