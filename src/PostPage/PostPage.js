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
import CommentCreate from './PostComments/CommentCreate/CommentCreate';
import Username from '../common/Username/Username';


function PostPage(props) {
    
    const [post, setPost] = useState({})
    const { id } = useParams();  
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if(!id) return ;
        getPost(id);
    }, [id])
    
    async function getPost(id) {
        const fetchedPost = await (await fetch(`${config.apiUrl}/posts/${id}`,{
            credentials: 'include'
        })).json();
        // console.log(fetchedPost);
        setPost(fetchedPost);
        setIsLoading(false);
    }

    return (
        <article className="PostPage row">
        {isLoading ? <Loader/>
        : 
        <>
            <div className="post_image col-md-7 col-lg-6">
                
                {/* <div className="image"> */}
                    <img src={`${config.apiUrl}/posts/${post.image}`} />
                {/* </div> */}
                <div className="Post_actions pt-2 pt-md-3 pt-lg-2 d-flex justify-content-around align-items-baseline ">
                        <button className=""><FontAwesomeIcon icon={faBookmark} /></button>
                        <label  htmlFor="comment" className="text-center "><FontAwesomeIcon icon={faComment}/></label>
                        <button  className=""><PostLike likes={post.likes} postId={post._id} userId={post.user._id} /></button>
                </div>
            </div>
            <div className="col-md-5 offset-lg-1">
                <div className="details d-flex justify-content-between">
                    {/* <Moment format="DD/MM/YYYY">{post.createdAt}</Moment> */}
                    <Link to={`/profile/${post.user._id}`}  className="col-2 d-flex justify-content-center align-items-start">
                        <Avatar image={post.user.avatar} size="md"/>
                    </Link>
                    <div className="user col-10">
                        <div className="d-flex justify-content-between ">
                            <Username name={post.user.username} size="md"/>
                            <div className="">likes num</div>

                        </div>
                        {/* <span>{post.user.username}</span> */}
                        <div className="description">
                            {post.description}
                        </div>
                    </div>
                    
                </div>

                <PostComments postId={post._id}/>

            </div>
                
                
                {/* <div className="">
                <div className="Post_actions componenent_layout_between">
                    {post.description}
                    <div className="d-flex"> 
                        <PostLike likes={post.likes} postId={post._id} userId={post.user._id}/>
                        <FontAwesomeIcon icon={faBookmark} className=""/>
                    </div>
                </div>
                <div className="description">
                </div>
            </div> */}

            {/* <div className=""> make a comment component */}
              
             
              {/* <input type="text" placeholder="Add comment" className="d-none"/>    */}
          {/* </div> */}

            
           
        

            
            
        </>
} 
</article>
            
    );
}

export default PostPage;