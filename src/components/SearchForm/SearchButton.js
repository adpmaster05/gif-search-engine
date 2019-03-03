import React from 'react';

export default (props) => {
    var styles = {
        backgroundColor: 'rgb(236, 233, 233)',
        color: 'black',
        height: 34,
        width: 190,
        borderWidth: 0,
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 5
    };
    return (
        <button className="search-button" style={styles} onClick={props.onClick}>
            {props.text}
        </button>
    );
};