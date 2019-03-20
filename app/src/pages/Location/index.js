import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Page, PageTitle } from 'react-gentelella';
import MapSlicerPanel from '../../components/MapSlicerPanel';
import TopTile from '../../components/TopTile';
import kpi_data from './locationKPI';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import MapWithMarkers from '../../components/map/MapContainer';
import DataTable from '../../components/DataTable';
import * as Constants from '../../constants';

// TODO: SET MAP KEY IN ENV
require('dotenv').config();

// https://gist.github.com/jwo/43b382fc60eb09d3a415c9953f4057f8

const options = [
    { title: 'Normal', value: 'normal' },
    { title: 'Satellite', value: 'satellite' },
    { title: 'Wind', value: 'wind' },
    { title: 'Topo', value: 'topo' },
];

class LocationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Diet',
            data: [''],
            data_set: '',
            selectedMarker: false,
            // kpi_data: [],
        };
    }

    fetchMapMarkers() {
        // fetch("https://api.harveyneeds.org/api/v1/shelters?limit=10")
        //     .then(r => r.json())
        setInterval(() => 
        // fetch(`http://localhost:3001/location`, {
            fetch(`${Constants.serverUrl}/location`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                credentials: 'same-origin',
            })
                .then(res => res.json())
                // .then(res => console.log(res)),
                .then(data => {
                    // const lat = parseFloat(item.latitude);
                    // const lon = parseFloat(item.longitude);
                    const _data = data.map(datum => {
                        
                        const { 
                            workout_date_time,
                            data_lat,
                            data_lon,
                            total_distance,
                            average_speed,
                            max_speed,
                            avg_cadence,
                            max_cadence,
                            max_elevation,
                            total_climb,
                            total_descent,
                            max_grade
                        } = datum;

                        const newObj = {
                            workout_date_time,
                            latitude: parseFloat(data_lat),
                            longitude: parseFloat(data_lon),
                            total_distance,
                            average_speed,
                            max_speed,
                            avg_cadence,
                            max_cadence,
                            max_elevation,
                            total_climb,
                            total_descent,
                            max_grade
                        };

                        return newObj;
                    });
                    this.setState({ data: _data })
                }),
            61000);
    }

    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }

    componentWillMount() {
        this.setState({ data: [] })
    }

    componentDidMount() {
        this.fetchMapMarkers();
    }

    sliceChart = (chart_title) => {
        alert(chart_title)
        this.setState({
            chart_title
        })
    }

    sliceDateRange(event, picker) {
        console.log(picker.startDate._d);
        console.log(picker.endDate._d);
    }

    render() {

        const { data } = this.state;
        // const apiKey = process.env.GOOGLE_API_KEY;
        // console.log(apiKey);

        return (
            <Page>

                <PageTitle title={'Location'} />

                <TopTile kpi_data={kpi_data} />

                <div>
                    <Container>
                        <Row>
                            {/* Chart Slicers */}
                            <Col md={3} sm={3} xs={12}>
                                <ChartSlicerPanel
                                    options={options}
                                    sliceDateRange={this.sliceDateRange}
                                    sliceChart={this.sliceChart}
                                    title={"Map Types"}
                                />
                            </Col>

                            {/* MapWithMarkers */}
                            <Col md={9} sm={9} xs={12}>
                                {/* googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`} */}
                                <MapWithMarkers
                                    selectedMarker={this.state.selectedMarker}
                                    markers={data}
                                    onClick={this.handleClick}
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                />
                            </Col>

                            <div className="clearfix" />
                        </Row>

                        {/* Data Table*/}
                        <Row>
                            <Col md={12} sm={12} xs={12}>
                                <DataTable
                                    data={data}
                                    data_set="location"
                                    title='Location Data'
                                    table_columns={Constants.wahoo_data_columns}
                                />
                            </Col>
                        </Row>

                        <div className="clearfix" />
                    </Container>
                </div>

            </Page>
        )
    }
}

export default LocationPage