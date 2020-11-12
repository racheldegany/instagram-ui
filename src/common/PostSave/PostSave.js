import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import config from '../../config/index';
import { UserContext } from '../../user-context';


function PostSave(props) {
    const {user, setUser} = useContext(UserContext);
    // const [likes, setLikes]= useState(props.likes);
    const [hasSaved, setHasSaved] = useState(hasUserSaved());

    function hasUserSaved() {
        return user?.savedPosts.includes(props.postId);
    }

    useEffect( () => {
        handleSave();
    }, [hasSaved])

    async function handleSave() {
        try {
            const user = hasSaved ? await save() : await unSave();
            setUser(user);
        } catch(err) {
            console.log(err);
        }
    }
    
    async function save() {
        try{
            const res = await fetch(`${config.apiUrl}/users/savePost${props.postId}`, {
                method: 'POST',
                credentials: 'include'
            });
            if(res.status === 400){
                return;
            }
            return await res.json();
        } catch(err) {
            console.log('unknown error');
        }
    };
        
    async function unSave() {
		// const url = `${config.apiUrl}/posts/${props.postId}/likes/${user._id}`;
		// const response = await fetch(url, {
		// 	method: 'DELETE',
		// 	credentials: 'include'
		// });
        // return await response.json();
        console.log('delete');
	}
    
    const savedClass = hasSaved ? "red" : 'black';

    return (
        <FontAwesomeIcon icon={faBookmark} style={{color: savedClass}} onClick={() => setHasSaved(!hasSaved)}/>
    );
}

export default PostSave;


