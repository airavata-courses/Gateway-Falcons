import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples
import ButtonsSquareSolid from './Examples/Solid';
import ButtonsSquareOutline from './Examples/Outline';
import ButtonsSquareOutline2x from './Examples/Outline2x';
import ButtonsSquareDashed from './Examples/Dashed';
import ButtonsSquareGradients from './Examples/Gradients';

const tabsContent = [
    {
        title: 'Solid',
        content: <ButtonsSquareSolid/>
    },
    {
        title: 'Outline',
        content: <ButtonsSquareOutline/>
    },
    {
        title: 'Outline 2x',
        content: <ButtonsSquareOutline2x/>
    },
    {
        title: 'Dashed',
        content: <ButtonsSquareDashed/>
    },
    {
        title: 'Gradients',
        content: <ButtonsSquareGradients/>
    }
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class ButtonsSquare extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Square Buttons"
                    subheading="Wide selection of buttons with square corners. Their styling can be added to any button combination."
                    icon="pe-7s-car icon-gradient bg-mean-fruit"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}