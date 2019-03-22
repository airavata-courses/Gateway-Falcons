// TODO: Default setting of map center

// TODO: ZOOM on last marker

// TODO: FORMAT PAGE WIDTH / Responsiveness

// TODO: TRIm the lat / lon

import React, { Component, Fragment } from 'react';
import {
    Row, Col,
    Button,
    Nav,
    NavItem,
    Card, CardBody, CardTitle,
    NavLink,
    Table,
    CardHeader,
    CardFooter,
    ButtonGroup,
    Popover, PopoverBody,
    ListGroupItem,
    ListGroup,
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MapWithMarkers from '../../MyComponents/MapContainer'

import * as Constants from '../../../constants';

import ReactTable from "react-table";

export default class LocationPage extends Component {
    constructor() {
        super();
        const apiKey = process.env.GOOGLE_API_KEY;
        this.state = {
            title: 'Live',
            map_data: [],
            weather_data: [],
            selectedMarker: false,
            apiKey: apiKey
            // kpi_data: [],
        };
    }

    handleClick = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }

    fetchMapMarkers() {
        setInterval(() =>
        // fetch(`${Constants.serverUrl}/location`, {
            fetch(`http://localhost:3001/location`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                credentials: 'same-origin',
            })
                .then(res => res.json())
                // .then(res => console.log(res)),
                .then(data => {
                    const wahoo_data = [];
                    const weather_data = [];
                    data.map((datum, index) => {

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
                            max_grade,

                            wind_deg,
                            wind_speed,
                            pressure,
                            visibility,
                            temperature,
                            weather,
                            weather_desc,
                            humidity
                        } = datum;

                        const newWahooObj = {
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
                            max_grade,

                            key: index

                        };

                        const newWeatherObj = {
                            workout_date_time,
                            wind_deg,
                            wind_speed,
                            pressure,
                            visibility,
                            temperature,
                            weather,
                            weather_desc,
                            humidity,

                            key: index

                        };
                        
                        wahoo_data.push(newWahooObj);
                        weather_data.push(newWeatherObj);

                    });
                    console.log(_data)
                    this.setState({ 
                        map_data: wahoo_data,
                        weather_data: weather_data,
                    })
                }),
            10500);
    }

    componentDidMount() {
        this.fetchMapMarkers();
    }

    render() {
        // const radius = 107;
        const { apiKey, data, map_data, weather_data } = this.state;
        console.log(apiKey)
        
        const wahoo_data_columns = Object.keys(Constants.wahoo_data_columns).map(key => {
            console.log(key, Constants.wahoo_data_columns[key]);
            return {
                Header: key,
                accessor: Constants.wahoo_data_columns[key]
            }
        })

        const weather_data_columns = Object.keys(Constants.weather_data_columns).map(key => {
            console.log(key, Constants.weather_data_columns[key]);
            return {
                Header: key,
                accessor: Constants.weather_data_columns[key]
            }
        })

        return (
            <Fragment>
                <PageTitle
                    heading="Location Page"
                    subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
                    icon="pe-7s-graph icon-gradient bg-ripe-malin"
                />
                <div>

                    {/* MAP */}
                    <Row>
                        <Col sm="12" lg="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    {/* <CardTitle>
                                        Basic
                                    </CardTitle> */}
                                    <MapWithMarkers
                                        selectedMarker={this.state.selectedMarker}
                                        markers={map_data}
                                        onClick={this.handleClick}
                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A&v=3.exp&libraries=geometry,drawing,places`}
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* Wahoo Data Table */}
                    <Row>
                        <Col sm="12" lg="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    Location Data
                                        <div className="btn-actions-pane-right">
                                        <ButtonGroup size="sm">
                                            <Button caret="true" color="focus"
                                                className={"active"}>Last Week</Button>
                                            <Button caret="true" color="focus">All Month</Button>
                                        </ButtonGroup>
                                    </div>
                                </CardHeader>
                                
                                <ReactTable
                                    data={map_data}
                                    columns={wahoo_data_columns}
                                    defaultPageSize={20}
                                    style={{
                                        height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
                                    }}
                                    className="-striped -highlight -fixed"
                                />
                                <CardFooter className="d-block text-center">
                                    <Button className="mr-2 btn-icon btn-icon-only" outline color="danger">
                                        <i className="pe-7s-trash btn-icon-wrapper"> </i>
                                    </Button>
                                    <Button className="btn-wide" color="success">
                                        Save
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>

                    {/* Weather Data Table */}
                    <Row>
                        <Col sm="12" lg="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    Weather Data
                                        <div className="btn-actions-pane-right">
                                        <ButtonGroup size="sm">
                                            <Button caret="true" color="focus"
                                                className={"active"}>Last Week</Button>
                                            <Button caret="true" color="focus">All Month</Button>
                                        </ButtonGroup>
                                    </div>
                                </CardHeader>
                                
                                <ReactTable
                                    data={weather_data}
                                    columns={weather_data_columns}
                                    defaultPageSize={20}
                                    style={{
                                        height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
                                    }}
                                    className="-striped -highlight -fixed"
                                />
                                <CardFooter className="d-block text-center">
                                    <Button className="mr-2 btn-icon btn-icon-only" outline color="danger">
                                        <i className="pe-7s-trash btn-icon-wrapper"> </i>
                                    </Button>
                                    <Button className="btn-wide" color="success">
                                        Save
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}
