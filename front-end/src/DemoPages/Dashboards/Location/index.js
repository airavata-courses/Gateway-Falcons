import React, { Component, Fragment } from 'react';
import {
    Row, Col,
    Button,
    Nav,
    NavItem,
    Card, CardBody, CardTitle,
    NavLink,
    Table,
    CardHeader,
    CardFooter,
    ButtonGroup,
    Popover, PopoverBody,
    ListGroupItem,
    ListGroup,
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MapWithMarkers from '../../MyComponents/MapContainer'

import * as Constants from '../../../constants';

export default class LocationPage extends Component {
    constructor() {
        super();
        const apiKey = process.env.GOOGLE_API_KEY;
        this.state = {
            title: 'Live',
            data: [''],
            selectedMarker: false,
            apiKey: apiKey
            // kpi_data: [],
        };
    }

    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }


    render() {
        const radius = 107;
        const { apiKey, data } = this.state;
        console.log(apiKey)
        return (
            <Fragment>
                <PageTitle
                    heading="Location Page"
                    subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
                    icon="pe-7s-graph icon-gradient bg-ripe-malin"
                />
                <div>
                    <Row>
                        <Col lg="12" xl="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    {/* <CardTitle>
                                        Basic
                                    </CardTitle> */}
                                    <MapWithMarkers
                                        selectedMarker={this.state.selectedMarker}
                                        markers={data}
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
                    
                    <Row>
                        <Col md="12">
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
                                <Table responsive hover striped borderless className="align-middle mb-0">
                                    <thead>
                                        <tr>
                                            {
                                                Constants.wahoo_data_columns.map(col =>
                                                    <th key={col} className="text-center">{col} </th>
                                                )
                                            }
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
                </div>
            </Fragment>
        )
    }
}
