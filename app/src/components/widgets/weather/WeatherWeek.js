import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-bootstrap'
import WeatherDay from './WeatherDay'

const propTypes = {
  icon: PropTypes.func
}

class WeatherWeek extends Component {
  
  render () {
    const { week, skycons } = this.props

    return (
        <Row className="weather-days">
          { 
            week.map((day, index) => (
              <WeatherDay key={index.toString()} {...day} skycons={skycons} />
            ))
          }
          {/* <Clearfix /> */}
          <div> ClearFix ... </div>
        </Row>
    )
  }
}

WeatherWeek.propTypes = propTypes

export default WeatherWeek