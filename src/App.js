import React from 'react';
import Layout from './core/Layout'

const App = () => {
    return (
        <Layout>
            <div className="col-md-6 offset-md-3 text-center">
                <h1 className=" pt-4 pb-2">React/MongoDB Login Authentication Boilerplate</h1>
                <hr />
                <h2>MERN STACK</h2>
                <hr />
                <p className="pt-5 lead">Thank you for visiting my login website. Please signup and enjoy the functionality</p> 
            </div>
        </Layout>
    );
};

export default App;
