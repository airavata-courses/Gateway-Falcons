import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
    ResponsiveContainer, Brush, BarChart, ReferenceLine, Bar
} from 'recharts';

// const data = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ];

class BrushChart extends React.Component {

    render() {
        const { data, first_attr, second_attr, third_attr } = this.props;
        return (
            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
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
            </ResponsiveContainer>
        )
    }
}

export default BrushChart;