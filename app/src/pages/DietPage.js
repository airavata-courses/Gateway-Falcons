import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleTable from '../components/SimpleTable';
import * as Constants from '../constants';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    content: {
        padding: theme.spacing.unit * 3,
        overflow: 'auto',
    },
});

class DietPage extends Component {

    state = {
        open: true,
        loading: true,
        data: []
    };

    async setChart() {

    }
    
    async setLastMeals() {

    }

    getAndSetDietData() {
        fetch(`${Constants.serverUrl}/fitness`)
            .then(res => console.log(res))
            // .then(res => res.json())
            // .then(res => this.setState({
            //     data: [].concat(res)
            // }))
            // .then(() => {
            //     this.setChart();
            //     this.setLastMeals();
            // });
    }

    componentDidMount() {
        this.getAndSetDietData();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <main className={classes.content}>
                    <Grid container
                        spacing={32}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ margin: 0, width: '100%' }}
                    >
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <Grid item>
                                    <p> Buttons go here </p>
                                    <p> Buttons go here </p>
                                    <p> Buttons go here </p>
                                    <p> Buttons go here </p>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid container
                            item
                            xs={9}
                            spacing={24}
                            direction="column"
                        >
                            <Grid item xs={11}>
                                <Paper className={classes.paper}>
                                    TOp buttons here!
                                </Paper>
                            </Grid>
                            <Grid item xs={11}>
                                <Paper className={classes.paper} style={{ height: 300 }}>
                                    Chart Goes Here
                            </Paper>
                            </Grid>
                            <Grid item xs={11}>
                                <Paper className={classes.paper}>Bottom buttons here!</Paper>
                            </Grid>
                        </Grid>
                        <Grid container
                            item
                            xs={12}
                            spacing={24}
                            direction="column"
                        >
                            <Grid item xs={12}>
                                <div>
                                    <Typography variant="h4" gutterBottom component="h2">
                                        The last (5) supper(s)
                                    </Typography>
                                    <div className={classes.tableContainer}>
                                        <SimpleTable data={this.state.meals} data_set="last_five" />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <Typography variant="h4" gutterBottom component="h2">
                                        Some more details ... 
                                    </Typography>
                                    <div className={classes.tableContainer}>
                                        <SimpleTable data={this.state.data} data_set="diet" />
                                    </div>
                                </div>

                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

DietPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DietPage);
