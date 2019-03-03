import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import GoogleButton from 'react-google-button';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: 500,
    },
    paper: {
        marginTop: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,
    },
});

class LoginPage extends Component {

    loginWithGoogle() {
        fetch('http://localhost:3001/auth/google/viewer')
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={40}
                        className={classes.demo}
                        alignItems='stretch'
                        // direction={direction}
                        justify='center'
                    >
                        <Grid key='viewer' item>
                            <Paper
                                className={classes.paper}
                                style={{ paddingTop: 10, paddingBottom: 10 }}
                            >
                                Sign up as Viewer
                                 <GoogleButton
                                    onClick={() => { this.loginWithGoogle() }}
                                />
                            </Paper>
                        </Grid>
                        <Grid key='viewer' item>
                            <Paper
                                className={classes.paper}
                                style={{ paddingTop: 10, paddingBottom: 10 }}
                            >
                                View as Guest
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);

