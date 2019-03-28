import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Ionicon from 'react-ionicons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Select from 'react-select';
import Slider from "react-slick";
import ReactTable from "react-table";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, ListGroup, ListGroupItem, Progress, Row } from 'reactstrap';
import * as Constants from '../../../constants';
import PageTitle from '../../../Layout/AppMain/PageTitle';
// import BrushChart from './BrushChart';
import ReChartPanel from '../../Components/ReChartPanel';
import { makeData } from "../../Tables/DataTables/Examples/utils";

const options = [
    { value: '1', label: 'Today' },
    { value: '2', label: 'Last Week' },
    { value: '3', label: 'Last 30 Days' },
    { value: '4', label: 'Last 3 Months' },
    { value: '5', label: 'Last Year' },
];

// function boxMullerRandom() {
//     let phase = false,
//         x1, x2, w, z;

//     return (function () {

//         if (phase = !phase) {
//             do {
//                 x1 = 2.0 * Math.random() - 1.0;
//                 x2 = 2.0 * Math.random() - 1.0;
//                 w = x1 * x1 + x2 * x2;
//             } while (w >= 1.0);

//             w = Math.sqrt((-2.0 * Math.log(w)) / w);
//             return x1 * w;
//         } else {
//             return x2 * w;
//         }
//     })();
// }

// function randomData(n = 30) {
//     return Array.apply(0, Array(n)).map(boxMullerRandom);
// }

// const sampleData = randomData(10);
// const sampleData2 = randomData(15);
// const sampleData3 = randomData(8);
// const sampleData4 = randomData(12);

export default class DietDashboard extends Component {
    constructor() {
        super();

        this.state = {
            data: makeData(),
            dropdownOpen: false,
            selectedOption: null,
            diet_data: [],
            today: {},
            // yesterday: {},
            last_meals: []
        };
        this.toggle = this.toggle.bind(this);

    }

    getAndSetDietData() {
        fetch(`${Constants.serverUrl}/diet`, {
        // fetch('http://localhost:3001/diet', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(res => {
                let meals_arr = [];
                // TODO: change to for loop and if > n - 7 then add to meals array 
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
                        meals,
                        water,
                    } = datum;

                    meals_arr.push({
                        date,
                        meals
                    });
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
                const len = res.length;
                meals_arr = meals_arr.slice(len - 8, len - 1);
                // console.log(meals_arr);
                const _meals_arr = [];
                meals_arr.map(meal_log => {
                    for (let i = 0; i < meal_log.meals.length; i++) {
                        _meals_arr.push({
                            date: meal_log.date,
                            meal: meal_log.meals[i],
                        });
                    }
                });
                // console.log(_meals_arr);
                this.setState({
                    diet_data: _data.reverse(),
                    today: _data[len - 1],
                    yesterday: _data[len - 2],
                    last_meals: _meals_arr.reverse()
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
        const { data, diet_data,
            today: {
                calories,
                carbohydrates,
                fat,
                protein,
                sodium,
                sugar
            },
            last_meals
        } = this.state;
        console.log(calories,
            carbohydrates,
            fat,
            protein,
            sodium,
            sugar);
        console.log(last_meals);
        const settings = {
            className: "",
            centerMode: false,
            infinite: true,
            slidesToShow: 1,
            speed: 500,
            dots: true,
        };

        const data_columns = Object.keys(Constants.diet_data_columns).map(key => {
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
                                {/* <div
                                    className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    <i className="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                                    Portfolio Performance
                                </div> */}
                                {/* <div className="btn-actions-pane-right text-capitalize">
                                    <span className="d-inline-block ml-2" style={{ width: 200 }}>
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={options}
                                        />
                                    </span>
                                </div> */}
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
                                                {fat}
                                            </div>
                                            {/* <div className="widget-description opacity-8 text-focus">
                                                <div className="d-inline text-danger pr-1">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                    <span className="pl-1">54.1%</span>
                                                </div>
                                                less earnings
                                            </div> */}
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
                                                {carbohydrates}
                                                {/* <CountUp start={0}
                                                    end={carbohydrates}
                                                    separator=""
                                                    decimals={0}
                                                    decimal=","
                                                    prefix=""
                                                    useEasing={false}
                                                    suffix="M"
                                                    duration="5" /> */}
                                            </div>
                                            {/* <div className="widget-description opacity-8 text-focus">
                                                Grow Rate:
                                                <span className="text-info pl-1">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                    <span className="pl-1">14.1%</span>
                                                </span>
                                            </div> */}
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
                                                {/* <CountUp start={0}
                                                    end={563}
                                                    separator=""
                                                    decimals={0}
                                                    decimal="."
                                                    prefix="$"
                                                    useEasing={false}
                                                    suffix=""
                                                    duration="7" /> */}
                                                {protein}
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
                                            Charts
                                        </div>

                                    </CardHeader>
                                    <CardBody className="p-0">
                                        <div className="p-1 slick-slider-sm mx-auto">
                                            <Slider {...settings}>
                                                <div>
                                                    <div className="widget-chart widget-chart2 text-left p-0">
                                                        <ReChartPanel
                                                            data={diet_data}
                                                            chart_type={"Brush"}
                                                            brush={false}
                                                            first_attr={"protein"}
                                                            second_attr={"carbohydrates"}
                                                            third_attr={"fat"}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <ReChartPanel
                                                        data={diet_data}
                                                        chart_type={"Line"}
                                                        first_attr={"calories"}
                                                    />
                                                </div>
                                                <div>
                                                    <ReChartPanel
                                                        data={diet_data}
                                                        chart_type={"Area"}
                                                        first_attr={"water"}
                                                    />
                                                </div>
                                            </Slider>
                                        </div>
                                        {/* <h6 className="text-muted text-uppercase font-size-md opacity-5 pl-3 pr-3 pb-1 font-weight-normal">
                                            What the heck goes here
                                        </h6> */}
                                        {/* <ListGroup flush>
                                            <ListGroupItem className="p-3 bg-transparent">
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Total Calories
                                                                </div>
                                                                <div className="widget-subheading">
                                                                    consumed today
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="widget-numbers text-success">
                                                                    {calories}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-progress-wrapper">
                                                            <Progress
                                                                className="progress-bar-sm progress-bar-animated-alt"
                                                                color="primary"
                                                                value={(calories / 3000) * 100} />
                                                            <div className="progress-sub-label">
                                                                <div className="sub-label-left">
                                                                    Current calories out of 3000
                                                                </div>
                                                                <div className="sub-label-right">
                                                                    {(calories / 3000) * 100}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                        </ListGroup> */}
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
                                            Most Recent Meals
                                        </div>
                                    </CardHeader>
                                    <div className="scroll-area-lg">
                                        <PerfectScrollbar>
                                            <div className="p-4">
                                                <VerticalTimeline layout="1-column">
                                                    {
                                                        last_meals.map((last_meal, index) => {
                                                            const {
                                                                date,
                                                                meal: {
                                                                    items,
                                                                    name,
                                                                    totals
                                                                }
                                                            } = last_meal;
                                                            const _items = items.map(item => item.name);
                                                            return (
                                                                <VerticalTimelineElement
                                                                    className="vertical-timeline-item"
                                                                    icon={<i
                                                                        className="badge badge-dot badge-dot-xs badge-success"> </i>}
                                                                    date={date}
                                                                    key={index}
                                                                >
                                                                    <h4 className="timeline-title">{name}</h4>
                                                                    <p>
                                                                        Items: { _items.join(",") }
                                                                    </p>
                                                                </VerticalTimelineElement>
                                                            )
                                                        })
                                                    }
                                                </VerticalTimeline>
                                            </div>
                                        </PerfectScrollbar>
                                    </div>
                                    {/* <CardFooter className="d-block text-center">
                                        <Button className="btn-shadow btn-wide btn-pill" color="focus">
                                            <div className="badge badge-dot badge-dot-lg badge-warning badge-pulse">Badge</div>
                                            View All Messages
                                        </Button>
                                    </CardFooter> */}
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
                                                                    Calories
                                                                </div>
                                                                <div className="widget-subheading">
                                                                    Calories
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="widget-numbers text-success">
                                                                    {calories}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            {/* <ListGroupItem className="bg-transparent">
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
                                            </ListGroupItem> */}
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
                                                                    Sugar
                                                                </div>
                                                                <div className="widget-subheading">
                                                                    gimme some suga
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="widget-numbers text-danger">
                                                                    {sugar}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            {/* <ListGroupItem className="bg-transparent">
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
                                            </ListGroupItem> */}
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
                                                                    Sodium
                                                                </div>
                                                                <div className="widget-subheading">
                                                                    i like it salty
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="widget-numbers text-success">
                                                                    {sodium}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            {/* <ListGroupItem className="bg-transparent">
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
                                            </ListGroupItem> */}
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
