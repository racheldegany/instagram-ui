import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import './PostsRandomCard.scss';


function PostsRandomCard(props) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <Carousel.Item className="PostsRandomCard">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div class="front" onClick={() => setIsFlipped(true)}>
                    A
                </div>
                <div class="back">
                    B
                </div>
            </ReactCardFlip>
        </Carousel.Item>
    );
}

export default PostsRandomCard;