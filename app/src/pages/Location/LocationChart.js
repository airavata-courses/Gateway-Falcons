import React, { Component } from 'react';
// import { Row, Col } from 'react-bootstrap'
// import { ButtonToolbar, Button } from 'react-bootstrap';
import { Panel, PanelBody } from 'react-gentelella';
import { Area, AreaChart, Brush, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

class LocationChart extends Component {

    // constructor(props) {
    //     super(props);
    // }

    // sliceChart(option) {
    //   this.setState({
    //     title: option
    //   })
    // }

    render() {
        const { f_data, s_data } = this.props 
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <LineChart width={600} height={200} data={f_data} syncId="anyId"
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                            <Line type='monotone' dataKey='pv' stroke='#8884d8' fill='#8884d8' />
                        </LineChart>
                        <p>Maybe some other content</p>
                        <LineChart width={600} height={200} data={s_data} syncId="anyId"
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
                            <Brush />
                        </LineChart>
                        <AreaChart width={600} height={200} data={s_data} syncId="anyId"
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
                        </AreaChart>
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

export default LocationChart