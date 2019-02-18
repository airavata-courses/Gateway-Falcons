import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MapContainer from '../components/MapContainer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SimpleTable from '../components/SimpleTable';

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

        return (
           
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
                        <Grid item xs={11} zeroMinWidth className={classes.mappaper}>
                            <MapContainer lat={39.1653} lng={-86.5264} />
                        </Grid>
                        <Grid item xs={11}>
                            <Paper className={classes.paper}>Bottom buttons here!</Paper>
                        </Grid>
                    </Grid>
                
                <Grid container
                item
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
                </Grid>
           
        );

    }

}

LocationPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationPage);
