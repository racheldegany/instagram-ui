import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { RegisterSchema } from './register.schema';
import { useHistory } from 'react-router-dom';
import config from '../config/index';
import './Register.scss';
function Register(props) {

    const [showError, setError] = useState(false);
    const history = useHistory();
    const [isUsername, setUsername] = useState(null);

    const submit = async (values) => {
        setError(false);
        const res = await fetch(config.apiUrl +'/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if(res.status === 201) {
            //show succsess
            // setTimeout(() => history.push('/login'), 2000);
            history.push('/login')
        } else if(res.status === 409) {
            setError(true);
            
        } else {
            console.log('Unknown error');
        }
        return res;
    }

    // const checkUsername = async (e) => {
        
    //     console.log(e.target.value);
    //     setUsername(null);
    //     const res = await fetch(config.apiUrl + '/users/username', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({username: e.target.value})
    //     });
    //     console.log(res);
    //     if(res.status === 200) {
    //         console.log('available');
    //         setUsername(true);
    //         return;
    //     }
    //     setUsername(false);
    // }
         
         
    

    return (
        <div className="Register d-flex flex-column justify-content-center ">
            
            <h2 className="text-center">Register to Instagram</h2>
           
            <Formik
                initialValues={{username: '', password: '', email: '', agreeToTerms: false}}
                validationSchema={RegisterSchema}
                onSubmit={submit}
                validateOnChange={true}
            >

                {({errors, touched, isSubmitting }) =>(
                    <Form className="">
                        
                        {/* <div className="form-group" >
                        {showError && <div className="alert alert-danger">
                                username or password already exists
                            </div>}
                        </div> */}

                        <div className="row justify-content-around align-items-baseline">
                            <label className="col-3" htmlFor="username">Username:</label>
                            <Field className="rounded-pill form-control col-7" name="username" placeholder="Enter username..." type="text" id="username"/>
                            {isUsername &&  <svg className="bi bi-check-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="green" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> }
                            {isUsername === false && <svg className="bi bi-x-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/></svg>}
                        </div>
                        <div className="error">
                            <ErrorMessage className="text-danger" component="small" name="username"/>
                        </div>
                        <div className="row justify-content-around align-items-baseline">
                            <label className="col-3" htmlFor="password">Password:</label>
                            <Field className="rounded-pill form-control col-7" name="password" placeholder="Enter password..." type="password" id="password"/>
                        </div>
                        <div className="error">
                            <ErrorMessage className="text-danger" component="small" name="password"/>
                        </div>
                        <div className="row justify-content-around align-items-baseline">
                            <label className="col-3" htmlFor="email">Email:</label>
                            <Field className="rounded-pill form-control col-7" name="email" placeholder="Enter email..." type="email" id="email"/>
                        </div>
                        <div className="error">
                            <ErrorMessage className="text-danger" component="small" name="email"/>
                        </div>
                        <div className="form-group form-check mb-0">
                            <Field type="checkbox" id="agreeToTerms" name="agreeToTerms" className="form-check-input col-3"/>
                            <label htmlFor="agreeToTerms" className="form-check-label col-9 text-right">Agree to terms</label>
                        </div>
                        <div className="error">
                            <ErrorMessage className="text-danger" component="small" name="agreeToTerms"/>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn rounded-pill" disabled={isSubmitting}> Submit</button>
                        </div>
                    </Form>
                )}
                
            </Formik>
        </div>
    );
}

export default Register;