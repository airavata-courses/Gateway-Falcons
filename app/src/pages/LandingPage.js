import React, { Component } from "react";
import bgimage from '../images/temp-background.jpg';
import { withStyles } from '@material-ui/core/styles';
import Timer from '../components/Timer';

const styles = theme => ({
  root: {
    backgroundImage: 'url(' + bgimage + ')',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    position: "fixed",
    overflow: 'hidden',
    height: "100%",
    width: "100%",
    display: "flex",
    justify: "center",
    justifyContent: "center",
    alignItems: 'center'
  },
  timerContainer: {
    position: "center",
    display: "flex",
    justify: "center",
    justifyContent: "center",
    alignItems: 'center',
    fontColor: "white"
  }
});


class LandingPage extends Component {

  constructor() {
    super();
    this.state = {
      nextTimeDetermined: true,
      nextTimeBoundary: new Date("Feb 10, 2020 13:33:00"),
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.timerContainer}>
          <Timer
            nextTimeDetermined={this.state.nextTimeDetermined}
            nextTimeBoundary={this.state.nextTimeBoundary}
            fontColor="white"
          />
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(LandingPage);
