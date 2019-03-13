// https://reactjsexample.com/vertical-carousel-background-image-with-react-js/

import React, { Component } from "react";
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";

// TODO: use slider data

var Carousel = require('react-responsive-carousel').Carousel;
// https://github.com/leandrowd/react-responsive-carousel/issues/150

const images = [
    {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        description: "img 1"
    },
    {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
    },
    {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
    }
]

function makeDiv(imageObj, index) {
    const { imgSrc, text } = imageObj;
    return (
        <div key={index} >
            <img src={imgSrc} />
            <p className="legend"> {text}</p>
        </div>
    )
}

class AnimSlider extends Component {

    _onImageClick(event) {
        var currentIndex = this._imageGallery.getCurrentIndex();
        alert(currentIndex);

        /** 
         * TODO:
         * look up current image url by index
         * attach to light box || direct link
         * navigate
         */

    }

    render() {
        return (
            <ImageGallery
                ref={i => this._imageGallery = i}
                items={images}
                showThumbnails={false}
                infinite={true}
                showIndex={true}
                showBullets={true}
                onClick={this._onImageClick.bind(this)}
            />
        );
    }
}

export default AnimSlider;

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import './overrides.css';  // change this to the file path of your overrides

//  onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
{/* <Carousel showArrows={true} style={{ width: "100%", height: 600 }}
            infiniteLoop={true}
            autoPlay={true}
            swipeable={true}
            showThumbs={false}
        >
            <div>
                <img src="https://www.w3schools.com/w3css/img_lights.jpg"
                />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="https://www.w3schools.com/w3css/img_lights.jpg" />
                <p className="legend">Legend 2</p>
            </div>
            {
                items.map((item, index) => (makeDiv(item, index)))
            }
        </Carousel> */}