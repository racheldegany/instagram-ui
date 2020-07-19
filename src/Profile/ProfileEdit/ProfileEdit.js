import React, { useContext } from 'react';
import { UserContext } from '../../user-context';
import { ProfileEditSchema } from './ProfileEdit.schema';
import config from '../../config/index';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from '../../Loader/Loader';

function ProfileEdit(props) {
    const { user } = useContext(UserContext);
    const {history} = useHistory();

    const builfFormData = (values) => {
        const data = new FormData();
        for(const key in values) {
            data.append(key, values[key]);
        }
        return data;
    }

    const submit = async (values) => {
        const data = builfFormData(values);

        const res = await fetch(`${config.apiUrl}/users/${user.id}`, {
          method: 'POST',
          credentials: 'include',
          body: data
        });
        if(res.status === 201) {
            console.log('sucsess');
            history.push('/profile');
        } else if(res.status === 401) {
            console.log('failed');
        } else {
            console.log('error');   
        }
        return res;
        
    }
    return (
        <div>
            <h2> Edit your profile</h2>
            <Formik
                initialValues={{image: '', username: '', bio: '', email: '' }}
                validationSchema={ProfileEditSchema} //hhhhh
                onSubmit={submit}
            >
                {({errors, touched, isSubmitting, setFieldValue}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="image" className="col" >Add profile picture</label>
                            {/* <Field type="file" name="img"  id="img" className="col rounded-pill"/>    */}
                            <input type="file" name="image" id="image" className="col rounded-pill" onChange={(e) => {
                                 setFieldValue('image', e.currentTarget.files[0]);
                            }}/>
                        </div>
                        <div className="form-group">
                            <label className="col" >Edit bio</label>
                            <Field  className="rounded-pill" as="textarea" placeholder="Edit bio.." name="bio"/>
                        </div >
                        <div className="form-group">
                            <label className="col" >Edit username</label>
                            <Field  className="rounded-pill" type="text" placeholder="Edit username.." name="username"/>
                            <ErrorMessage className="text-danger" component="small" name="email"/>
                        </div >
                        <div className="form-group">
                            <label className="col" >Edit email</label>
                            <Field  className="rounded-pill" type="email" placeholder="Edit email.." name="email"/>
                            <ErrorMessage className="text-danger" component="small" name="email"/>
                        </div >

                        {isSubmitting && <Loader/>}
                        <div className="form-group text-right">
                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}> Update</button>
                        </div>
                       
                    </Form>
                )}
            </Formik>
           
        </div>
    );
}

export default ProfileEdit;