import React, { useContext } from 'react';
import './Post.scss';
import config from '../config/index';
import Moment from 'react-moment';
import PostLike from './PostLike/PostLike';
import Avatar from '../Avatar/Avatar';
// import { UserContext } from '../user-context';

function Post(props) {

    // const {user} = useContext(UserContext);
    return (
        <article className="  col-md-4 ">
            <div className="Post rounded">
                <div className="details">
                    <Avatar image={props.postData.user.avatar} size="md"/>
                    {/* {console.log(props.postData.createdAt.toLocalDateString())} */}
                    {/* dateTime do componenet for post date that gets month and evertything and return the string */}
                    {/* <span>{props.postData.createdAt}</span> */}
                    <Moment format="DD/MM/YYYY">{props.postData.createdAt}</Moment>
                </div>
                <div className="image">
                    <img className="" src={`${config.apiUrl}/posts/${props.postData.image}`} />
                </div>
                <PostLike likes={props.postData.likes} postId={props.postData._id}/>
                <div className="description">
                    {props.postData.description}
                </div>
            </div>
            
        </article>
    );
}

export default Post;