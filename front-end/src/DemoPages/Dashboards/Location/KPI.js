import React, { Component, Fragment } from 'react';
import {
    Row, Col,
    Card
} from 'reactstrap';

import {
    faAngleUp,
    faAngleDown,
    faQuestionCircle,
    faBusinessTime,
    faCog
} from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function generateKPI() {
    // get data
    return (
        <div>
            <Row>
                <Col md="6" lg="3">
                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                        <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                                <h6 className="widget-subheading">
                                    Income
                                        </h6>
                                <div className="widget-chart-flex">
                                    <div className="widget-numbers mb-0 w-100">
                                        <div className="widget-chart-flex">
                                            <div className="fsize-4">
                                                <small className="opacity-5">$</small>
                                                5,456
                                                    </div>
                                            <div className="ml-auto">
                                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                    <span className="text-success pl-2">
                                                        +14%
                                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md="6" lg="3">
                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                        <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                                <h6 className="widget-subheading">
                                    Expenses
                                        </h6>
                                <div className="widget-chart-flex">
                                    <div className="widget-numbers mb-0 w-100">
                                        <div className="widget-chart-flex">
                                            <div className="fsize-4 text-danger">
                                                <small className="opacity-5 text-muted">$</small>
                                                4,764
                                                    </div>
                                            <div className="ml-auto">
                                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                    <span className="text-danger pl-2">
                                                        <span className="pr-1">
                                                            <FontAwesomeIcon icon={faAngleUp} />
                                                        </span>
                                                        8%
                                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md="6" lg="3">
                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                        <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                                <h6 className="widget-subheading">
                                    Spendings
                                        </h6>
                                <div className="widget-chart-flex">
                                    <div className="widget-numbers mb-0 w-100">
                                        <div className="widget-chart-flex">
                                            <div className="fsize-4">
                                                <span className="text-success pr-2">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                </span>
                                                <small className="opacity-5">$</small>
                                                1.5M
                                                    </div>
                                            <div className="ml-auto">
                                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                    <span className="text-success pl-2">
                                                        <span className="pr-1">
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </span>
                                                        15%
                                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md="6" lg="3">
                    <Card className="card-shadow-primary mb-3 widget-chart widget-chart2 text-left">
                        <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                                <h6 className="widget-subheading">
                                    Totals
                                        </h6>
                                <div className="widget-chart-flex">
                                    <div className="widget-numbers mb-0 w-100">
                                        <div className="widget-chart-flex">
                                            <div className="fsize-4">
                                                <small className="opacity-5">$</small>
                                                31,564
                                                    </div>
                                            <div className="ml-auto">
                                                <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                                                    <span className="text-warning pl-2">
                                                        +76%
                                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default generateKPI();