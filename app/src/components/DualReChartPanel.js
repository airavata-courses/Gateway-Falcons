import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Panel, PanelBody, PanelHeader } from 'react-gentelella';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
    BarChart, Bar, Brush, PieChart, Pie, Sector
} from 'recharts';

// http://recharts.org/en-US/examples/LineChartWithReferenceLines

class DualReChartPanel extends Component {

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

    render() {
        const {
            chart_one,
            chart_two,
        } = this.props;
        console.log(chart_one);

        const {
            data: data_one,
            first_attr: first_attr_one,
            second_attr: second_attr_one,
            third_attr: third_attr_one,
            chart_type: chart_type_one
        } = chart_one;

        const {
            data: data_two,
            first_attr: first_attr_two,
            second_attr: second_attr_two,
            third_attr: third_attr_two,
            chart_type: chart_type_two
        } = chart_two;


        return (
            <Panel>
                {/* { title && this.renderTitle(first_attr, second_attr, third_attr)} */}
                <PanelBody>
                    <PieChart width={800} height={400}>
                        <Pie isAnimationActive={false}
                            data={data_one}
                            cx={250}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Pie isAnimationActive={false}
                            startAngle={180} endAngle={0}
                            data={data_two}
                            cx={600}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </PanelBody>
            </Panel>
        );

    }
}

export default DualReChartPanel;