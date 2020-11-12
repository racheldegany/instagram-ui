import React from 'react';
import Avatar from '../Avatar/Avatar';
import './UserResult.scss';
import {Link} from 'react-router-dom';
import Username from '../Username/Username';

function UserResult(props) {
    return (
        <div className="UserResult col-12 col-md-6 col-lg-4">
            <div className="p-2 rounded shadow-sm w-100 h-100 d-flex justify-content-between align-items-center">
                <Link className="" to={`/profile/${props.user._id}`}>
                    <Avatar image={props.user.avatar}
                            size="md"
                            className="avatar "
                    />
                    <Username name={props.user.username} size="md" padding={true}/>
                </Link>
                {/* <div>follow</div> */}
            </div>
        </div>
    );
}

export default UserResult;