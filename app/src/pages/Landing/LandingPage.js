import React, { Component } from "react";
import Background from '../../images/landing_page.jpeg';
import logo from '../../images/logo.jpeg';
import Countdown from './Countdown.js';
import './index.css';

class LandingPage extends Component {

  constructor() {
    super();
    this.state = {
      nextTimeDetermined: true,
      nextTimeBoundary: new Date("Apr 15, 2019 9:00:00"),
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header"
          style={{
            height: "50%",
            backgroundImage: `url(${Background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <h1>Schwenck Live</h1>
          <img src={logo} style={{ height: "150px" }} />
          <h3 className="title">Website coming soon </h3>
          <Countdown
            date={this.state.nextTimeBoundary}
          />
          {/* <a href="https://github.com/kristinbaumann/react-countdown" target="_blank">
            <span>View on Github</span>
          </a> */}
        </div>
      </div>
    );
  }
};

export default LandingPage;
