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
                <div class="clearfix"></div>
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                            <div class="x_content">
                                <div class="col-md-3 col-sm-3 col-xs-12 profile_left">
                                    <AboutProfile />
                                </div>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <AboutTabs />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page >
        );
    }
}

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default AboutPage;

