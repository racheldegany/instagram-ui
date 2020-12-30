import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../user-context';
import config from '../config/index';
import './Profile.scss';
import Post from '../common/Post/Post';
import { useParams, Link } from 'react-router-dom';
import ProfileUser from './ProfileUser/ProfileUser';

function Profile(props) {

    // const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    
    
    useEffect(() => {
        getPosts();
	}, [id]);

    
    async function getPosts() {
		try {
			if (!id) {
				return;
			}
			const postsArr = await (await fetch(config.apiUrl + '/users/'+ id + '/posts?sort=-1', {
				credentials: 'include'
			})).json();
			setPosts(postsArr);
		} catch(err) {
			console.log(err);
		}
	}



    return (
        <div className="Profile">
            <ProfileUser userId={id} postsNum={posts.length}/>
            <div className="Profile-posts d-flex flex-wrap">
                {posts.map(post => (
                    <Link to={`/posts/${post._id}`} className="col-4 p-1">
                        <img className="  w-100" src={`data:image/jpeg;base64,${post.image}`} key={post._id}/>
                        
                        {/* {config.apiUrl}/posts/${post.image} */}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Profile;