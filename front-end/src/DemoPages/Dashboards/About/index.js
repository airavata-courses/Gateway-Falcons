import classnames from 'classnames';
import React, { Component, Fragment } from "react";
import Slider from "react-slick";
import { Button, ButtonGroup, Card, CardBody, Col, ListGroup, ListGroupItem, Row, TabContent, TabPane } from 'reactstrap';
import avatar6 from '../../../assets/utils/images/avatars/8.jpg';
import bg1 from '../../../assets/utils/images/originals/city.jpg';
import bg2 from '../../../assets/utils/images/originals/citydark.jpg';
import bg3 from '../../../assets/utils/images/originals/citynights.jpg';
import bg4 from '../../../assets/utils/images/originals/nightcolors.jpg';
import bg5 from '../../../assets/utils/images/originals/water.jpg';
import profile from './profile.jpg';
import signature from './signature.JPG';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

                        {/* Slider */}
                        <Col lg="5" className="d-none d-lg-block" style={{ paddingRight: 30 }}>
                            <div className="slider-light">
                                <Slider  {...settings}>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                        <div className="slide-img-bg"
                                            style={{
                                                backgroundImage: 'url(' + bg1 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>NYC to Alaska</h3>
                                            <p>
                                                Tune in to watch interactive live streams as the journey
                                                unfolds to learn what each day has in store and for highlights along the way
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                        <div className="slide-img-bg"
                                            style={{
                                                backgroundImage: 'url(' + bg2 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>Follow Along</h3>
                                            <p>
                                                Utilize an interactive map to learn about the daily weather
                                                conditions and track his progress as he endures the elements
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                        <div className="slide-img-bg opacity-6"
                                            style={{
                                                backgroundImage: 'url(' + bg3 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>Health Analysis</h3>
                                            <p>
                                                Understand how various data sources drive the research and
                                                explore relationships using real-time data visualizations
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                        <div className="slide-img-bg opacity-6"
                                            style={{
                                                backgroundImage: 'url(' + bg4 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>Meal Tracking</h3>
                                            <p>
                                            With minimal supply, discover what foods are needed to keep 
                                            the wheels spinning for over 6 hours each day
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                        <div className="slide-img-bg opacity-6"
                                            style={{
                                                backgroundImage: 'url(' + bg5 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>Enjoy the Experience</h3>
                                            <p>
                                            See what he sees and view highlights from the best spots from coast to coast.
                                            </p>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                        {/* End Image SLider */}



                        {/* Profile Section */}
                        <Col md="12" lg="6" xl="6">

                            <Card className="card-hover-shadow profile-responsive card-border border-success mb-3">

                                <div className="dropdown-menu-header">
                                    <div className="dropdown-menu-header-inner bg-success">
                                        <div className="menu-header-content">
                                            <div
                                                className="avatar-icon-wrapper btn-hover-shine mb-2 avatar-icon-xl">
                                                {/* <div className="avatar-icon rounded"> */}
                                                    <img src={profile} alt="profile" style={{ height: 150, width: 100 }} />
                                                {/* </div> */}
                                            </div>
                                            <div>
                                                <h5 className="menu-header-title">John Schwenck</h5>
                                                <h6 className="menu-header-subtitle">
                                                    An aspiring polymath determined to bridge the gap between
                                                    technical and non-technical fields using statistics, big data, and AI
                                                    </h6>
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
                                                    </ButtonGroup>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="scroll-area-lg">
                                    <PerfectScrollbar>

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
                                                        <p>
                                                            When the doctors told me that I have a problematic heart condition and suggested I limit my exercise, I naturally asked, "why?" I have excelled at football, rugby, and skiing my entire life and have never once had an issue. Being that this condition is relatively uncommon for highly active individuals, I am considered an outlier. With the lack of available research to draw conclusions from, they advised I take the safe route.
</p>
                                                        <p>
                                                            This did not resonate well with me at all. If a lack of research is going to hold me back from doing what I love, then I am determined to find an answer myself by conducting research that will help advance the scientific and medical communities. When debating ideas for an experiment, I thought back to my parents…
</p>
                                                        <p>
                                                            My father was 25 when he decided to set out for California on his bicycle - more than 3,700 miles - starting New Jersey. Over the course of 67 days, he endured the rain, heat, and wind with nothing but a tent, sleeping bag, and change of clothes. Upon his return, he was hungry for more. He and my mother - an equally avid cyclist - decided to push the limit and ride to Alaska. Despite the progress they made, their trip to the Last Frontier was put on hold once they realized I was on the way sooner than they were planning. Finishing their trip is the answer to my research.
</p>

                                                        <p>
                                                            In many ways, I do this for them, but I also have selfish reasons. I want to prove to myself that I can overcome any adversity thrown my way and be able to inspire others to achieve anything they put their mind to.
</p>

                                                        <p>
                                                            I do not simply wish to raise money for others' research, I want to be on the front lines spearheading the investigation myself, finding solutions and figuring out ways to intertwine "big data" and Statistics with other seemingly disparate fields such as Neuroscience, Cardiology, and Physiology.
</p>
                                                        <p>
                                                            The moment I return, I plan to leverage what I learn during my graduate studies this Fall at Texas A&M University using the latest technology to dive into the analysis and uncover valuable insights for others to use and build off of.
</p>
                                                        <p>
                                                            The best part is that this whole journey is broadcast live right here through Schwenck.Live for you all to enjoy. Tune in, dig into the data, and follow along as we defy the impossible together!
</p>
                                                        <br />
                                                        <p>
                                                            John Schwenck
</p>

                                                        <img src={signature} style={{ width: 200, height: 110 }} />
                                                    </div>



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
                                            </TabContent>

                                        </CardBody>
                                    </PerfectScrollbar>
                                </div>
                            </Card>

                        </Col>

                        {/* End profile section */}
                    </Row>
                </div>
            </Fragment>
        );
    }
}
