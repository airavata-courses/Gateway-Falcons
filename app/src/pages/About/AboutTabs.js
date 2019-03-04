import React, { Component } from 'react';
import { Panel, PanelBody, Tab, Tabs } from 'react-gentelella';
// import BeforeAfterSlider from 'react-before-after-slider'
import ReactCompareImage from 'react-compare-image';
import john from '../../images/john-profile.jpg';
import napkin from '../../images/temp-background.jpg';

// const before = 'https://unsplash.com/photos/yBqcajVQng4';
// const after = 'https://unsplash.com/photos/_RBcxo9AU-U';

class AboutTabs extends Component {

    render() {
        return (
            <Panel>
                <PanelBody>
                    <Tabs>
                        <Tab title={'About'} active>
                            <p className="lead">Home tab</p>
                            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                    synth. Cosby sweater eu banh mi, qui irure terr.</p>
                            <ReactCompareImage
                                leftImage={john}
                                rightImage={napkin}
                            />
                        </Tab>
                        <Tab title={'Story'}>
                            <p className="lead">Profile tab</p>
                        </Tab>
                        <Tab title={'Mission'}>
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
