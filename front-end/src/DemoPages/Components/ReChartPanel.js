import React, { Component } from 'react';
// import { Col } from 'react-bootstrap';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
    BarChart, Bar, Brush, PieChart, Pie, Sector, ScatterChart, Scatter,
    ComposedChart, ResponsiveContainer, AreaChart, Area
} from 'recharts';

// http://recharts.org/en-US/examples/LineChartWithReferenceLines

class ReChartPanel extends Component {


    // renderTitle(left, right, third) {

    //     left = (left === "carbohydrates") ? "carbs" : left;
    //     right = (right === "carbohydrates") ? "carbs" : right;
    //     third = (third === "carbohydrates") ? "carbs" : third;

    //     return (
    //         <PanelHeader>
    //             <Col md={12}>
    //                 <h3>
    //                     {left} vs. {right} {third ? `vs. ${third}` : ''}
    //                 </h3>
    //             </Col>
    //         </PanelHeader>
    //     );
    // }

    getMax(attr, data) {
        if (data !== undefined && data.length > 0) {
            console.log(attr)
            console.log(data[0])
            let max = data[0][attr];
            for (let i = 1; i < data.length; i++) {
                const datum = data[i];
                // console.log(datum[attr], max)
                if (datum[attr] > max) {
                    max = datum[attr];
                }
            }
            return max;
        }
    }

    renderChart(chart_type, first_attr, second_attr, third_attr, data, brush) {

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
                    dataKey={`${first_attr}`}
                    name={(first_attr === "carbohydrates") ? "carbs" : first_attr}
                    stroke="#8884d8"
                />
                {
                    second_attr ?
                        <Line type="monotone"
                            dataKey={`${second_attr}`}
                            name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                            stroke="#82ca9d"
                        />
                        :
                        <div />
                }
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
                    {/* {
                        (brush)
                            ? <Brush dataKey="date" height={30} stroke="#8884d8" />
                            : <div />
                    } */}
                    <Bar
                        dataKey={`${first_attr}`}
                        fill="#8884d8"
                        name={(first_attr === "carbohydrates") ? "carbs" : first_attr}
                    />
                    <Bar
                        dataKey={`${second_attr}`}
                        fill="#82ca9d"
                        name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                    />
                    <Bar
                        dataKey={`${third_attr}`}
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
        } else if (chart_type === "Area") {
            return (
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey={first_attr} stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            );
        }
    }

    render() {
        const {
            brush,
            chart_type,
            first_attr,
            second_attr,
            third_attr,
            data,
            title
        } = this.props;
        return (
            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
                {this.renderChart(chart_type, first_attr, second_attr, third_attr, data, brush)}
            </ResponsiveContainer>
        );

    }
}

export default ReChartPanel;