// TODO: UNMOUNT REMOVE TIMER INTERVAL

// TODO: Default setting of map center

// TODO: ZOOM on last marker

// TODO: FORMAT PAGE WIDTH / Responsiveness

// TODO: TRIm the lat / lon

import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import { Brush, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import * as Constants from '../../../constants';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import MapWithMarkers from '../../MyComponents/MapContainer';

export default class LocationPage extends Component {

    constructor() {
        super();
        const apiKey = process.env.GOOGLE_API_KEY;
        this.state = {
            title: 'Live',
            map_data: [],
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
                total_elevation_gain: 0
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

                // calculate
                // console.log(data);

                const {
                    average_speed,
                    distance,
                    elapsed_time,
                    moving_time,
                    total_elevation_gain,
                } = data[data.length - 1];

                console.log(average_speed.substring(0, average_speed.indexOf(" ")),
                    distance.replace(/\D/g, ''),
                    elapsed_time.replace(/\D/g, ''),
                    moving_time.replace(/\D/g, ''),
                    total_elevation_gain.replace(/\D/g, '')
                )

                this.setState({
                    strava_kpi: {
                        average_speed,
                        distance,
                        elapsed_time,
                        moving_time,
                        total_elevation_gain
                    }
                })
            });
    }

    _fetchMapMarkers() {
        fetch(`${Constants.serverUrl}/location`, {
            // fetch(`http://localhost:3001/location`, {
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

                    const newWahooObj = {
                        workout_date_time,
                        // latitude: parseInt(parseFloat(data_lat).toPrecision(5)),
                        // longitude: parseInt(parseFloat(data_lon).toPrecision(5)),
                        latitude: parseFloat(data_lat),
                        longitude: parseFloat(data_lon),
                        total_distance,
                        average_speed: parseFloat(average_speed),
                        max_speed,
                        avg_cadence,
                        max_cadence,
                        max_elevation,
                        total_climb, // total_climb: parseFloat(total_climb.split(" ")[0]),
                        total_descent,
                        max_grade,
                        avg_heart_rate,
                        max_heart_rate,
                        elapsed_time,

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
                // const len = wahoo_data.length;
                // let agg_average_speed = 0,
                //     agg_total_climb = 0,
                //     agg_wind_speed = 0,
                //     agg_avg_heart_rate = 0;

                // for (let i = len - 8; i < len; i++) {
                //     const { average_speed,
                //         total_climb,
                //         wind_speed,
                //         avg_heart_rate
                //     } = wahoo_data[i];
                //     agg_average_speed += average_speed;
                //     agg_total_climb += total_climb;
                //     agg_wind_speed += wind_speed;
                //     agg_avg_heart_rate += avg_heart_rate;
                // }

                const { average_speed,
                    total_climb,
                    avg_heart_rate
                } = wahoo_data[wahoo_data.length - 1];

                // console.log(weather_data)
                const { wind_speed } = weather_data[weather_data.length - 1];

                this.setState({
                    map_data: wahoo_data.reverse(),
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
        this.fetchStravaData();
        this.fetchMapMarkers();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        // const radius = 107;
        const { apiKey, data, map_data, weather_data, kpi, strava_kpi } = this.state;
        console.log(apiKey)

        // const wahoo_table_data 

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

                    {/* KPI */}
                    <Row>
                        <Col md="6" lg="2">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading">
                                            Total Active Time (last week)
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.elapsed_time} 
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
                                        <h6 className="widget-subheading">
                                            Total Distance (last week)
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.distance} 
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
                                        <h6 className="widget-subheading">
                                            Total Distance (last ride)
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4 text-danger">
                                                        {strava_kpi.distance} 
                                                        {/* miles */}
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
                                        <h6 className="widget-subheading">
                                            Elevation Gain (last ride)
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.total_elevation_gain} 
                                                        {/* ft */}
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
                                            Average Speed
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        {strava_kpi.average_speed} 
                                                        {/* mph */}
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
                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A&v=3.exp&libraries=geometry,drawing,places`}
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
                                        Average Speed
                                    </CardTitle>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <LineChart width={600} height={200} data={map_data} syncId="anyId"
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="workout_date_time" />
                                            <YAxis label={{ value: "Miles Per Hour (mph)", angle: -90, position: 'insideLeft' }} />
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
                                        Wind Speed
                                    </CardTitle>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <LineChart width={600} height={200} data={weather_data.reverse()} syncId="anyId"
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="workout_date_time" />
                                            <YAxis label={{ value: "Miles Per Hour (mph)", angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            {/* <Legend /> */}
                                            <Brush />
                                            <Line type='monotone' dataKey='wind_speed' stroke='#8884d8' fill='#8884d8' />
                                        </LineChart>
                                    </ResponsiveContainer >
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Elevation
                                    </CardTitle>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <LineChart width={600} height={200} data={map_data.reverse()} syncId="anyId"
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="workout_date_time" />
                                            <YAxis label={{ value: "Feet", angle: -90, position: 'insideLeft' }} />
                                            {/* <Legend /> */}
                                            <Tooltip />
                                            {/* <Brush /> */}
                                            <Line type='monotone' dataKey='total_climb' stroke='#8884d8' fill='#8884d8' />
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
                                    {/* <div className="btn-actions-pane-right">
                                            <ButtonGroup size="sm">
                                            <Button caret="true" color="focus"
                                                className={"active"}>Last Week</Button>
                                            <Button caret="true" color="focus">All Month</Button>
                                        </ButtonGroup>
                                    </div> */}
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
