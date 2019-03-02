import React, { Component } from 'react';
import { Panel, PanelHeader, PanelBody, Tab, Tabs } from 'react-gentelella';
import BeforeAfterSlider from 'react-before-after-slider'

const before = 'https://unsplash.com/photos/yBqcajVQng4';
const after = 'https://unsplash.com/photos/_RBcxo9AU-U';

class AboutTabs extends Component {

    render() {
        return (
            <Panel>
                <PanelBody>
                    <Tabs>
                        <Tab title={'About Me'} active>
                            <p className="lead">Home tab</p>
                            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                    synth. Cosby sweater eu banh mi, qui irure terr.</p>
                        </Tab>
                        <Tab title={'Story'}>
                            <p className="lead">Profile tab</p>
                        </Tab>
                        <Tab title={'Mission'}>
                            {/* TODO: */}
                            <BeforeAfterSlider
                                before={before}
                                after={after}
                                width={640}
                                height={480}
                            />
                        </Tab>
                        <Tab title={'Research'}>
                            <p className="lead">Settings tab</p>
                        </Tab>
                        <Tab title={'GoFundMe'}>
                            <p className="lead">Settings tab</p>
                        </Tab>
                    </Tabs>
                </PanelBody>
            </Panel>
        );
    }
}

export default AboutTabs;
