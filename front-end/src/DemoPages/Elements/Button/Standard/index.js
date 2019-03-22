import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples
import ButtonsStandardSolid from './Examples/Solid';
import ButtonsStandardOutline from './Examples/Outline';
import ButtonsStandardOutline2x from './Examples/Outline2x';
import ButtonsStandardDashed from './Examples/Dashed';
import ButtonsStandardGradients from './Examples/Gradients';

const tabsContent = [
    {
        title: 'Solid',
        content: <ButtonsStandardSolid/>
    },
    {
        title: 'Outline',
        content: <ButtonsStandardOutline/>
    },
    {
        title: 'Outline 2x',
        content: <ButtonsStandardOutline2x/>
    },
    {
        title: 'Dashed',
        content: <ButtonsStandardDashed/>
    },
    {
        title: 'Gradients',
        content: <ButtonsStandardGradients/>
    }
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class ButtonsStandard extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Standard Buttons"
                    subheading="Wide selection of buttons that feature different styles for backgrounds, borders and hover options!"
                    icon="pe-7s-plane icon-gradient bg-tempting-azure"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}