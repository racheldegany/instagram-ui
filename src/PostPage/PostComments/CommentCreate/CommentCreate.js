import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import Loader from '../../../Loader/Loader';
import { CommentCreateSchema } from './CommentCreate.schema';
import config from '../../../config/index';
import Avatar from '../../../common/Avatar/Avatar';
import { UserContext } from '../../../user-context';
import './CommentCreate.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';


function CommentCreate({postId, onAdd}) {

    const { user } = useContext(UserContext);

    const submit = async (values, {resetForm}) => {
        try{
            const newComment =await (await fetch(config.apiUrl + '/posts/'+ postId+ '/comment' , {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(values)
            })).json();
            onAdd(newComment);
            resetForm({values: ''});
            return newComment;
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        

        <Formik
        initialValues={{content: ''}}
        validationSchema={CommentCreateSchema}
        onSubmit={submit}
        >
        {({errors, touched, isSubmitting}) => (
            <Form className=" CommentCreate d-flex align-items-center justify-content-between">
                
                <Avatar image={user?.avatar} size="sm"/>
                
                {/* <div className="form-group"> */}
                    {/* <label className="col" >Description</label> */}
                    <Field  className="rounded-pill" type="text" placeholder="Add comment.." name="content" id="comment"/>
                {/* </div > */}

                {isSubmitting && <Loader/>}
                {/* <div className="form-group text-right"> */}
                        <button type="submit" className="btn" disabled={isSubmitting}><FontAwesomeIcon icon={ faShareSquare}/></button>
                {/* </div> */}
            
            
            </Form>
        )}
        </Formik>
    );
}

export default CommentCreate;