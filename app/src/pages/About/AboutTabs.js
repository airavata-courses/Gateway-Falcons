import React, { Component } from 'react';
import { Panel, PanelBody, Tab, Tabs } from 'react-gentelella';
// import BeforeAfterSlider from 'react-before-after-slider'
import ReactCompareImage from 'react-compare-image';
import mom_pic from '../../images/mom_pic.jpg';
import parents_pic from '../../images/parents_pic.jpg';
import john_and_bike from '../../images/john_and_bike.jpg';
import napkin from '../../images/temp-background.jpg';
import { Container, Row, Col } from 'react-bootstrap';

// const before = 'https://unsplash.com/photos/yBqcajVQng4';
// const after = 'https://unsplash.com/photos/_RBcxo9AU-U';

class AboutTabs extends Component {

    render() {
        return (
            <Panel>
                <PanelBody>
                    <Container style={{ display: "flex", flexWrap: "wrap"}}>
                        <Row>
                            <Tabs>
                                <Tab title={'About'} active>
                                    <Col>
                                        <p className="lead">Home tab</p>
                                        <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                    synth. Cosby sweater eu banh mi, qui irure terr.</p>
                                        <ReactCompareImage
                                            leftImage={john_and_bike}
                                            rightImage={john_and_bike}
                                        />
                                    </Col>
                                </Tab>
                                <Tab title={'Story'}>
                                    <Col>
                                        <p className="lead">Story</p>
                                        <img className="img-responsive avatar-view" src={mom_pic} alt="Avatar" title="Change the avatar" />
                                        <img className="img-responsive avatar-view" src={parents_pic} alt="Avatar" title="Change the avatar" />
                                    </Col>
                                </Tab>
                                <Tab title={'Mission'}>
                                    <Col>
                                        <p className="lead">Mission tab</p>
                                    </Col>
                                </Tab>
                                <Tab title={'Research'}>
                                    <Col>
                                        <p className="lead">Research</p>
                                        <img className="img-responsive avatar-view" src={john_and_bike} alt="Avatar" title="Change the avatar" />
                                    </Col>
                                </Tab>
                                <Tab title={'GoFundMe'}>
                                    <Col>
                                        <p className="lead">Settings tab</p>
                                    </Col>
                                </Tab>
                            </Tabs>
                        </Row>
                    </Container>
                </PanelBody>
            </Panel>
        );
    }
}

export default AboutTabs;
