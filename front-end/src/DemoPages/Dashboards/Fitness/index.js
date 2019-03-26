import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PageTitleAlt3 from '../../../Layout/AppMain/PageTitleAlt3';

import Chart from 'react-apexcharts'
import ReactTable from "react-table";

import IncomeReport from '../Commerce/Examples/Components/IncomeReport';
import IncomeReport2 from '../Commerce/Examples/Components/IncomeReport2';

import bg1 from '../../../assets/utils/images/dropdown-header/abstract1.jpg';

import Column from './Column';
import Bar2 from './Bar';

import classnames from 'classnames';

import {
    Row, Col,
    Button,
    CardHeader,
    Table,
    ButtonGroup,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Popover,
    PopoverBody,
    Progress,
    Card,
    CardBody,
    CardFooter,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import * as Constants from '../../../constants';


import {
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

import CountUp from 'react-countup';

import {
    faAngleUp,
    faAngleDown,
    faCommentDots,
    faBullhorn,
    faBusinessTime,
    faCog
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReChartPanel from '../../Components/ReChartPanel'

const data222 = [
    { name: 'Jan', Sales: 4000, Downloads: 2400, amt: 2400 },
    { name: 'Feb', Sales: 3000, Downloads: 1398, amt: 2210 },
    { name: 'Mar', Sales: 2000, Downloads: 5800, amt: 2290 },
    { name: 'Apr', Sales: 2780, Downloads: 3908, amt: 2000 },
    { name: 'Jun', Sales: 1890, Downloads: 4800, amt: 2181 },
    { name: 'Jul', Sales: 2390, Downloads: 3800, amt: 2500 },
    { name: 'Aug', Sales: 3000, Downloads: 1398, amt: 2210 },
    { name: 'Sep', Sales: 2000, Downloads: 5800, amt: 2290 },
    { name: 'Oct', Sales: 2780, Downloads: 3908, amt: 2000 },
    { name: 'Nov', Sales: 1890, Downloads: 4800, amt: 2181 },
    { name: 'Dec', Sales: 4000, Downloads: 2400, amt: 2400 },
];

export default class FitnessDashboard extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.togglePop1 = this.togglePop1.bind(this);

        this.state = {
            popoverOpen1: false,
            activeTab: '2',

            optionsMixedChart: {
                chart: {
                    height: 350,
                    type: 'line',
                    stacked: false,
                },
                stroke: {
                    width: [0, 2, 5],
                    curve: 'smooth'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '50%'
                    }
                },
                fill: {
                    opacity: [0.85, 0.25, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },
                labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    title: {
                        text: 'Points',
                    },
                    min: 0
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + " points";
                            }
                            return y;

                        }
                    }
                }

            },
            seriesMixedChart: [{
                name: 'TEAM A',
                type: 'column',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
            }, {
                name: 'TEAM B',
                type: 'bar',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }, {
                name: 'TEAM C',
                type: 'line',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
            }],
            fitbit_data: [],
            fitbit_kpi: {
                totalMinutesAsleep: 0,
                totalTimeInBed: 0,
                efficiency: 0,
                deep: 0,
                light: 0,
                rem: 0,
                wake: 0
            },
            wahoo_data: [],
            cardio_mood_data: [],
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
                console.log(records)
                const last_record = records[records.length - 1];
                const { efficiency, sleep, summary } = last_record;
                const { totalMinutesAsleep, totalTimeInBed, stages } = summary;
                const { deep, light, rem, wake } = stages;
                // console.log(sleep[0].efficiency, totalMinutesAsleep, totalTimeInBed, stages)
                let sleep_chart_data = records.map(record => {
                    const { dateOfSleep, data, summary } = record;
                    const { totalTimeInBed, stages } = summary;
                    const { deep, light, rem, wake } = stages;
                    // console.log(dateOfSleep, totalTimeInBed, deep, light, rem, wake)
                    return {
                        date: dateOfSleep,
                        totalTimeInBed,
                        deep,
                        light,
                        rem,
                        wake
                    };
                });
                console.log(sleep_chart_data);
                this.setState({
                    fitbit_kpi: {
                        deep,
                        light,
                        rem,
                        wake,
                        efficiency,
                        totalMinutesAsleep,
                        totalTimeInBed
                    },
                    fitbit_data: records,
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
            .then(records => {
                console.log(records)
                this.setState({
                    cardio_mood_data: records
                })
            })
    }

    componentDidMount() {
        this.getAndSetFitnessData();
    }

    render() {

        const { fitbit_kpi, fitbit_data, sleep_chart_data, cardio_mood_data } = this.state;
        let _cardio_mood_data,  last_cardio_rr; 
        if (cardio_mood_data.length > 0) {
            _cardio_mood_data = cardio_mood_data[0].records;
            last_cardio_rr = cardio_mood_data[0].records[cardio_mood_data[0].records.length - 1].rr;
        } 

        const wahoo_data_columns = Object.keys(Constants.wahoo_data_columns).map(key => {
            return {
                Header: key,
                accessor: key
            }
        })

        // const fitness_data_columns = Constants.fitness_data_columns.map(key => {
        //     return {
        //         Header: key,
        //         accessor: key
        //     }
        // })

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
                                                { last_cardio_rr }
                                        </div>
                                        <div className="tab-subheading">
                                            <span className="pr-2 opacity-6">
                                                <FontAwesomeIcon icon={faBullhorn} />
                                            </span>
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
                                {/* <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} type="line" width="100%" height="330px" /> */}
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
                                        data={_cardio_mood_data}
                                        chart_type={"Bi-Line"}
                                        first_attr={"bpm"}
                                        second_attr={"rr"}
                                    />
                                </CardBody>
                            </TabPane>
                        </TabContent>
                    </Card>

                    <Row>
                        <Col sm="12" md="7">
                            <Row>
                                <Col sm="12" md="6">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Income
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4">
                                                                <small className="opacity-5">$</small>
                                                                5,456
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
                                <Col sm="12" md="6">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Expenses
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4 text-danger">
                                                                <small className="opacity-5 text-muted">$</small>
                                                                4,764
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
                                <Col sm="12" md="6">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Spendings
                                                </h6>
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mb-0 w-100">
                                                        <div className="widget-chart-flex">
                                                            <div className="fsize-4">
                                                                <span className="text-success pr-2">
                                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                                </span>
                                                                <small className="opacity-5">$</small>
                                                                1.5M
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
                                <Col sm="12" md="6">
                                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <h6 className="widget-subheading">
                                                    Totals
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
                        <Col sm="12" md="5">
                            <Card className="mb-3">
                                <CardBody>
                                    <div className="widget-chart widget-chart2 text-left p-0">
                                        <div className="widget-chat-wrapper-outer">
                                            <div className="widget-chart-content">
                                                <div className="widget-chart-flex">
                                                    <div className="widget-numbers mt-0">
                                                        <div className="widget-chart-flex">
                                                            <div>
                                                                <small className="opacity-5">$</small>

                                                                <CountUp start={0}
                                                                    end={628}
                                                                    separator=""
                                                                    decimals={0}
                                                                    decimal="."
                                                                    prefix=""
                                                                    duration="10" />
                                                            </div>
                                                            <div
                                                                className="widget-title ml-2 opacity-5 font-size-lg text-muted">
                                                                Total Expenses Today
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
                                                <ResponsiveContainer width="100%" height={177} aspect={3.0 / 1.0}>
                                                    <BarChart data={data222}>
                                                        <Bar barGap="12" dataKey="Sales" stackId="a"
                                                            fill="var(--primary)" />
                                                        <Bar barGap="12" dataKey="Downloads" fillOpacity=".2" stackId="a"
                                                            fill="var(--primary)" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* Second 2 charts */}
                    <Row>
                        <Col sm="12" lg="6">
                            <Card className="mb-3">
                                <CardHeader className="card-header-tab">
                                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                        Daily Sales
                                    </div>

                                    <div className="btn-actions-pane-right text-capitalize">
                                        <Button size="sm" outline className="btn-wide btn-outline-2x" color="focus">View All</Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Column />
                                </CardBody>
                                <CardFooter className="p-0 d-block">
                                    <div className="grid-menu grid-menu-2col">
                                        <Row className="no-gutters">
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="dark">
                                                    <i className="lnr-apartment text-dark opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Overview
                                                </Button>
                                            </Col>
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="dark">
                                                    <i className="lnr-database text-dark opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Support
                                                </Button>
                                            </Col>
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="dark">
                                                    <i className="lnr-printer text-dark opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Activities
                                                </Button>
                                            </Col>
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="dark">
                                                    <i className="lnr-store text-dark opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Marketing
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6">
                            <Card className="mb-3">
                                <CardHeader className="card-header-tab">
                                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                        Total Expenses
                                    </div>
                                    <div className="btn-actions-pane-right text-capitalize">
                                        <Button size="sm" outline className="btn-wide btn-outline-2x" color="primary">View All</Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Bar2 />
                                </CardBody>
                                <CardFooter className="p-0 d-block">
                                    <div className="grid-menu grid-menu-2col">
                                        <Row className="no-gutters">
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="success">
                                                    <i className="lnr-lighter text-success opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Accounts
                                                </Button>
                                            </Col>
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="warning">
                                                    <i className="lnr-construction text-warning opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Contacts
                                                </Button>
                                            </Col>
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="info">
                                                    <i className="lnr-bus text-info opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Products
                                                </Button>
                                            </Col>
                                            <Col sm="6" className="p-2">
                                                <Button
                                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                                    outline color="alternate">
                                                    <i className="lnr-gift text-alternate opacity-7 btn-icon-wrapper mb-2"> </i>
                                                    Services
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    {/* End second 2 charts */}

                    {/* Start KPI */}
                    <div className="card no-shadow bg-transparent no-border rm-borders mb-3">
                        <Card>
                            <Row className="no-gutters">
                                <Col md="12" lg="4">
                                    <ListGroup flush>
                                        <ListGroupItem className="bg-transparent">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">
                                                                Total Orders
                                                                </div>
                                                            <div className="widget-subheading">
                                                                Last year expenses
                                                                </div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-success">
                                                                1896
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                        <ListGroupItem className="bg-transparent">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">
                                                                Clients
                                                                </div>
                                                            <div className="widget-subheading">
                                                                Total Clients Profit
                                                                </div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-primary">
                                                                $12.6k
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col md="12" lg="4">
                                    <ListGroup flush>
                                        <ListGroupItem className="bg-transparent">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">
                                                                Followers
                                                                </div>
                                                            <div className="widget-subheading">
                                                                People Interested
                                                                </div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-danger">
                                                                45,9%
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                        <ListGroupItem className="bg-transparent">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">
                                                                Products Sold
                                                                </div>
                                                            <div className="widget-subheading">
                                                                Total revenue streams
                                                                </div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-warning">
                                                                $3M
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col md="12" lg="4">
                                    <ListGroup flush>
                                        <ListGroupItem className="bg-transparent">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">
                                                                Total Orders
                                                                </div>
                                                            <div className="widget-subheading">
                                                                Last year expenses
                                                                </div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-success">
                                                                1896
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                        <ListGroupItem className="bg-transparent">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">
                                                                Clients
                                                                </div>
                                                            <div className="widget-subheading">
                                                                Total Clients Profit
                                                                </div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-primary">
                                                                $12.6k
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    {/* End KPI */}

                    {/* FITBIT Table */}
                    <Card className="main-card mb-3">
                        <CardHeader>
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                Fitbit Data
                            </div>
                        </CardHeader>
                        <ReactTable
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

                    {/* Wahoo */}
                    <Card className="main-card mb-3">
                        <CardHeader>
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                Wahoo Data
                            </div>
                        </CardHeader>
                        <ReactTable
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