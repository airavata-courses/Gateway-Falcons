import React from 'react';
import {
  Sidebar as GtSidebarTitle, SidebarFooter, SidebarFooterMenuItem, ProfileQuickInfo,
  SidebarMenuSection, SidebarMenu
} from 'react-gentelella';
import MultilevelMenu from "./sidebar/multilevel-menu";
import ExtrasMenu from "./sidebar/extras-menu";
import UiElements from "./sidebar/ui-elements-menu";
import FormsMenu from './sidebar/forms-menu'
import SidebarTitle from './sidebar/sidebar-title'

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
        <SidebarTitle/>
        <ProfileQuickInfo name="Jane Doe" picture='https://randomuser.me/api/portraits/women/44.jpg' />
      <SidebarMenu>
          <SidebarMenuSection title={"Keep up"}>
              <FormsMenu/>
              <UiElements/>
          </SidebarMenuSection>

          <SidebarMenuSection title={"Catch up"}>
              <ExtrasMenu/>
          </SidebarMenuSection>

          <SidebarMenuSection title={"Join up"}>
              <ExtrasMenu/>
          </SidebarMenuSection>

      </SidebarMenu>
        <SidebarFooter>
            <SidebarFooterMenuItem title={'Settings'} />
            <SidebarFooterMenuItem onclick={ () => {openFullscreen()} } title={'FullScreen'} glyphIcon={'fullscreen'} />
            <SidebarFooterMenuItem title={'Lock'} glyphIcon={'eye-close'} />
            <SidebarFooterMenuItem title={'Logout'} glyphIcon={'off'} />
        </SidebarFooter>
    </GtSidebarTitle>
);

export default Sidebar;
