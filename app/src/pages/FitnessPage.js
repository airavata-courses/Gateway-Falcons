import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleTable from '../components/SimpleTable';
import * as Constants from '../constants';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class FitnessPage extends Component {

    state = {
        open: true,
        data_set: "fitness",
        loading: true,
        data: []
    };

    componentDidMount() {
        fetch(`${Constants.serverUrl}/fitness`)
            .then(res => res.json())
            .then(res => this.setState({
                data: [].concat(res)
            }))
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Typography variant="h4" gutterBottom component="h2">
                        {
                            this.state.data_set.charAt(0).toUpperCase() +
                            this.state.data_set.substr(1)
                        }
                    </Typography>
                    <div className={classes.tableContainer}>
                        <SimpleTable data={this.state.data} data_set={this.state.data_set} />
                    </div>
                </main>
            </div >
        );
    }
}

FitnessPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FitnessPage);
