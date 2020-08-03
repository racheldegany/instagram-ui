import React from 'react';
import Avatar from '../../../common/Avatar/Avatar';
import { Link } from 'react-router-dom';

function PostComment(props) {
    return (
        <div className="d-flex">
            <Link to={`/profile/${props.comment.user._id}`}>
                <Avatar size="sm" image={props.comment.user.avatar}/>
            </Link>
            <span>{props.comment.content}</span>
        </div>
    );
}

export default PostComment;