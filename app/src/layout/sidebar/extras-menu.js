import React from 'react';
import {Link} from "react-router-dom";
import { MenuItem, SidebarNestedMenu } from 'react-gentelella';

const ExtrasMenu = () => (
    <SidebarNestedMenu icon={'windows'} label={'Data'}>
        <MenuItem>
            <Link to={"/data/diet"}>Diet</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/data/fitness"}>Fitness</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/data/media"}>Media</Link>
        </MenuItem>
    </SidebarNestedMenu>
);

export default ExtrasMenu;
