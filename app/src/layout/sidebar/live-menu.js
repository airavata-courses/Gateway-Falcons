import React from 'react';
import { Link } from "react-router-dom";
import { MenuItem, SidebarNestedMenu } from 'react-gentelella';

const LiveMenu = () => (
    <SidebarNestedMenu icon={'edit'} label={'Live'}>
        <MenuItem>
            <Link to={"login"}>Login</Link>
        </MenuItem>
        <MenuItem>
            <Link to={"/signup"}>Sign up</Link>
        </MenuItem>
    </SidebarNestedMenu>
);

export default LiveMenu;
