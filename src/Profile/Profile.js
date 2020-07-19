import React, { useContext, useState, useEffect } from 'react';
import Avatar from '../Avatar/Avatar';
import { UserContext } from '../user-context';
import config from '../config/index';
import './Profile.scss';
import Post from '../Post/Post';

function Profile(props) {

    const {user} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
		getPosts();
	}, [user]);

    async function getPosts() {
		try {
			if (!user._id) {
				return;
			}
			const res = await fetch(config.apiUrl + '/users/'+ user._id + '/posts?sort=-1', {
				credentials: 'include'
			});
			const postsArr = await res.json();
			setPosts(postsArr);
		} catch(err) {
			console.log(err);
		}
	}



    return (
        <div className="Profile col-12">
            <header className="Profile-header row">
                <Avatar size="lg" image={user.avatar} className="col-3"/>
                <div className="col-8">
                    <div>{user.username}</div>
                    <div className="d-flex justify-content-around">
                        <div className="col"> {posts.length} posts</div>
                        <div className="col"> 0 followers</div>
                        <div className="col"> 0 following</div>
                    </div>
                    <div>
                        This is real this is me..
                    </div>
                </div>
                
            </header>
            <div className="Profile-posts col-12 d-md-flex flex-md-wrap justify-content-md-around">
                {posts.map(post => (
                    <Post postData={post}
                            key={post._id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Profile;