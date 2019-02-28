import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Panel, PanelHeader, PanelBody } from 'react-gentelella';

// sliceChart(option) {
//     this.setState({
//       title: option
//     })
//   }

function SlicerPanel(props) {
    const { options } = props;
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
                        <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
                        <span>December 30, 2014 - January 28, 2015</span> <b className="caret"></b>
                    </div>
                </Row>
                <div class="clearfix" />
                <div>
                    {
                        options.map((option, index) => (
                            <Row>
                                <Button
                                    key={index.toString()}
                                    bsStyle="default"
                                >
                                    {/* TODO: onClick={this.....??? } */}
                                    {option.title}
                                    {option.value}
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