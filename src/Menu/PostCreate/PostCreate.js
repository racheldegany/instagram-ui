import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { PostCreateSchema } from './PostCreate.schema';
import config from '../../config/index';
import { useHistory } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import './PostCreate.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

function PostCreate(props) {
    const history = useHistory();
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(4 / 4);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    

    const buildFormData = (values) => {

        const data = new FormData();
        for(const key in values) {
            data.append(key, values[key]);
        }
        return data;
    }



    const submit = async (values) => {
        const data = buildFormData(values);
        console.log(data.get('image')); 
        // console.log(data);

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

    const inputPhoto = !imageSrc ? 'start_input_photo' : 'change_input_photo';

    return (
        <div className="PostCreate"> 
            {/* <h2> Create Post</h2> */}
            <Formik
                initialValues={{description: '', image: ''}}
                validationSchema={PostCreateSchema}
                onSubmit={submit}
            >
                {({errors, touched, isSubmitting, setFieldValue}) => (
                    <Form>
                        {croppedImage && <img src={URL.createObjectURL(croppedImage)} onClick={()=> setCroppedImage(null)} className="cropped_image"/>}
                        <div className={inputPhoto}>
                            <label for="image"><FontAwesomeIcon icon={faCloudUploadAlt}/>
                                <input type="file" name="image" id="image" onChange={(e) => onFileChange(e)}/>
                            </label>
                            
                            {imageSrc && !croppedImage && <div> 
                                <Cropper
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
                            </div> 
                            } 
                        </div>
                        <div className="form-group description shadow">
                            {/* <label className="col" >Description</label> */}
                            <Field as="textarea" placeholder="Add description.." name="description"/>
                        </div >

                        {isSubmitting && <Loader/>}
                        <div className="post ">
                                <button type="submit" className="btn shadow-sm" disabled={isSubmitting}> Post</button>
                        </div>
                    </Form>
                )}
            </Formik>
           
        </div>
    );
}

function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

export default PostCreate;