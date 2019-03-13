// TODO: KPI today or yesterday 
// pluck last element 

// % difference from yesterday   


// TODO: Charts

// maxes on right chart ...
// add date styling / config ... PRANETA???

// TODO: last minute stuff

// add slicers
// style mui table

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartPanel from '../../components/ChartPanel'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import * as Constants from '../../constants';
// import kpi_data from './diet-kpi_data';
// import LastMeals from './LastMeals'
import ReChartPanel from '../../components/ReChartPanel';
import temp_data from './temp-data';

const options = [
  { title: 'Calories', value: 'calories' },
  { title: 'Fat', value: 'fat' },
  { title: 'Protein', value: 'water' },
  { title: 'Carbs', value: 'somethig...' },
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
      backendURL: '',
      today: {},
      yesterday: {},
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

    this.setState({
      data: temp_data,
      today: temp_data[temp_data.length - 1],
      yesterday: temp_data[temp_data.length - 2]
    });
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

  generateKPIData(today, yesterday) {
    const today_totals = today.totals;
    const yesterday_totals = yesterday.totals;
    const kpi_data = [];
    const today_cal = (today_totals ? today_totals.calories : "none today");
    const today_cal_diff = (today_totals
      ? (today_totals.calories - yesterday_totals.calories) + ''
      : "none today");
    kpi_data.push(
      {
        title: { icon: 'user', label: 'Total Cal Consumed' },
        value: { label: today_cal },
        bottom: {
          stat: Math.abs(today_cal_diff),
          label: ((today_cal_diff > 0) ? "More " : "Less ") + ' than yest.'
        }
      }
    );
    // {
    //   title: { icon: 'clock-o', label: 'Carbs' },
    //   value: { label: '123.50' },
    //   bottom: { stat: '3%', label: 'From Last Week' }
    // },
    // {
    //   title: { icon: 'user', label: 'Fats' },
    //   value: { className: 'green', label: '2,500' },
    //   bottom: { stat: '4%', label: 'From Last Week' }
    // },
    // {
    //   title: { icon: 'user', label: 'Proteins' },
    //   value: { label: '4,567' },
    //   bottom: { className: 'red', stat: '12%', label: 'From Last Week' }
    // },
    // {
    //   title: { icon: 'user', label: 'Sugars' },
    //   value: { label: '2,315' },
    //   bottom: { stat: '34%', label: 'From Last Week' }
    // },
    // {
    //   title: { icon: 'user', label: 'Hydration Level' },
    //   value: { label: '7,325' },
    //   bottom: { stat: '34%', label: 'From Last Week' }
    // },
    return kpi_data;
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

    const { data, today, yesterday } = this.state;
    let kpi_data = [];
    // if (today, yesterday) {
    kpi_data = this.generateKPIData(today, yesterday);
    // }
    return (
      <Page>
        <PageTitle title={'Diet'} />

        <TopTile kpi_data={kpi_data} />

        <div>
          <Row>
            {/* Left Chart */}
            <Col md={5} sm={12} xs={12}>
              <ReChartPanel
                chart_type="Brush"
                first_attr={"fat"}
                second_attr={"carbohydrates"}
                third_attr={"protein"}
                data={data}
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
              <ReChartPanel
                chart_type="Line"
                first_attr={"sodium"}
                second_attr={"sugar"}
                data={data}
              />
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
                title='Aggregate Data'
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