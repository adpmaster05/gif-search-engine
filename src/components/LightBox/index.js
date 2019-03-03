import React, { Component } from 'react';
import './Lightbox.css';
import Slide from './Slide';
import Context from '../../Context';

class Lightbox extends Component {

    static contextType = Context;

    render() {

        return (
            <div className="gifs-lightbox">
                <span className="close cursor" onClick={this.props.closeLightbox}>&times;</span>
                <div className="lightbox-content">
                    <Slide src={this.context.selectedGif.images.downsized_large.url} />
                    <span className="prev" onClick={this.context.prevSlide}>&#10094;</span>
                    <span className="next" onClick={this.context.nextSlide}>&#10095;</span>
                </div>
            </div>
        )
    }
}

export default Lightbox;