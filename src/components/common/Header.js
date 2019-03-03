import React from 'react';

export default (props) => {
    var styles = {
        textAlign: 'center',
        color: '#757575'
    };
    return (
        <header style={styles}>
            <h1>{props.headerText}</h1>
        </header>
    );
};