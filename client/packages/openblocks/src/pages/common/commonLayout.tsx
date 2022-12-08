import { Route, Switch, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { AppHeader } from "pages/common/header";
import { Menu } from "openblocks-design";
import history from "util/history";
import styled from "styled-components";
import * as React from "react";
import { HelpDropdown } from "pages/common/help";
import MainContent from "components/layout/MainContent";
import SideBar from "components/layout/SideBar";
import { User } from "constants/userConstants";
import { useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { getUser } from "redux/selectors/usersSelectors";
import { normalAppListSelector } from "redux/selectors/applicationSelector";
import { ApplicationMeta } from "constants/applicationConstants";
import { CNMainContent, CNSidebar, CNSidebarItem } from "constants/styleSelectors";

const SettingTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #8b8fa3;
  line-height: 14px;
  margin: 35px 0 0 0;
`;

const StyledSideMenu = styled(Menu)<{ $marginTop: number }>`
  margin-top: ${(props) => props.$marginTop}px;

  .ant-menu-item {
    width: 192px;
    height: 44px;
    padding: 15px 12px !important;
  }
`;

type SidebarItemType = {
  name: string;
  routePath: string;
  routePathExact?: boolean;
  icon?: React.ReactNode;
  visible?: (params: { user: User; applications: ApplicationMeta[] }) => boolean;
  routeComp: React.ComponentType<any>;
};

type LayoutProps = {
  id?: string;
  sidebarTitle?: string;
  sidebarItems: SidebarItemType[];
};

export function CommonLayout(props: LayoutProps) {
  const user = useSelector<AppState, User>(getUser);
  const applications = useSelector<AppState, ApplicationMeta[]>(normalAppListSelector);
  const currentPath = useLocation().pathname;
  const { sidebarTitle, sidebarItems } = props;

  const paths = sidebarItems.map((item) => item.routePath);
  const key = paths.includes(currentPath)
    ? currentPath
    : paths.find((p) => currentPath.startsWith(p));
  const menuItems = sidebarItems
    .filter((item) => {
      const { visible = () => true } = item;
      return visible({ user, applications });
    })
    .map((item) => ({
      key: item.routePath,
      icon: item.icon,
      label: item.name,
      className: CNSidebarItem,
    }));

  return (
    <Layout id={props.id}>
      <AppHeader />
      <HelpDropdown />
      <Layout>
        <SideBar className={CNSidebar} theme="light" width={240}>
          {sidebarTitle && <SettingTitle>{sidebarTitle}</SettingTitle>}
          <StyledSideMenu
            items={menuItems}
            $marginTop={sidebarTitle ? 12 : 24}
            mode="inline"
            selectedKeys={[key ?? ""]}
            onClick={(e) => currentPath !== e.key && history.push(e.key)}
          />
        </SideBar>
        <MainContent className={CNMainContent}>
          <Switch>
            {sidebarItems.map((item) => (
              <Route
                key={item.routePath}
                component={item.routeComp}
                exact={item.routePathExact ?? true}
                path={item.routePath}
              />
            ))}
          </Switch>
        </MainContent>
      </Layout>
    </Layout>
  );
}
