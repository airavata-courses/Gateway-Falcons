// https://reactjsexample.com/vertical-carousel-background-image-with-react-js/

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './overrides.css';  // change this to the file path of your overrides

// TODO: use slider data

var Carousel = require('react-responsive-carousel').Carousel;
// https://github.com/leandrowd/react-responsive-carousel/issues/150

const items = [
    {
        imgSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        text: "img1"
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        text: "img2"

    },
    {
        imgSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        text: "img2"
    },
]

function makeDiv(imageObj, index) {
    const { imgSrc, text } = imageObj;
    return (
        <div key={index} >
            <img src={ imgSrc } />
            <p className="legend"> { text }</p>
        </div>
    )
}

function AnimSlider() {

    return (
        //  onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
        <Carousel showArrows={true} style={{ width: "100%", height: 600 }}
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
            {/* {
                items.map((item, index) => (makeDiv(item, index)))
            } */}
        </Carousel>
    );
}

export default AnimSlider;

