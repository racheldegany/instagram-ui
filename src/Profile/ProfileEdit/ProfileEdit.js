import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../user-context';
import { ProfileEditSchema } from './ProfileEdit.schema';
import config from '../../config/index';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from '../../Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ProfileEdit.scss';

import getCroppedImg from '../../Menu/PostCreate/cropImage';

import Avatar from '../../common/Avatar/Avatar';
import Cropper from 'react-easy-crop';

function ProfileEdit() {
    const { user, setUser } = useContext(UserContext);
    const [formikValues, setFormikValues] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    
    useEffect(()=>{
        setFormikValues({image: '', username: user?.username || '', bio: user?.bio || '', email: user?.email || '' })
        setIsLoading(false);
    }, [user])

    const buildFormData = (values) => {
        const data = new FormData();
        for(const key in values) {
            if(values[key] !== user[key]) {
                data.append(key, values[key]);
            }
        }
        return data;
    }

    const submit = async (values) => {
        const data = buildFormData(values);
        const res = await fetch(`${config.apiUrl}/users/${user._id}`, {
            method: 'POST',
            credentials: 'include',
            body: data
        });
        if(res.status === 200) {
            const updatedUser = await res.json();
            setUser(updatedUser);
            history.push(`/profile/${user._id}`);
        } else if(res.status === 400) {
            console.log('failed');
        } else {
            console.log('error');   
        }
        return res;
        
    }

    const onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            setCroppedImage(null);
          const file = e.target.files[0];
          let imageDataUrl = await readFile(file);
    
          // apply rotation if needed
        //   const orientation = await getOrientation(file)
        //   const rotation = ORIENTATION_TO_ANGLE[orientation]
        //   if (rotation) {
        //     imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        //   }

            setImageSrc(imageDataUrl);
            // setCrop({ x: 0, y: 0 });
            // setZoom(1);
        
        }
      }

      const showResult = async (setFieldValue) => {
        try {
            setIsCropping(true);
            const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels
            )
            console.log('done', { croppedImage });
            setCroppedImage(croppedImage);
            setFieldValue('image', croppedImage);
            setIsCropping(false);
        } catch (e) {    
          console.error(e);
          setIsCropping(false);
        }
    }

    const avatarImage = croppedImage? croppedImage : user.avatar;
    return (
        <>
        {isLoading && <Loader/>}
        {!isLoading &&
        <div className="ProfileEdit col-12">
            
            <Formik
                initialValues={formikValues}
                validationSchema={ProfileEditSchema}
                onSubmit={submit}
                // values = {{image: user.avatar, username: user.username, bio: user.bio, email: user.email}}
                >
                {({errors, touched, isSubmitting, setFieldValue}) => (
                    <Form className="container d-flex flex-column flex-md-row justify-content-around align-items-center align-items-md-start mt-md-5">
                        <div className="picture d-flex flex-column align-items-center justify-content-around ">

                            <Avatar size="lg" image={avatarImage}/>
                            <label htmlFor="image" className="col text-center" >Edit profile picture</label>
                            <input type="file" name="image" id="image" className="d-none" onChange={(e) => {
                                //  setFieldValue('image', e.currentTarget.files[0]);
                                 onFileChange(e)
                            }}/>

                            {imageSrc && !croppedImage && <>
                            
                            <Cropper
                                cropShape="round"
                                showGrid={false}
                                image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    onCropChange={changedCrop => (setCrop(changedCrop))}
                                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                                    onZoomChange={changedZoom => (setZoom(changedZoom))}
                            />
                            <button 
                                    onClick={() => showResult(setFieldValue)}
                                    disabled={isCropping}
                                    className='show_result_btn'
                                ><FontAwesomeIcon icon={faCheckCircle}/></button> 
                                </>
                            }
                           
                        </div>
                        <div className="col-md-6 details d-flex flex-column justify-content-between align-items-center ">
                            <div className="form-group bio pb-2 ">
                                {/* <label className="" >Bio</label> */}
                                <Field  className="" as="textarea" name="bio" className="shadow-sm" placeholder="Edit bio.."/>
                            </div >
                            <div className="form-group username">
                                {/* <label className="" >Username</label> */}
                                <Field  className="shadow-sm" type="text" name="username" placeholder="Edit username.."/>
                                <div className="error">
                                    <ErrorMessage className="text-danger" component="small" name="username"/>
                                </div>
                            </div >
                            <div className="form-group email">
                                {/* <label className="" >Email</label> */}
                                <Field  className="shadow-sm" type="email" placeholder="Edit email.." name="email"/>
                                <div className="erorr">
                                    <ErrorMessage className="text-danger" component="small" name="email"/>
                                </div>
                            </div >

                            {isSubmitting && <Loader/>}
                            <div className="form-group p-3 ">
                                    <button type="submit" className="btn btn-dark rounded-pill" disabled={isSubmitting}> Update</button>
                            </div>

                        </div>
                       
                    </Form>
                )}
            </Formik>
           
        </div>
        }
        </>
    );
}

function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

export default ProfileEdit;