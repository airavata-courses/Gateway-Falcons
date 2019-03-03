import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    
});
class ContactPage extends Component {

    render() {
        // const { classes } = this.props;
        return (
                    <Typography>
                        Contact us
                    </Typography>
        );

    }

}

ContactPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactPage);

