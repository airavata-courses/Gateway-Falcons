import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartPanel from '../../components/ChartPanel'
import TopTile from '../../components/TopTile'
import { Page, PageTitle } from 'react-gentelella';
import DataTable from '../../components/DataTable';
import SlicerPanel from '../../components/SlicerPanel';
import * as Constants from '../../constants';

const options = [
  { title: 'Low Cal', value: 'calories' },
  { title: 'SO Cal', value: 'fat' },
  { title: 'Hydration', value: 'water' },
  { title: 'whatevaaa', value: 'somethig...' },
]

class DietPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Diet',
      data: [],
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

  render() {

    const { data, kpi_data } = this.state;
    return (
      <Page>
        <PageTitle title={'Typography'}>
          {/* <GlobalSearch/> */}
        </PageTitle>

        <TopTile kpi_data={kpi_data} />

        <div>
          <Row>
            {/* Left Chart */}
            <Col md={5} sm={12} xs={12}>
              <ChartPanel
                data_set='diet'
                title='Diet'
                options={options}
                data={data}
              />
            </Col>

            {/* Slicers */}
            <Col md={2} sm={2} xs={2}>
              <SlicerPanel 
                options={options} 
              />
            </Col>

            {/* Right Chart */}
            <Col md={5} sm={12} xs={12}>
              <ChartPanel
                data_set='diet'
                title='Diet'
                options={options}
                data={data}
              />
            </Col>

          </Row>

          <div className="clearfix" />

          <Row>
            <Col md={12} sm={12} xs={12}>
              <DataTable
                data={data}
                data_set='diet'
              />
            </Col>
          </Row>
        </div>

        <div className="clearfix"> </div>

        {/* VerticalTabsLeft */}

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