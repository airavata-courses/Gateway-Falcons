import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleTable from '../components/SimpleTable';
import * as Constants from '../constants';
import { HtmlElement, Text, MonthField, Tab } from 'cx/widgets';
import { Svg } from 'cx/svg';
import { Chart, NumericAxis, LineGraph } from 'cx/charts';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
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

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        // console.log('mounted', this.props.data_set);
        // const data_set = this.props.data_set;
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
                    {/* <Typography component="div" className={classes.chartContainer}>
                        <SimpleLineChart />
                    </Typography> */}
                    <Typography variant="h4" gutterBottom component="h2">
                        {this.state.selected}
                    </Typography>
                    <div className={classes.tableContainer}>
                        <SimpleTable data={this.state.data} data_set={this.state.data_set} />
                        {/* <SimpleTable dietData={this.state.dietData} /> */}
                    </div>
                </main>
                {/* <div class="flex-row">
                    <Tab value: bind="$page.selected.field" tab="sessions" mod="kpi">
            <div class="cse-weba-kpi">
                        <label>Sessions</label>
                        <div class="cse-weba-kpi-value">
                            <Text tpl="{$page.total.sessions:n;0}" />
                        </div>
                        <Svg class="cse-weba-kpi-trend">
                            <Chart axes={{
                                x: { type: NumericAxis, hidden: true, snapToTicks: 0 },
                                y: { type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0, min: 0 }
                            }}>
                                <LineGraph data: bind="$page.monthly" xField="month" yField="sessions"/>
                    </Chart>
                        </Svg>
                    </div>
        </Tab>
            </div> */}
            </div >
        );
    }
}

FitnessPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FitnessPage);
