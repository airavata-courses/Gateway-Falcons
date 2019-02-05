import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import GoogleButton from 'react-google-button'

const styles = theme => ({

});

class LoginPage extends Component {

    loginWithGoogle() {
        fetch('http://localhost:3001/auth/google/biker')
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }

    render() {
        const { classes } = this.props;
        return (
            <GoogleButton
                onClick={() => { this.loginWithGoogle() }}
            />
        );

    }

}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);

