// TODO: Charts
// add date styling / config ... PRANETA???

// TODO: last minute stuff

// add slicers
// style mui table

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
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
    // const servicePath = { servicePath: `${Constants.basePath}/backendserver` }
    // fetch(`${Constants.zookeeperurl}/getservice`, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   credentials: 'same-origin',
    //   body: JSON.stringify(servicePath), // body data type must match "Content-Type" header
    // })
    fetch(`${Constants.serverUrl}/diet`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(res => {
        fetch("http://" + res.data + "/diet")
          .then(res2 => res2.json())
          .then(res2 => this.setState({
            data: res2,
            today: temp_data[temp_data.length - 1],
            yesterday: temp_data[temp_data.length - 2]
          }))
      })

    // this.setState({
    //   data: temp_data,
    //   today: temp_data[temp_data.length - 1],
    //   yesterday: temp_data[temp_data.length - 2]
    // });

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
    const today_carbs = (today_totals ? today_totals.carbohydrates : "none today");
    const today_carbs_diff = (today_totals
      ? (today_totals.carbohydrates - yesterday_totals.carbohydrates) + ''
      : "none today");
    kpi_data.push(
      {
        title: { icon: 'clock-o', label: 'Carbs' },
        value: { label: today_carbs },
        bottom: {
          stat: Math.abs(today_carbs_diff),
          label: ((today_carbs_diff > 0) ? "More " : "Less ") + ' than yest.'
        }
      }
    );
    const today_fat = (today_totals ? today_totals.fat : "none today");
    const today_fat_diff = (today_totals
      ? (today_totals.fat - yesterday_totals.fat) + ''
      : "none today");
    kpi_data.push(
      {
        title: { icon: 'clock-o', label: 'Fats' },
        value: { label: today_fat },
        bottom: {
          stat: Math.abs(today_fat_diff),
          label: ((today_fat_diff > 0) ? "More " : "Less ") + ' than yest.'
        }
      }
    );

    const today_protein = (today_totals ? today_totals.protein : "none today");
    const today_protein_diff = (today_totals
      ? (today_totals.protein - yesterday_totals.protein) + ''
      : "none today");
    kpi_data.push(
      {
        title: { icon: 'clock-o', label: 'Protein' },
        value: { label: today_protein },
        bottom: {
          stat: Math.abs(today_protein_diff),
          label: ((today_protein_diff > 0) ? "More " : "Less ") + ' than yest.'
        }
      }
    );

    const today_sugar = (today_totals ? today_totals.sugar : "none today");
    const today_sugar_diff = (today_totals
      ? (today_totals.sugar - yesterday_totals.sugar) + ''
      : "none today");
    kpi_data.push(
      {
        title: { icon: 'clock-o', label: 'Sugar' },
        value: { label: today_sugar },
        bottom: {
          stat: Math.abs(today_sugar_diff),
          label: ((today_sugar_diff > 0) ? "More " : "Less ") + ' than yest.'
        }
      }
    );

    const today_water = (today_totals ? today.water : "none today");
    const today_water_diff = (today
      ? (today.water - yesterday.water) + ''
      : "none today");
    kpi_data.push(
      {
        title: { icon: 'clock-o', label: 'Hydration' },
        value: { label: today_water },
        bottom: {
          stat: Math.abs(today_water_diff),
          label: ((today_water_diff > 0) ? "More " : "Less ") + ' than yest.'
        }
      }
    );

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