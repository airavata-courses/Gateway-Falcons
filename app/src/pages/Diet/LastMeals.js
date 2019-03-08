import React, { Component } from 'react'
import { TimeLine as TL } from '../../components/widgets'
import { Col } from 'react-bootstrap'
import { Panel, PanelHeader, PanelBody } from 'react-gentelella';

const mock_data_item = {
  meal: 'Lunch',
  Items: 'Sandwich, apple, snackpack',
  byline: {
    time: '13 hours ago',
  },
  content: 'Calories: ... Sodium:... Protein:...'
}

const mock_data = [mock_data_item, mock_data_item, mock_data_item, mock_data_item]

class LastMeals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // panelVisible: true
    }
  }

  render() {
    // const { panelVisible } = this.state
    // const onHide = e => this.setState({panelVisible: !panelVisible})

    return (
      <Col md={12} sm={12} xs={12}>
        <Panel>
          <PanelHeader>
            <Col md={6}>
              <h3>Last 5 Meals</h3>
            </Col>
        </PanelHeader>
          <PanelBody>
            <div className="dashboard-widget-content">
              <TL>
                {
                  mock_data.map((entry, index) => (
                    <TL.Item key={index.toString()}>
                      <TL.Title>{entry.meal}: {entry.Items}</TL.Title>
                      <TL.ByLine>
                        <span>{entry.byline.time}</span>
                      </TL.ByLine>
                      <TL.Content>
                        {entry.content}
                        {/* … <a>Read&nbsp;More</a> */}
                      </TL.Content>
                    </TL.Item>
                  ))
                }
              </TL>
            </div>
          </PanelBody>
        </Panel>
      </Col>
    )
  }
}

export default LastMeals