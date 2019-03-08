import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Page, PageTitle } from 'react-gentelella';
import ChartPanel from '../../components/ChartPanel';
import MapSlicerPanel from '../../components/MapSlicerPanel';
import TopTile from '../../components/TopTile';
import LocationChart from './LocationChart';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import kpi_data from './locationKPI';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import SimpleMap from '../../components/map/MapContainer';


const options = [
    { title: 'Normal', value: 'normal' },
    { title: 'Satellite', value: 'satellite' },
    { title: 'Wind', value: 'wind' },
    { title: 'Topo', value: 'topo' },
];

const f_data = [
    { name: 'Page A', uv: 4000, pv: 9000 },
    { name: 'Page B', uv: 3000, pv: 7222 },
    { name: 'Page C', uv: 2000, pv: 6222 },
    { name: 'Page D', uv: 1223, pv: 5400 },
    { name: 'Page E', uv: 1890, pv: 3200 },
    { name: 'Page F', uv: 2390, pv: 2500 },
    { name: 'Page G', uv: 3490, pv: 1209 },
];
const s_data = [
    { name: '1/1/1', uv: 4000, pv: 9000 },
    { name: '1/2/1', uv: 3000, pv: 7222 },
    { name: '1/3/1', uv: 2000, pv: 6222 },
    { name: '1/4/1', uv: 1223, pv: 5400 },
    { name: '1/5/1', uv: 1890, pv: 3200 },
    { name: '1/6/1', uv: 2390, pv: 2500 },
    { name: '1/7/1', uv: 3490, pv: 1209 },
];

class LocationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Diet',
            chart_title: '',
            data: [],
            data_set: '',
            // kpi_data: []
        };
    }

    componentDidMount() {
    }

    sliceChart = (chart_title) => {
        alert(chart_title)
        this.setState({
            chart_title
        })
    }

    sliceDateRange(event, picker) {
        console.log(picker.startDate._d);
        console.log(picker.endDate._d);
    }

    render() {

        const { data, chart_title } = this.state;
        return (
            <Page>

                <PageTitle title={'Location'} />

                <TopTile kpi_data={kpi_data} />

                <div>
                    <Container>

                        <Row>

                            {/* Chart Slicers */}
                            <Col md={3} sm={3} xs={12}>
                                <ChartSlicerPanel
                                    options={options}
                                    sliceDateRange={this.sliceDateRange}
                                    sliceChart={this.sliceChart}
                                    title={"Map Types"}
                                />
                            </Col>

                            {/* Left Chart */}
                            <Col md={9} sm={9} xs={12}>
                                <SimpleMap />
                            </Col>

                            <div className="clearfix" />
                        </Row>

                        <Row>
                            {/* Sync Charts */}
                            <Col md={12} sm={12} xs={12}>
                                <LocationChart
                                    f_data={f_data}
                                    s_data={s_data}
                                />
                            </Col>

                        </Row>

                        <div className="clearfix" />
                    </Container>
                </div>

            </Page>
        )
    }
}

export default LocationPage