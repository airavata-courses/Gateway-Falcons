import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MapContainer } from '../components/MapContainer'

const styles = () => ({
    
});
class LocationPage extends Component {

    componentDidMount() {

    }

    render() {
        return (
            // {/* <div>LocationPage !</div> */}
            <MapContainer />
        );

    }

}

LocationPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationPage);
