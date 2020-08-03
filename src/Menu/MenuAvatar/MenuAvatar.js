import React, { useContext } from 'react';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './MenuAvatar.scss';
import { UserContext } from '../../user-context';
import Avatar from '../../common/Avatar/Avatar';
import { Link } from 'react-router-dom';

function MenuAvatar(props) {

    const {user} = useContext(UserContext);

    return (
        <Link className="MenuAvatar text-white" to={`/profile/${user._id}`}>
            <Avatar image={user.avatar}/>
           
        </Link>
    );
}

export default MenuAvatar;