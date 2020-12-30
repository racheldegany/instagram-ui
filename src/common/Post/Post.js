import React, { useState, useContext } from 'react';
import config from '../../config/index';
import Moment from 'react-moment';
import PostLike from './PostLike/PostLike';
import Avatar from '../Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBookmark} from '@fortawesome/free-regular-svg-icons';
import './Post.scss';
import { Link } from 'react-router-dom';
import Username from '../Username/Username';
import PostSave from '../PostSave/PostSave';
import { UserContext } from '../../user-context';

function Post(props) {
    const [likes, setLikes]= useState(props.postData.likes);
    // const {user} = useContext(UserContext);

    


    return (
        <article className="Post col-md-6 col-lg-4 p-0 p-md-2">
            <div className="d-flex align-items-center justify-content-between pb-2 pt-2">
                <Link to={`/profile/${props.postData.user._id}`}>
                    <Avatar image={props.postData.user.avatar} size="md"/>
                    <Username name={props.postData.user.username} size="sm" padding={true}/>
                </Link>
                <Moment format="DD/MM/YYYY" className="font-weight-light">{props.postData.createdAt}</Moment>
            </div>
            <Link className="Post_image" to={`/posts/${props.postData._id}`}>
                <img className="w-100"  src={`data:image/jpeg;base64,${props.postData.image}`}/>
                {/* src={`${config.apiUrl}/posts/${props.postData.image}`}  */}
            </Link>
            <div className="Post_actions p-2 d-flex align-items-center justify-content-between">
                <PostLike likes={likes || props.postData.likes}
                            postId={props.postData._id}
                            userId={props.postData.user._id}
                            setLikes={setLikes}
                />
                {/* <FontAwesomeIcon icon={faComment}  /> */}
                <Link to={`/posts/${props.postData._id}/likes`}>
                    <span className="text-dark">{likes?.length} likes</span>
                </Link>
                {/* <PostSave postId={props.postData._id} /> */}
                {/* <FontAwesomeIcon icon={faBookmark} /> */}

                {/* insert link to likes num */}
            </div>
                <div className="description p-2">
                    {props.postData.description}
                </div>
        </article>
    );
}

export default Post;