import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import PopoversExample from './Examples/Popovers/';
import TooltipsExample from './Examples/Tooltips/';

const tabsContent = [
    {
        title: 'Popovers',
        content: <PopoversExample/>
    },
    {
        title: 'Tooltips',
        content: <TooltipsExample/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class TooltipsPopoversExample extends React.Component {

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Tooltips & Popovers"
                    subheading="These React components are used to add interaction or extra information for your app's content."
                    icon="pe-7s-note2 icon-gradient bg-happy-fisher"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}