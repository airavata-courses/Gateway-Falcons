import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import LoadersBasicExample from './Examples/Basic';
import LoadersColorsExample from './Examples/Colors';
import LoadersAdvancedExample from './Examples/Advanced';

const tabsContent = [
    {
        title: 'Basic',
        content: <LoadersBasicExample/>
    },
    {
        title: 'Colors',
        content: <LoadersColorsExample/>
    },
    {
        title: 'Advanced',
        content: <LoadersAdvancedExample/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class LoadersExample extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Loading Indicators"
                    subheading="Use these loading indicators in combination with other elements to show current app status to users."
                    icon="pe-7s-moon icon-gradient bg-amy-crisp"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}