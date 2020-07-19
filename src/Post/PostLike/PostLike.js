import React, { useState, useContext } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import config from '../../config/index';
import './PostLike.scss';
import { UserContext } from '../../user-context';

function PostLike(props) {

    //send the has like to use effect
    const {user} = useContext(UserContext);
    const [likes, setLikes]= useState(props.likes);
    const [hasLiked, setHasLiked] = useState(hasUserLiked());

    
    function hasUserLiked() {
        return props.likes.includes(user._id);
    }
    
    async function LikeHandler () {
        try{
            const res = await fetch(`${config.apiUrl}/posts/${props.postId}/likes`, {
                method: 'POST',
                credentials: 'include'
            });
            if(res.status === 400){
                return;
            }
            const post = await res.json();
            
            setLikes(post.likes);
            setHasLiked(true);
        } catch(err) {
            console.log('unknown error');
        }
        
        
        
        
    };
    
    const likedClass = hasLiked ? "userLiked" : '';
    return (
        <div className="PostLike" >
            <button onClick={LikeHandler}><FontAwesomeIcon icon={faHeart} className={likedClass}/></button>
            <span className="sumOfLikes">{likes.length}</span>
        </div>
    );
}

export default PostLike;