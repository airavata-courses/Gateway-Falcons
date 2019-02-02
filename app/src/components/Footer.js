import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    images
                  </Typography>
            </footer>
        );
    }

}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
