import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import pages from '../data/pages'
import NavStats from './NavStats';

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 10,
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
          <Typography variant="h6" color="inherit" className={classes.grow} align="left">
            <Button color="inherit" onClick={() => navigate('')}>LOGO GOES HERE</Button>
          </Typography>
          {/* <Button color="inherit" onClick = {handleLoginClick}>Login</Button> */}
          {
            pages.map(page =>
              (<Button
                color="inherit"
                onClick={() => navigate(page)}
                key={page}
              >
                {page}
              </Button>)
            )}
        </Toolbar>
        <NavStats />
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);