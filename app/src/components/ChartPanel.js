import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
// import { ButtonToolbar, Button } from 'react-bootstrap';
import { Panel, PanelBody, PanelHeader } from 'react-gentelella';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// const ChartTypes = {
//   line: 2,
//   highstock: require('highcharts/highstock'),
//   time_series: 3,
//   spline: 3,
//   area: 3,
//   areaspline: 3,
//   bar: 3,
//   column: 3,
//   pie: 3,
//   // scatter: require('highcharts/scatter'),
//   gauge: 3,
//   heat: 3,
// };


class ChartPanel extends Component {

  // constructor(props) {
  //   super(props);
  // }

  // sliceChart(option) {
  //   this.setState({
  //     title: option
  //   })
  // }

  renderTitle(title, subtitle) {
    return (
      <PanelHeader>
        <Col md={6}>
          <h3>{title} <small>{subtitle} or ... sub-title</small></h3>
        </Col>
      </PanelHeader>
    );
  }

  render() {
    const {
      chart_type,
      data,
      subtitle,
      title,
    } = this.props;
    return (
      <Panel>
        {this.renderTitle(title, subtitle)}
        <PanelBody>
          <div className="col-md-12 col-sm-12 col-xs-12">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
              <ReferenceLine y={0} stroke="#000" />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>
        </PanelBody>
      </Panel>
    )
  }
}

export default ChartPanel