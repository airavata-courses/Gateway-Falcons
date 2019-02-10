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
            <Button color="inherit" onClick = {() => navigate('')}>Schwenck Home</Button>
          </Typography>
          {/* <Button color="inherit" onClick = {handleLoginClick}>Login</Button> */}
          <Button color="inherit" onClick = {() => navigate('live')}>Live</Button>
          <Button color="inherit" onClick = {() => navigate('media')}>Media</Button>
          <Button color="inherit" onClick = {() => navigate('fitness')}>Fitness</Button>
          <Button color="inherit" onClick = {() => navigate('diet')}>Diet</Button>
          <Button color="inherit" onClick = {() => navigate('location')}>Location</Button>
          <Button color="inherit" onClick = {() => navigate('contact')}>Contact</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);