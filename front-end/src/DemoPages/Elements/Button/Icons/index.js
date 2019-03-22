import React, {Fragment} from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples
import ButtonsHorizontalIcons from './Examples/Horizontal';
import ButtonsVerticalIcons from './Examples/Vertical';

const tabsContent = [
    {
        title: 'Horizontal Icons',
        content: <ButtonsHorizontalIcons/>
    },
    {
        title: 'Vertical Icons',
        content: <ButtonsVerticalIcons/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class ButtonsIcons extends React.Component {

    render() {

        return (
            <Fragment>
                <PageTitle
                    heading="Buttons with Icons"
                    subheading="These buttons examples contain icons with or without labels attached."
                    icon="pe-7s-hourglass icon-gradient bg-ripe-malin"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        );
    }
}