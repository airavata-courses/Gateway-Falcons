import { faAngleUp, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CountUp from 'react-countup';
import ReactTable from "react-table";
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import * as Constants from '../../../constants';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import ReChartPanel from '../../Components/ReChartPanel';
import IncomeReport from '../Commerce/Examples/Components/IncomeReport';

export default class FitnessDashboard extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.togglePop1 = this.togglePop1.bind(this);

        this.state = {
            popoverOpen1: false,
            activeTab: '1',
            fitbit_data: [],
            fitbit_kpi: {
                minutesAsleep: 0,
                totalTimeInBed: 0,
                deep: 0,
                light: 0,
                rem: 0,
                wake: 0,
                last_blood_pressure: 0,
            },
            restingHeartRate: 0,
            wahoo_data: [],
            cardio_mood_data: [],
            cardio_mood_average: 0,
            sleep_chart_data: [],
            fitBitTimeSeries: [],
            blood_pressure_data: [],
            lastBloodPressureSys: "",
            lastBloodPressureDia: "",

        }
    }

    togglePop1() {
        this.setState({
            popoverOpen1: !this.state.popoverOpen1
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getAndSetFitnessData() {

        fetch(`${Constants.serverUrl}/cardio_mood`, {
        // fetch('http://localhost:3001/blood_pressure', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(bp_data => {
                console.log('data', bp_data);
                const last_record = bp_data[bp_data.length - 1];
                const _records = last_record.records.reverse();
                const { sys, dia } = _records[_records.length - 1];
                console.log(sys, dia);
                this.setState({
                    blood_pressure_data: last_record.records,
                    lastBloodPressureSys: sys,
                    lastBloodPressureDia: dia
                })
            })

        fetch(`${Constants.serverUrl}/fitbit`, {
            // fetch('http://localhost:3001/fitbit', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(records => {
                const last_record = records[records.length - 1];
                const { summary, minutesAsleep } = last_record;
                const { totalTimeInBed, stages } = summary;
                const { deep, light, rem, wake } = stages;
                const sleep_table_data = [];
                let sleep_chart_data = records.map(record => {
                    const { dateOfSleep, minutesAsleep, startTime, endTime, summary } = record;
                    const { totalTimeInBed, stages } = summary;
                    const { deep, light, rem, wake } = stages;

                    // console.log(startTime, endTime)
                    sleep_table_data.push({
                        dateOfSleep,
                        startTime: moment(startTime).format('HH:mm'),
                        endTime: moment(endTime).format('HH:mm'),
                        totalTimeInBed: (totalTimeInBed / 60).toFixed(2),
                        minutesAsleep: (minutesAsleep / 60).toFixed(2),
                        light: (light / 60).toFixed(2),
                        deep: (deep / 60).toFixed(2),
                        rem: (rem / 60).toFixed(2),
                        wake: (wake / 60).toFixed(2)
                    });

                    return {
                        date: dateOfSleep,
                        totalTimeInBed: (totalTimeInBed / 60).toFixed(2),
                        deep: (deep / 60).toFixed(2),
                        light: (light / 60).toFixed(2),
                        rem: (rem / 60).toFixed(2),
                        wake: (wake / 60).toFixed(2)
                    };
                });
                // console.log(sleep_chart_data);
                this.setState({
                    fitbit_kpi: {
                        deep,
                        light,
                        rem,
                        wake,
                        minutesAsleep,
                        totalTimeInBed
                    },
                    fitbit_data: sleep_table_data,
                    sleep_chart_data
                })
            })

        fetch(`${Constants.serverUrl}/fitbit_hr`, {
            // fetch('http://localhost:3001/fitbit_hr', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(records => {
                const { restingHeartRate } = records[records.length - 1];
                // console.log(restingHeartRate);
                // console.log(records[records.length - 1]);
                this.setState({
                    restingHeartRateData: records,
                    restingHeartRate
                })
            })

        fetch(`${Constants.serverUrl}/cardio_mood`, {
            // fetch('http://localhost:3001/cardio_mood', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(mood_data => {
                const last_recording = mood_data[mood_data.length - 1];
                let records = last_recording.records;
                let cardio_mood_average = 0;
                //     (records.reduce((sum, { rr }) => sum + parseInt(rr), 0) / records.length);
                for (var record of records) {
                    record.timestamp = record.timestamp / 1000;
                    record.timestamp = record.timestamp.toFixed(0);
                    cardio_mood_average += parseInt(record.rr);
                }
                cardio_mood_average = cardio_mood_average / records.length;
                // console.log(records)
                // console.log(cardio_mood_average)
                this.setState({
                    cardio_mood_data: records,
                    cardio_mood_average
                })
            })

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
                const wahoo_data = data.map((datum, index) => {
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

                    } = datum;

                    const newWahooObj = {
                        workout_date_time,
                        latitude: parseFloat(data_lat).toFixed(5),
                        longitude: parseFloat(data_lon).toFixed(5),
                        total_distance,
                        average_speed: average_speed, // .split(" ")[0],
                        max_speed,
                        avg_cadence,
                        max_cadence,
                        max_elevation,
                        total_climb,
                        total_descent,
                        max_heart_rate,
                        elapsed_time,
                        max_grade,
                        avg_heart_rate: avg_heart_rate, // .split(" ")[0],
                        key: index

                    };

                    return newWahooObj;

                });
                // const { average_speed,
                //     total_climb,
                //     wind_speed,
                //     avg_heart_rate
                // } = wahoo_data[wahoo_data.length - 1];
                // console.log('wahoo_data', wahoo_data)
                this.setState({
                    wahoo_data: wahoo_data.reverse(),
                    // kpi: {
                    //     average_speed,
                    //     total_climb,
                    //     wind_speed,
                    //     avg_heart_rate
                    // }
                })
            });

        fetch(`${Constants.serverUrl}/fitbit_ts`, {
            // fetch('http://localhost:3001/fitbit_ts', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(records => {
                // const lastHours = moment().subtract(24, 'hours'); // .calendar();
                // const lastHours = moment(moment(), Date.now())
                let yesterday = new Date(Date.now());
                yesterday.setHours(yesterday.getHours() - 24);
                console.log(yesterday.getTime());
                console.log(records);
                const _records = [];
                for (var record of records) {
                    const { date, time, value } = record;
                    // console.log(date + " " + time);
                    // console.log(moment(date + " " + time));
                    // console.log(moment(date + " " + time).valueOf());
                    if (moment(date + " " + time).valueOf() >= yesterday.getTime()) {
                        _records.push({
                            date,
                            time: moment(date + " " + time).format('HH:mm'),
                            bpm: value
                        });
                    }
                }
                console.log(_records);

                this.setState({
                    fitBitTimeSeries: _records,
                })
            })
    }


    componentDidMount() {
        this.getAndSetFitnessData();
    }

    render() {

        const { fitbit_kpi, wahoo_data, fitbit_data, sleep_chart_data, cardio_mood_data,
            cardio_mood_average, restingHeartRate, restingHeartRateData, fitBitTimeSeries,
            blood_pressure_data, lastBloodPressureSys, lastBloodPressureDia
        } = this.state;


        const wahoo_data_columns = Object.keys(Constants.wahoo_data_columns).map(key => {
            return {
                Header: key,
                accessor: Constants.wahoo_data_columns[key]
            }
        })

        // console.log('wahoo_data_columns', wahoo_data_columns)

        const fitbit_data_columns = Object.keys(Constants.fitbit_data_columns).map(key => {
            return {
                Header: key,
                accessor: Constants.fitbit_data_columns[key]
            }
        });

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="Fitness Dashboard"
                        subheading="Discover relationships between long-term exercise and cardiac performance"
                        icon="lnr-apartment icon-gradient bg-mean-fruit"
                    />
                    <Card tabs="true" className="mb-3">
                        <CardHeader className="tabs-lg-alternate">
                            <Nav justified>
                                <NavItem>
                                    <NavLink href="javascript:void(0);"
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => {
                                            this.toggle('1');
                                        }}
                                    >
                                        <div className="widget-number">
                                            {/* <CountUp start={0}
                                                end={15065}
                                                separator=","
                                                decimals={0}
                                                decimal=""
                                                delay={2}
                                                prefix="$"
                                                duration="10" /> */}
                                            Heart Rate
                                        </div>
                                        <div className="tab-subheading">
                                            (last 24 hrs)
                                        </div>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="javascript:void(0);"
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => {
                                            this.toggle('2');
                                        }}
                                    >
                                        <div className="widget-number">
                                            Blood Pressure
                                        </div>
                                        <div className="tab-subheading">
                                            (historical)
                                        </div>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="javascript:void(0);"
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => {
                                            this.toggle('3');
                                        }}
                                    >
                                        <div className="widget-number">
                                            R-R Intervals
                                        </div>
                                        <div className="tab-subheading">
                                            (last recording)
                                        </div>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </CardHeader>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <CardBody>
                                    <ReChartPanel
                                        data={fitBitTimeSeries}
                                        chart_type={"Line"}
                                        first_attr={"bpm"}
                                    />

                                </CardBody>
                            </TabPane>
                            <TabPane tabId="2">
                                {/* brush={true} */}
                                <CardBody>
                                    {/* TODO:  */}
                                    <ReChartPanel
                                        data={blood_pressure_data}
                                        chart_type={"Bi-Area"}
                                        first_attr={"sys"}
                                        second_attr={"dia"}
                                    />
                                </CardBody>
                            </TabPane>
                            <TabPane tabId="3">
                                <CardBody>
                                    <ReChartPanel
                                        data={cardio_mood_data}
                                        chart_type={"Bi-Line"}
                                        first_attr={"rr"}
                                        second_attr={"bpm"}
                                    />
                                </CardBody>
                            </TabPane>
                        </TabContent>
                    </Card>

                    {/* KPI ROW */}
                    <Row>
                        <Col sm="12" md="12" lg="12">
                            <Row>
                                <Col sm="12" md="3">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Total Time in bed
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4">
                                                                {(fitbit_kpi.totalTimeInBed / 60).toFixed(2)}
                                                                <small className="opacity-5"> Hours</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm="12" md="3">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Resting Heartrate
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4 text-danger">
                                                                {restingHeartRate}
                                                                <small className="opacity-5 text-muted"> bpm</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm="12" md="3">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Average R-R Interval
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4">
                                                                {cardio_mood_average.toFixed(0)}
                                                                <small className="opacity-5"> ms </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm="12" md="3">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Last Blood Pressure Reading
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4">
                                                                {/* {
                                                                (lastBloodPressureSys > 130)
                                                                    ? <div className="widget-numbers text-danger">
                                                                        {lastBloodPressureSys}
                                                                    </div>
                                                                    :
                                                                    <div className="widget-numbers text-success">
                                                                        {lastBloodPressure}
                                                                    </div>
                                                            } */}
                                                                {lastBloodPressureSys + "/" + lastBloodPressureDia}
                                                                <small className="opacity-5"> mmHg </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Col >
                    </Row >

                    {/* Second 2 charts */}
                    < Row >
                        <Col sm="12" md="6">
                            <Card className="mb-3">
                                <CardBody>
                                    <ReChartPanel
                                        data={sleep_chart_data}
                                        chart_type={"Composed"}
                                        first_attr={"wake"}
                                        second_attr={"light"}
                                        third_attr={"deep"}
                                        fourth_attr={"rem"}
                                        composed_line_attr={"totalTimeInBed"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6">
                            <Card className="mb-3">
                                <CardBody>
                                    <ReChartPanel
                                        data={restingHeartRateData}
                                        chart_type={"Line"}
                                        first_attr={"restingHeartRate"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row >
                    {/* End second 2 charts */}

                    {/* FITBIT Table */}
                    <Card className="main-card mb-3">
                        <CardHeader>
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                Fitbit Data
                            </div>
                        </CardHeader>
                        <ReactTable
                            columns={fitbit_data_columns}
                            data={fitbit_data.reverse()}
                            defaultPageSize={20}
                            style={{
                                height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                            className="-striped -highlight -fixed"
                        />
                    </Card>

                </ReactCSSTransitionGroup >
            </Fragment >
        )
    }
}