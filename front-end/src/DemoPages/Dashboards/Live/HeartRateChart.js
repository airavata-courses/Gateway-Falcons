import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
    ResponsiveContainer
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

class HeartRateChart extends React.Component {

    render() {
        const { data, attribute } = this.props;
        // console.log(data)
        // const _data = data.slice(60, 70);
        return (
            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
                <LineChart data={data}>
                    <XAxis dataKey="workout_date_time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avg_heart_rate" stroke="#fece78" />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default HeartRateChart;