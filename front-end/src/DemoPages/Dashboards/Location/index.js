// TODO: UNMOUNT REMOVE TIMER INTERVAL

// TODO: Default setting of map center

// TODO: ZOOM on last marker

// TODO: FORMAT PAGE WIDTH / Responsiveness

// TODO: TRIm the lat / lon

import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import { Brush, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import * as Constants from '../../../constants';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import MapWithMarkers from '../../MyComponents/MapContainer';
require('dotenv').config();

export default class LocationPage extends Component {

    constructor() {
        super();
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY || 'AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A';
        this.state = {
            title: 'Live',
            map_data: [],
            location_data: [],
            weather_data: [],
            strava_data: [],
            selectedMarker: false,
            apiKey: apiKey,
            kpi: {
                average_speed: 0,
                total_climb: 0,
                wind_speed: 0,
                avg_heart_rate: 0
            },
            strava_kpi: {
                average_speed: 0,
                distance: 0,
                elapsed_time: 0,
                moving_time: 0,
                total_elevation_gain: 0,
                average_heartrate: 0,
                distance_from_start: 0,
            }
        };
    }

    handleClick = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }

    fetchStravaData() {
        fetch(`${Constants.serverUrl}/fitness`, {
            // fetch(`http://localhost:3001/fitness`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(data => {

                const {
                    average_speed,
                    distance,
                    elapsed_time,
                    moving_time,
                    total_elevation_gain,
                    average_heartrate
                } = data[data.length - 1];

                let distance_since_start = 0;
                const strava_data = data.map(datum => {

                    const {
                        average_speed,
                        distance,
                        elapsed_time,
                        moving_time,
                        total_elevation_gain,
                        average_heartrate,
                        start_date,
                        average_cadence
                    } = datum;
                    const _distance = distance.split(" ")[0];
                    var date_str = start_date.split("/")
                    var month = parseInt(date_str[0])
                    var day = parseInt(date_str[1])
                    if ((month == 4 && day >= 15) || month > 4) {
                        // console.log(day, month, _distance);
                        distance_since_start += parseFloat(_distance)
                    }
                    return {
                        average_speed: average_speed.substring(0, average_speed.indexOf(" ")),
                        distance: _distance,
                        elapsed_time, //: elapsed_time.replace(/\D/g, ''),
                        moving_time, // : moving_time.replace(/\D/g, ''),
                        total_elevation_gain: total_elevation_gain.substring(0, total_elevation_gain.indexOf(" ")),
                        start_date,
                        average_cadence
                    };
                })


                const _distance = distance.split(" ")[0];
                this.setState({
                    strava_data,
                    strava_kpi: {
                        average_speed: average_speed.substring(0, average_speed.indexOf(" ")),
                        distance: _distance,
                        elapsed_time, //: elapsed_time.replace(/\D/g, ''),
                        moving_time, // : moving_time.replace(/\D/g, ''),
                        total_elevation_gain: total_elevation_gain.substring(0, total_elevation_gain.indexOf(" ")),
                        average_heartrate,
                        distance_from_start: distance_since_start.toFixed(2)
                    }
                })
            });
    }

    _fetchMapMarkers() {
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
                // console.log(data)
                const wahoo_data = [];
                const wahoo_map_data = [];
                const weather_data = [];
                data.map((datum, index) => {

                    const {
                        workout_date_time,
                        data_lat,
                        data_lon,
                        total_distance,
                        average_speed,
                        max_speed,
                        // avg_cadence,
                        // max_cadence,
                        max_elevation,
                        total_climb,
                        total_descent,
                        max_grade,
                        avg_heart_rate,
                        max_heart_rate,
                        elapsed_time,

                        wind_deg,
                        wind_speed,
                        pressure,
                        visibility,
                        temperature,
                        weather,
                        weather_desc,
                        humidity
                    } = datum;

                    var index = workout_date_time.indexOf(' ', workout_date_time.indexOf(' ') + 1);
                    const date = workout_date_time.substring(0, index).trim();
                    const time = workout_date_time.substring(index).trim();
                    // console.log(time.trim())

                    const newWahooObj = {
                        workout_date_time,
                        latitude: parseFloat(data_lat),
                        longitude: parseFloat(data_lon),
                        total_distance,
                        average_speed: parseFloat(average_speed),
                        max_speed,
                        // avg_cadence,
                        // max_cadence,
                        max_elevation,
                        total_climb, // total_climb: parseFloat(total_climb.split(" ")[0]),
                        total_descent,
                        max_grade,
                        avg_heart_rate,
                        max_heart_rate,
                        elapsed_time,
                        date,
                        time,

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
                        date,
                        time,

                        key: index

                    };

                    // if ()
                    const date_arr = date.split(" ");
                    // console.log(date, date_arr);
                    const _date_num = date_arr[1] || "";
                    const date_num = _date_num.replace(/\D/g, '');
                    if (date_arr[0] === "March" || date_arr[0] === "June") {
                        wahoo_data.push(newWahooObj);
                    }
                    else if (date_arr[0] === "April") {
                        if (parseInt(date_num) < 15) {
                            wahoo_data.push(newWahooObj);
                        } else {
                            wahoo_map_data.push(newWahooObj);
                            wahoo_data.push(newWahooObj);
                        }
                    } else {
                        wahoo_map_data.push(newWahooObj);
                        wahoo_data.push(newWahooObj);
                    }

                    weather_data.push(newWeatherObj);

                });

                const { average_speed,
                    total_climb,
                    avg_heart_rate,
                    workout_date_time
                } = wahoo_data[wahoo_data.length - 1];
                const { wind_speed } = weather_data[weather_data.length - 1];

                this.setState({
                    map_data: wahoo_map_data,
                    location_data: wahoo_data.reverse(),
                    weather_data: weather_data.reverse(),
                    kpi: {
                        average_speed,
                        total_climb,
                        wind_speed,
                        avg_heart_rate
                    }
                })
            });
    }

    fetchMapMarkers() {
        this._fetchMapMarkers();
        this.intervalId = setInterval(() =>
            this._fetchMapMarkers(),
            61000);
    }

    componentDidMount() {
        // console.log(process.env.REACT_APP_GOOGLE_API_KEY);
        // this.setState({ map_api_key: process.env.REACT_APP_GOOGLE_API_KEY })
        this.fetchStravaData();
        this.fetchMapMarkers();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    date_diff_indays() {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date();
        var secondDate = new Date("2019-04-15");
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    }
    render() {

        const { apiKey, data, map_data, location_data, weather_data, kpi, strava_data, strava_kpi } = this.state;
        // console.log(apiKey)
        const wahoo_data_columns = Object.keys(Constants.wahoo_data_columns).map(key => {
            if (key === 'Latitude' || key === 'Longitude') {
                const val = parseFloat(Constants.wahoo_data_columns[key]).toFixed(5);
                // console.log(Constants.wahoo_data_columns[key]);
                return {
                    Header: key,
                    accessor: Constants.wahoo_data_columns[key],
                    Cell: props => <div> {props.value.toFixed(5)} </div>
                }
            } else {
                return {
                    Header: key,
                    accessor: Constants.wahoo_data_columns[key]
                }

            }
        })

        const weather_data_columns = Object.keys(Constants.weather_data_columns).map(key => {
            // console.log(key, Constants.weather_data_columns[key]);
            return {
                Header: key,
                accessor: Constants.weather_data_columns[key]
            }
        })

        return (
            <Fragment>
                <PageTitle
                    heading="Location Page"
                    subheading="Follow the journey and discover which factors impact its progress"
                    icon="pe-7s-graph icon-gradient bg-ripe-malin"
                />
                <div>

                    <Row>
                        <Col sm="11" md="11" lg="11">
                            <Card className="mb-3">
                                <CardHeader className="card-header-tab z-index-6 text-center">
                                    Last Ride Stats
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>

                    {/* KPI */}

                    <Row>
                        <Col md="6" lg="2">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading d-block text-center">
                                            Total Distance
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4 text-danger">
                                                        {strava_kpi.distance}
                                                        <small className="opacity-5 text-muted"> miles </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col md="6" lg="2">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading d-block text-center">
                                            Total Riding Time
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.moving_time}
                                                        <small className="opacity-5 text-muted"> hours</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>


                        <Col md="6" lg="2">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading d-block text-center">
                                            Day #
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {this.date_diff_indays()}
                                                        <small className="opacity-5 text-muted"> days</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>



                        <Col md="6" lg="2">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading d-block text-center">
                                            Total Elevation Gain
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.total_elevation_gain}
                                                        <small className="opacity-5 text-muted"> feet</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>



                        <Col md="6" lg="2">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading d-block text-center">
                                            Avg Heart Rate
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.average_heartrate}
                                                        <small className="opacity-5 text-muted"> bpm</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>



                        <Col md="6" lg="2">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading d-block text-center">
                                            Total Distance From Start
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.distance_from_start}
                                                        <small className="opacity-5 text-muted"> miles</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    {/* End KPI */}

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
                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        center_lat={41.850033}
                                        center_lon={-87.6500523}
                                        zoom={4}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* Synchronized charts */}
                    <Row>
                        <Col lg="12" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Avg Speed
                                    </CardTitle>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <LineChart width={600} height={200} data={strava_data} syncId="anyId"
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="start_date" />
                                            <YAxis label={{ value: "Miles per hour (mph)", angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            {/* <Legend /> */}
                                            {/* <Brush /> */}
                                            <Line type='monotone' dataKey='average_speed' stroke='#8884d8' fill='#8884d8' />
                                        </LineChart>
                                    </ResponsiveContainer >
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg="12" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Avg Cadence
                                    </CardTitle>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <LineChart width={600} height={200} data={strava_data} syncId="anyId"
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="start_date" />
                                            <YAxis label={{ value: "RPM", angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            {/* <Legend /> */}
                                            <Brush />
                                            <Line type='monotone' dataKey='average_cadence' stroke='#8884d8' fill='#8884d8' />
                                        </LineChart>
                                    </ResponsiveContainer >
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg="12" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Elevation Gain
                                    </CardTitle>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <LineChart width={600} height={200} data={strava_data} syncId="anyId"
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="start_date" />
                                            <YAxis label={{ value: "Feet", angle: -90, position: 'insideLeft' }} />
                                            {/* <Legend /> */}
                                            <Tooltip />
                                            {/* <Brush /> */}
                                            <Line type='monotone' dataKey='total_elevation_gain' stroke='#8884d8' fill='#8884d8' />
                                        </LineChart>
                                    </ResponsiveContainer >
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
                                </CardHeader>

                                <ReactTable
                                    data={location_data}
                                    columns={wahoo_data_columns}
                                    defaultPageSize={20}
                                    style={{
                                        height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
                                    }}
                                    className="-striped -highlight -fixed"
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Weather Data Table */}
                    <Row>
                        <Col sm="12" lg="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    Weather Data
                                        {/* <div className="btn-actions-pane-right">
                                            <ButtonGroup size="sm">
                                                <Button caret="true" color="focus"
                                                    className={"active"}>Last Week</Button>
                                                <Button caret="true" color="focus">All Month</Button>
                                            </ButtonGroup>
                                        </div> */}
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
                                {/* <CardFooter className="d-block text-center">
                                    <Button className="mr-2 btn-icon btn-icon-only" outline color="danger">
                                        <i className="pe-7s-trash btn-icon-wrapper"> </i>
                                    </Button>
                                    <Button className="btn-wide" color="success">
                                        Save
                                    </Button>
                                </CardFooter> */}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}
