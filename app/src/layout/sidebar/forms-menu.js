import React from 'react';
import { Link } from "react-router-dom";
import { MenuItem, SidebarNestedMenu } from 'react-gentelella';

// TODO: Change Name to Live Menu
const FormsMenu = () => (
  <SidebarNestedMenu icon={'edit'} label={'Live??'}>
    <MenuItem>
      <Link to={"/live"}>Live</Link>
    </MenuItem>
    <MenuItem>
      <Link to={"/location"}>Location</Link>
    </MenuItem>
  </SidebarNestedMenu>
);

export default FormsMenu;
