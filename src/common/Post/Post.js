import React from 'react';
import config from '../../config/index';
import Moment from 'react-moment';
import PostLike from './PostLike/PostLike';
import Avatar from '../Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBookmark} from '@fortawesome/free-regular-svg-icons';
import './Post.scss';
import { Link } from 'react-router-dom';
import Username from '../Username/Username';

function Post(props) {

    return (
        <article className="Post col-md-6 col-lg-4 p-0 p-md-2">
            <div className="componenent_layout_between p-2">
                <Link to={`/profile/${props.postData.user._id}`}>
                    <Avatar image={props.postData.user.avatar} size="md"/>
                    <Username name={props.postData.user.username} size="sm" padding={true}/>
                </Link>
                <Moment format="DD/MM/YYYY" className="font-weight-light">{props.postData.createdAt}</Moment>
            </div>
            <Link className="Post_image" to={`/posts/${props.postData._id}`}>
                <img className="w-100" src={`${config.apiUrl}/posts/${props.postData.image}`} />
            </Link>
            <div className="Post_actions p-2">
                <PostLike likes={props.postData.likes}
                            postId={props.postData._id}
                            userId={props.postData.user._id}
                />
                <FontAwesomeIcon icon={faComment}  />
                <FontAwesomeIcon icon={faBookmark}/>

                {/* insert link to likes num */}
            </div>
                <div className="description p-2">
                    {props.postData.description}
                </div>
        </article>
    );
}

export default Post;