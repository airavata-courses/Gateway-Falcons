import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SidebarTitle = ({ appName, icon }) => (
  <Fragment>
    <div className="navbar nav_title" style={{ border: 0 }}>
      <a href="/" className="site_title">
        { icon }&nbsp;
        <span>Schwenck Live</span>
      </a>
    </div>

    <div className="clearfix"/>
  </Fragment>
)

SidebarTitle.propTypes = {
  appName: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired
}

SidebarTitle.defaultProps = {
  appName: 'Schwenck Live',
  icon: <i className={'fa fa-paw'} />
}

export default SidebarTitle;
