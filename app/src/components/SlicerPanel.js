import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Panel, PanelHeader, PanelBody } from 'react-gentelella';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

function SlicerPanel(props) {
    
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
                            <Row>
                                    {/* bsStyle="default" */}
                                <Button
                                    key={option}
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

export default SlicerPanel