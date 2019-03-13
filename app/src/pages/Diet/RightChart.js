//TODO: combine with one main chart ... 

import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import { Panel, PanelBody, PanelHeader } from 'react-gentelella';
import { Col } from 'react-bootstrap';

// http://recharts.org/en-US/examples/LineChartWithReferenceLines

class RightChart extends Component {

    renderTitle(left, right) {
        return (
            <PanelHeader>
                <Col md={12}>
                    <h3>
                        { left } vs. { right }                    
                    </h3>
                </Col>
            </PanelHeader>
        );
    }

    render() {
        const {
            chart_type,
            first_attr,
            second_attr,
            data,
        } = this.props;
        return (
            <Panel>
                {this.renderTitle(first_attr, second_attr)}
                <PanelBody>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20, right: 50, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                        <ReferenceLine y={9800} label="Max" stroke="red" /> */}
                        <Line type="monotone" 
                            dataKey={ `totals.${first_attr}` }
                            name={ first_attr }
                            stroke="#8884d8" 
                        />
                        <Line type="monotone" 
                            dataKey={ `totals.${second_attr}` }
                            name={ second_attr }
                            stroke="#82ca9d" 
                        />
                    </LineChart>
                </PanelBody>
            </Panel>
        );

    }
}

export default RightChart;