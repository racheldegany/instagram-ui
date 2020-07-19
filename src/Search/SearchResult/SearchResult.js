import React from 'react';
import Avatar from '../../Avatar/Avatar';
import './SearchResult.scss';

function SearchResult(props) {
    return (
        <div className="SeachResult rounded  col-md-4 ">
            <Avatar image={props.user.avatar}
                    size="md"
                    className="avatar "
            />
            <div className="user-details">
                <div>{props.user.username}</div>
                <div>{props.user.bio}</div>
            </div>
            
        </div>
    );
}

export default SearchResult;