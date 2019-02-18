import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { SocialIcon } from 'react-social-icons';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.unit * 8,
        padding: theme.spacing.unit * 6,
    },
});
class Footer extends Component {

    render() {
        const { classes } = this.props;
        return (
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    GIVING A MAJOR SHOUT OUT TO MY CORPORATE PARTNERS:
                  </Typography>
                  <div>
                
            <Grid container
              direction="row"
              spacing={40}
              justify="center"
            >
              <Grid item>
              <Typography variant="subtitle1" align="start" color="textSecondary" component="p">
                    SOCIAL MEDIA
                  </Typography>
                <SocialIcon url="http://twitter.com/" />
              <SocialIcon url="http://facebook.com/" />
              <SocialIcon url="http://youtube.com/" />
              <SocialIcon url="http://instagram.com/" />
              </Grid>
            <Grid item>
            <Typography variant="subtitle1" align="end" color="textSecondary" component="p">
                    SPONSORS
                  </Typography>
                <SocialIcon url="http://twitter.com/" />
              <SocialIcon url="http://facebook.com/" />
              <SocialIcon url="http://youtube.com/" />
              <SocialIcon url="http://instagram.com/" />
              </Grid>
            </Grid>
                  
                  </div>
            </footer>
        );
    }

}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
