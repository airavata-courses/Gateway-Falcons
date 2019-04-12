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

const Dashboards = ({match}) => (
    <Fragment>
        {/* <ThemeOptions/> */}
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* <Route path={`${match.url}/live`} component={LivePage}/> */}
                    <Route path={`${match.url}/location`} component={LocationPage}/>
                    <Route path={`${match.url}/fitness`} component={FitnessDashboard}/>
                    <Route path={`${match.url}/diet`} component={DietDashboard}/>
                    <Route path={`${match.url}/about`} component={AboutPage}/>
                    {/* <Route path={`${match.url}/analytics`} component={AnalyticsDashboard}/> */}
                    {/* <Route path={`${match.url}/sales`} component={SalesDashboard}/>
                    <Route path={`${match.url}/commerce`} component={CommerceDashboard}/> */}
                    {/* <Route path={`${match.url}/crm`} component={CRMDashboard}/>
                    <Route path={`${match.url}/minimal-dashboard-1`} component={MinimalDashboard1}/>
                    <Route path={`${match.url}/minimal-dashboard-2`} component={MinimalDashboard2}/> */}
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Dashboards;