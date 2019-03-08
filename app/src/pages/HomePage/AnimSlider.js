import React from "react";
import CarouselSlider from "react-carousel-slider"

const jsonData = {
    "autoSliding": {
        "items": [
            {
                "imgSrc": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
            },
            {
                "imgSrc": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
            },
            {
                "imgSrc": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
            },

        ]
    }
}

function AnimSlider() {

    let manner = {
        autoSliding: { interval: "3s" },
        duration: "2s"
    };

    let accEleSetting;

    let mobileRegx = /Mobi|Tablet|iPad|iPhone/;
    if (mobileRegx.test(navigator.userAgent)) {
        accEleSetting.button = false;
    }

    let buttonSetting = {
        placeOn: "middle-inside",
        hoverEvent: true,
        style: {
            left: {
                height: "50px",
                width: "50px",
                color: "#929393",
                background: "rgba(225, 228, 232, 0.8)",
                borderRadius: "50%"
            },
            right: {
                height: "50px",
                width: "50px",
                color: "#929393",
                background: "rgba(225, 228, 232, 0.8)",
                borderRadius: "50%"
            }
        }
    };

    return <CarouselSlider slideItems={jsonData.autoSliding.items}
        manner={manner}
        buttonSetting={buttonSetting} />;
}

export default AnimSlider;
