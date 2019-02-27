import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import NetworkActivities from './NetworkActivities'
import AppVersions from './AppVersions'
import DeviceUsage from './DeviceUsage'
import QuickSettings from './QuickSettings'
import RecentActivities from './RecentActivities'
import VisitorsLocations from './VisitorsLocations'
import TodoList from './TodoList'
import Weather from './Weather'
import TopTile from '../../components/TopTile'
import { Page, PageTitle, Panel, PanelHeader, PanelBody } from 'react-gentelella';
import GlobalSearch from '../../components/global-search'
import GeneralPanelToolbox from '../../components/general-panel-toolbox'
import CodeSample from '../../components/general-panel-toolbox'
import { Badge } from 'react-bootstrap'

const options = [
  { title: 'Low Cal', value: 'calories' },
  { title: 'SO Cal', value: 'fat' },
  { title: 'Hydration', value: 'water' },
  { title: 'whatevaaa', value: 'somethig...' },
]

class DietPage extends Component {
  render () {

    return (
      <Page>
        <PageTitle title={'Typography'}>
          {/* <GlobalSearch/> */}
        </PageTitle>
       <TopTile />

       <Row>
            <Col md={12} sm={12} xs={12}>
              <NetworkActivities 
                title='Diet'
                options={options}
              />
            </Col>
          </Row>
    
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