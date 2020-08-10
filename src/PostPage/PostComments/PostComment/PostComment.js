import React from 'react';
import Avatar from '../../../common/Avatar/Avatar';
import { Link } from 'react-router-dom';
import './PostComment.scss';
import Username from '../../../common/Username/Username';

function  PostComment(props) {
    return (
        <div className="PostComment d-flex">
            <Link className="col-2 d-flex justify-content-center align-items-center" to={`/profile/${props.comment.user._id}`}>
                <Avatar size="sm" image={props.comment.user.avatar}/>
            </Link>
            <div className="col-10">
                <Username name={props.comment.user.username} size="sm"/>
                <span className="pl-2">{props.comment.content}</span>
            </div>
        </div>
    );
}

export default PostComment;