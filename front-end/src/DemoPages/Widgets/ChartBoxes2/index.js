import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import Basic2Example from './Examples/Basic';
import Colors2Example from './Examples/Colors';

const tabsContent = [
    {
        title: 'Basic',
        content: <Basic2Example/>
    },
    {
        title: 'Colors',
        content: <Colors2Example/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class WidgetsChartBoxes2 extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Chart Boxes II"
                    subheading="Unlimited styles are available for our chart boxes. Check out our dashboard examples for more."
                    icon="pe-7s-plug icon-gradient bg-arielle-smile"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}