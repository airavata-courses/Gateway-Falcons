import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Page, PageTitle } from 'react-gentelella';
import AboutTabs from './AboutTabs';
import AboutProfile from './AboutProfile';
import { Panel, PanelBody, Tab, Tabs } from 'react-gentelella';
import { Col, Container, Row } from 'react-bootstrap';


class AboutPage extends Component {

    render() {
        // const { classes } = this.props;
        return (
            <Page>
                <PageTitle title={'The Journey'} />
                <Container style={{ display: "flex", flexWrap: "wrap" }}>
                    <Row>
                        <Col md={3} sm={3} xs={12}>
                            <Panel>
                                <PanelBody>
                                    <AboutProfile />
                                </PanelBody>
                            </Panel>
                        </Col>
                        <Col md={8} sm={8} xs={12}>
                            <Panel>
                                <PanelBody>
                                    <AboutTabs />
                                </PanelBody>
                            </Panel>
                        </Col>
                    </Row>
                </Container>
            </Page >
        );
    }
}

{/* AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
}; */}

export default AboutPage;

