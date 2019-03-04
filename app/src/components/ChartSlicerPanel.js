import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { Panel, PanelHeader, PanelBody } from 'react-gentelella';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from 'moment'

const ranges = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'All': [],
    // 'This Month': [moment().startOf('month'), moment().endOf('month')],
    // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
};


function ChartSlicerPanel(props) {
    
    // TODO: orientation
    const { options, sliceDateRange, sliceChart } = props;
    return (
        <Panel>
            <PanelHeader>
                <Col md={6}>
                    <h3> Chart Slicers </h3>
                </Col>
            </PanelHeader>
            <PanelBody>
                <Row>
                    <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc' }}>
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
                    </div>
                <div className="clearfix" />

                </Row>
                <div className="clearfix" />
                <div className="clearfix" />
                <div>
                    {
                        options.map((option, index) => (
                            <Row 
                                key={index}
                            >
                                    {/* bsStyle="default" */}
                                <Button
                                    key={index}
                                    onClick={() => sliceChart(option.value)}
                                >
                                    {/* TODO: onClick={this.....??? } */}
                                    {option.title}
                                    {/* {option.value} */}
                                </Button>
                            </Row>
                        )
                        )
                    }
                </div>
            </PanelBody>
        </Panel>
    );
}

export default ChartSlicerPanel