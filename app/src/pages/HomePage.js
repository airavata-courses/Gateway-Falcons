import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import sliderData from '../data/slider-pages';
import Paper from '@material-ui/core/Paper';
import { Page, Panel, PanelHeader, PanelBody, PageTitle } from 'react-gentelella';

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
        <PageTitle title={'Home'} />
        <Panel>
          <PanelBody>
            <div className={classes.root} style={{ width: "100%" }} >
              <Slider>
                {sliderData.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                  >
                    <div className="center" style={{ width: "70%" }}>
                      <Paper>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <button onClick={() => this.onNavigate(item.page)}>{item.button}</button>
                      </Paper>
                    </div>
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

