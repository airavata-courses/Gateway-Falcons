// import React from "react";
// import CarouselSlider from "react-carousel-slider"

// const jsonData = {
//     "autoSliding": {
//         "items": [
//             {
//                 "imgSrc": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
//             },
//             {
//                 "imgSrc": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
//             },
//             {
//                 "imgSrc": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
//             },

//         ]
//     }
// }

// function AnimSlider() {

//     let manner = {
//         autoSliding: { interval: "3s" },
//         duration: "2s"
//     };

//     let accEleSetting;

//     let mobileRegx = /Mobi|Tablet|iPad|iPhone/;
//     if (mobileRegx.test(navigator.userAgent)) {
//         accEleSetting.button = false;
//     }

//     let buttonSetting = {
//         placeOn: "middle-inside",
//         hoverEvent: true,
//         style: {
//             left: {
//                 height: "50px",
//                 width: "50px",
//                 color: "#929393",
//                 background: "rgba(225, 228, 232, 0.8)",
//                 borderRadius: "50%"
//             },
//             right: {
//                 height: "50px",
//                 width: "50px",
//                 color: "#929393",
//                 background: "rgba(225, 228, 232, 0.8)",
//                 borderRadius: "50%"
//             }
//         }
//     };

//     return <CarouselSlider slideItems={jsonData.autoSliding.items}
//         manner={manner}
//         buttonSetting={buttonSetting} />;
// }

// export default AnimSlider;

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
// import './assets/index.less';
// import '../assets/index.less';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;

function Demo() {
    return (
        <BannerAnim type="across">
            <Element key="aaa"
                prefixCls="banner-user-elem"
                followParallax={{
                    delay: 1000,
                    data: [
                        { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                        { id: 'title', value: -20, type: 'x' },
                        { id: 'queue', value: 50, type: 'x' },
                        { id: 'JText', value: -30, type: 'x' },
                    ],
                }}
            >
                <BgElement
                    id="bg"
                    key="bg"
                    className="bg"
                    style={{
                        backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <QueueAnim id="queue" key="queue">
                    <h1 key="h1" id="title">Ant Motion Demo</h1>
                    <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                </QueueAnim>
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} id="JText">
                    Ant Motion Demo.Ant MotionDemo
        </TweenOne>
            </Element>
            <Element key="bbb"
                prefixCls="banner-user-elem"
            >
                <BgElement
                    key="bg"
                    className="bg"
                    style={{
                        backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <QueueAnim>
                    <h1 key="h1">Ant Motion Demo</h1>
                    <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                </QueueAnim>
                <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }}>
                    Ant Motion Demo.Ant Motion Demo
        </TweenOne>
            </Element>
        </BannerAnim>
    );
}

export default Demo;
