import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartPanel from '../../components/ChartPanel'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import * as Constants from '../../constants';
import kpi_data from './diet-kpi_data';

const options = [
  { title: 'Cal', value: 'calories' },
  { title: 'SO Cal', value: 'fat' },
  { title: 'Hydration', value: 'water' },
  { title: 'whatevaaa', value: 'somethig...' },
];


const left_chart_data = [
  { name: '1', uv: 300, pv: 456 },
  { name: '2', uv: -145, pv: 230 },
  { name: '3', uv: -100, pv: 345 },
  { name: '4', uv: -8, pv: 450 },
  { name: '5', uv: 100, pv: 321 },
  { name: '6', uv: 9, pv: 235 },
  { name: '7', uv: 53, pv: 267 },
  { name: '8', uv: 252, pv: -378 },
  { name: '9', uv: 79, pv: -210 },
  { name: '10', uv: 294, pv: -23 },
  { name: '12', uv: 43, pv: 45 },
  { name: '13', uv: -74, pv: 90 },
  { name: '14', uv: -71, pv: 130 },
  { name: '15', uv: -117, pv: 11 },
  { name: '16', uv: -186, pv: 107 },
  { name: '17', uv: -16, pv: 926 },
  { name: '18', uv: -125, pv: 653 },
  { name: '19', uv: 222, pv: 366 },
  { name: '20', uv: 372, pv: 486 },
  { name: '21', uv: 182, pv: 512 },
  { name: '22', uv: 164, pv: 302 },
  { name: '23', uv: 316, pv: 425 },
  { name: '24', uv: 131, pv: 467 },
  { name: '25', uv: 291, pv: -190 },
  { name: '26', uv: -47, pv: 194 },
  { name: '27', uv: -415, pv: 371 },
  { name: '28', uv: -182, pv: 376 },
  { name: '29', uv: -93, pv: 295 },
  { name: '30', uv: -99, pv: 322 },
  { name: '31', uv: -52, pv: 246 },
  { name: '32', uv: 154, pv: 33 },
  { name: '33', uv: 205, pv: 354 },
  { name: '34', uv: 70, pv: 258 },
  { name: '35', uv: -25, pv: 359 },
  { name: '36', uv: -59, pv: 192 },
  { name: '37', uv: -63, pv: 464 },
  { name: '38', uv: -91, pv: -2 },
  { name: '39', uv: -66, pv: 154 },
  { name: '40', uv: -50, pv: 186 },
];

class DietPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Diet',
      chart_title: '',
      data: [],
      data_set: '',
      chart_title: '',
      kpi_data: [],
      backendURL: ''
    };
  }

  getAndSetDietData() {
    const servicePath = {servicePath: `${Constants.basePath}/backendserver`}
    fetch(`${Constants.zookeeperurl}/getservice`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, cors, *same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      
      headers: {
          "Content-Type": "application/json",
          
      },
      body: JSON.stringify(servicePath), // body data type must match "Content-Type" header
  })
    .then(res => res.json())
    .then(res => {
      fetch("http://"+res.data+"/diet")
      .then(res2 => res2.json())
      .then(res2 => this.setState({
        data: res2
      }))
    })

    // .then(res => (
    //   console.log("this.state.backendURL"+res.data)
    //   fetch(`${this.state.backendURL}/diet`)
    //   // .then(res2 => res2.json())
    // .then(res2 => console.log(res2))
    //   .then(res2 => this.setState({
    //     data: res2
    //   }))
    // ))
    
    
  }

  componentDidMount() {
    // TODO: GET FROM EXISTING DIET PAGE
    this.getAndSetDietData();
  }

  sliceChart = (chart_title) => {
    alert(chart_title)
    this.setState({
      chart_title
    })
  }

  sliceDateRange(event, picker) {
    console.log(picker.startDate._d);
    console.log(picker.endDate._d);
  }

  render() {

    const { data, data_set, chart_title  } = this.state;
    return (
      <Page>
        <PageTitle title={'Diet Data'} />

        <TopTile kpi_data={kpi_data} />

        <div>
          <Row>
            {/* Left Chart */}
            <Col md={5} sm={12} xs={12}>
              <ChartPanel
                data_set={data_set}
                title={chart_title}
                chart_type="scatter"
                data={left_chart_data}
              />
            </Col>

            {/* Slicers */}
            <Col md={2} sm={2} xs={2}>
              <ChartSlicerPanel
                options={options}
                sliceDateRange={this.sliceDateRange}
                sliceChart={this.sliceChart}
              />
            </Col>

            {/* Right Chart */}
            <Col md={5} sm={12} xs={12}>
              <ChartPanel
                data_set='diet'
                title={chart_title}
                chart_type="line"
                data={left_chart_data}
              />
            </Col>

          </Row>

          <div className="clearfix" />

          <Row>
            <Col md={12} sm={12} xs={12}>
              <DataTable
                data={data}
                data_set='last_five'
                button_box={true}
                search_box={false}
                title='Last 5 Meals'
                table_columns={Constants.diet_data_columns}
              />
            </Col>
          </Row>

          <div className="clearfix"> </div>

          <Row>
            <Col md={12} sm={12} xs={12}>
              <DataTable
                data={data}
                button_box={true}
                search_box={true}
                data_set='diet'
                title='Diet'
                table_columns={Constants.diet_data_columns}
              />
            </Col>
          </Row>
        </div>

        <div className="clearfix"> </div>

        {/* 
        <Panel>
          <PanelHeader>
            <h2>Typography <small>different design elements</small></h2>
            <GeneralPanelToolbox onCodeClick={ () => this.setState({showCode: !this.state.showCode})}/>
          </PanelHeader>
          <PanelBody>
            <div className="col-md-8 col-lg-8 col-sm-7">
              <blockquote>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Integer posuere erat a ante Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Integer
                  posuere erat a ante Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                  ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>

              <blockquote className="blockquote-reverse">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Integer posuere erat a ante Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Integer
                  posuere erat a ante Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                  ante.</p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-5">
              <h1>h1. Bootstrap heading</h1>
              <h2>h2. Bootstrap heading</h2>
              <h3>h3. Bootstrap heading</h3>
              <h4>h4. Bootstrap heading</h4>
              <h5>h5. Bootstrap heading</h5>
              <h6>h6. Bootstrap heading</h6>
            </div>
            <div className="clearfix"/>

            <div className="col-md-12">
              <h4>Labels and badges</h4>
              <Badge bsStyle="default">Default</Badge>{' '}
              <Badge bsStyle="primary">Primary</Badge>{' '}
              <Badge bsStyle="success">Success</Badge> <Badge bsStyle="info">Info</Badge>{' '}
              <Badge bsStyle="warning">Warning</Badge>{' '}
              <Badge bsStyle="danger">Danger</Badge>{' '}
              <Badge>42</Badge>
            </div>
          </PanelBody>
        </Panel> */}
      </Page>
    )
  }
}

export default DietPage