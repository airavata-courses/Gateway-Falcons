import React, { Component } from "react";
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Col, Container, Row } from 'react-bootstrap';
import { Page, PageTitle } from 'react-gentelella';
// import ChartPanel from '../../components/ChartPanel';
// import MapSlicerPanel from '../../components/MapSlicerPanel';
import TopTile from '../../components/TopTile';
import kpi_data from './kpi_data';
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
// import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import SimpleMap from '../../components/map/MapContainer';
import RealtimeChart from "../../components/RealtimeChart";
import LivePoll from "./LivePoll";
import LivePanel from "./LivePanel";

const styles = theme => ({
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

class LivePage extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Page>

                <PageTitle title={'Location'} />

                <TopTile kpi_data={kpi_data} />

                <div>
                    <Container>

                        <Row>

                            {/* Left Live Stream */}
                            <Col md={6} sm={6} xs={6}>
                                <LivePanel />
                            </Col>

                            {/* Right Map */}
                            <Col md={6} sm={6} xs={6}>
                                <SimpleMap />
                            </Col>

                        </Row>

                        <div className="clearfix" />

                        <Row>

                            {/* RealtimeChart */}
                            <Col md={12} sm={12} xs={12}>
                                <LivePoll />
                            </Col>

                        </Row>


                        <Row>

                            {/* RealtimeChart */}
                            <Col md={12} sm={12} xs={12}>
                                <RealtimeChart />
                            </Col>

                        </Row>
                    </Container>
                </div>

            </Page>

        );

    }

}

LivePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LivePage);

