import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import TimelineDotBadge from './Examples/DotBadge';
import TimelineIconBadge from './Examples/IconBadge';
import TimelineScrollable from './Examples/ScrollableTimeline';

const tabsContent = [
    {
        title: 'Dot Badges',
        content: <TimelineDotBadge/>
    },
    {
        title: 'Icon Badges',
        content: <TimelineIconBadge/>
    },
    {
        title: 'Scrollable Timelines',
        content: <TimelineScrollable/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class TimelineExample extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Timelines"
                    subheading="Timelines are used to show lists of notifications, tasks or actions in a beautiful way."
                    icon="pe-7s-light icon-gradient bg-malibu-beach"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}