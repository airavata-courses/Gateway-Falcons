import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { post } from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Page, PageTitle, Panel, PanelBody, PanelHeader } from 'react-gentelella';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper.css';
// import Coverflow from 'react-coverflow';
import Lightbox from 'react-image-lightbox';
import Gallery from "react-photo-gallery";
import * as Constants from '../../constants';

const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

const params = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    slidesPerView: 3,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    runCallbacksOnInit: true,
    slideToClickedSlide: true
    // onInit: (swiper) => {
    //     this.swiper = swiper
    // }
};

const photos = [
    { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
    { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
  ];

class MediaPage extends Component {

    constructor() {
        super();
        this.state = {
            selectedFile: null,
            images: [],
            index: 0,
            active: 0,
            isOpen: false,
            // mySwiper: new Swiper(params)
        };
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.moveNext = this.moveNext.bind(this);
        this.movePrev = this.movePrev.bind(this);
    }

    fetchImages() {
        // const username = `my_folder`;
        // fetch(`${Constants.serverUrl}/images/${username}`)
        //     .then(res => res.json())
        //     .then(images => this.setState({
        //         images: images.filter(image => image.bytes > 0)
        //     }))
        //     .catch(err => console.error(err));
        const images = [];
        for (var i = 0; i < 10; i++) {
            const image = {
                src: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                url: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                title: `something cool: ${i}`,
                caption: `something even cooler: ${i}`,
                context: {
                    custom: {
                        caption: "something cool"
                    }
                }
            }
            images[i] = image;
        }
        this.setState({
            images
        });
    }

    openLightbox(index) {
        console.log(index);
        this.setState({ isOpen: true, active: index });
    }

    closeLightbox() {
        this.setState({ isOpen: false });
    }

    componentDidMount() {
        console.log('mounted')
        this.fetchImages();
    }

    moveNext() {
        this.setState(prevState => ({
            index: (prevState.index + 1) % this.state.images.length,
            active: (prevState.index + 1) % this.state.images.length
        }));
        // this.state.swiper.slideTo(this.state.active);
    }

    movePrev() {
        this.setState(prevState => ({
            index: (prevState.index + this.state.images.length - 1) % this.state.images.length,
            active: (prevState.index + 1) % this.state.images.length
        }));
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
        const obj = {
            file: this.state.selectedFile,
            data: this.state.selectedFile.name
        };
        var formData = new FormData();
        for (var key in obj) {
            formData.append(key, obj[key]);
        }
        // for (var data of formData) {
        //     console.log(data);
        // }
        const config = {
            headers: {
                'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
            }
        }
        const servicePath = { servicePath: `${Constants.basePath}/media` }
        fetch(`${Constants.zookeeperurl}/getservice`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, cors, *same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(servicePath), // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(res => {
                console.log('URL: ' + 'http://' + res.data + '/upload');
                post('http://' + res.data + '/upload', formData, config)
                    .then((res2) => {
                        console.log(res2)
                        alert(res2.data);
                        if (res2.data == "Upload Successful") {
                            this.fetchImages();
                        }
                    })
                    .catch((err) => console.log(err));
            })
    }

    render() {
        const { images, index, active } = this.state;

        console.log(images);
        let lightbox;
        if (this.state.isOpen) {
            lightbox = (
                <Lightbox
                    mainSrc={images[index].url}
                    nextSrc={images[(index + 1) % images.length].url}
                    prevSrc={
                        images[(index + images.length - 1) % images.length].url
                    }
                    mainSrcThumbnail={images[index].url}
                    nextSrcThumbnail={images[(index + 1) % images.length].url}
                    prevSrcThumbnail={
                        images[(index + images.length - 1) % images.length].url
                    }
                    onCloseRequest={this.closeLightbox}
                    onMovePrevRequest={this.movePrev}
                    onMoveNextRequest={this.moveNext}
                    imageTitle={images[index].title}
                    imageCaption={images[index].caption}
                />
            );
        }
        const { classes } = this.props;
        return (
            <Page>
                <PageTitle title={'Media'} />
                <Panel>
                    <PanelHeader />
                    <h2> Map </h2>
                    <PanelBody>
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelHeader />
                    <h2> Last 5 Images </h2>
                    <PanelBody>
                        {/* <Coverflow
                            width={960}
                            height={480}
                            displayQuantityOfSide={2}
                            clickable={true}
                            navigation={false}
                            enableScroll={true}
                            enableHeading={true}
                            active={active}
                        > */}
                        <Swiper
                            {...params}
                            activeSlideKey={active}
                            shouldSwiperUpdate
                        >

                            {(images.length > 0) ?
                                images.map((image, index) => (
                                    <div
                                        onClick={() => this.openLightbox(index)}
                                    >
                                        <img
                                            key={index}
                                            src={image.url}
                                            alt={image.caption}
                                            style={{ display: 'block', width: '100%' }}
                                        />
                                    </div>
                                )) :
                                <div />
                            }

                            {/* </Coverflow> */}
                        </Swiper>

                    </PanelBody>
                </Panel>

                <Panel>
                    <PanelBody>
                        <main>
                            <div className={classes.heroUnit}>
                                <div className={classes.heroContent}>
                                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                        My Media
                                    </Typography>
                                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                        Something short and leading about the collection below—its contents, the creator, etc.
                                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                                        entirely.
                                    </Typography>
                                    {lightbox}
                                    <div className={classes.heroButtons}>
                                        <Grid container spacing={16} justify="center">
                                            <Grid item>
                                                <div>
                                                    <input type="file" onChange={this.fileChangedHandler} />
                                                    <button onClick={this.uploadHandler}>Upload!</button>
                                                </div>
                                            </Grid>
                                            <Grid item>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>

                            <div className={classNames(classes.layout, classes.cardGrid)}>
                                {/* End hero unit */}

                                <Grid container spacing={40}>
                                    <Gallery photos={photos} onClick={this.openLightbox} />                                        
                                </Grid>
                            </div>
                        </main>
                    </PanelBody>
                </Panel>
            </Page>
        );
    }
}

MediaPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaPage);