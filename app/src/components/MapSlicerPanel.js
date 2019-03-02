import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Panel, PanelHeader, PanelBody } from 'react-gentelella';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from 'moment'

const ranges = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    // 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    // 'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    // 'This Month': [moment().startOf('month'), moment().endOf('month')],
    // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
};


function MapSlicerPanel(props) {

    // TODO: orientation
    const { options, sliceDateRange, sliceChart } = props;
    return (
        <Panel>
            <PanelBody>
                <div className="clearfix" />
                <Container>

                <Row className="justify-content-md-center">
                    <Col md={{ span: 8, offset: 4 }}>
                    {/* TODO: Center */}
                    {/* TODO: Offet */}
                    {/* TODO: split buttons */}
                    {/* TODO: Switch to date picker */}
                        <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px' }}>
                            <DateRangePicker
                                startDate="4/1/2019"
                                endDate="8/1/2019"
                                onEvent={sliceDateRange}
                                ranges={ranges}
                                showCustomRangeLabel={true}
                                alwaysShowCalendars={false}
                            >
                                <button>
                                    <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
                                    <span>April 1, 2019 - August 28, 2019</span> <b className="caret"></b>
                                </button>
                            </DateRangePicker>
                            <ButtonToolbar>
                                {
                                    options.map((option, index) => (
                                        <Button
                                            key={option}
                                            onClick={() => sliceChart(option.value)}
                                        >
                                            {option.title}
                                        </Button>)
                                    )
                                }
                            </ButtonToolbar>
                        </div>
                    </Col>
                </Row>
                </Container>
            </PanelBody>
        </Panel>
    );
}

export default MapSlicerPanel