import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { ProgressBar } from '../../components/widgets'

const performance = [
  {title: 'Facebook Campaing', value: 80},
  {title: 'Twiter Campaing', value: 60},
  {title: 'Conventional Media', value: 40},
  {title: 'Bill boards', value: 50},
]

const datum = [{
  key: "Cumulative Return",
  values: [
    {
      "label" : "A" ,
      "value" : -29.765957771107
    } ,
    {
      "label" : "B" ,
      "value" : 0
    } ,
    {
      "label" : "C" ,
      "value" : 32.807804682612
    } ,
    {
      "label" : "D" ,
      "value" : 196.45946739256
    } ,
    {
      "label" : "E" ,
      "value" : 0.19434030906893
    } ,
    {
      "label" : "F" ,
      "value" : -98.079782601442
    } ,
    {
      "label" : "G" ,
      "value" : -13.925743130903
    } ,
    {
      "label" : "H" ,
      "value" : -5.1387322875705
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


class NetworkActivities extends Component {  
  render () {
    return (
      <div className="dashboard_graph">
        <Title />

        <div className="col-md-9 col-sm-9 col-xs-12">
          {/* <div id="chart_plot_01" className="demo-placeholder"></div> */}
          {/* <NVD3Chart 
            context={context} 
            color={{name:'getColor', type:'function'}} 
            tooltip={{enabled: true}} 
            type="discreteBarChart" 
            datum={datum} 
            x="label" 
            y="value" />; */}
         </div>

        <TopCampaings performance={performance} />

        {/* <ClearFix /> */}
        <div> ClearFix ... </div>
      </div>
    )
  }
}

function Title () {
  return (
    <Row className="x_title">
      <Col md={6}>
        <h3>Network Activities <small>Graph title sub-title</small></h3>
      </Col>
      <Col md={6}>
        <div id="reportrange" className="pull-right" style={{background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc'}}>
          <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
          <span>December 30, 2014 - January 28, 2015</span> <b className="caret"></b>
        </div>
      </Col>
    </Row>    
  )
}

function TopCampaings ({performance}) {
  return (
    <Col md={3} sm={3} xs={12} className="bg-white">
      <div className="x_title">
        <h2>Top Campaign Performance</h2>
        {/* <ClearFix /> */}
        <div> ClearFix ... </div>
      </div>
      {
        performance.map((p, index) => (<Campaing key={index.toString()} {...p} />))
      }
    </Col>
  )
}

function Campaing ({title, value}) {
  return (
    <div>
      <p>{title}</p>
      <div className="">
        <ProgressBar value={value} className="progress_sm" style={{width: '76%'}} />
      </div>
    </div>    
  )
}

export default NetworkActivities