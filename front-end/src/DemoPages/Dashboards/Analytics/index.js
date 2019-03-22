import React, {Component, Fragment} from 'react';
import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import AnalyticsDashboard1 from './Examples/Variation1';
import AnalyticsDashboard2 from './Examples/Variation2';

const tabsContent = [
    {
        title: 'Variation 1',
        content: <AnalyticsDashboard1/>
    },
    {
        title: 'Variation 2',
        content: <AnalyticsDashboard2/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class AnalyticsDashboard extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Analytics Dashboard"
                    subheading="This is an example dashboard created using build-in elements and components."
                    icon="pe-7s-car icon-gradient bg-mean-fruit"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        )
    }
}
