//TODO: combine with one main chart ... 

import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Panel, PanelBody, PanelHeader } from 'react-gentelella';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
    BarChart, Bar, Brush
} from 'recharts';

// http://recharts.org/en-US/examples/LineChartWithReferenceLines

class ReChartPanel extends Component {

    renderTitle(left, right, third) {

        left = (left === "carbohydrates") ? "carbs" : left;
        right = (right === "carbohydrates") ? "carbs" : right;
        third = (third === "carbohydrates") ? "carbs" : third;

        return (
            <PanelHeader>
                <Col md={12}>
                    <h3>
                        {left} vs. {right} {third ? `vs. ${third}` : ''}
                    </h3>
                </Col>
            </PanelHeader>
        );
    }

    renderChart(chart_type, first_attr, second_attr, third_attr, data) {
        if (chart_type == "Line") {
            return (<LineChart
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
                {/* <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                <ReferenceLine y={9800} label="Max" stroke="red" /> */}
                <Line type="monotone"
                    dataKey={`totals.${first_attr}`}
                    name={(first_attr === "carbohydrates") ? "carbs" : first_attr}
                    stroke="#8884d8"
                />
                <Line type="monotone"
                    dataKey={`totals.${second_attr}`}
                    name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                    stroke="#82ca9d"
                />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            </LineChart>
            )
        }
        else if (chart_type == "Brush") {
            return (
                <BarChart
                    width={400}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="date" height={30} stroke="#8884d8" />
                    <Bar
                        dataKey={`totals.${first_attr}`}
                        fill="#8884d8"
                        name={(first_attr === "carbohydrates") ? "carbs" : first_attr}
                    />
                    <Bar
                        dataKey={`totals.${second_attr}`}
                        fill="#82ca9d"
                        name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                    />
                    <Bar
                        dataKey={`totals.${third_attr}`}
                        fill="#ffa500"
                        name={(third_attr === "carbohydrates") ? "carbs" : third_attr}
                    />
                </BarChart>
            );
        }
    }

    render() {
        const {
            chart_type,
            first_attr,
            second_attr,
            third_attr,
            data,
        } = this.props;
        return (
            <Panel>
                {this.renderTitle(first_attr, second_attr, third_attr)}
                <PanelBody>
                    {this.renderChart(chart_type, first_attr, second_attr, third_attr, data)}
                </PanelBody>
            </Panel>
        );

    }
}

export default ReChartPanel;