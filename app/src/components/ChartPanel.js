import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Tabs, Tab, Panel, PanelHeader, PanelBody } from 'react-gentelella';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}

class ChartPanel extends Component {

  constructor() {
    super();
    this.state = {
      title: ''
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
     } = this.props;
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