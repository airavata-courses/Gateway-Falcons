import React from 'react';
import {Link} from "react-router-dom";
import { MenuItem, SidebarNestedMenu } from 'react-gentelella';

const ContributeMenuItem = () => (
    <MenuItem icon={'windows'}>
            <Link to={"/contribute"}>Donate now!</Link>
    </MenuItem>
);

export default ContributeMenuItem;
