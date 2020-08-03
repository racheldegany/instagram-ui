import React from 'react';
import Avatar from '../../common/Avatar/Avatar';
import './SearchResult.scss';
import {Link} from 'react-router-dom';

function SearchResult(props) {
    return (
        <Link className="SeachResult rounded shadow-sm" to={`/profile/${props.user._id}`}>
            <Avatar image={props.user.avatar}
                    size="md"
                    className="avatar "
            />
            <div className="user-details">
                <div>{props.user.username}</div>
                <div>{props.user.bio}</div>
            </div>
            
        </Link>
    );
}

export default SearchResult;