import React, {Fragment} from 'react'

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples

import FormDropdownExample from './Examples/Dropdown/';
import FormComboboxExample from './Examples/Combobox/';

const tabsContent = [
    {
        title: 'Dropdown',
        content: <FormDropdownExample/>
    },
    {
        title: 'Combobox',
        content: <FormComboboxExample/>
    },


];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

class FormDropdown extends React.Component {

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Form Dropdowns"
                    subheading="Widgets that help you build good looking react dropdown menus, easily."
                    icon="pe-7s-volume1 icon-gradient bg-plum-plate"
                />
                <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
            </Fragment>
        )
    }
}

export default FormDropdown;