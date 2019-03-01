import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Tabs, Tab, Panel, PanelHeader, PanelBody } from 'react-gentelella';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const ChartTypes = {
  line: 2,
  highstock: 1,
  time_series: 3,
  spline: 3,
  area: 3,
  areaspline: 3,
  bar: 3,
  column: 3,
  pie: 3,
  scatter: 3,
  gauge: 3,
  heat: 3,
};

const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}

class ChartPanel extends Component {

  constructor(props) {
    super(props);
    const {
      chart_type,
      data,
      subtitle,
      title,
    } = props;
    this.state = {
      title: title,
      chart_type: chart_type,
      data: data,
      subtitle: subtitle,
    };
  }

  sliceChart(option) {
    this.setState({
      title: option
    })
  }

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
    } = this.state;
    return (
      <Panel>
        {this.renderTitle(title, subtitle)}
        <PanelBody>
          <div className="col-md-12 col-sm-12 col-xs-12">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </div>
        </PanelBody>
      </Panel>
    )
  }
}

export default ChartPanel