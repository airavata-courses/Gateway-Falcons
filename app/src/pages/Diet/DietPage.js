import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartPanel from '../../components/ChartPanel'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import ChartSlicerPanel from '../../components/ChartSlicerPanel';
import * as Constants from '../../constants';

const options = [
  { title: 'Cal', value: 'calories' },
  { title: 'SO Cal', value: 'fat' },
  { title: 'Hydration', value: 'water' },
  { title: 'whatevaaa', value: 'somethig...' },
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

    const { data, data_set, chart_title, kpi_data } = this.state;
    return (
      <Page>
        <PageTitle title={'Diet Data'} />

        <TopTile kpi_data={kpi_data} />

        <div>
          <Row>
            {/* Left Chart */}
            <Col md={5} sm={12} xs={12}>
              <ChartPanel
                data_set='diet'
                title={chart_title}
                chart_type="scatter"
                data={data}
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
                data={data}
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