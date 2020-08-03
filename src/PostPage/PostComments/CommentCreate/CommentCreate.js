import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Loader from '../../../Loader/Loader';
import { CommentCreateSchema } from './CommentCreate.schema';
import { useHistory } from 'react-router-dom';
import config from '../../../config/index';


function CommentCreate({postId, onAdd}) {

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
            <Form>
                
                <div className="form-group">
                    {/* <label className="col" >Description</label> */}
                    <Field  className="rounded-pill" as="textarea" placeholder="Add comment.." name="content"/>
                </div >

                {isSubmitting && <Loader/>}
                <div className="form-group text-right">
                        <button type="submit" className="btn btn-dark" disabled={isSubmitting}> Comment</button>
                </div>
            
            </Form>
        )}
        </Formik>
    );
}

export default CommentCreate;