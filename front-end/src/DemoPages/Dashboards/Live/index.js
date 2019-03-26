// TODO: MAKE FIRST INTERVAL CALL 

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap';
import * as Constants from '../../../constants';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import ReChartPanel from '../../Components/ReChartPanel';
import MapWithMarkers from '../../MyComponents/MapContainer';
import LiveStream from './LiveStream';

export default class LivePage extends Component {

    constructor() {
        super();
        const apiKey = process.env.GOOGLE_API_KEY;
        this.state = {
            title: 'Live',
            map_data: [],
            weather_data: [],
            selectedMarker: false,
            apiKey: apiKey,
            kpi: {
                average_speed: 0,
                total_climb: 0,
                wind_speed: 0,
                avg_heart_rate: 0
            }
        };
    }

    fetchMapMarkers() {
        this.intervalId = setInterval(() =>
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
                            avg_heart_rate,

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
                    // console.log(weather_data)
                    const { average_speed,
                        total_climb,
                        wind_speed,
                        avg_heart_rate
                    } = wahoo_data[wahoo_data.length - 1];
                    this.setState({
                        map_data: wahoo_data,
                        weather_data: weather_data,
                        kpi: {
                            average_speed,
                            total_climb,
                            wind_speed,
                            avg_heart_rate
                        }
                    })
                }),
            11000);
    }

    componentDidMount() {
        this.fetchMapMarkers();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }


    render() {
        // const radius = 107;
        const { apiKey, map_data, weather_data, kpi } = this.state;
        const wahoo_data_columns = Object.keys(Constants.wahoo_data_columns).map(key => {
            return {
                Header: key,
                accessor: Constants.wahoo_data_columns[key]
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
                    heading="Live Page"
                    subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
                    icon="pe-7s-graph icon-gradient bg-ripe-malin"
                />
                <div>

                    {/* KPI */}
                    <Row>
                        <Col md="6" lg="3">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading">
                                            Current Speed
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        <small className="opacity-5">$</small>
                                                        {kpi.average_speed} mph
                                                    </div>
                                                    <div className="ml-auto">
                                                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                            <span className="text-success pl-2">
                                                                +14%
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col md="6" lg="3">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading">
                                            Current Elevation
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4 text-danger">
                                                        <small className="opacity-5 text-muted">$</small>
                                                        {kpi.total_climb} feet
                                                    </div>
                                                    <div className="ml-auto">
                                                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                            <span className="text-danger pl-2">
                                                                <span className="pr-1">
                                                                    <FontAwesomeIcon icon={faAngleUp} />
                                                                </span>
                                                                8%
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col md="6" lg="3">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading">
                                            Current Wind
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        <span className="text-success pr-2">
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </span>
                                                        <small className="opacity-5">$</small>
                                                        {kpi.wind_speed} mph
                                                    </div>
                                                    <div className="ml-auto">
                                                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                            <span className="text-success pl-2">
                                                                <span className="pr-1">
                                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                                </span>
                                                                15%
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col md="6" lg="3">
                            <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                <div className="widget-chat-wrapper-outer">
                                    <div className="widget-chart-content">
                                        <h6 className="widget-subheading">
                                            Current Heart Rate
                                        </h6>
                                        <div className="widget-chart-flex">
                                            <div className="widget-numbers mb-0 w-100">
                                                <div className="widget-chart-flex">
                                                    <div className="fsize-4">
                                                        <small className="opacity-5">$</small>
                                                        {kpi.avg_heart_rate} bpm
                                                    </div>
                                                    <div className="ml-auto">
                                                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                            <span className="text-warning pl-2">
                                                                +76%
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>


                    {/* FIrst Row */}
                    <Row>
                        <Col lg="12" xl="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Heartrate
                                    </CardTitle>
                                    <LiveStream />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12" xl="6">
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

                    {/* Poll section */}
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    I will be a poll some day
                                        <div className="btn-actions-pane-right">
                                        <ButtonGroup size="sm">
                                            <Button caret="true" color="focus"
                                                className={"active"}>Last Week</Button>
                                            <Button caret="true" color="focus">All Month</Button>
                                        </ButtonGroup>
                                    </div>
                                </CardHeader>
                                <Table responsive hover striped borderless className="align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Name</th>
                                            <th className="text-center">City</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Sales</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </Table>
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

                    {/* CHART SECTion */}
                    <Row>
                        <Col lg="12" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Heart Rate
                                    </CardTitle>
                                    <ReChartPanel
                                        data={map_data}
                                        chart_type={"Line"}
                                        brush={false}
                                        first_attr={"avg_heart_rate"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Elevation
                                    </CardTitle>
                                    <ReChartPanel
                                        data={map_data}
                                        chart_type={"Line"}
                                        brush={false}
                                        first_attr={"total_climb"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Wind Speed
                                    </CardTitle>
                                    <ReChartPanel
                                        data={map_data}
                                        chart_type={"Line"}
                                        brush={false}
                                        first_attr={"wind_speed"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* Table Data */}

                    {/* Location Data Table */}
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

                    {/* Weather Data */}
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
