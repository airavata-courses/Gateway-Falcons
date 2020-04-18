import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage'

const LandingIndex = ({match}) => (
    <Fragment>
        {/* <ThemeOptions/> */}
        <div className="app-main">
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`/`} component={LandingPage}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default LandingIndex;