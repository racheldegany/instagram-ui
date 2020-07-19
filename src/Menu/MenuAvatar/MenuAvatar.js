import React, { useContext } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './MenuAvatar.scss';
import { UserContext } from '../../user-context';
import Avatar from '../../Avatar/Avatar';

function MenuAvatar(props) {

    const {user} = useContext(UserContext);

    return (
        <div className="MenuAvatar">
            <Avatar image={user.avatar}/>
           
        </div>
    );
}

export default MenuAvatar;