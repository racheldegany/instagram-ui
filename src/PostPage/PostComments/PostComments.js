import React, { useState, useEffect } from 'react';
import config from '../../config/index';
import Loader from '../../Loader/Loader';
import PostComment from './PostComment/PostComment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment} from '@fortawesome/free-regular-svg-icons';
import CommentCreate from './CommentCreate/CommentCreate';
import './PostComments.scss';
// import { useParams } from 'react-router-dom';

function PostComments({postId, modal, toggle}) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const { id } = useParams();

    useEffect(() => {
        if(!postId) return;
        getComments(postId);
    }, [postId]);
    
    
    
    async function getComments() {
        try {
            // if (!id) {
                // 	return;
                // }
                const commentsArr = await (await fetch(config.apiUrl + '/posts/'+ postId + '/comment?sort=-1', {
                    credentials: 'include'
                })).json();
                setComments(commentsArr);
                setIsLoading(false);
                console.log(commentsArr);
            } catch(err) {
                console.log(err);
            }
        }
        
    function onAddedComment(comment) {
        setComments([comment, ...comments ]);
    }

    return (
        <>
            {isLoading ? <Loader/>
            :<div className="PostComments">
                {/* <div className=""> */}
                    {comments.map(comment => (
                        <PostComment comment={comment} key={comment._id} />
                        ))
                        
                    }
                {/* </div> */}
                {/* <div className="create_comment d-flex justify-content-center align-items-center"> */}

                    <CommentCreate postId={postId} onAdd={onAddedComment} modal={modal} toggle={toggle}/>
                {/* </div> */}
                
            </div>
            }
                 
        </>
        
    );
}

export default PostComments;