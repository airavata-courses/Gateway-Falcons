import React, {Component, Fragment} from 'react';
import Tabs from 'react-responsive-tabs';

import PageTitleAlt2 from '../../../Layout/AppMain/PageTitleAlt2';

// Examples
import CRMDashboard1 from './Examples/Variation1';
import CRMDashboard2 from './Examples/Variation2';

const tabsContent = [
    {
        title: 'Variation 1',
        content: <CRMDashboard2/>
    },
    {
        title: 'Variation 2',
        content: <CRMDashboard1/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class CRMDashboard extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Fragment>
                <PageTitleAlt2
                    heading="CRM Dashboard"
                    subheading="Yet another dashboard built using only the included Architech elements and components."
                    icon="pe-7s-graph icon-gradient bg-ripe-malin"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        )
    }
}
