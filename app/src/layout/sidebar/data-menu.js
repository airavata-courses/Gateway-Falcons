import React from 'react';
import {Link} from "react-router-dom";
import { MenuItem, SidebarNestedMenu } from 'react-gentelella';

const DataMenu = () => (
    <SidebarNestedMenu icon={'windows'} label={'Data'}>
        <MenuItem>
            <Link to={"/data/location"}>Location</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/data/fitness"}>Fitness</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/data/diet"}>Diet</Link>
        </MenuItem>
    </SidebarNestedMenu>
);

export default DataMenu;
