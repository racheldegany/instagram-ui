import React, { useState, useEffect } from 'react';
import config from '../../config/index';
import Loader from '../../Loader/Loader';
import { useParams } from 'react-router-dom';
import UserResult from '../UserResult/UserResult';


function PostLikesPage(props) {

    
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const {id} = useParams();
useEffect(()=>{
    getUsers();
})

async function getUsers() {
    try{
        const res = await fetch( `${config.apiUrl}/posts/${id}/likes`, {
            credentials: 'include'
        });
        if(res.status === 400){
            console.log('likes users not found');
            setIsLoading(false);
            return;
        }
        const likesUsersArr = await res.json();
        // console.log(usersArr);
        setUsers(likesUsersArr);
        setIsLoading(false);

    } catch (err) {
        console.log('unknown error');
    }
}


    return (
        <>
        { isLoading ? <Loader/>
            : <div className="d-flex flex-wrap">
            {users.map(user => (
                <UserResult
                    key={user._id}
                    user={user}  
                />
            ))}
            </div>

        }
        </>
    );
}

export default PostLikesPage;