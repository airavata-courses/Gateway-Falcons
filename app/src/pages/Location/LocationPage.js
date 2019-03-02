import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartPanel from '../../components/ChartPanel'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import MapSlicerPanel from '../../components/MapSlicerPanel';
import * as Constants from '../../constants';

const options = [
  { title: 'Cal', value: 'calories' },
  { title: 'SO Cal', value: 'fat' },
  { title: 'Hydration', value: 'water' },
  { title: 'whatevaaa', value: 'somethig...' },
];

class LocationPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Diet',
      chart_title: '',
      data: [],
      data_set: '',
      chart_title: '',
      kpi_data: []
    };
  }

  getAndSetDietData() {
    fetch(`${Constants.serverUrl}/diet`)
      // .then(res => console.log(res))
      .then(res => res.json())
      .then(res => this.setState({
        data: [].concat(res)
      }))
    // .then(() => {
    //     this.setChart();
    //     this.setLastMeals();
    // });
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

    const { data, chart_title, kpi_data } = this.state;
    return (
      <Page>
        <PageTitle title={'Location'} />

        <TopTile kpi_data={kpi_data} />

        <div>
          <Row>
            {/* Left Chart */}
            <Col md={12} sm={12} xs={12}>
              <ChartPanel
                data_set='diet'
                title={chart_title}
                chart_type="scatter"
                data={data}
              />
            </Col>

            {/* Slicers */}
            <Col md={6} sm={6} xs={6}>
              <MapSlicerPanel
                options={options}
                sliceDateRange={this.sliceDateRange}
                sliceChart={this.sliceChart}
              />
            </Col>

            {/* Right Chart */}
            <Col md={12} sm={12} xs={12}>
              <ChartPanel
                data_set='diet'
                title={chart_title}
                chart_type="line"
                data={data}
              />
            </Col>

          </Row>

          <div className="clearfix" />

        </div>

      </Page>
    )
  }
}

export default LocationPage