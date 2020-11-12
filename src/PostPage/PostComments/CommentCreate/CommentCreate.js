import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import Loader from '../../../Loader/Loader';
import { CommentCreateSchema } from './CommentCreate.schema';
import config from '../../../config/index';
import Avatar from '../../../common/Avatar/Avatar';
import { UserContext } from '../../../user-context';
import './CommentCreate.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function CommentCreate({postId, onAdd, modal, toggle}) {

    const { user } = useContext(UserContext);
    // const [modal, setModal] = useState(false);

    // const toggle = () => setModal(!modal);

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

        <Modal isOpen={modal} toggle={toggle} className="CommentCreate d-flex align-items-center justify-content-center">
            {/* <ModalHeader toggle={toggle}>Add comment</ModalHeader> */}
            <ModalBody>
                <Formik
                    initialValues={{content: ''}}
                    validationSchema={CommentCreateSchema}
                    onSubmit={submit}
                >
                     {({errors, touched, isSubmitting}) => (
                        <Form className=" d-flex flex-column align-items-center justify-content-between">
                            <div className="form-group d-flex justify-content-between align-items-center w-100"> 
                                <Avatar image={user?.avatar} size="sm"/>
                                <Field  className="rounded-pill" as="textarea" placeholder="Add comment.." name="content" id="comment"/>

                            </div>
                            
                            {/* <div className="form-group"> */}
                                {/* <label className="col" >Description</label> */}
                            {/* </div > */}

                            {isSubmitting && <Loader/>}
                            <div className="form-group w-100 d-flex justify-content-end">
                                    <button type="submit" className="btn" disabled={isSubmitting} onClick={toggle}><FontAwesomeIcon icon={ faShareSquare}/></button>
                                <button className="btn" onClick={toggle}><FontAwesomeIcon icon={faTimes}/></button>
                            </div>
                        
                        
                        </Form>
                    )}  
                </Formik>
            </ModalBody>
            {/* <ModalFooter> */}
                {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
            {/* </ModalFooter> */}
        </Modal>
        

       
    );
}

export default CommentCreate;