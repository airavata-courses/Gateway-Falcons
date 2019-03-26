import { faAngleUp, faCog, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CountUp from 'react-countup';
import ReactTable from "react-table";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import * as Constants from '../../../constants';
import PageTitleAlt3 from '../../../Layout/AppMain/PageTitleAlt3';
import ReChartPanel from '../../Components/ReChartPanel';
import IncomeReport from '../Commerce/Examples/Components/IncomeReport';
import moment from 'moment'

export default class FitnessDashboard extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.togglePop1 = this.togglePop1.bind(this);

        this.state = {
            popoverOpen1: false,
            activeTab: '2',
            fitbit_data: [],
            fitbit_kpi: {
                minutesAsleep: 0,
                totalTimeInBed: 0,
                efficiency: 0,
                deep: 0,
                light: 0,
                rem: 0,
                wake: 0
            },
            wahoo_data: [],
            cardio_mood_data: [],
            cardio_mood_average: 0,
            sleep_chart_data: []
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
                const { efficiency, summary, minutesAsleep } = last_record;
                const { totalTimeInBed, stages } = summary;
                const { deep, light, rem, wake } = stages;
                // console.log(sleep[0].efficiency, totalMinutesAsleep, totalTimeInBed, stages)
                const sleep_table_data = [];
                let sleep_chart_data = records.map(record => {
                    const { dateOfSleep, minutesAsleep, startTime, endTime, summary } = record;
                    const { totalTimeInBed, stages } = summary;
                    const { deep, light, rem, wake } = stages;

                    console.log(startTime, endTime)
                    sleep_table_data.push({
                        dateOfSleep,
                        startTime: moment(startTime).format('hh:mm:ss'),
                        endTime: moment(endTime).format('hh:mm:ss'),
                        efficiency,
                        totalTimeInBed,
                        minutesAsleep,
                        light,
                        deep,
                        rem,
                        wake
                    });

                    return {
                        date: dateOfSleep,
                        totalTimeInBed,
                        deep,
                        light,
                        rem,
                        wake
                    };
                });
                // console.log(sleep_chart_data);
                this.setState({
                    fitbit_kpi: {
                        deep,
                        light,
                        rem,
                        wake,
                        efficiency,
                        minutesAsleep,
                        totalTimeInBed
                    },
                    fitbit_data: sleep_table_data,
                    sleep_chart_data
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
                // console.log(records)
                const last_recording = mood_data[mood_data.length - 1];
                const records = last_recording.records;
                const cardio_mood_average =
                    (records.reduce((sum, { rr }) => sum + parseInt(rr), 0) / records.length)
                        .toFixed(5);
                // let cardio_mood_average = 0;
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

                    } = datum;

                    const newWahooObj = {
                        workout_date_time,
                        latitude: parseFloat(data_lat).toFixed(5),
                        longitude: parseFloat(data_lon).toFixed(5),
                        total_distance,
                        average_speed: average_speed.split(" ")[0],
                        max_speed,
                        avg_cadence,
                        max_cadence,
                        max_elevation,
                        total_climb,
                        total_descent,
                        max_grade,
                        avg_heart_rate: avg_heart_rate.split(" ")[0],
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
                    wahoo_data,
                    // kpi: {
                    //     average_speed,
                    //     total_climb,
                    //     wind_speed,
                    //     avg_heart_rate
                    // }
                })
            });
    }


    componentDidMount() {
        this.getAndSetFitnessData();
    }

    render() {

        const { fitbit_kpi, wahoo_data, fitbit_data, sleep_chart_data, cardio_mood_data, cardio_mood_average } = this.state;
        // let _cardio_mood_data,  last_cardio_rr; 
        // if (cardio_mood_data.length > 0) {
        //     _cardio_mood_data = cardio_mood_data[0].records;
        //     last_cardio_rr = cardio_mood_data[0].records[cardio_mood_data[0].records.length - 1].rr;
        // } 

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
                    <PageTitleAlt3
                        heading="Fitness Dashboard"
                        subheading="This is an example dashboard created using build-in elements and components."
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
                                            <CountUp start={0}
                                                end={15065}
                                                separator=","
                                                decimals={0}
                                                decimal=""
                                                delay={2}
                                                prefix="$"
                                                duration="10" />
                                        </div>
                                        <div className="tab-subheading">
                                            <span className="pr-2 opacity-6">
                                                <FontAwesomeIcon icon={faCommentDots} />
                                            </span>
                                            Totals
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
                                            <span className="pr-2 text-success">
                                                <FontAwesomeIcon icon={faAngleUp} />
                                            </span>
                                            {fitbit_kpi.efficiency}
                                        </div>
                                        <div className="tab-subheading">
                                            Sleep
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
                                        <div className="widget-number text-danger">
                                            {/* <CountUp start={0}
                                                end={6784}
                                                separator=","
                                                decimals={1}
                                                decimal="."
                                                delay={2}
                                                prefix="$"
                                                duration="10" /> */}
                                            {/* { cardio_mood_data } */}
                                        </div>
                                        <div className="widget-number">
                                            <span className="pr-2 text-success">
                                                <FontAwesomeIcon icon={faAngleUp} />
                                            </span>
                                        </div>
                                        <div className="tab-subheading">
                                            Last RR
                                        </div>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </CardHeader>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <CardBody>
                                    <IncomeReport />
                                </CardBody>
                            </TabPane>
                            <TabPane tabId="2">
                                {/* brush={true} */}
                                <ReChartPanel
                                    data={sleep_chart_data}
                                    chart_type={"Composed"}
                                    first_attr={"wake"}
                                    second_attr={"light"}
                                    third_attr={"deep"}
                                    fourth_attr={"rem"}
                                    composed_line_attr={"totalTimeInBed"}
                                />
                            </TabPane>
                            <TabPane tabId="3">
                                <CardBody>
                                    {/* <IncomeReport /> */}
                                    <ReChartPanel
                                        data={cardio_mood_data}
                                        chart_type={"Bi-Line"}
                                        first_attr={"bpm"}
                                        second_attr={"rr"}
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
                                                                {fitbit_kpi.totalTimeInBed}
                                                                <small className="opacity-5">minutes</small>
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
                                                    Sleep Efficiency
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4 text-danger">
                                                                {fitbit_kpi.efficiency}
                                                                <small className="opacity-5 text-muted">(score)</small>
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
                                                    Average RR Interval
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4">
                                                                {cardio_mood_average}
                                                                <small className="opacity-5">(rating)</small>
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
                                                    SOME HEART RATE FIELD ...
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4">
                                                                <small className="opacity-5">$</small>
                                                                31,564
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
                        </Col>
                    </Row>

                    {/* Second 2 charts */}
                    <Row>
                        <Col sm="12" md="6">
                            <Card className="mb-3">
                                <CardBody>
                                    <ReChartPanel
                                        data={wahoo_data}
                                        chart_type={"BF-Scatter"}
                                        first_attr={"average_speed"}
                                        second_attr={"avg_heart_rate"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6">
                            <Card className="mb-3">
                                <CardBody>
                                    <ReChartPanel
                                        data={wahoo_data}
                                        chart_type={"BF-Scatter"}
                                        first_attr={"average_speed"}
                                        second_attr={"avg_heart_rate"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
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
                            data={fitbit_data}
                            defaultPageSize={20}
                            style={{
                                height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                            className="-striped -highlight -fixed"
                        />
                        <CardFooter className="d-block p-4 text-center">
                            <Button color="dark" className="btn-pill btn-shadow btn-wide fsize-1" size="lg">
                                <span className="mr-2 opacity-7">
                                    <FontAwesomeIcon spin fixedWidth={false} icon={faCog} />
                                </span>
                                <span className="mr-1">
                                    View Complete Report
                                    </span>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Wahoo */}
                    <Card className="main-card mb-3">
                        <CardHeader>
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                Wahoo Data
                            </div>
                        </CardHeader>
                        <ReactTable
                            data={wahoo_data}
                            columns={wahoo_data_columns}
                            defaultPageSize={20}
                            style={{
                                height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                            className="-striped -highlight -fixed"
                        />
                        <CardFooter className="d-block p-4 text-center">
                            <Button color="dark" className="btn-pill btn-shadow btn-wide fsize-1" size="lg">
                                <span className="mr-2 opacity-7">
                                    <FontAwesomeIcon spin fixedWidth={false} icon={faCog} />
                                </span>
                                <span className="mr-1">
                                    View Complete Report
                                    </span>
                            </Button>
                        </CardFooter>
                    </Card>

                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }
}