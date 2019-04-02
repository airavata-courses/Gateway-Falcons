import React, {Fragment, Component} from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PageTitleAlt from '../../../Layout/AppMain/PageTitleAlt';

import Sticky from 'react-stickynode';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';

import {
    TabContent, TabPane, DropdownItem,
    CardBody, Collapse, FormGroup, Label, Input, FormFeedback, FormText,
    Card, Col, Row, CardHeader,
    Button
} from 'reactstrap';

import classnames from 'classnames';

export default class FaqSection extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            active: false,
            collapse: false,
            accordion: [true, false, false],
            custom: [true, false],
            status: 'Closed',
            fadeIn: true,
            timeout: 300,
        };

    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    toggleAccordion(tab) {

        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => tab === index ? !x : false);

        this.setState({
            accordion: state,
        });
    }

    toggleCustom(tab) {

        const prevState = this.state.custom;
        const state = prevState.map((x, index) => tab === index ? !x : false);

        this.setState({
            custom: state,
        });
    }

    toggleFade() {
        this.setState({fadeIn: !this.state.fadeIn});
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    className={cx("app-inner-layout chat-layout", {
                        'open-mobile-menu': this.state.active,
                    })}
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <Sticky enabled={!this.state.active} top='.app-header' innerZ="12" activeClass="sticky-active-class">
                            <div className="app-inner-layout__header text-white bg-premium-dark">
                                <PageTitleAlt
                                    heading="FAQ Section"
                                    subheading="Dummy page layout example."
                                    icon="pe-7s-umbrella text-white"
                                />
                            </div>
                        </Sticky>
                        <div className="app-inner-layout__wrapper row-fluid no-gutters">
                            <Card className="app-inner-layout__sidebar bg-transparent">
                                <Sticky enabled={!this.state.active} top={180} innerZ="15">
                                    <div className="p-3">
                                        <div
                                            className="dropdown-menu p-0 dropdown-menu-inline dropdown-menu-rounded dropdown-menu-hover-primary">
                                            <DropdownItem header className="pt-0">
                                                Fixed Menu
                                            </DropdownItem>
                                            <DropdownItem
                                                className={classnames("mb-1", {active: this.state.activeTab === '1'})}
                                                onClick={() => {
                                                    this.toggle('1');
                                                }}>
                                                Tab Example 1
                                            </DropdownItem>
                                            <DropdownItem
                                                className={classnames("mb-1", {active: this.state.activeTab === '2'})}
                                                onClick={() => {
                                                    this.toggle('2');
                                                }}>
                                                Tab Example 2
                                            </DropdownItem>
                                            <DropdownItem
                                                className={classnames("mb-1", {active: this.state.activeTab === '3'})}
                                                onClick={() => {
                                                    this.toggle('3');
                                                }}>
                                                Tab Example 3
                                            </DropdownItem>
                                        </div>
                                    </div>
                                </Sticky>
                            </Card>
                            <Card className="col-md-12 app-inner-layout__content">
                                <div className="pb-5 pl-5 pr-5 pt-3">
                                    <div className="mobile-app-menu-btn mb-3">
                                        <Hamburger
                                            active={this.state.active}
                                            type="elastic"
                                            onClick={() => this.setState({active: !this.state.active})}
                                        />
                                    </div>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">

                                            <div id="accordion" className="accordion-wrapper mb-3">
                                                <Card>
                                                    <CardHeader id="headingOne">
                                                        <Button block color="link" className="text-left m-0 p-0"
                                                                onClick={() => this.toggleAccordion(0)}
                                                                aria-expanded={this.state.accordion[0]}
                                                                aria-controls="collapseOne">
                                                            <h3 className="form-heading">
                                                                Account Information
                                                                <p>Enter your user informations below</p>
                                                            </h3>
                                                        </Button>
                                                    </CardHeader>
                                                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion"
                                                              id="collapseOne" aria-labelledby="headingOne">
                                                        <CardBody>
                                                            <Row form>
                                                                <Col md={6}>
                                                                    <FormGroup>
                                                                        <Label for="exampleEmail2">Email</Label>
                                                                        <Input type="email" name="email" id="exampleEmail2"
                                                                               placeholder="with a placeholder"/>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <FormGroup>
                                                                        <Label for="examplePassword555">Password</Label>
                                                                        <Input type="password" name="password" id="examplePassword555"
                                                                               placeholder="password placeholder"/>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <FormGroup>
                                                                <Label for="exampleAddress">Address</Label>
                                                                <Input type="text" name="address" id="exampleAddress"
                                                                       placeholder="1234 Main St"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleAddress2">Address 2</Label>
                                                                <Input type="text" name="address2" id="exampleAddress2"
                                                                       placeholder="Apartment, studio, or floor"/>
                                                            </FormGroup>
                                                            <Row form>
                                                                <Col md={6}>
                                                                    <FormGroup>
                                                                        <Label for="exampleCity">City</Label>
                                                                        <Input type="text" name="city" id="exampleCity"/>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <FormGroup>
                                                                        <Label for="exampleState">State</Label>
                                                                        <Input type="text" name="state" id="exampleState"/>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <FormGroup>
                                                                        <Label for="exampleZip">Zip</Label>
                                                                        <Input type="text" name="zip" id="exampleZip"/>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                                <Card>
                                                    <CardHeader className="b-radius-0" id="headingTwo">
                                                        <Button block color="link" className="text-left m-0 p-0"
                                                                onClick={() => this.toggleAccordion(1)}
                                                                aria-expanded={this.state.accordion[1]}
                                                                aria-controls="collapseTwo">
                                                            <h3 className="form-heading">
                                                                Credit Card Informations
                                                                <p>Enter your user informations below</p>
                                                            </h3>
                                                        </Button>
                                                    </CardHeader>
                                                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion"
                                                              id="collapseTwo">
                                                        <CardBody>
                                                            <FormGroup>
                                                                <Label for="exampleEmail3">Plain Text (Static)</Label>
                                                                <Input plaintext>Some plain text/ static value</Input>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleEmail4">Email</Label>
                                                                <Input type="email" name="email" id="exampleEmail4"
                                                                       placeholder="with a placeholder"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="examplePassword">Password</Label>
                                                                <Input type="password" name="password" id="examplePassword"
                                                                       placeholder="password placeholder"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleUrl">Url</Label>
                                                                <Input type="url" name="url" id="exampleUrl" placeholder="url placeholder"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleNumber">Number</Label>
                                                                <Input type="number" name="number" id="exampleNumber"
                                                                       placeholder="number placeholder"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleDatetime">Datetime</Label>
                                                                <Input type="datetime" name="datetime" id="exampleDatetime"
                                                                       placeholder="datetime placeholder"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleDate">Date</Label>
                                                                <Input type="date" name="date" id="exampleDate" placeholder="date placeholder"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleTime">Time</Label>
                                                                <Input type="time" name="time" id="exampleTime" placeholder="time placeholder"/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleColor">Color</Label>
                                                                <Input type="color" name="color" id="exampleColor"
                                                                       placeholder="color placeholder"/>
                                                            </FormGroup>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                                <Card>
                                                    <CardHeader id="headingThree">
                                                        <Button block color="link" className="text-left m-0 p-0"
                                                                onClick={() => this.toggleAccordion(2)}
                                                                aria-expanded={this.state.accordion[2]}
                                                                aria-controls="collapseThree">
                                                            <h3 className="form-heading">
                                                                Personal Details
                                                                <p>Enter your user informations below</p>
                                                            </h3>
                                                        </Button>
                                                    </CardHeader>
                                                    <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion"
                                                              id="collapseThree">
                                                        <CardBody>
                                                            <FormGroup>
                                                                <Label for="exampleEmail5">Input without validation</Label>
                                                                <Input/>
                                                                <FormFeedback>You will not be able to see this</FormFeedback>
                                                                <FormText>Example help text that remains unchanged.</FormText>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleEmail6">Valid input</Label>
                                                                <Input valid/>
                                                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                                                <FormText>Example help text that remains unchanged.</FormText>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="examplePassword">Invalid input</Label>
                                                                <Input invalid/>
                                                                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                                                                <FormText>Example help text that remains unchanged.</FormText>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleEmail7">Input without validation</Label>
                                                                <Input/>
                                                                <FormFeedback tooltip>You will not be able to see this</FormFeedback>
                                                                <FormText>Example help text that remains unchanged.</FormText>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleEmail">Valid input</Label>
                                                                <Input valid/>
                                                                <FormFeedback valid tooltip>Sweet! that name is available</FormFeedback>
                                                                <FormText>Example help text that remains unchanged.</FormText>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="examplePassword">Invalid input</Label>
                                                                <Input invalid/>
                                                                <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback>
                                                                <FormText>Example help text that remains unchanged.</FormText>
                                                            </FormGroup>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                            </div>

                                            <div className="mt-5"/>
                                            <div className="clearfix">
                                                <div className="text-center">
                                                    <Button color="primary" size="lg"
                                                            className="btn-pill btn-wide btn-shadow" onClick={() => {
                                                        this.toggle('2');
                                                    }}>
                                                        Next: <b>Maecenas tempus, tellus</b>
                                                    </Button>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <h4>Maecenas tempus, tellus</h4>
                                            <div className="divider"/>

                                            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great
                                                explorer of the truth, the master-builder of human happiness.</p>

                                            <p>No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>

                                            <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great
                                                pleasure.</p>

                                            <p>To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?</p>

                                            <p>But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>

                                            <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee</p>

                                            <div className="mt-5"/>
                                            <div className="clearfix">
                                                <div className="text-center">
                                                    <Button color="primary" size="lg"
                                                            className="btn-pill btn-wide btn-shadow" onClick={() => {
                                                        this.toggle('3');
                                                    }}>
                                                        Next: <b>Maecenas tempus, tellus</b>
                                                    </Button>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <h4>Maecenas tempus, tellus</h4>
                                            <div className="divider"/>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>

                                            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>

                                            <p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>

                                            <p>Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>

                                            <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.</p>

                                            <p>Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.</p>

                                            <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.</p>

                                            <p>Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet
                                                nibh.
                                                Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>

                                            <div className="mt-5"/>
                                            <div className="clearfix">
                                                <div className="text-center">
                                                    <Button color="primary" size="lg"
                                                            className="btn-pill btn-wide btn-shadow" onClick={() => {
                                                        this.toggle('1');
                                                    }}>
                                                        Next: <b>Maecenas tempus, tellus</b>
                                                    </Button>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </Card>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </
                Fragment>
        )
    }
}