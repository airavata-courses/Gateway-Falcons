// TODO: combine right and left chart

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartPanel from '../../components/ChartPanel'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import * as Constants from '../../constants';
import kpi_data from './diet-kpi_data';
import LastMeals from './LastMeals'
import RightChart from './RightChart';
import temp_data from './temp-data';

const options = [
  { title: 'Calories', value: 'calories' },
  { title: 'Fat', value: 'fat' },
  { title: 'Protein', value: 'water' },
  { title: 'Carbs', value: 'somethig...' },
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
    const servicePath = { servicePath: `${Constants.basePath}/backendserver` }
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
        fetch("http://" + res.data + "/diet")
          .then(res2 => res2.json())
          .then(res2 => this.setState({
            data: res2
          }))
      })

      this.setState({data: temp_data});
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
    console.log('temp_data', temp_data);
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

  // TODO: add slicer ... 

  render() {

    const { data, data_set, chart_title } = this.state;
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
                title={"CHange meee"}
                chart_type="scatter"
                data={left_chart_data}
              />
            </Col>

            {/* Slicers */}
            {/* <Col md={2} sm={2} xs={2}>
              <ChartSlicerPanel
                options={options}
                sliceDateRange={this.sliceDateRange}
                sliceChart={this.sliceChart}
              />
            </Col> */}

            {/* Right Chart */}
            <Col md={5} sm={12} xs={12}>
              <RightChart
                data_set={data_set}
                title={"CHange meee"}
                first_attr={"sodium"}
                second_attr={"sugar"}
                chart_type="line_with_reference"
                data={data} />
            </Col>

          </Row>

          <div className="clearfix" />

          {/* <Row>
            <Col md={12} sm={12} xs={12}>
              <LastMeals />
            </Col>
          </Row> */}

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

      </Page>
    )
  }
}

export default DietPage