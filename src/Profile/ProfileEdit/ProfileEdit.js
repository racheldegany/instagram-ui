import React, { useContext } from 'react';
import { UserContext } from '../../user-context';
import { ProfileEditSchema } from './ProfileEdit.schema';
import config from '../../config/index';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from '../../Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ProfileEdit.scss';
import Avatar from '../../common/Avatar/Avatar';

function ProfileEdit(props) {
    const  {user, setUser}  = useContext(UserContext);
    const history = useHistory();

    const buildFormData = (values) => {
        const data = new FormData();
        for(const key in values) {
            data.append(key, values[key]);
        }
        return data;
    }

    const submit = async (values) => {
        console.log(user);
        console.log(values);
        const data = buildFormData(values);
        const res = await fetch(`${config.apiUrl}/users/${user._id}`, {
            method: 'POST',
            credentials: 'include',
            body: data
        });
        console.log(res);
        if(res.status === 200) {
            const updatedUser = await res.json();
            setUser(updatedUser);
            history.push('/profile');
        } else if(res.status === 400) {
            console.log('failed');
        } else {
            console.log('error');   
        }
        return res;
        
    }
    return (
        <div className="ProfileEdit col-12">
            
            <Formik
                initialValues={{image: '', username: user.username, bio: '', email: '' }}
                validationSchema={ProfileEditSchema}
                onSubmit={submit}
            >
                {({errors, touched, isSubmitting, setFieldValue}) => (
                    <Form className="d-flex flex-column justify-content-center align-items-center">
                        <div className="picture">
                            <Avatar size="lg" image={user.avatar}/>
                            <label htmlFor="image" className="col" >Edit profile picture</label>
                            <input type="file" name="image" id="image" className="rounded-pill" onChange={(e) => {
                                 setFieldValue('image', e.currentTarget.files[0]);
                            }}/>
                        </div>
                        <div className="form-group bio ">
                            { user.bio && <label className="" >Bio</label>}
                            <Field  className="" as="textarea" name="bio" className="shadow-sm"/>
                        </div >
                        <div className="form-group username ">
                            <label className="" >Username</label>
                            <Field  className="shadow-sm" type="text" value={user.username} name="username"/>
                            <ErrorMessage className="text-danger" component="small" name="username"/>
                        </div >
                        <div className="form-group email">
                            <label className="" >Email</label>
                            <Field  className="shadow-sm" type="email" placeholder="Edit email.." name="email"/>
                            <ErrorMessage className="text-danger" component="small" name="email"/>
                        </div >

                        {isSubmitting && <Loader/>}
                        <div className="form-group update-btn rounded-pill">
                                <button type="submit" className="btn" disabled={isSubmitting}> Update</button>
                        </div>
                       
                    </Form>
                )}
            </Formik>
           
        </div>
    );
}

export default ProfileEdit;