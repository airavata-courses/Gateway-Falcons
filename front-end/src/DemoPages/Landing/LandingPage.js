import React, { Component } from 'react';
import {
  Navbar,
  Nav, Button, ButtonGroup, Container, Row, Col,
} from 'react-bootstrap';
import { Spring } from 'react-spring/renderprops';
// import welcome from './components/component1';
import sliderImg1 from './01.jpg';
import sliderImg2 from './02.jpg';
import sliderImg3 from './03.jpg';
import sliderImg4 from './04.jpg';
import sliderImg5 from './05.jpg';
import logo from './logo.png';
import BackgroundSlideshow from 'react-background-slideshow';
import ReactTextRotator from 'react-text-rotator';
import makeCarousel from 'react-reveal/makeCarousel';
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from 'react-reveal/Slide';
// we'll use styled components for this tutorial
// but you can use any other styling options ( like plain old css )
import styled, { css } from 'styled-components';
import FIXER from './landing.css';
import { Link } from 'react-router-dom'

class App extends Component {

  render() {
    const width = 'auto', height = 'auto';
    const Children = styled.div`  
      overflow: visible;
      width: ${width};
    `;
    const Arrow = styled.div`
      text-shadow: 1px 1px 1px #fff;
      z-index: 100;
      text-align: center;
      position: absolute;
      top: 0;
      width: 10%;
      font-size: 3em;
      cursor: pointer;
      user-select: none;
      ${props => props.right ? css`left: 90%;` : css`left: 0%;`}
    `;
    const Dot = styled.span`
      font-size: 1.5em;
      cursor: pointer;
      text-shadow: 1px 1px 1px #fff;
      user-select: none;
    `;
    const Dots = styled.span`
      text-align: center;
      width: 100%;    
    `;
    const dotz = {
      textAlign: 'center',
      marginTop: '400px'
    }

    const CarouselUI = ({ position, total, handleClick, children }) => (
      <Container>
        <Children>
          {children}
          <Arrow onClick={handleClick} data-position={position - 1}>{'<'}</Arrow>
          <Arrow right onClick={handleClick} data-position={position + 1}>{'>'}</Arrow>
        </Children>
        <div style={dotz}>
          <Dots>
            {Array(...Array(total)).map((val, index) =>
              <Dot key={index} onClick={handleClick} data-position={index}>
                {index === position ? '● ' : '○ '}
              </Dot>
            )}
          </Dots>
        </div>

      </Container>
    );
    const Carousel = makeCarousel(CarouselUI);
    //js objects

    //  js Styles

    const slideShow = {
      position: 'absolute',
      width: '100%',
      height: 'auto'
    }
    const logoStyle = {
      width: '200px',
      height: 'auto',
    }
    const align = {
      textAlign: 'center',
      position: 'relative'
    }
    const navBar = {
      width: '100%',
      textAlign: 'center'
    }
    const buttonz = {
      textAlign: 'center',
      marginTop: '15px',
      fontFamily: 'Patrick Hand SC, cursive',
    }
    const navSty = {
      fontFamily: 'Gochi Hand, cursive',

    }
    return (
      <div className="landingBody">
        {/* LANDING PAGE OVERRIDE */}
        <Spring
          from={{ marginLeft: -280 }}
          to={{ marginLeft: 0 }}
          config={{ delay: 500, duration: 100000000000000000000000000000 }}
        >
          {props => (
            <div style={props}>
              {/* Insert below */}

              {/* Background */}
              <Spring
                from={{ opacity: 0.8 }}
                to={{ opacity: 1 }}
                config={{ delay: 100, duration: 100000000000000000000000000000 }}
              >
                {props => (
                  <div style={props}>
                    {/* Insert below */}
                    <div>
                      <BackgroundSlideshow style={slideShow} images={[sliderImg1, sliderImg2, sliderImg3, sliderImg4, sliderImg5]} />
                    </div>

                  </div>
                )}
              </Spring>


              {/* Navbar */}
              <Row>
                <div style={navBar} className="navyNav">
                  <Spring
                    from={{ opacity: 0, marginTop: -500 }}
                    to={{ opacity: 1, marginTop: -90 }}
                    config={{ delay: 200, duration: 1000 }}
                  >
                    {props => (
                      <div style={props}>
                        {/* Insert below */}
                        <div style={navSty}>
                          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="dashboards/about">
                              <img
                                src={logo}
                                width="90"
                                height="auto"
                                className="d-inline-block align-top"
                                alt="Bike logo"
                              />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                              <Nav className="mr-auto">
                                <Nav.Link href="#"></Nav.Link>
                                <Nav.Link href="#"></Nav.Link>
                                <Nav.Link href="#"></Nav.Link>
                                <Nav.Link href="#"></Nav.Link>

                              </Nav>
                              <Nav>
                                <Nav.Link href="dashboards/about">About</Nav.Link>
                                {/* <Nav.Link eventKey={2} href="dashboards/location">Live</Nav.Link> */}
                                <Nav.Link href="https://johnschwenck.smugmug.com/">Media</Nav.Link>
                                <Nav.Link eventKey={2} href="dashboards/location">Location</Nav.Link>
                                <Nav.Link href="dashboards/fitness">Fitness</Nav.Link>
                                <Nav.Link href="dashboards/diet">Diet</Nav.Link>
                                <Nav.Item>
                                  <Nav.Link href="https://www.gofundme.com/send-Schwenck-to-Alaska-2019">
                                    <ButtonGroup className="mr-2" aria-label="First group">
                                      <Button variant="light">Donate</Button>

                                    </ButtonGroup>
                                  </Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Navbar.Collapse>
                          </Navbar>
                        </div>

                      </div>
                    )}
                  </Spring>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Row>


              <Container
                style={{ overflow: 'scroll' }}
              >
                <Row>
                  <Col>
                    <Carousel defaultWait={110000} maxTurns={500000000}>
                      <Slide right>
                        {/* Slide 1 */}
                        <div>
                          <Container>
                            <Row>
                              <Col></Col>
                              <div className="headG">
                                <Col><h1>Welcome [BLUE DEPLOYMENT] </h1></Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>

                          <Container>
                            <Row>
                              <Col></Col>
                              <Col>
                                <div style={align}>
                                  <img src={logo} style={logoStyle} />
                                </div>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>
                          <Container>
                            <Row>
                              <Col></Col>
                              <Col><div className="details">
                                <p>Riding for research</p>
                              </div>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>

                          {/* Buttons */}

                          <Container>
                            <Row>
                              <Col></Col>
                              <div style={buttonz}>
                                <Col>
                                  <Link to="dashboards/about">
                                    <Button variant="dark">Learn More</Button>
                                  </Link>
                                </Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>


                        </div>
                      </Slide>
                      <Slide right>
                        <div>
                          {/* Slide 2 */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div className="headG">
                                <Col><p>NYC to Alaska</p></Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                          <Container>
                            <Row>
                              <Col></Col>
                              <Col><div className="details">
                                <p>Tune in to watch interactive live streams as the joureny unfolds to learn what each day has in store and for highlights along the way.</p>
                              </div>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>

                          {/* Buttons */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div style={buttonz}>
                                <Col>
                                  <Link to="dashboards/location">
                                    <Button variant="danger" >
                                      Live
                                    </Button>
                                  </Link>
                                </Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>



                        </div>
                      </Slide>
                      <Slide right>
                        <div>
                          {/* Slide 3 */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div className="headG">
                                <Col><p>Follow Along</p></Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                          <Container>
                            <Row>
                              <Col></Col>
                              <Col><div className="details">
                                <p>Utilize an interactive map to learn about the daily weather conditions and track his progress as he endures the elements.</p>
                              </div>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>
                          {/* Buttons */}

                          <Container>
                            <Row>
                              <Col></Col>
                              <div style={buttonz}>
                                <Col>
                                  <Link to="dashboards/location">
                                    <Button variant="danger" >
                                      Location
                                    </Button>
                                  </Link>
                                </Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>


                        </div>
                      </Slide>
                      <Slide right>
                        <div>
                          {/* Slide 4 */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div className="headG">
                                <Col><p>Health Analysis</p></Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                          <Container>
                            <Row>
                              <Col></Col>
                              <Col><div className="details">
                                <p>Understand how various data sources drive the research and explore relationships using real-time data visualizations.</p>
                              </div>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>
                          {/* Buttons */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div style={buttonz}>
                                <Col>
                                  <Link to="dashboards/fitness">
                                    <Button variant="dark">
                                      Fitness
                                    </Button>
                                  </Link>
                                </Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                        </div>
                      </Slide>
                      <Slide right>
                        <div>
                          {/* Slide 5 */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div className="headG">
                                <Col><p>Meal Tracking</p></Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                          <Container>
                            <Row>
                              <Col></Col>
                              <Col><div className="details">
                                <p>With a minimal supply, discover the foods needed to keep the wheels spinning over 6 hours each day.</p>
                              </div>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>
                          {/* Buttons */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div style={buttonz}>
                                <Col>
                                  <Link to="dashboards/diet">
                                    <Button variant="dark">Diet</Button>
                                  </Link>
                                </Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                        </div>
                      </Slide>
                      <Slide right>
                        <div>
                          {/* Slide 6 */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div className="headG">
                                <Col><p>Share The Experience</p></Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                          <Container>
                            <Row>
                              <Col></Col>
                              <Col><div className="details">
                                <p>Enjoy the ride coast to coast. See what he sees and view highlights from the best spots throughout.</p>
                              </div>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>

                          {/* Buttons */}
                          <Container>
                            <Row>
                              <Col></Col>
                              <div style={buttonz}>
                                <Col>
                                  <a href="https://johnschwenck.smugmug.com/"><Button variant="dark">Media</Button></a>
                                </Col>
                              </div>
                              <Col></Col>
                            </Row>
                          </Container>
                        </div>
                      </Slide>
                    </Carousel>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </Spring>

      </div>
    )
  }
}


export default App

