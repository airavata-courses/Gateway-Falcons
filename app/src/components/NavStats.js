import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
});

class NavStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ marginBottom: 10, color: "red" }}>
                <Grid
                    container
                    spacing={24}
                    style={{ margin: 0, width: '100%' }}
                >
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Grid item>
                                TOTAL DAYS ELAPSED
              </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            TOTAL DAYS ELAPSED
            </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            Temp + Location
            </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            Anything else?
            </Paper>
                    </Grid>
                </Grid>
                <Grid container
                    spacing={24}
                    justify="center"
                    style={{ margin: 0, width: '100%' }}
                >
                    <Grid item xs={10}>
                        <Paper className={classes.paper}>DONATION BAR!</Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

NavStats.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavStats);
