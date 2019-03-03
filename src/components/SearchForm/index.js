import React from 'react';
import './styles.css';

export default (props) => {
    return (
        <form onSubmit={event => event.preventDefault()}>
            <div>
                <input type="text" className="text-field" 
                    value={props.searchParam} onChange={props.handleInputChange}
                />
            </div>
            <div style={{ paddingTop: 5 }}> 
                <button className="search-button" onClick={props.doSearch}>
                    {props.buttonText}
                </button>
            </div>
        </form>
    );
};