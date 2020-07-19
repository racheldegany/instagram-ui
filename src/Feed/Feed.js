import React, { useEffect, useState } from 'react';
import config from '../config/index';
import Post from '../Post/Post';
import './Feed.scss';

function Feed(props) {
    const [posts, setPosts] = useState([]);
    useEffect( () => {
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
                // console.log(postsArr);
                
            } catch (err) {
                console.log('unknown error');
                
            }
            
        }
        getPosts();
    } ,[])

    return (
        <div className="Feed col-12 d-md-flex flex-md-wrap justify-content-md-around">
            {posts.map(post => (
                <Post postData={post}
                      key={post._id}
                />
            ))}
            {posts.map(post => (
                <Post postData={post}
                      key={post._id}
                />
            ))}
        </div>
    );
}

export default Feed;