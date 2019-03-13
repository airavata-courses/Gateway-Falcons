import React from 'react';
import { MenuItem, ProfileQuickInfo, Sidebar as GtSidebarTitle, SidebarFooter, SidebarFooterMenuItem, SidebarMenu, SidebarMenuSection } from 'react-gentelella';
import { Link } from "react-router-dom";
import Contribute from './sidebar/contribute-menu-item';
import Experience from './sidebar/experience-menu-item';
import SidebarTitle from './sidebar/sidebar-title';
import UiElements from "./sidebar/ui-elements-menu";

const elem = document.documentElement;

const openFullscreen = () => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
};

const Sidebar = () => (
  <GtSidebarTitle>

    <SidebarTitle />

    {/* <ProfileQuickInfo name="Jane Doe" picture='https://randomuser.me/api/portraits/women/44.jpg' /> */}

    <SidebarMenu>

      <SidebarMenuSection>
        <MenuItem>
          <Link to={"/live"}>Live</Link>
        </MenuItem>
        {/* <MenuItem>
          <Link to={"/login"}>Login</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/signup"}>Sign up</Link>
        </MenuItem> */}
      </SidebarMenuSection>

      <SidebarMenuSection title={"Journey"}>
        <MenuItem>
          <Link to={"/about"}>About</Link>
        </MenuItem>
        {/* <MenuItem>
          <Link to={"/story"}>Story</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/mission"}>Mission</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/research"}>Research</Link>
        </MenuItem> */}
      </SidebarMenuSection>

      {/* <SidebarMenuSection title={"Keep up"}>
        <UiElements />
      </SidebarMenuSection> */}

      <SidebarMenuSection title={"Data"}>
        <MenuItem>
          <Link to={"/data/location"}>Location</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/data/fitness"}>Fitness</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/data/diet"}>Diet</Link>
        </MenuItem>
      </SidebarMenuSection>

      <SidebarMenuSection title={"Experience"}>
        <Experience />
      </SidebarMenuSection>

      <SidebarMenuSection title={"Help Contribute"}>
        <Contribute />
      </SidebarMenuSection>


    </SidebarMenu>
    <SidebarFooter>
      <SidebarFooterMenuItem title={'Settings'} />
      <SidebarFooterMenuItem onclick={() => { openFullscreen() }} title={'FullScreen'} glyphIcon={'fullscreen'} />
      <SidebarFooterMenuItem title={'Lock'} glyphIcon={'eye-close'} />
      <SidebarFooterMenuItem title={'Logout'} glyphIcon={'off'} />
    </SidebarFooter>
  </GtSidebarTitle>
);

export default Sidebar;
