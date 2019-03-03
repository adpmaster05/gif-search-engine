import React from 'react';
import './Gif.css';

export default (props) => {
    const onSelect = props.onClick ? props.onClick : () => {console.log('clicked')};
    return (
        <img src={props.src} alt="Gif" style={props.styles} onClick={onSelect} />
    );
};