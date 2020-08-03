import React from 'react';
import config from '../../config/index';
import Moment from 'react-moment';
import PostLike from './PostLike/PostLike';
import Avatar from '../Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBookmark} from '@fortawesome/free-regular-svg-icons';
import './Post.scss';
import { Link } from 'react-router-dom';
function Post(props) {

    return (
        <article className="Post rounded col-md-4 p-0">
                <div className="details componenent_layout_between">
                    <Moment format="DD/MM/YYYY">{props.postData.createdAt}</Moment>
                    <div className="user">
                        <span>{props.postData.user.username}</span>
                        <Link to={`/profile/${props.postData.user._id}`}>
                            <Avatar image={props.postData.user.avatar} size="md"/>
                        </Link>
                    </div>
                </div>
                <Link className="Post_image" to={`/posts/${props.postData._id}`}>
                    <img src={`${config.apiUrl}/posts/${props.postData.image}`} />
                </Link>
                <div className="Post_actions componenent_layout_between">
                    <div className="d-flex flex-column"> 
                        <PostLike likes={props.postData.likes} postId={props.postData._id} userId={props.postData.user._id}/>
                        <div> {/* make a comment component*/}
                            <FontAwesomeIcon icon={faComment} />
                             <input type="text" placeholder="Add comment" className="d-none"/>   
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faBookmark} className=""/>
                </div>
                <div className="description">
                    {props.postData.description}
                </div>
        </article>
    );
}

export default Post;