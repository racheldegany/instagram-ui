import React from 'react';
import { Formik, Form, Field } from 'formik';
import { PostCreateSchema } from './PostCreate.schema';
import config from '../../config/index';
import { useHistory } from 'react-router-dom';
import Loader from '../../Loader/Loader';

function PostCreate(props) {
    const history = useHistory();

    const builfFormData = (values) => {
        const data = new FormData();
        for(const key in values) {
            data.append(key, values[key]);
        }
        return data;
    }

    const submit = async (values) => {
        const data = builfFormData(values);

        const res = await fetch(config.apiUrl + '/posts', {
          method: 'PUT',
          credentials: 'include',
          body: data
        });
        if(res.status === 201) {
            console.log('sucsess');
            history.push('/');
        } else if(res.status === 401) {
            console.log('failed');
        } else {
            console.log('error');   
        }
        return res;
        
    }

    return (
        <div> 
            <h2> Create Post</h2>
            <Formik
                initialValues={{description: '', image: ''}}
                validationSchema={PostCreateSchema}
                onSubmit={submit}
            >
                {({errors, touched, isSubmitting, setFieldValue}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="image" className="col" >Add photo</label>
                            {/* <Field type="file" name="img"  id="img" className="col rounded-pill"/>    */}
                            <input type="file" name="image" id="image" className="col rounded-pill" onChange={(e) => {
                                 setFieldValue('image', e.currentTarget.files[0]);
                            }}/>
                        </div>
                        <div className="form-group">
                            <label className="col" >Description</label>
                            <Field  className="rounded-pill" as="textarea" placeholder="Add description.." name="description"/>
                        </div >

                        {isSubmitting && <Loader/>}
                        <div className="form-group text-right">
                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}> Post</button>
                        </div>
                       
                    </Form>
                )}
            </Formik>
           
        </div>
    );
}

export default PostCreate;