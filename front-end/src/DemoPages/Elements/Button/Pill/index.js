import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples
import ButtonsPillSolid from './Examples/Solid';
import ButtonsPillOutline from './Examples/Outline';
import ButtonsPillOutline2x from './Examples/Outline2x';
import ButtonsPillDashed from './Examples/Dashed';
import ButtonsPillGradients from './Examples/Gradients';

const tabsContent = [
    {
        title: 'Solid',
        content: <ButtonsPillSolid/>
    },
    {
        title: 'Outline',
        content: <ButtonsPillOutline/>
    },
    {
        title: 'Outline 2x',
        content: <ButtonsPillOutline2x/>
    },
    {
        title: 'Dashed',
        content: <ButtonsPillDashed/>
    },
    {
        title: 'Gradients',
        content: <ButtonsPillGradients/>
    }
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class ButtonsPill extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Pills Buttons"
                    subheading="The pills buttons from ArchitectUI Framework have 100% rounded corners."
                    icon="pe-7s-bluetooth icon-gradient bg-deep-blue"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}