import React, { useContext, useState, useEffect} from 'react';
import { UserContext } from '../../user-context';
import config from '../../config/index';
import Avatar from '../../common/Avatar/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';
import './ProfileUser.scss';



function ProfileUser(props) {
    const [ profile, setProfile] = useState({});
    const { user } = useContext(UserContext);

    useEffect( () =>{
        getUser(props.userId);
    }, [props.userId]);
    
    function selectUser() {
        if(props.userId === user._id) return true;
        return false;
    }

    async function getUser(id) {
        if(selectUser()) return setProfile(user);
        const fetchedUser = await (await fetch(config.apiUrl + '/users/'+ id, {
            credentials: 'include'
        })).json();
        setProfile(fetchedUser);
    }

    const editUser = !selectUser() ? "editUser" : '';
    return (
        <header className="Profile-header col-12">
            <div className="d-flex align-items-center">
                <Avatar size="lg" image={profile.avatar} className="col-3"/>
                <div className="col-9 d-flex justify-content-between">
                    <div className="text-center"> {props.postsNum} posts</div>
                    <div className="text-center"> 0 followers</div>
                    <div className="text-center"> 0 following</div>
                </div>
            </div>
            <div className="componenent_layout_between">
                <div className="col-3 text-center">{profile.username}</div>
                <Link to="/profile/edit" className={editUser}>
                    <FontAwesomeIcon icon={faEdit} className="text-dark"/>
                </Link>
            </div>
            <div className="col-12">
                {profile.bio}
            </div>
        </header>
    );
}

export default ProfileUser;