import React, { useContext, useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {LoginSchema} from './login.schema';
import config from '../config/index';
import { UserContext } from '../user-context';
import { useHistory, Link } from 'react-router-dom';
import './Login.scss';

function Login() {

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

    return (
        <div className="Login">
            <div className="row">
            <header className="d-flex flex-column justify-content-center col-md-6 shadow-sm rounded">
                <h2 className="instagram-title text-center">Instagram</h2>
                <h3 className="text-center">Welcome back</h3>
            </header>
                <Formik
                    initialValues={{username: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={loginHandler}
                >
                    {({ isSubmitting }) =>(
                        <Form className="col-md-5 col-11 container d-flex flex-column justify-content-center mt-5 mt-md-0">
                            <h3 className="text-start pl-2 pb-2">Login</h3>
                            <Field className="form-control rounded-pill shadow-sm mt-4 " name="username" placeholder="Enter username..." type="text" id="username"/>
                            <div className="error ">
                                <ErrorMessage className="text-danger" component="small" name="username"/>
                            </div>
                            <Field className="form-control rounded-pill shadow-sm" name="password" placeholder="Enter password..." type="password" id="password"/>
                            <div className="error">
                                <ErrorMessage className="text-danger" component="small" name="password"/>
                            </div>
                            <div className="text-center" style={{height: '30px'}}>
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
        </div>
    );
}

export default Login;