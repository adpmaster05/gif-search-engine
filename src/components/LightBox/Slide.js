import React from 'react';
import Gif from '../Gif';

export default (props) => {
    return (
        <div className="mySlides">
            <div className="numbertext">{props.slideNumber}</div>
            <Gif src={props.src} />
        </div>
    );
}