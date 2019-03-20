import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Panel, PanelBody, PanelHeader } from 'react-gentelella';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
    BarChart, Bar, Brush, PieChart, Pie, Sector, ScatterChart, Scatter,
    ComposedChart
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

    getMax(attr, data) {
        if (data !== undefined && data.length > 0) {
            console.log(attr)
            console.log(data[0])
            let max = data[0].totals[attr];
            for (let i = 1; i < data.length; i++) {
                const datum = data[i];
                if (datum.totals[attr] > data[i - 1].totals[attr]) {
                    max = datum.totals[attr];
                }
            }
            return max;
        }
    }

    renderChart(chart_type, first_attr, second_attr, third_attr, data) {

        if (chart_type === "Line") {

            let first_max, second_max, third_max;
            if (data !== undefined && data.length > 0) {
                if (first_attr) first_max = this.getMax(first_attr, data);
                if (second_attr) second_max = this.getMax(second_attr, data);
                if (third_attr) third_max = this.getMax(third_attr, data);
            }

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
                {
                    (first_max)
                        ? <ReferenceLine y={first_max} stroke="red" label={"max " + first_attr} />
                        : <div />
                }
                {
                    (second_max)
                        ? <ReferenceLine y={second_max} stroke="red" label={"max " + second_attr} />
                        : <div />
                }
                {
                    (third_max)
                        ? <ReferenceLine y={third_max} stroke="red" label={"max " + third_attr} />
                        : <div />
                }
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
        else if (chart_type === "Brush") {
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
        } else if (chart_type === "Scatter") {
            return (
                <ScatterChart
                    width={700}
                    height={400}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                    <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="A school" data={data} fill="#8884d8" />
                </ScatterChart>
            );
        } else if (chart_type === "Composed") {
            return (
                <ComposedChart layout="vertical" width={600} height={400} data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke='#f5f5f5' />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='pv' barSize={20} fill='#413ea0' />
                </ComposedChart>
            );
        } else if (chart_type === "Pie") {
            return (
                <PieChart width={400} height={400}>
                    <Pie isAnimationActive={false}
                        data={data}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>

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
            title
        } = this.props;
        return (
            <Panel>
                {title && this.renderTitle(first_attr, second_attr, third_attr)}
                <PanelBody>
                    {this.renderChart(chart_type, first_attr, second_attr, third_attr, data)}
                </PanelBody>
            </Panel>
        );

    }
}

export default ReChartPanel;