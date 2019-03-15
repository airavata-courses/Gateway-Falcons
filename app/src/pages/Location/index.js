import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Page, PageTitle } from 'react-gentelella';
import MapSlicerPanel from '../../components/MapSlicerPanel';
import TopTile from '../../components/TopTile';
import kpi_data from './locationKPI';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import MapWithMarkers from '../../components/map/MapContainer';
import DataTable from '../../components/DataTable';
import * as Constants from '../../constants';

// https://gist.github.com/jwo/43b382fc60eb09d3a415c9953f4057f8

const options = [
    { title: 'Normal', value: 'normal' },
    { title: 'Satellite', value: 'satellite' },
    { title: 'Wind', value: 'wind' },
    { title: 'Topo', value: 'topo' },
];

class LocationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Diet',
            chart_title: '',
            data: [''],
            data_set: '',
            // kpi_data: [],
            selectedMarker: false,
        };
    }

    fetchMapMarkers() {
        // fetch("https://api.harveyneeds.org/api/v1/shelters?limit=10")
        //     .then(r => r.json())
        Promise.resolve()
            .then(() => {
                // this.setState({ data: data.shelters })
                const markers = [
                    { "id": 1, "date": '1/1/1', "latitude": 22.6274, "longitude": 120.3015 },
                    { id: 2, date: '1/2/1', latitude: 22.6277, longitude: 120.3017 },
                    { id: 3, date: '1/3/1', latitude: 22.6279, longitude: 120.3020 },
                ];
                this.setState({ data: markers });
            });
    }

    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }

    componentWillMount() {
        this.setState({ data: [] })
    }

    componentDidMount() {
        this.fetchMapMarkers();
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

        const { data } = this.state;
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

                            {/* MapWithMarkers */}
                            <Col md={9} sm={9} xs={12}>
                                <MapWithMarkers
                                    selectedMarker={this.state.selectedMarker}
                                    markers={data}
                                    onClick={this.handleClick}
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1KwG-BfsNZC-qjFRLgDKC-yc6x4s9f1A&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                />
                            </Col>

                            <div className="clearfix" />
                        </Row>

                        {/* Data Table*/}
                        <Row>
                            <Col md={12} sm={12} xs={12}>
                                <DataTable
                                    data={data}
                                    data_set="location"
                                    title='Location Data'
                                    table_columns={Constants.location_data_columns}
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