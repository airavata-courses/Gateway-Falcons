import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples
import ButtonsShadowSolid from './Examples/Solid';
import ButtonsShadowOutline from './Examples/Outline';
import ButtonsShadowOutline2x from './Examples/Outline2x';
import ButtonsShadowDashed from './Examples/Dashed';
import ButtonsShadowGradients from './Examples/Gradients';

const tabsContent = [
    {
        title: 'Solid',
        content: <ButtonsShadowSolid/>
    },
    {
        title: 'Outline',
        content: <ButtonsShadowOutline/>
    },
    {
        title: 'Outline 2x',
        content: <ButtonsShadowOutline2x/>
    },
    {
        title: 'Dashed',
        content: <ButtonsShadowDashed/>
    },
    {
        title: 'Gradients',
        content: <ButtonsShadowGradients/>
    }
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class ButtonsShadow extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Shadow Buttons"
                    subheading="These buttons are examples of buttons with drop shadows attached."
                    icon="pe-7s-monitor icon-gradient bg-malibu-beach"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}