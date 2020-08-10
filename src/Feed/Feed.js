import React, { useEffect, useState } from 'react';
import config from '../config/index';
import Post from '../common/Post/Post';
import './Feed.scss';

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        getPosts();
    } ,[]);
    
    async function getPosts() {
        try{
            const res = await fetch( config.apiUrl + '/posts?sort=-1', {
                credentials: 'include'
            });
            if(res.status === 400){
                console.log('posts not found');
                return;
            }
            const postsArr = await res.json();
            setPosts(postsArr);
        } catch (err) {
            console.log('unknown error');
        }
    }

    return (
        <div className="Feed d-md-flex flex-md-wrap">
            {posts.map(post => (
                <Post postData={post}
                      key={post._id}
                />
            ))}
            
        </div>
    );
}

export default Feed;