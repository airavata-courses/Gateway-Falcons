import React from 'react';
import {Link} from "react-router-dom";
import { MenuItem, SidebarNestedMenu } from 'react-gentelella';

// <SidebarNestedMenu icon={'windows'} label={'Experience'}>
const ExperienceMenuItem = () => (
    <MenuItem icon={'windows'}>
        {/* <a href={"https://johnschwenck.smugmug.com"}>Media</a> */}
        <Link to={"/data/media"} > Media </Link>
    </MenuItem>
);
{/* </SidebarNestedMenu> */}

export default ExperienceMenuItem;
