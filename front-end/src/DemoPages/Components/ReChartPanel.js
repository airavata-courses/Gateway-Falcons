import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
    BarChart, Bar, Brush, PieChart, Pie, Sector, ScatterChart, Scatter,
    ComposedChart, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap';

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
            let max = data[0][attr];
            for (let i = 1; i < data.length; i++) {
                const datum = data[i];
                if (datum[attr] > max) {
                    max = datum[attr];
                }
            }
            return max;
        }
    }

    renderChart(chart_type, first_attr, second_attr, third_attr, fourth_attr, composed_line_attr, data, brush) {

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
                        ? <ReferenceLine y={first_max} stroke="red" label={"max"} />
                        : <div />
                }
                {
                    (second_max)
                        ? <ReferenceLine y={second_max} stroke="red" label={"max"} />
                        : <div />
                }
                {
                    (third_max)
                        ? <ReferenceLine y={third_max} stroke="red" label={"max"} />
                        : <div />
                }
                <Line type="monotone"
                    dataKey={`${first_attr}`}
                    name={(first_attr === "carbohydrates") ? "carbs" : first_attr}
                    stroke="#8884d8"
                    dot={false}
                />
                {
                    second_attr ?
                        <Line type="monotone"
                            dataKey={`${second_attr}`}
                            name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                            stroke="#82ca9d"
                            dot={false}
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
                        dot={false}
                        name={(first_attr === "carbohydrates") ? "carbs" : first_attr}
                    />
                    <Bar
                        dataKey={`${second_attr}`}
                        fill="#82ca9d"
                        dot={false}
                        name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                    />
                    <Bar
                        dataKey={`${third_attr}`}
                        fill="#ffa500"
                        dot={false}
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
                <ComposedChart width={400} data={data}
                >
                    <CartesianGrid stroke='#f5f5f5' />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone"
                        dataKey={`${composed_line_attr}`}
                        stroke="#8884d8"
                        yAxisId="right"
                    />
                    <Bar yAxisId="left" dataKey={first_attr} barSize={20} fill='#413ea0' />
                    <Bar yAxisId="left" dataKey={second_attr} barSize={20} fill='#413ea0' />
                    <Bar yAxisId="left" dataKey={third_attr} barSize={20} fill='#413ea0' />
                    <Bar yAxisId="left" dataKey={fourth_attr} barSize={20} fill='#413ea0' />

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
        } else if (chart_type === "Bi-Line") {
            return (
                <LineChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey={first_attr} stroke="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey={second_attr} stroke="#82ca9d" />
                </LineChart>
            )
        } else if (chart_type === "BF-Scatter") {
            {/* margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }} */}
            return (
                <ScatterChart
                    width={400}
                    height={400}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey={first_attr} name="Avg Speed" />
                    <YAxis type="number" dataKey={second_attr} name="Avg Heart Rate" domain={[40, 200]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter data={data} name="Best Fit" fill="#8884d8" line={{ stroke: 'red', strokeWidth: 2, lineType: 'fitting' }} />
                </ScatterChart>
            );
        } else if (chart_type === "Synchronized") {
            return (
                <div>

                    <Col lg="12" xl="4">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>
                                    Heart Rate
                                    </CardTitle>
                                <ReChartPanel
                                    data={data}
                                    chart_type={"Line"}
                                    brush={false}
                                    first_attr={"avg_heart_rate"}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="12" xl="4">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>
                                    Elevation
                                    </CardTitle>
                                <ReChartPanel
                                    data={data}
                                    chart_type={"Line"}
                                    brush={false}
                                    first_attr={"total_climb"}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="12" xl="4">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>
                                    Wind Speed
                                    </CardTitle>
                                <ReChartPanel
                                    data={data}
                                    chart_type={"Line"}
                                    brush={false}
                                    first_attr={"wind_speed"}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </div>
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
            fourth_attr,
            composed_line_attr,
            data,
            title
        } = this.props;
        if (chart_type !== "Synchronized") {
            return (
                <ResponsiveContainer width='100%' height={400}>
                    {this.renderChart(chart_type, first_attr, second_attr, third_attr, fourth_attr, composed_line_attr, data, brush)}
                </ResponsiveContainer>
            );
        } else {
            return (
                <div>
                    {this.renderChart(chart_type, first_attr, second_attr, third_attr, fourth_attr, composed_line_attr, data, brush)}
                </div>
            )
        }

    }
}

export default ReChartPanel;