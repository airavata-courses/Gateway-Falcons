import React, { Component, Fragment } from 'react';
import MetisMenu from 'react-metismenu';
import { withRouter } from 'react-router-dom';
import { DataNav, DonateNav, JourneyNav } from './NavItems';

class Nav extends Component {

    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Journey</h5>
                <MetisMenu content={JourneyNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">Data</h5>
                <MetisMenu content={DataNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <br />
                <h5 className="app-sidebar__heading">Contribute</h5>
                {/* <a href="https://www.gofundme.com/send-Schwenck-to-Alaska-2019" target="_blank"> */}
                {/* onClick={() => alert('aaa')} */}
                    <MetisMenu content={DonateNav} className="vertical-nav-menu" target="_blank" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" 
                    />
                {/* </a> */}
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);