import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg1 from '../../../assets/utils/images/originals/city.jpg'
import bg2 from '../../../assets/utils/images/originals/citydark.jpg';
import bg3 from '../../../assets/utils/images/originals/citynights.jpg';
import avatar6 from '../../../assets/utils/images/avatars/8.jpg';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {
    Row, Col, TabContent, TabPane, ButtonGroup, ListGroup, ListGroupItem,
    Card, CardBody, CardFooter
} from 'reactstrap';

import classnames from 'classnames';

import { Progress } from 'react-sweet-progress';

export default class AboutPage extends Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);

        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            initialSlide: 0,
            autoplay: true,
            adaptiveHeight: true

        };
        return (

            <Fragment>
                <div className="h-100">
                    <Row className="h-100 no-gutters">

                        {/* Profile Section */}
                        <Col md="12" lg="12" xl="12">
                            <Card className="card-hover-shadow profile-responsive card-border border-success mb-3">
                                <div className="dropdown-menu-header">
                                    <div className="dropdown-menu-header-inner bg-success">
                                        <div className="menu-header-content">
                                            <div
                                                className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xl">
                                                <div className="avatar-icon rounded">
                                                    <img src={avatar6} alt="Avatar 6" />
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="menu-header-title">John Schwenck</h5>
                                                <h6 className="menu-header-subtitle">Short profile description</h6>
                                            </div>
                                            <div className="menu-header-btn-pane pt-2">
                                                <div tabs="true">
                                                    <ButtonGroup>
                                                        <Button caret="true" color="dark"
                                                            className={"" + classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => {
                                                                this.toggle('1');
                                                            }}
                                                        >
                                                            Mission
                                                        </Button>
                                                        <Button color="dark"
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => {
                                                                this.toggle('2');
                                                            }}
                                                        >
                                                            Background
                                                        </Button>
                                                        <Button color="dark"
                                                            className={"" + classnames({ active: this.state.activeTab === '3' })}
                                                            onClick={() => {
                                                                this.toggle('3');
                                                            }}
                                                        >
                                                            Research
                                                        </Button>
                                                        {/* <Button color="dark"
                                                            className={"" + classnames({ active: this.state.activeTab === '3' })}
                                                            onClick={() => {
                                                                this.toggle('4');
                                                            }}
                                                        >
                                                        Research
                                                        </Button> */}
                                                    </ButtonGroup>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <CardBody className="p-0">

                                    <TabContent activeTab={this.state.activeTab}>

                                        <TabPane tabId="1">
                                            <div> 
                                                <p>
                                                    Hey there!
                                                </p> 

                                                <p>
                                                Thank you for visiting Schwenck.Live! April 15th 2019 began my 5,800-mile bicycle journey from New York City to Alaska to collect and analyze data from 25 variables for research. This decision, however, did not come out of thin air.
                                                </p>

                                                When the doctors told me that I have a problematic heart condition and suggested I limit my exercise, I naturally asked, "why?" I have excelled at football, rugby, and skiing my entire life and have never once had an issue. Being that this condition is relatively uncommon for highly active individuals, I am considered an outlier. With the lack of available research to draw conclusions from, they advised I take the safe route.

                                                This did not resonate well with me at all. If a lack of research is going to hold me back from doing what I love, then I am determined to find an answer myself by conducting research that will help advance the scientific and medical communities. When debating ideas for an experiment, I thought back to my parents…

                                                My father was 25 when he decided to set out for California on his bicycle - more than 3,700 miles - starting New Jersey. Over the course of 67 days, he endured the rain, heat, and wind with nothing but a tent, sleeping bag, and change of clothes. Upon his return, he was hungry for more. He and my mother - an equally avid cyclist - decided to push the limit and ride to Alaska. Despite the progress they made, their trip to the Last Frontier was put on hold once they realized I was on the way sooner than they were planning. Finishing their trip is the answer to my research.

                                                In many ways, I do this for them, but I also have selfish reasons. I want to prove to myself that I can overcome any adversity thrown my way and be able to inspire others to achieve anything they put their mind to.

                                                I do not simply wish to raise money for others' research, I want to be on the front lines spearheading the investigation myself, finding solutions and figuring out ways to intertwine "big data" and Statistics with other seemingly disparate fields such as Neuroscience, Cardiology, and Physiology.

                                                The moment I return, I plan to leverage what I learn during my graduate studies this Fall at Texas A&M University using the latest technology to dive into the analysis and uncover valuable insights for others to use and build off of.

                                                The best part is that this whole journey is broadcast live right here through Schwenck.Live for you all to enjoy. Tune in, dig into the data, and follow along as we defy the impossible together!

                                                John Schwenck


                                            </div>


                                            {/* Image SLider */}
                                            <Col lg="12" className="d-none d-lg-block">
                                                <div className="slider-light">
                                                    <Slider  {...settings}>
                                                        <div
                                                            className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                                            <div className="slide-img-bg"
                                                                style={{
                                                                    backgroundImage: 'url(' + bg1 + ')'
                                                                }} />
                                                            <div className="slider-content">
                                                                <h3>Perfect Balance</h3>
                                                                <p>
                                                                    ArchitectUI is like a dream. Some think it's too good to be true! Extensive collection of unified React Boostrap Components and Elements.
                                            </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                                            <div className="slide-img-bg"
                                                                style={{
                                                                    backgroundImage: 'url(' + bg3 + ')'
                                                                }} />
                                                            <div className="slider-content">
                                                                <h3>Scalable, Modular, Consistent</h3>
                                                                <p>
                                                                    Easily exclude the components you don't require. Lightweight, consistent
                                                                    Bootstrap based styles across all elements and components
                                            </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                                            <div className="slide-img-bg opacity-6"
                                                                style={{
                                                                    backgroundImage: 'url(' + bg2 + ')'
                                                                }} />
                                                            <div className="slider-content">
                                                                <h3>Complex, but lightweight</h3>
                                                                <p>
                                                                    We've included a lot of components that cover almost all use cases for
                                                                    any type of application.
                                            </p>
                                                            </div>
                                                        </div>
                                                    </Slider>
                                                </div>
                                            </Col>
                                            {/* End Image SLider */}
                                        </TabPane>

                                        <TabPane tabId="2">
                                            <ListGroup flush>
                                                <ListGroupItem disabled tag="a" href="javascript:void(0);">Cras
                                                    justo
                                                        odio</ListGroupItem>
                                                <ListGroupItem tag="a" href="javascript:void(0);">Dapibus ac
                                                    facilisis
                                                        in</ListGroupItem>
                                                <ListGroupItem tag="a" href="javascript:void(0);">Morbi leo
                                                        risus</ListGroupItem>
                                                <ListGroupItem tag="a" href="javascript:void(0);">Porta ac
                                                    consectetur
                                                        ac</ListGroupItem>
                                                <ListGroupItem tag="a" href="javascript:void(0);">Vestibulum at
                                                        eros</ListGroupItem>
                                            </ListGroup>
                                        </TabPane>

                                        <TabPane tabId="3">
                                            <div className="p-3">
                                                <p>With supporting text below as a natural lead-in to additional
                                                        content.</p>
                                                <p className="mb-0">Lorem Ipsum has been the industry's standard
                                                    dummy
                                                    text
                                                    ever
                                                    since the 1500s, when an unknown printer took a galley of
                                                    type
                                                    and
                                                        scrambled.</p>
                                            </div>
                                        </TabPane>

                                        {/* <TabPane tabId="4">
                                        </TabPane>
                          */}
                                    </TabContent>

                                </CardBody>
                                {/* <CardFooter className="text-center d-block">
                                    <Button size="sm" className="mr-2 text-danger" color="link">Cancel</Button>
                                    <Button size="lg" className="btn-shadow-primary" color="primary">View
                                            Profile
                                            </Button>
                                </CardFooter> */}
                            </Card>
                        </Col>

                        {/* End profile section */}
                    </Row>
                </div>
            </Fragment>
        );
    }
}
