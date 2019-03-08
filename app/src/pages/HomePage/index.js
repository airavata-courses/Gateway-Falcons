import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import sliderData from './slider-pages';
import Paper from '@material-ui/core/Paper';
import { Page, Panel, PanelHeader, PanelBody, PageTitle } from 'react-gentelella';
// import Slider from 'react-animated-slider';
// import 'react-animated-slider/build/horizontal.css';
// import './homepage.slider-animations.css';
// import './homepage.styles.css';
// import 'normalize.css/normalize.css';
import AnimSlider from './AnimSlider';

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
            <div className={classes.root} style={{ width: "100%", height: 400 }}>
              <AnimSlider></AnimSlider>
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

