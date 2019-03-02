import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Page, PageTitle } from 'react-gentelella';
import AboutTabs from './AboutTabs';

class AboutPage extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Page>
                <PageTitle title={'About Me'} />
                <div class="clearfix"></div>
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                            <div class="x_content">
                                <div class="col-md-3 col-sm-3 col-xs-12 profile_left">
                                    <div class="profile_img">
                                        <div id="crop-avatar">
                                            {/* <!-- Current avatar --> */}
                                            <img class="img-responsive avatar-view" src="/images/img.jpg" alt="Avatar" title="Change the avatar" />
                                        </div>
                                    </div>
                                    <h3>Samuel Doe</h3>

                                    <ul class="list-unstyled user_data">
                                        <li>
                                            <i class="fa fa-map-marker user-profile-icon"></i> San Francisco, California, USA
                                        </li>
                                        <li>
                                            <i class="fa fa-briefcase user-profile-icon"></i> Software Engineer
                                        </li>
                                        <li class="m-top-xs">
                                            <i class="fa fa-external-link user-profile-icon"></i>
                                            <a href="http://www.kimlabs.com/profile/" target="_blank">www.kimlabs.com</a>
                                        </li>
                                    </ul>
                                    <a class="btn btn-success"><i class="fa fa-edit m-right-xs"></i>Edit Profile</a>
                                    <br />

                                    {/* <!-- start skills --> */}
                                    <h4>Skills</h4>
                                    <ul class="list-unstyled user_data">
                                        <li>
                                            <p>Web Applications</p>
                                            <div class="progress progress_sm">
                                                <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="50"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <p>Website Design</p>
                                            <div class="progress progress_sm">
                                                <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="70"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <p>Automation & Testing</p>
                                            <div class="progress progress_sm">
                                                <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="30"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <p>UI / UX</p>
                                            <div class="progress progress_sm">
                                                <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="50"></div>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* <!-- end of skills --> */}

                                </div>

                                <div class="col-md-9 col-sm-9 col-xs-12">

                                    <AboutTabs />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                        {/* </div>
                    </div > */}
            </Page >
                );

    }

}

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default AboutPage;

