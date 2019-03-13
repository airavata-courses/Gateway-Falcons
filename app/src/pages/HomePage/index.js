import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// TODO: use slider data
import sliderData from './slider-pages';
import { Page, Panel, PanelBody } from 'react-gentelella';
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
        <Panel style={{ height: 500 }} >
          <PanelBody >
            <div className={classes.root}>
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

