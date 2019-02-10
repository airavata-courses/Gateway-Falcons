import React, { Component } from "react";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import { SocialIcon } from 'react-social-icons';
import Timer from "../components/Timer";

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      nextTimeDetermined: true,
      nextTimeBoundary: new Date("Feb 10, 2020 13:33:00"),
    }
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    // return (
    //     <Grid container 
    //       className={classes.root} 
    //       spacing={16} 
    //       justify="space-between"
    //     >
    //       <Grid item xs={4}>
    //           <Grid container
    //             direction="column"
    //           >
    //                 {/* TODO: */}
    //             <Grid item>
    //               Current time is ...  {Date.now()}
    //             </Grid>
    //             <Grid item>
    //               <SocialIcon url="http://twitter.com/" />
    //             </Grid>
    //               <SocialIcon url="http://facebook.com/" />
    //               <SocialIcon url="http://youtube.com/" />
    //               <SocialIcon url="http://instagram.com/" />
    //           </Grid>
    //       </Grid>
    //       <Grid item xs={8}>
    //           <Grid container 
    //             justify="start"
    //           >
    //             <Grid item>
    //                 Live Stream
    //                 Next broadcast in 1549067335266 seconds
    //             </Grid>
    //           </Grid>
    //       </Grid>
    //       <Grid item xs={10}>
    //           <Grid container justify="center">
    //             <Grid item>
    //               <img 
    //                 src={require('../images/temp-background.jpg')} 
    //                 width="100" 
    //                 height="100" />
    //             </Grid>
    //           </Grid>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Paper className={classes.control}>
    //           <Grid container>
    //             <Grid item>
    //               <FormLabel>Make me a donation bar</FormLabel>
    //             </Grid>
    //           </Grid>
    //         </Paper>
    //       </Grid>
    //     </Grid>
    //   );      
    return (
      <div className={classes.root} >

        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Grid item>
                Current time is ...  {Date.now()}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              {
                  <Timer
                    nextTimeDetermined={this.state.nextTimeDetermined}
                    nextTimeBoundary={this.state.nextTimeBoundary}
                  />
              }
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>xs3</Paper>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs>
            <Grid container
              direction="column"
            >
              <Grid item>
                <SocialIcon url="http://twitter.com/" />
              </Grid>
              <SocialIcon url="http://facebook.com/" />
              <SocialIcon url="http://youtube.com/" />
              <SocialIcon url="http://instagram.com/" />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>xs7</Paper>
          </Grid>
        </Grid>
      </div >
    )
  }

}
HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);

