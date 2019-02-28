import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { ProgressBar } from './widgets'
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Tabs, Tab, Panel, PanelHeader, PanelBody } from 'react-gentelella';

const performance = [
  { title: 'Facebook Campaing', value: 80 },
  { title: 'Twiter Campaing', value: 60 },
  { title: 'Conventional Media', value: 40 },
  { title: 'Bill boards', value: 50 },
]

const datum = [{
  key: "Cumulative Return",
  values: [
    {
      "label": "A",
      "value": -29.765957771107
    },
    {
      "label": "B",
      "value": 0
    },
    {
      "label": "C",
      "value": 32.807804682612
    },
    {
      "label": "D",
      "value": 196.45946739256
    },
    {
      "label": "E",
      "value": 0.19434030906893
    },
    {
      "label": "F",
      "value": -98.079782601442
    },
    {
      "label": "G",
      "value": -13.925743130903
    },
    {
      "label": "H",
      "value": -5.1387322875705
    }
  ]
}
];

// var context = {
//   getColor: function(i){
//     var colors = d3.scale.category20().range().slice(10);
//     return colors[Math.floor(Math.random() * colors.length)];
//   }
// };


// function TopCampaings ({performance}) {
//   return (
//     <Col md={3} sm={3} xs={12} className="bg-white">
//       <div className="x_title">
//         <h2>Top Campaign Performance</h2>
//         {/* <ClearFix /> */}
//         <div> ClearFix ... </div>
//       </div>
//       {
//         performance.map((p, index) => (<Campaing key={index.toString()} {...p} />))
//       }
//     </Col>
//   )
// }

// function Campaing ({title, value}) {
//   return (
//     <div>
//       <p>{title}</p>
//       <div className="">
//         <ProgressBar value={value} className="progress_sm" style={{width: '76%'}} />
//       </div>
//     </div>    
//   )
// }

// function Title({ title, subtitle }) {
//   return (
//     <Row className="x_title">
//       <Col md={6}>
//         <h3>{title} <small>{subtitle} or ... sub-title</small></h3>
//       </Col>
//       <Col md={6}>
//         <div id="reportrange" className="pull-right" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc' }}>
//           <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
//           <span>December 30, 2014 - January 28, 2015</span> <b className="caret"></b>
//         </div>
//       </Col>
//     </Row>
//   )
// }



class ChartPanel extends Component {

  constructor() {
    super();
    this.state = {
      title: ''
    };
  }

  renderChartOptions(options) {
    return (
      <Col md={3} sm={3} xs={12} className="bg-white">
        <div className="x_title">
          <h2>Chart Slicers</h2>
          <div className="clearfix" />
        </div>
        {
          options.map((option, index) => (
            <Row>
              <Button
                key={index.toString()}
                bsStyle="default"
              >
                {/* TODO: onClick={this.....??? } */}
                {option.title}
                {option.value}
              </Button>
            </Row>
          )
          )
        }
      </Col>
    );
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
        <Col md={6}>
          <div id="reportrange" className="pull-right" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc' }}>
            <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
            <span>December 30, 2014 - January 28, 2015</span> <b className="caret"></b>
          </div>
        </Col>
      </PanelHeader>
    );
  }

  render() {
    const { options, title, subtitle } = this.props;
    return (
      <Panel>
        {this.renderTitle(title, subtitle)}
        <PanelBody>
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div id="chart_plot_01"
              className="demo-placeholder col-md-9 col-sm-9 col-xs-9">
            </div>
            {this.renderChartOptions(options)}
            {/* <ChartOptions
              className="col-md-2 col-sm-2 col-xs-2"
              options={options}
            /> */}
          </div>
        </PanelBody>
      </Panel>
    )
  }
}

export default ChartPanel