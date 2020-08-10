import React, { useContext, useState, useEffect} from 'react';
import { UserContext } from '../../user-context';
import config from '../../config/index';
import Avatar from '../../common/Avatar/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';
import './ProfileUser.scss';
import Username from '../../common/Username/Username';



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

    const editUser = selectUser() ? "pl-4" : 'd-none';
    return (
        <header className="Profile-header">
            <div className="d-flex mb-3">
                <div className="col-5 d-flex align-items-center justify-content-center pl-4">
                    <Avatar size="lg" image={profile.avatar} />
                </div>
                <div className="col-7 ">
                    <div className="username d-flex justify-content-start align-items-center">
                        <Username name={profile.username} size="lg" />
                        {/* <div className="col-3 text-center">{profile.username}</div> */}
                        <Link to="/profile/edit" className={editUser}>
                            <FontAwesomeIcon icon={faEdit} className="text-dark"/>
                        </Link>
                        {/* //settings */}
                    </div>
                    <div className="bio mt-3">
                        {profile.bio}
                    </div>
                </div>
            </div>
            <div className="profile_details justify-content-around align-items-center d-flex">
                <div className="text-center"> {props.postsNum} posts</div>
                <div className="text-center"> 0 followers</div>
                <div className="text-center"> 0 following</div>
            </div>
        </header>
    );
}

export default ProfileUser;