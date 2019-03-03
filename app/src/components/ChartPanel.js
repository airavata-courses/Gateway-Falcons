import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
// import { ButtonToolbar, Button } from 'react-bootstrap';
import { Panel, PanelBody, PanelHeader } from 'react-gentelella';

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

const options = {
  title: {
    text: ''
  },
  series: [{
    data: [1, 2, 3]
  }],
  // chart: {
  //   type: 'line',
  // },
}

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
    // console.log(chart_type);
    // console.log(options);
    // if (chart_type === 'scatter') {
    options['chart'] = {
      type: chart_type,
      // zoomType: 'xy'
    };
    // }
    // console.log(options);
    // const updatedOptions = Object.assign(options, _chartType);
    return (
      <Panel>
        {this.renderTitle(title, subtitle)}
        <PanelBody>
          <div className="col-md-12 col-sm-12 col-xs-12">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              data={data}
            />
          </div>
        </PanelBody>
      </Panel>
    )
  }
}

export default ChartPanel