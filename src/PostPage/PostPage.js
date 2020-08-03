import React, { useEffect, useState } from 'react';
import './PostPage.scss';
import { useParams } from 'react-router-dom';
import config from '../config/index';
import PostLike from '../common/Post/PostLike/PostLike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBookmark} from '@fortawesome/free-regular-svg-icons';
import Loader from '../Loader/Loader';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar/Avatar';
import PostComments from './PostComments/PostComments';


function PostPage(props) {
    
    const [post, setPost] = useState({})
    const { id } = useParams();  
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if(!id) return ;
        console.log(id);
        getPost(id);
        console.log(post);
    }, [id])
    
    async function getPost(id) {
        const fetchedPost = await (await fetch(`${config.apiUrl}/posts/${id}`,{
            credentials: 'include'
        })).json();
        console.log(fetchedPost);
        setPost(fetchedPost);
        setIsLoading(false);
    }

    return (
        <article className="PostPage container-md row">
        {isLoading ? <Loader/>
        : 
        <>
            <div className="col-md-8 col-12">
                <div className="image">
                    <img src={`${config.apiUrl}/posts/${post.image}`} />
                </div>
            </div>
            <div className="details componenent_layout_between col-md-4 col-12">
                <Moment format="DD/MM/YYYY">{post.createdAt}</Moment>
                <div className="user">
                    <span>{post.user.username}</span>
                    <Link to={`/profile/${post.user._id}`}>
                        <Avatar image={post.user.avatar} size="md"/>
                    </Link>
                </div>
            </div>
        

            <div className="col-md-8 col-12">
                <div className="Post_actions componenent_layout_between">
                    {post.description}
                    <div className="d-flex"> 
                        <PostLike likes={post.likes} postId={post._id} userId={post.user._id}/>
                        <FontAwesomeIcon icon={faBookmark} className=""/>
                    </div>
                </div>
                <div className="description">
                </div>
            </div>
            <div className="col-12 col-md-4"> {/* make a comment component*/}
              
                <PostComments postId={post._id}/>
                {/* <input type="text" placeholder="Add comment" className="d-none"/>    */}
            </div>
        </>
} 
</article>
            
    );
}

export default PostPage;