import React, { useEffect, useState } from 'react';
import config from '../../config/index';
import avatarDefault from '../../assest/img/avatar-default.jpg';
import './PostsRandom.scss';
import Post from '../../common/Post/Post';
import { Link, useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
// import anime from 'animejs/lib/anime.es.js';
import ReactCardFlip from 'react-card-flip';
import PostsRandomCard from './PostsRandomCard/PostsRandomCard';

function PostsRandom(props) {
    const [post, setPost] = useState(null);
    const [reveal, setReveal] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const history = useHistory();
    let items = [];
   
    useEffect(() => {
        getPost();
    }, []);

    async function getPost() {
        try {
            const res = await fetch(config.apiUrl + '/posts/random', {
                credentials: 'include'
            });
            if (res.status === 400) {
                console.log('post not found');
                return;
            }
            const postResult = await res.json();
            setPost(postResult);
            // setIsLoading(false);
        } catch (err) {
            console.log('unknown error');
        }
    }
    
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    function showPost(){
        setIsFlipped(true);
        setTimeout(()=>{
            history.push(`/posts/${post?._id}`);
        }, 1000)
    }

    return (
            <Carousel
                    interval={500}
                    controls={false}
                    activeIndex={index}
                    indicators={false}
                    onSelect={handleSelect}
                    wrap={false}
                    className="PostsRandom"
                >
                  {/* {items.map((item, index) => (
                     <PostsRandomCard front={item} back={post?.image} key={index}/>
                  ))} */}
                    <Carousel.Item >
                        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className="d-flex justify-content-center" >
                            <img className="image" onClick={showPost} src={'https://i.pinimg.com/564x/c0/72/6e/c0726ec41492a7a6ceb5dcc04184eb8c.jpg'}/>
                            <Link className="image" to={`/posts/${post?._id}`}>
                                <img className="" src={`${config.apiUrl}/posts/${post?.image}`} />
                            </Link>
                        </ReactCardFlip>
                    </Carousel.Item>
                    <Carousel.Item>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className="d-flex justify-content-center">
                    <img className="image" onClick={showPost} src={'https://i.pinimg.com/564x/82/b6/b4/82b6b4e83d49c57b604d299dc80bebe1.jpg'}/>
                            <Link className="image" to={`/posts/${post?._id}`}>
                                <img className="" src={`data:image/jpeg;base64,${post?.image}`} />
                                {/* {${config.apiUrl}/posts/${post?.image}`} */}
                                
                            </Link>
                        </ReactCardFlip>
                    </Carousel.Item>
                    <Carousel.Item>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className="d-flex justify-content-center">
                    <img className="image" onClick={showPost} src={'https://i.pinimg.com/564x/da/0b/e0/da0be00fd7245eff41544826c02af034.jpg'}/>
                            <Link className="image" to={`/posts/${post?._id}`}>
                                <img className="" src={`${config.apiUrl}/posts/${post?.image}`} />
                            </Link>
                        </ReactCardFlip>
                                        </Carousel.Item>
                    <Carousel.Item>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className="d-flex justify-content-center">
                    <img className="image" onClick={showPost} src={'https://i.pinimg.com/564x/e5/30/63/e53063af8da144968ee97373f1734f8d.jpg'}/>
                            <Link className="image" to={`/posts/${post?._id}`}>
                                <img className="" src={`${config.apiUrl}/posts/${post?.image}`} />
                            </Link>
                        </ReactCardFlip>
                                        </Carousel.Item>
                    <Carousel.Item>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className="d-flex justify-content-center">
                    <img className="image" onClick={showPost} src={'https://i.pinimg.com/564x/b9/c2/7d/b9c27d28a3bfe66157ec07c60bcbc2e0.jpg'}/>
                            <Link className="image" to={`/posts/${post?._id}`}>
                                <img className="" src={`${config.apiUrl}/posts/${post?.image}`} />
                            </Link>
                        </ReactCardFlip>
                                        </Carousel.Item>
                    <Carousel.Item >
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" >
                    <img className="image" onClick={showPost} src={'https://i.pinimg.com/564x/db/d2/94/dbd294fd1caa24fd9cb025e3fe56451e.jpg'}/>
                            <Link className="image" to={`/posts/${post?._id}`}>
                                <img className="" src={`${config.apiUrl}/posts/${post?.image}`} />
                            </Link>
                        </ReactCardFlip>
                                        </Carousel.Item>

                </Carousel>
    );
}

export default PostsRandom;