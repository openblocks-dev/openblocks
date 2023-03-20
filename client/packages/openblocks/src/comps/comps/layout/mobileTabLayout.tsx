import { MultiCompBuilder, withViewFn } from "comps/generators";
import { trans } from "i18n";
import { Section } from "components/Section";
import { manualOptionsControl } from "comps/controls/optionsControl";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { IconControl } from "comps/controls/iconControl";
import styled from "styled-components";
import React, { Suspense, useContext, useState } from "react";
import { registerLayoutMap } from "comps/comps/uiComp";
import { AppSelectComp } from "comps/comps/layout/appSelectComp";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { ConstructorToComp } from "openblocks-core";
import { CanvasContainer } from "comps/comps/gridLayoutComp/canvasView";
import { CanvasContainerID } from "constants/domLocators";
import { EditorContainer, EmptyContent } from "pages/common/styledComponent";
import { Layers } from "constants/Layers";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { Skeleton } from "antd";
import { hiddenPropertyView } from "comps/utils/propertyUtils";

const TabBar = React.lazy(() => import("antd-mobile/es/components/tab-bar"));
const TabBarItem = React.lazy(() =>
  import("antd-mobile/es/components/tab-bar/tab-bar").then((module) => ({
    default: module.TabBarItem,
  }))
);

const TabBarHeight = 56;
const MaxWidth = 450;
const AppViewContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  max-width: inherit;
  overflow: auto;
  height: 100%;
`;

const TabLayoutViewContainer = styled.div`
  margin: 0 auto;
  max-width: ${MaxWidth}px;
  position: relative;
  height: calc(100% - ${TabBarHeight}px);
`;

const TabBarWrapper = styled.div<{ readOnly: boolean }>`
  max-width: inherit;
  background: white;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: ${(props) => (props.readOnly ? "100%" : "418px")};
  z-index: ${Layers.tabBar};
  padding-bottom: env(safe-area-inset-bottom, 0);

  .adm-tab-bar-wrap {
    overflow: auto;
    height: ${TabBarHeight}px;
  }
`;

type TabBarProps = {
  tabs: Array<{
    title: string;
    icon?: React.ReactNode;
    key: number | string;
  }>;
  selectedKey: string;
  onChange: (key: string) => void;
  readOnly: boolean;
};

function TabBarView(props: TabBarProps) {
  return (
    <Suspense fallback={<Skeleton />}>
      <TabBarWrapper readOnly={props.readOnly}>
        <TabBar
          onChange={(key: string) => {
            if (key) {
              props.onChange(key);
            }
          }}
          style={{ width: "100%" }}
          activeKey={props.selectedKey}
        >
          {props.tabs.map((tab) => {
            return <TabBarItem key={tab.key} icon={tab.icon} title={tab.title} />;
          })}
        </TabBar>
      </TabBarWrapper>
    </Suspense>
  );
}

const TabOptionComp = (function () {
  return new MultiCompBuilder(
    {
      app: AppSelectComp,
      label: StringControl,
      icon: IconControl,
      hidden: BoolCodeControl,
    },
    (props) => {
      return props;
    }
  )
    .setPropertyViewFn((children, dispatch) => {
      return (
        <>
          {children.app.propertyView({})}
          {children.label.propertyView({ label: trans("label") })}
          {hiddenPropertyView(children)}
          {children.icon.propertyView({
            label: trans("icon"),
            tooltip: trans("aggregation.iconTooltip"),
          })}
        </>
      );
    })
    .build();
})();

let MobileTabLayoutTmp = (function () {
  const childrenMap = {
    tabs: manualOptionsControl(TabOptionComp, {
      initOptions: [
        { label: trans("optionsControl.optionI", { i: 1 }), icon: "/icon:solid/1" },
        { label: trans("optionsControl.optionI", { i: 2 }), icon: "/icon:solid/2" },
        { label: trans("optionsControl.optionI", { i: 3 }), icon: "/icon:solid/3" },
      ],
    }),
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return null;
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={trans("aggregation.tabBar")}>{children.tabs.propertyView({})}</Section>
        </>
      );
    })
    .build();
})();

MobileTabLayoutTmp = withViewFn(MobileTabLayoutTmp, (comp) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { readOnly } = useContext(ExternalEditorContext);
  const tabViews = (
    comp.children.tabs.children.manual.getView() as unknown as Array<
      ConstructorToComp<typeof TabOptionComp>
    >
  ).filter((tab) => !tab.children.hidden.getView());
  const currentTab = tabViews[tabIndex];
  const appView = (currentTab &&
    currentTab.children.app.getAppId() &&
    currentTab.children.app.getView()) || (
    <EmptyContent
      text={readOnly ? "" : trans("aggregation.emptyTabTooltip")}
      style={{ height: "100%", backgroundColor: "white" }}
    />
  );

  const tabBarView = (
    <TabBarView
      tabs={tabViews.map((tab, index) => ({
        key: index,
        title: tab.children.label.getView(),
        icon: tab.children.icon.toJsonValue() ? tab.children.icon.getView() : undefined,
      }))}
      selectedKey={tabIndex + ""}
      onChange={(key) => setTabIndex(Number(key))}
      readOnly={!!readOnly}
    />
  );

  if (readOnly) {
    return (
      <TabLayoutViewContainer>
        <AppViewContainer>{appView}</AppViewContainer>
        {tabBarView}
      </TabLayoutViewContainer>
    );
  }

  return (
    <CanvasContainer maxWidth={MaxWidth} id={CanvasContainerID}>
      <EditorContainer>{appView}</EditorContainer>
      {tabBarView}
    </CanvasContainer>
  );
});

export class MobileTabLayout extends MobileTabLayoutTmp {
  getAllCompItems() {
    return {};
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    return {};
  }
}

registerLayoutMap({ compType: "mobileTabLayout", comp: MobileTabLayout });
