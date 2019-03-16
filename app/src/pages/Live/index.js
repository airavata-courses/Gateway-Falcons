// TODO: SET MAP KEY IN ENV

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { Page, PageTitle } from 'react-gentelella';
import TopTile from '../../components/TopTile';
import kpi_data from './kpi_data';
// import RealtimeChart from "../../components/RealtimeChart";
import LivePoll from "./LivePoll";
import LivePanel from "./LivePanel";
import MapWithMarkers from '../../components/map/MapContainer';
import DataTable from '../../components/DataTable';
import * as Constants from '../../constants';

// TODO: SET MAP KEY IN ENV
require('dotenv').config();

class LivePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Live',
            data: [''],
            selectedMarker: false,
            // kpi_data: [],
        };
    }

    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }

    render() {
        const { data } = this.state;
        const apiKey = process.env.GOOGLE_API_KEY;
        console.log(apiKey);
        return (
            <Page>

                <PageTitle title={'Live'} />

                <TopTile kpi_data={kpi_data} />

                <div>
                    <Container>

                        <Row>

                            {/* Left Live Stream */}
                            <Col md={6} sm={6} xs={6}>
                                <LivePanel style={{ height: `100%` }} />
                            </Col>

                            {/* MapWithMarkers */}
                            <Col md={6} sm={6} xs={6}>
                                <MapWithMarkers
                                    selectedMarker={this.state.selectedMarker}
                                    markers={data}
                                    onClick={this.handleClick}
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                />
                            </Col>

                        </Row>

                        <div className="clearfix" />

                        <Row>

                            {/* FB Live Poll */}
                            <Col md={12} sm={12} xs={12}>
                                <LivePoll />
                            </Col>

                        </Row>

                        {/* Data Table*/}
                        <Row>
                            <Col md={12} sm={12} xs={12}>
                                <DataTable
                                    data={data}
                                    data_set="live"
                                    title='Live Data'
                                    table_columns={Constants.location_data_columns}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>

            </Page>

        );

    }

}

export default LivePage;

