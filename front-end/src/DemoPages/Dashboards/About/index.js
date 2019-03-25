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

                        {/* Image SLider */}
                        <Col lg="4" className="d-none d-lg-block">
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

                        {/* Profile Section */}
                        <Col md="12" lg="8" xl="8">
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
                                                        About
                                                        </Button>
                                                        <Button color="dark"
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => {
                                                                this.toggle('2');
                                                            }}
                                                        >
                                                        Story
                                                        </Button>
                                                        <Button color="dark"
                                                            className={"" + classnames({ active: this.state.activeTab === '3' })}
                                                            onClick={() => {
                                                                this.toggle('3');
                                                            }}
                                                        >
                                                        Mission
                                                        </Button>
                                                        <Button color="dark"
                                                            className={"" + classnames({ active: this.state.activeTab === '3' })}
                                                            onClick={() => {
                                                                this.toggle('4');
                                                            }}
                                                        >
                                                        Research
                                                        </Button>
                                                    </ButtonGroup>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <CardBody className="p-0">

                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <ListGroup flush>
                                                <ListGroupItem>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width={52} className="rounded-circle"
                                                                        src={avatar6}
                                                                        alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">
                                                                    John Doe
                                                                    </div>
                                                                <div className="widget-subheading opacity-10">
                                                                    <span className="pr-2">
                                                                        <b>43</b> Sales
                                                                    </span>
                                                                    <span>
                                                                        <b className="text-success">$156,24</b> Totals
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="icon-wrapper m-0">
                                                                    <div className="progress-circle-wrapper">
                                                                        <Progress
                                                                            type="circle"
                                                                            percent={62}
                                                                            width="100%"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width={52} className="rounded-circle"
                                                                        src={avatar6}
                                                                        alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">
                                                                    Rosy O'Dowell
                                                                    </div>
                                                                <div className="widget-subheading opacity-10">
                                                                    <span className="pr-2">
                                                                        <b className="text-danger">12</b> Leads
                                                                    </span>
                                                                    <span>
                                                                        <b className="text-warning">$56,24</b> Totals
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="icon-wrapper m-0">
                                                                    <div className="progress-circle-wrapper">
                                                                        <Progress
                                                                            color="danger"
                                                                            type="circle"
                                                                            percent={32}
                                                                            width="100%"
                                                                            theme={
                                                                                {
                                                                                    active: {
                                                                                        trailColor: '#ccf3e6',
                                                                                        color: '#3ac47d'
                                                                                    }
                                                                                }
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                            </ListGroup>
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
                                        <TabPane tabId="4">
                                        </TabPane>
                                    </TabContent>

                                </CardBody>
                                <CardFooter className="text-center d-block">
                                    <Button size="sm" className="mr-2 text-danger" color="link">Cancel</Button>
                                    <Button size="lg" className="btn-shadow-primary" color="primary">View
                                            Profile</Button>
                                </CardFooter>
                            </Card>
                        </Col>

                        {/* End profile section */}
                    </Row>
                </div>
            </Fragment>
        );
    }
}
