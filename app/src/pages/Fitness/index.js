import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import * as Constants from '../../constants';
import kpi_data from './fitness-kpi_data';
import ReChartPanel from '../../components/ReChartPanel';
import DualReChartPanel from '../../components/DualReChartPanel';

// const options = {
//     CHART_TITLE: [
//         { title: 'HR', value: 'calories' },
//         { title: 'Speed', value: 'fat' },
//         { title: 'Hydration', value: 'water' },
//         { title: 'MPH', value: 'somethig...' },
//     ]
// }

class FitnessPage extends Component {

    state = {
        open: true,
        data_set: "fitness",
        loading: true,
        fitness_data: [''],
        eeg_data: ['']
    };

    getAndSetFitnessData() {
        fetch(`${Constants.serverUrl}/fitness`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(res => this.setState({
                fitness_data: res
            }))
        fetch(`${Constants.serverUrl}/cardio_mood`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(res => console.log(res))
            // .then(res => this.setState({
            //     fitness_data: res
            // }))
    }

    componentDidMount() {
        this.getAndSetFitnessData();
    }

    render() {

        const { fitness_data, classes, data_set, chart_title, eeg_data } = this.state;

        // let kpi_data = [];
        // kpi_data = this.generateKPIData(today, yesterday);

        const data_one = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 }
        ];

        const data_two = [
            { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
            { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 }
        ];

        const chart_one = {
            data: data_one,
            chart_type: "Pie",
            first_attr: "group A",
            second_attr: "group b",
            third_attr: "group c"
        };

        const chart_two = {
            data: data_two,
            chart_type: "Half_Pie",
            first_attr: "group A",
            second_attr: "group b",
            third_attr: "group c"
        };

        const scatter_data = [
            { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
            { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
            { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 }
        ];

        const compose_data = [
            { name: 'Page A', uv: 590, pv: 800, amt: 1400 },
            { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
            { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
            { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
            { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
            { name: 'Page F', uv: 1400, pv: 680, amt: 1700 }
        ];


        return (
            <Page>
                <PageTitle title={'Fitness'} />

                <TopTile kpi_data={kpi_data} />

                <div>
                    <Row>
                        {/* Left Chart */}
                        <Col md={6} sm={12} xs={12}>
                            <DualReChartPanel
                                chart_one={chart_one}
                                chart_two={chart_two}
                                title={false}
                            />
                        </Col>

                        {/* Slicers */}
                        <Col md={2} sm={2} xs={2}>
                            {/* <ChartSlicerPanel
                                options={options.CHART_TITLE}
                                sliceDateRange={this.sliceDateRange}
                                sliceChart={this.sliceChart}
                            /> */}
                        </Col>

                        {/* Right Chart */}
                        <Col md={6} sm={12} xs={12}>
                            <ReChartPanel
                                chart_type="Scatter"
                                data={scatter_data}
                                title={false}
                            />
                        </Col>

                    </Row>

                    <div className="clearfix" />

                    <Row>
                        <Col md={6} sm={12} xs={12}>
                        </Col>

                        <Col md={6} sm={12} xs={12}>
                            <ReChartPanel
                                chart_type="Composed"
                                data={compose_data}
                                title={false}
                            />
                        </Col>

                    </Row>

                    <div className="clearfix"> </div>

                    <Row>
                        <Col md={12} sm={12} xs={12}>
                            <DataTable
                                data={fitness_data}
                                data_set={"fitness"}
                                title='Aggregate Data'
                                table_columns={Constants.fitness_data_columns}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="clearfix"> </div>

            </Page>
        )
    }
}

// FitnessPage.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default FitnessPage;
