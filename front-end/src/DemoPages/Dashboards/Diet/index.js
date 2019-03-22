import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    ListGroup,
    ListGroupItem, CardFooter,
    CustomInput, Input,
    Dropdown, DropdownItem, DropdownToggle, DropdownMenu,
    UncontrolledButtonDropdown
} from 'reactstrap';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import CountUp from 'react-countup';

import ReactTable from "react-table";

import Ionicon from 'react-ionicons';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Slider from "react-slick";

import { makeData } from "../../Tables/DataTables/Examples/utils";

import * as Constants from '../../../constants';

import {
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';

import {
    Sparklines,
    SparklinesCurve
} from 'react-sparklines';

import {
    faAngleUp,
    faAngleDown,
    faCalendarAlt,
    faEllipsisH,
    faCheck,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import Select from 'react-select';

const options = [
    { value: '1', label: 'Today' },
    { value: '2', label: 'Last Week' },
    { value: '3', label: 'Last 30 Days' },
    { value: '4', label: 'Last 3 Months' },
    { value: '5', label: 'Last Year' },
];

const data55 = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page C', uv: 2000, pv: 6800, amt: 2290 },
    { name: 'Page D', uv: 4780, pv: 7908, amt: 2000 },
    { name: 'Page E', uv: 2890, pv: 9800, amt: 2181 },
    { name: 'Page F', uv: 1390, pv: 3800, amt: 1500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const data552 = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page C', uv: 2000, pv: 6800, amt: 2290 },
    { name: 'Page F', uv: 1390, pv: 3800, amt: 1500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page D', uv: 4780, pv: 7908, amt: 2000 },
    { name: 'Page E', uv: 2890, pv: 9800, amt: 2181 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
];

const data553 = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 1390, pv: 3800, amt: 1500 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page C', uv: 2000, pv: 6800, amt: 2290 },
    { name: 'Page E', uv: 2890, pv: 9800, amt: 2181 },
    { name: 'Page D', uv: 4780, pv: 7908, amt: 2000 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

function boxMullerRandom() {
    let phase = false,
        x1, x2, w, z;

    return (function () {

        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);
const sampleData2 = randomData(15);
const sampleData3 = randomData(8);
const sampleData4 = randomData(12);

export default class DietDashboard extends Component {
    constructor() {
        super();

        this.state = {
            data: makeData(),
            dropdownOpen: false,
            selectedOption: null,

            diet_data: [],
            today: {},
            yesterday: {},
        };
        this.toggle = this.toggle.bind(this);

    }

    getAndSetDietData() {
        // fetch(`${Constants.serverUrl}/diet`, {
        fetch('http://localhost:3001/diet', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(res => {
                const _data = res.map(datum => {
                    const {
                        date,
                        totals: {
                            calories: calories,
                            carbohydrates: carbohydrates,
                            fat: fat,
                            protein: protein,
                            sodium: sodium,
                            sugar: sugar,
                        },
                        water
                    } = datum;
                    return {
                        date,
                        calories,
                        carbohydrates,
                        fat,
                        protein,
                        sodium,
                        sugar,
                        water
                    };
                })
                console.log(_data);
                this.setState({
                    diet_data: _data,
                    today: _data[res.length - 1],
                    yesterday: _data[res.length - 2]
                })
            })
    }

    componentDidMount() {
        this.getAndSetDietData();
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { selectedOption } = this.state;
        const { data, diet_data } = this.state;

        const settings = {
            className: "",
            centerMode: false,
            infinite: true,
            slidesToShow: 1,
            speed: 500,
            dots: true,
        };

        // const data_columns = Constants.diet_data_columns.map(key => {
        //     return {
        //         Header: key,
        //         accessor: 
        //     }
        // })

        const data_columns = Object.keys(Constants.diet_data_columns).map((key, index) => {
            return {
                Header: key,
                accessor: Constants.diet_data_columns[key]
            }
        })

        return (
            <Fragment>
                <PageTitle
                    heading="Diet Page"
                    subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
                    icon="pe-7s-graph icon-gradient bg-ripe-malin"
                />
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>

                        {/* Top KPI */}

                        <Card className="mb-3">
                            <CardHeader className="card-header-tab z-index-6">
                                <div
                                    className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    <i className="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                                    Portfolio Performance
                                </div>
                                <div className="btn-actions-pane-right text-capitalize">
                                    <span className="d-inline-block ml-2" style={{ width: 200 }}>
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={options}
                                        />
                                    </span>
                                </div>
                            </CardHeader>
                            <Row className="no-gutters">
                                <Col sm="6" md="4" xl="4">
                                    <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg opacity-10 bg-warning" />
                                            <i className="lnr-laptop-phone text-dark opacity-8" />
                                        </div>
                                        <div className="widget-chart-content">
                                            <div className="widget-subheading">
                                                Fats
                                            </div>
                                            <div className="widget-numbers">
                                                1,7M
                                            </div>
                                            <div className="widget-description opacity-8 text-focus">
                                                <div className="d-inline text-danger pr-1">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                    <span className="pl-1">54.1%</span>
                                                </div>
                                                less earnings
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider m-0 d-md-none d-sm-block" />
                                </Col>
                                <Col sm="6" md="4" xl="4">
                                    <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg opacity-9 bg-danger" />
                                            <i className="lnr-graduation-hat text-white" />
                                        </div>
                                        <div className="widget-chart-content">
                                            <div className="widget-subheading">
                                                Carbs
                                            </div>
                                            <div className="widget-numbers">
                                                <CountUp start={0}
                                                    end={8.7}
                                                    separator=""
                                                    decimals={0}
                                                    decimal=","
                                                    prefix=""
                                                    useEasing={false}
                                                    suffix="M"
                                                    duration="5" />
                                            </div>
                                            <div className="widget-description opacity-8 text-focus">
                                                Grow Rate:
                                                <span className="text-info pl-1">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                    <span className="pl-1">14.1%</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider m-0 d-md-none d-sm-block" />
                                </Col>
                                <Col sm="12" md="4" xl="4">
                                    <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg opacity-9 bg-success" />
                                            <i className="lnr-apartment text-white" />
                                        </div>
                                        <div className="widget-chart-content">
                                            <div className="widget-subheading">
                                                Protein
                                            </div>
                                            <div className="widget-numbers text-success">
                                                <CountUp start={0}
                                                    end={563}
                                                    separator=""
                                                    decimals={0}
                                                    decimal="."
                                                    prefix="$"
                                                    useEasing={false}
                                                    suffix=""
                                                    duration="7" />
                                            </div>
                                            <div className="widget-description text-focus">
                                                Increased by
                                                <span className="text-warning pl-1">
                                                    <FontAwesomeIcon icon={faAngleUp} />
                                                    <span className="pl-1">7.35%</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <CardFooter className="text-center d-block p-3">
                                <Button color="primary" className="btn-pill btn-shadow btn-wide fsize-1" size="lg">
                                    <span className="mr-2 opacity-7">
                                        <Ionicon color="#ffffff" icon="ios-analytics-outline" beat={true} />
                                    </span>
                                    <span className="mr-1">
                                        View Complete Report
                                    </span>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Middle Row */}
                        <Row>

                            {/* Left col */}
                            <Col sm="12" lg="6">
                                <Card className="mb-3">
                                    <CardHeader className="card-header-tab">
                                        <div
                                            className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                            <i className="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"> </i>
                                            Technical Support
                                        </div>

                                        <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle className="btn-icon btn-icon-only" color="link">
                                                    <i className="pe-7s-menu btn-icon-wrapper" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
                                                    <DropdownItem header>Header</DropdownItem>
                                                    <DropdownItem>
                                                        <i className="dropdown-icon lnr-inbox"> </i>
                                                        <span>Menus</span>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <i className="dropdown-icon lnr-file-empty"> </i>
                                                        <span>Settings</span>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <i className="dropdown-icon lnr-book"> </i>
                                                        <span>Actions</span>
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <div className="p-3 text-right">
                                                        <Button className="mr-2 btn-shadow btn-sm" color="link">View
                                                            Details</Button>
                                                        <Button className="mr-2 btn-shadow btn-sm"
                                                            color="primary">Action</Button>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="p-0">
                                        <div className="p-1 slick-slider-sm mx-auto">
                                            <Slider {...settings}>
                                                <div>
                                                    <div className="widget-chart widget-chart2 text-left p-0">
                                                        <div className="widget-chat-wrapper-outer">
                                                            <div className="widget-chart-content widget-chart-content-lg">
                                                                <div className="widget-chart-flex">
                                                                    <div
                                                                        className="widget-title opacity-5 text-muted text-uppercase">
                                                                        New accounts since 2018
                                                                    </div>
                                                                </div>
                                                                <div className="widget-numbers">
                                                                    <div className="widget-chart-flex">
                                                                        <div>
                                                                            <span className="opacity-10 text-success pr-2">
                                                                                <FontAwesomeIcon icon={faAngleUp} />
                                                                            </span>
                                                                            <CountUp start={0}
                                                                                end={78}
                                                                                separator=""
                                                                                decimals={0}
                                                                                decimal=""
                                                                                prefix=""
                                                                                duration="15" />
                                                                            <small className="opacity-5 pl-1">%</small>
                                                                        </div>
                                                                        <div
                                                                            className="widget-title ml-2 font-size-lg font-weight-normal text-muted">
                                                                            <span className="text-success pl-2">
                                                                                +14
                                                                        </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="widget-chart-wrapper he-auto opacity-10 m-0">
                                                                <ResponsiveContainer height={140} width='100%'>
                                                                    <AreaChart data={data55}
                                                                        margin={{
                                                                            top: -15,
                                                                            right: 0,
                                                                            left: 0,
                                                                            bottom: 0
                                                                        }}>
                                                                        <Area type='monotoneX' dataKey='uv'
                                                                            stroke='var(--success)'
                                                                            strokeWidth='4'
                                                                            fill='var(--success)'
                                                                            fillOpacity='.2' />
                                                                    </AreaChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="widget-chart widget-chart2 text-left p-0">
                                                        <div className="widget-chat-wrapper-outer">
                                                            <div className="widget-chart-content widget-chart-content-lg">
                                                                <div className="widget-chart-flex">
                                                                    <div
                                                                        className="widget-title opacity-5 text-muted text-uppercase">
                                                                        Helpdesk Tickets
                                                                    </div>
                                                                </div>
                                                                <div className="widget-numbers">
                                                                    <div className="widget-chart-flex">
                                                                        <div>
                                                                            <span className="text-warning">
                                                                                34
                                                                        </span>
                                                                        </div>
                                                                        <div className="widget-title ml-2 font-size-lg font-weight-normal text-dark">
                                                                            <span className="opacity-5 text-muted pl-2 pr-1">
                                                                                5%
                                                                        </span>
                                                                            increase
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="widget-chart-wrapper he-auto opacity-10 m-0">
                                                                <ResponsiveContainer height={140} width='100%'>
                                                                    <AreaChart data={data552}
                                                                        margin={{
                                                                            top: -15,
                                                                            right: 0,
                                                                            left: 0,
                                                                            bottom: 0
                                                                        }}>
                                                                        <Area type='monotoneX' dataKey='uv'
                                                                            stroke='var(--warning)'
                                                                            strokeWidth='4'
                                                                            fill='var(--warning)'
                                                                            fillOpacity='.2' />
                                                                    </AreaChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="widget-chart widget-chart2 text-left p-0">
                                                        <div className="widget-chat-wrapper-outer">
                                                            <div className="widget-chart-content widget-chart-content-lg">
                                                                <div className="widget-chart-flex">
                                                                    <div
                                                                        className="widget-title opacity-5 text-muted text-uppercase">
                                                                        Last Year Total Sales
                                                                    </div>
                                                                </div>
                                                                <div className="widget-numbers">
                                                                    <div className="widget-chart-flex">
                                                                        <div>
                                                                            <small className="opacity-3 pr-1">$</small>
                                                                            <span>
                                                                                629
                                                                            </span>
                                                                            <span className="text-primary pl-3">
                                                                                <FontAwesomeIcon icon={faAngleDown} />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="widget-chart-wrapper he-auto opacity-10 m-0">
                                                                <ResponsiveContainer height={140} width='100%'>
                                                                    <AreaChart data={data553}
                                                                        margin={{
                                                                            top: -15,
                                                                            right: 0,
                                                                            left: 0,
                                                                            bottom: 0
                                                                        }}>
                                                                        <Area type='monotoneX' dataKey='uv'
                                                                            stroke='var(--primary)'
                                                                            strokeWidth='4'
                                                                            fill='var(--primary)'
                                                                            fillOpacity='.2' />
                                                                    </AreaChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slider>
                                        </div>
                                        <h6 className="text-muted text-uppercase font-size-md opacity-5 pl-3 pr-3 pb-1 font-weight-normal">
                                            Sales Progress
                                        </h6>
                                        <ListGroup flush>
                                            <ListGroupItem className="p-3 bg-transparent">
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
                                                                    <small>$</small>
                                                                    1896
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-progress-wrapper">
                                                            <Progress
                                                                className="progress-bar-sm progress-bar-animated-alt"
                                                                color="primary"
                                                                value="43" />
                                                            <div className="progress-sub-label">
                                                                <div className="sub-label-left">
                                                                    YoY Growth
                                                                </div>
                                                                <div className="sub-label-right">
                                                                    100%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </CardBody>
                                </Card>
                            </Col>

                            {/* Right Col */}
                            <Col sm="12" lg="6">
                                <Card className="card-hover-shadow-2x mb-3">
                                    <CardHeader className="card-header-tab">
                                        <div
                                            className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                            <i className="header-icon lnr-lighter icon-gradient bg-amy-crisp"> </i>
                                            Timeline Example
                                        </div>
                                        <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle className="btn-icon btn-icon-only" color="link">
                                                    <i className="pe-7s-menu btn-icon-wrapper" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
                                                    <DropdownItem header>Header</DropdownItem>
                                                    <DropdownItem>
                                                        <i className="dropdown-icon lnr-inbox"> </i>
                                                        <span>Menus</span>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <i className="dropdown-icon lnr-file-empty"> </i>
                                                        <span>Settings</span>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <i className="dropdown-icon lnr-book"> </i>
                                                        <span>Actions</span>
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <div className="p-3 text-right">
                                                        <Button className="mr-2 btn-shadow btn-sm" color="link">View
                                                            Details</Button>
                                                        <Button className="mr-2 btn-shadow btn-sm"
                                                            color="primary">Action</Button>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </div>
                                    </CardHeader>
                                    <div className="scroll-area-lg">
                                        <PerfectScrollbar>
                                            <div className="p-4">
                                                <VerticalTimeline layout="1-column">
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-success"> </i>}
                                                        date="10:30 PM"
                                                    >
                                                        <h4 className="timeline-title">All Hands Meeting</h4>
                                                        <p>
                                                            Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a>
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-warning"> </i>}
                                                        date="12:25 PM"
                                                    >
                                                        <p>
                                                            Another meeting today, at <b className="text-danger">12:00
                                                            PM</b>
                                                        </p>
                                                        <p>
                                                            Yet another one, at <span
                                                                className="text-success">15:00 PM</span>
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-danger"> </i>}
                                                        date="15:00 PM"
                                                    >
                                                        <h4 className="timeline-title">Build the production release</h4>
                                                        <p>
                                                            Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
                                                            incididunt ut labore et dolore magna elit enim at minim
                                                            veniam quis nostrud
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-primary"> </i>}
                                                        date="15:00 PM"
                                                    >
                                                        <h4 className="timeline-title text-success">Something not
                                                            important</h4>
                                                        <p>
                                                            Lorem ipsum dolor sit amit,consectetur elit enim at minim
                                                            veniam quis nostrud
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-success"> </i>}
                                                        date="10:30 PM"
                                                    >
                                                        <h4 className="timeline-title">All Hands Meeting</h4>
                                                        <p>
                                                            Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a>
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-warning"> </i>}
                                                        date="12:25 PM"
                                                    >
                                                        <p>
                                                            Another meeting today, at <b className="text-danger">12:00
                                                            PM</b>
                                                        </p>
                                                        <p>
                                                            Yet another one, at <span
                                                                className="text-success">15:00 PM</span>
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-danger"> </i>}
                                                        date="15:00 PM"
                                                    >
                                                        <h4 className="timeline-title">Build the production release</h4>
                                                        <p>
                                                            Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
                                                            incididunt ut labore et dolore magna elit enim at minim
                                                            veniam quis nostrud
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-primary"> </i>}
                                                        date="15:00 PM"
                                                    >
                                                        <h4 className="timeline-title text-success">Something not
                                                            important</h4>
                                                        <p>
                                                            Lorem ipsum dolor sit amit,consectetur elit enim at minim
                                                            veniam quis nostrud
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-success"> </i>}
                                                        date="10:30 PM"
                                                    >
                                                        <h4 className="timeline-title">All Hands Meeting</h4>
                                                        <p>
                                                            Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a>
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-warning"> </i>}
                                                        date="12:25 PM"
                                                    >
                                                        <p>
                                                            Another meeting today, at <b className="text-danger">12:00
                                                            PM</b>
                                                        </p>
                                                        <p>
                                                            Yet another one, at <span
                                                                className="text-success">15:00 PM</span>
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-danger"> </i>}
                                                        date="15:00 PM"
                                                    >
                                                        <h4 className="timeline-title">Build the production release</h4>
                                                        <p>
                                                            Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
                                                            incididunt ut labore et dolore magna elit enim at minim
                                                            veniam quis nostrud
                                                        </p>
                                                    </VerticalTimelineElement>
                                                    <VerticalTimelineElement
                                                        className="vertical-timeline-item"
                                                        icon={<i
                                                            className="badge badge-dot badge-dot-xl badge-primary"> </i>}
                                                        date="15:00 PM"
                                                    >
                                                        <h4 className="timeline-title text-success">Something not
                                                            important</h4>
                                                        <p>
                                                            Lorem ipsum dolor sit amit,consectetur elit enim at minim
                                                            veniam quis nostrud
                                                        </p>
                                                    </VerticalTimelineElement>
                                                </VerticalTimeline>
                                            </div>
                                        </PerfectScrollbar>
                                    </div>
                                    <CardFooter className="d-block text-center">
                                        <Button className="btn-shadow btn-wide btn-pill" color="focus">
                                            <div className="badge badge-dot badge-dot-lg badge-warning badge-pulse">Badge</div>
                                            View All Messages
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>

                        {/* Middle KPI */}
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


                            {/*  Data Table */}
                        <Card className="mb-3">
                            <CardHeader className="card-header-tab">
                                <div
                                    className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    <i className="header-icon lnr-laptop-phone mr-3 text-muted opacity-6"> </i>
                                    Aggregate Diet Data
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ReactTable
                                    data={diet_data}
                                    columns={data_columns}
                                    defaultPageSize={20}
                                    style={{
                                        height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
                                    }}
                                    className="-striped -highlight -fixed"
                                />
                            </CardBody>
                        </Card>
                        
                                            </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
