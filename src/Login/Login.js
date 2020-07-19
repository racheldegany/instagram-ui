import React, { useContext, useState } from 'react';
import './Login.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {LoginSchema} from './login.schema';
import config from '../config/index';
import { UserContext } from '../user-context';
import { useHistory, Link } from 'react-router-dom';

function Login(props) {

    const {setUser} = useContext(UserContext);
    const history = useHistory();
    const [isError, setError]= useState(false);

    const loginHandler = async (values) =>{
        setError(false);
        const res = await fetch(config.apiUrl +'/users/login', {
          method: 'POST'  ,
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(values)
        });
        if(res.status === 200) {
            const loggedUser = await res.json();
            setUser(loggedUser);
            // setTimeout(() => history.push('/'), 2000);
            history.push('/');
        } else if(res.status === 401) {
            console.log('failed');
            setError(true);
        } else {
            console.log('error');   
        }
        return res;
    }
       //do a redirect to register

    return (
        <div className="Login ">
            <h2 className="instagram-title text-center">Instagram</h2>
            <h3 className="text-center">Log into your account</h3>
            <Formik
                initialValues={{username: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={loginHandler}
            >
                {({ isSubmitting }) =>(
                    <Form className="mt-5">
                        <div className="row justify-content-around">
                            <label className="col-3" htmlFor="username">Username:</label>
                            <Field className="rounded-pill form-control col-7" name="username" placeholder="Enter username..." type="text" id="username"/>
                        </div>
                        <div className="error">
                            <ErrorMessage className="text-danger" component="small" name="username"/>
                        </div>
                        <div className="row justify-content-around">
                            <label className="col-3" htmlFor="password">Password:</label>
                            <Field className="rounded-pill form-control col-7" name="password" placeholder="Enter password..." type="password" id="password"/>
                        </div>
                        <div className="error">
                            <ErrorMessage className="text-danger" component="small" name="password"/>
                        </div>
                        <div className="error text-center">
                           {isError && <span className="text-danger">Username or password is incorrect</span> }
                        </div>  
                        <div className="form-group text-center">
                            <button type="submit" className="btn rounded-pill" disabled={isSubmitting}> Login</button>
                        </div>
                        <div className="text-center">
                            Don't have an account? <Link to="/register"  className="Login__register-link">Register</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;