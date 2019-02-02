import React, { Component } from "react";
import PropTypes from 'prop-types';
import muiTheme from '../components/Theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    
});
class DataPage extends Component {

    render() {
        const { classes } = this.props;
        return (
                <MuiThemeProvider theme={muiTheme}>
                    <CssBaseline />
                </MuiThemeProvider>
        );

    }

}

DataPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataPage);

