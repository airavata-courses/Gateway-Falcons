import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sliderData from './slider-pages';
import Paper from '@material-ui/core/Paper';
import { Page, Panel, PanelHeader, PanelBody, PageTitle } from 'react-gentelella';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './homepage.slider-animations.css';
import './homepage.styles.css';
// import 'normalize.css/normalize.css';

const styles = () => ({

});

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      nextTimeDetermined: true,
      nextTimeBoundary: new Date("Feb 10, 2020 13:33:00"),
    }
  }

  onNavigate(page) {
    alert(page);
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Panel  >
          <PanelBody >
            <div className={classes.root} style={{ width: "100%", height: 800 }}>
              <Slider>
                {sliderData.map((item, index) => (
                  <div
                    key={index}
                    className="slider-content"
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                  >
                    <div className="inner">
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                      <button>{item.button}</button>
                    </div>
                    <section>
                      {/* <img src={item.userProfile} alt={item.user} />
                      <span>
                        Posted by <strong>{item.user}</strong>
                      </span> */}
                    </section>
                  </div>
                ))}
              </Slider>
            </div>
          </PanelBody>
        </Panel>
      </Page>
    )
  }
}
HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);

