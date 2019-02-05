import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },

};

function handleHomeClick(){
  window.location.assign('/');
}
function handleLiveClick(){
    window.location.assign('/live');
}
function handleMediaClick(){
    window.location.assign('/media');
}
function handleDietDataClick(){
    window.location.assign('/diet');
}
function handleFitnessDataClick(){
  window.location.assign('/fitness');
}
function handleLocationClick(){
    window.location.assign('/location');
}
function handleContactClick(){
    window.location.assign('/contact');
}
function handleLoginClick(){
  window.location.assign('/login');
}


// Appbar  on the screen
function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar style={{ background: '#424242' }} position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} align = "left">
            <Button color="inherit" onClick = {handleHomeClick}>Schwenck Home</Button>
          </Typography>
          {/* <Button color="inherit" onClick = {handleLoginClick}>Login</Button> */}
          <Button color="inherit" onClick = {handleLiveClick}>Live</Button>
          <Button color="inherit" onClick = {handleMediaClick}>Media</Button>
          <Button color="inherit" onClick = {handleFitnessDataClick}>Fitness</Button>
          <Button color="inherit" onClick = {handleDietDataClick}>Diet</Button>
          <Button color="inherit" onClick = {handleLocationClick}>Location</Button>
          <Button color="inherit" onClick = {handleContactClick}>Contact</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);