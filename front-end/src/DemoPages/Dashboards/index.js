import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AppFooter from '../../Layout/AppFooter/';
// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import AboutPage from './About';
import DietDashboard from './Diet';
import FitnessDashboard from './Fitness';
import LivePage from './Live';
import LocationPage from './Location';
import LoginPage from './Login';

import Home from './Home';
import Callback from './Callback';
import Auth from './Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    console.log(nextState.location.hash);
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

const Dashboards = ({ match }) => (
    <Fragment>
        {/* <ThemeOptions/> */}
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* <Route path={`${match.url}/live`} component={LivePage}/> */}
                    <Route path={`${match.url}/location`} component={LocationPage} />
                    <Route path={`${match.url}/fitness`} component={FitnessDashboard} />
                    <Route path={`${match.url}/diet`} component={DietDashboard} />
                    <Route path={`${match.url}/about`} component={AboutPage} />
                    <Route path={`${match.url}/login`}
                        render={(props) => <LoginPage auth={auth} {...props} />}
                    />
                    <Route path={`${match.url}/home`} render={(props) => <Home auth={auth} {...props} />} />
                    <Route path={`${match.url}/callback`} render={(props) => {
                        handleAuthentication(props);
                        return <Callback {...props} />
                    }} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Dashboards;