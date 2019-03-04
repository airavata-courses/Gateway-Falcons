import React from 'react';
import { Link } from "react-router-dom";
import { MenuItem, SidebarNestedMenu } from 'react-gentelella';

const JourneyMenu = () => (
    <SidebarNestedMenu icon={'edit'} label={'Journey'}>
        <MenuItem>
            <Link to={"/about"}>About</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/story"}>Story</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/mission"}>Mission</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/research"}>Research</Link>
        </MenuItem>
    </SidebarNestedMenu>
);

export default JourneyMenu;
