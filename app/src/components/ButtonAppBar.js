import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    flexGrow: 1,
    // paddingBottom: 10,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },

};

const navigate = (path) => {
  window.location.assign(path);
}

// Appbar  on the screen
function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar style={{ background: '#424242' }} position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} align = "left">
            <Button color="inherit" onClick = {() => navigate('')}>LOGO GOES HERE</Button>
          </Typography>
          {/* <Button color="inherit" onClick = {handleLoginClick}>Login</Button> */}
          <Button color="inherit" onClick = {() => navigate('live')}>Live</Button>
          <Button color="inherit" onClick = {() => navigate('media')}>Media</Button>
          <Button color="inherit" onClick = {() => navigate('fitness')}>Fitness</Button>
          <Button color="inherit" onClick = {() => navigate('diet')}>Diet</Button>
          <Button color="inherit" onClick = {() => navigate('location')}>Location</Button>
          <Button color="inherit" onClick = {() => navigate('contact')}>Contact</Button>
        </Toolbar>
        <div style={{ marginBottom: 10, color: "red" }}> 
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Grid item>
                TOTAL DAYS ELAPSED
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              TOTAL DAYS ELAPSED
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              Temp + Location
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              Anything else?
            </Paper>
          </Grid>
        </Grid>
        <Grid container
          spacing={24}
          justify="center"
        >
          <Grid item xs={10}>
            <Paper className={classes.paper}>DONATION BAR!</Paper>
          </Grid>
        </Grid>
        </div>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);