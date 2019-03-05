import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Page, PageTitle } from 'react-gentelella';
import AboutTabs from './AboutTabs';
import AboutProfile from './AboutProfile';


class AboutPage extends Component {

    render() {
        // const { classes } = this.props;
        return (
            <Page>
                <PageTitle title={'The Journey'} />
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_content">
                                <div className="col-md-3 col-sm-3 col-xs-12 profile_left">
                                    <AboutProfile />
                                </div>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <AboutTabs />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

{/* AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
}; */}

export default AboutPage;

