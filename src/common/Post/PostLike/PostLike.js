import React, { useState, useContext, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import config from '../../../config/index';
import './PostLike.scss';
import { UserContext } from '../../../user-context';

function PostLike(props) {

    const {user} = useContext(UserContext);
    const [likes, setLikes]= useState(props.likes);
    const [hasLiked, setHasLiked] = useState(hasUserLiked());

    function hasUserLiked() {
        return props.likes.includes(props.userId);
    }

    useEffect( () => {
        handleLike();
    }, [hasLiked])

    async function handleLike() {
        try {
            const post = hasLiked ? await like() : await unlike();
            setLikes(post.likes);
        } catch(err) {
            console.log(err);
        }
    }
    
    async function like() {
        try{
            const res = await fetch(`${config.apiUrl}/posts/${props.postId}/likes`, {
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
        
    async function unlike() {
		const url = `${config.apiUrl}/posts/${props.postId}/likes/${user._id}`;
		const response = await fetch(url, {
			method: 'DELETE',
			credentials: 'include'
		});
		return await response.json();
	}
    
    const likedClass = hasLiked ? "userLiked" : '';

    return (
        <div className="PostLike" >
           <FontAwesomeIcon icon={faHeart} className={likedClass} onClick={() => setHasLiked(!hasLiked)}/>
            <div className="allLikes flex-wrap">{likes.length} likes</div>
        </div>
    );
}

export default PostLike;