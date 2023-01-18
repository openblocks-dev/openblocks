import { Route, Switch } from "react-router-dom";
import { Layout as AntdLayout } from "antd";
import { AppHeader } from "pages/common/header";
import * as React from "react";
import { ReactElement } from "react";
import { HelpDropdown } from "pages/common/help";
import MainContent from "components/layout/MainContent";
import SideBar from "components/layout/SideBar";
import { CNMainContent, CNSidebar } from "constants/styleSelectors";
import { SideBarSection, SideBarSectionProps } from "./SideBarSection";
import styled from "styled-components";

type LayoutProps = {
  sections: SideBarSectionProps[];
};

const SideBarV2 = styled(SideBar)`
  background-color: #f7f9fc;
  padding: 28px 10px;
  border-right: 1px solid #ebebeb;

  .sidebar-section:not(:last-child)::after {
    content: "";
    display: block;
    width: 204px;
    height: 1px;
    background-color: #ebebeb;
    margin: 0 auto 4px;
  }
`;

export function Layout(props: LayoutProps) {
  const routes: ReactElement[] = [];
  props.sections.forEach((section) => {
    section.items.forEach((item) => {
      routes.push(
        <Route
          key={item.routePath}
          component={item.routeComp}
          exact={item.routePathExact ?? true}
          path={item.routePath}
        />
      );
    });
  });

  return (
    <AntdLayout style={{ height: "100%" }}>
      <AppHeader />
      <HelpDropdown />
      <AntdLayout>
        <SideBarV2 className={CNSidebar}>
          {props.sections
            .filter((section) => section.items.length > 0)
            .map((section, index) => (
              <SideBarSection key={index} {...section} />
            ))}
        </SideBarV2>
        <MainContent className={CNMainContent}>
          <Switch>{routes} </Switch>
        </MainContent>
      </AntdLayout>
    </AntdLayout>
  );
}
