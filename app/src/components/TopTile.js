import React, { Component } from 'react'
import { TopTileStats } from './widgets'

class TopTile extends Component {
  render () {
    const { kpi_data } = this.props;
    return (
      <TopTileStats kpi_data={kpi_data} />
    )
  }
}

export default TopTile