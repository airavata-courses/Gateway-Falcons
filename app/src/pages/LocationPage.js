
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MapContainer from '../components/MapContainer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SimpleTable from '../components/SimpleTable';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
 import MapWithADirectionsRenderer from '../components/MapComponent';

const google = window.google
const styles = () => ({
    root: {
        flexGrow: 1,
        // paddingBottom: 10,
        // marginBottom: 10,
    },
    mappaper: {
        height: '400px',
        width: '10px'
    },

});

class LocationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          myArray: [
            {lat: -34.397, lng: 150.644},
            {lat: -24.397, lng: 140.644},
            {lat: -14.397, lng: 130.644},
          ],
          origin:  new google.maps.LatLng(14.546748, 121.05455),
          destination: new google.maps.LatLng(14.552444,121.044488)
         

        };
      };

    state = {
        open: true,
        data_set: "location",
        loading: true,
        data: []
    };

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        console.log(this.state.origin)
        return (
            <React.Fragment>
                <Grid container
                    spacing={32}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    zeroMinWidth
                    className={classes.root}
                >
                    <Grid item container xs={2}>
                        <Paper className={classes.paper}>
                            <Grid item>
                                Buttons go here
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid
                        item
                        container
                        xs={9}
                        spacing={16}
                        direction="column"
                        alignItems="flex-start"
                        zeroMinWidth
                        className={classes.grid}
                    >
                        <Grid item xs={11} >
                        
                        </Grid>
                        <Grid item xs={11}>
                            <Paper className={classes.paper}>Bottom buttons here!</Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container
               
                    spacing={40}
                    direction="row"
                    justify="space-around"
                    style={{ margin: 0, width: '100%' }}
                >
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Grid item>
                                <p> Last Location </p>
                                <p> Lat </p>
                                <p> Lon </p>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Grid item>
                                <p> Weather </p>
                                <p> _ weather _</p>
                                <p> Precip ... </p>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Grid item>
                                <p> Geography </p>
                                <p> Time Zone </p>
                                <p> Elevation </p>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <SimpleTable data={this.state.data} data_set={this.state.data_set} />
                <div >
        {/* {
          this.state.myArray.map((a,index) => {
            return <MapWithADirectionsRenderer
              direction={a}
              key={index}
            />
          })
        } */}
        <MapWithADirectionsRenderer
    origin={this.state.origin} destination={this.state.destination} />
      </div>
            </React.Fragment>
        );

    }

}

LocationPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationPage);
