import React, {Component, Fragment} from 'react';
import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import CommerceDashboard1 from './Examples/Variation1';
import CommerceDashboard2 from './Examples/Variation2';

const tabsContent = [
    {
        title: 'Variation 1',
        content: <CommerceDashboard1/>
    },
    {
        title: 'Variation 2',
        content: <CommerceDashboard2/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class CommerceDashboard extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Commerce Dashboard"
                    subheading="This dashboard was created as an example of the flexibility that ArchitectUI offers."
                    icon="pe-7s-graph icon-gradient bg-ripe-malin"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        )
    }
}
