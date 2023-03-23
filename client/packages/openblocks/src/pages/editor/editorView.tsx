import { Divider, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { PreloadComp } from "comps/comps/preLoadComp";
import UIComp from "comps/comps/uiComp";
import { EditorContext } from "comps/editorState";
import { AppUILayoutType } from "constants/applicationConstants";
import { Layers } from "constants/Layers";
import { TopHeaderHeight } from "constants/style";
import { trans } from "i18n";
import { draggingUtils } from "layout";
import { LeftPreloadIcon, LeftSettingIcon, LeftStateIcon, ScrollBar } from "openblocks-design";
import { useTemplateViewMode } from "util/hooks";
import Header, { PanelStatus, TogglePanel } from "pages/common/header";
import { HelpDropdown } from "pages/common/help";
import { PreviewHeader } from "pages/common/previewHeader";
import {
  Body,
  EditorContainer,
  EditorContainerWithViewMode,
  Height100Div,
  LeftPanel,
  MiddlePanel,
} from "pages/common/styledComponent";
import {
  CustomShortcutWrapper,
  EditorGlobalHotKeys,
  EditorHotKeys,
} from "pages/editor/editorHotKeys";
import RightPanel from "pages/editor/right/RightPanel";
import EditorTutorials from "pages/tutorials/editorTutorials";
import { editorContentClassName, UserGuideLocationState } from "pages/tutorials/tutorialsConstant";
import React, { useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setEditorExternalStateAction } from "redux/reduxActions/configActions";
import { currentApplication } from "redux/selectors/applicationSelector";
import { showAppSnapshotSelector } from "redux/selectors/appSnapshotSelector";
import styled from "styled-components";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { DefaultPanelStatus, getPanelStatus, savePanelStatus } from "util/localStorageUtil";
import Bottom from "./bottom/BottomPanel";
import { LeftContent } from "./LeftContent";
import { isAggregationApp } from "util/appUtils";

const HookCompContainer = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  contain: paint;
  z-index: ${Layers.hooksCompContainer};
`;

const ViewBody = styled.div<{ hideBodyHeader?: boolean; height?: number }>`
  height: ${(props) => `calc(${
    props.height ? props.height + "px" : "100vh"
  } - env(safe-area-inset-bottom) -
      ${props.hideBodyHeader ? "0px" : TopHeaderHeight}
  )`};
`;

const SiderWrapper = styled.div`
  .ant-menu {
    background-color: #393b47;
    height: calc(100vh - 48px);

    .ant-menu-item {
      padding: 0 7px !important;
      width: 40px;
      height: 26px;
      margin: 12px 0 0 0;

      svg {
        height: 26px;
        width: 26px;
        padding: 5px;
      }

      &.ant-menu-item-selected,
      &:hover,
      &:active {
        background-color: #393b47;

        svg {
          background: #8b8fa37f;
          border-radius: 4px;
        }
      }
    }
  }

  z-index: ${Layers.leftToolbar};
`;
const HelpDiv = styled.div`
  > div {
    left: 6px;
    right: auto;
    height: 28px;
    bottom: 36px;

    > div.shortcutList {
      left: 42px;
      bottom: 2px;
    }
  }
`;
const SettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .ant-divider {
    margin: 16px 0;
    border-color: #e1e3eb;
  }
`;
const TitleDiv = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #8b8fa3;
  line-height: 14px;
  margin: 16px;
`;
const PreloadDiv = styled.div`
  margin: 16px 8px;
  height: 33px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 7px;
  color: #333;
  cursor: pointer;

  svg {
    margin-right: 8px;

    path {
      fill: #222222;
    }
  }

  &:hover,
  &:active {
    background: #f2f7fc;
    border-radius: 4px;

    svg path {
      fill: #315efb;
    }
  }
`;

export const EditorWrapper = styled.div`
  overflow: auto;
  position: relative;
  flex: 1 1 0;
`;

interface EditorViewProps {
  uiComp: InstanceType<typeof UIComp>;
  preloadComp: InstanceType<typeof PreloadComp>;
}

enum SiderKey {
  State = "state",
  Setting = "setting",
}

const items = [
  {
    key: SiderKey.State,
    icon: <LeftStateIcon />,
  },
  {
    key: SiderKey.Setting,
    icon: <LeftSettingIcon />,
  },
];

function EditorView(props: EditorViewProps) {
  const { uiComp } = props;
  const editorState = useContext(EditorContext);
  const { readOnly, hideHeader } = useContext(ExternalEditorContext);
  const application = useSelector(currentApplication);
  const locationState = useLocation<UserGuideLocationState>().state;
  const showNewUserGuide = locationState?.showNewUserGuide;
  const showAppSnapshot = useSelector(showAppSnapshotSelector);
  const [showShortcutList, setShowShortcutList] = useState(false);
  const toggleShortcutList = useCallback(
    () => setShowShortcutList(!showShortcutList),
    [showShortcutList]
  );
  const [menuKey, setMenuKey] = useState<string>(SiderKey.State);
  const [height, setHeight] = useState<number>();
  const dispatch = useDispatch();

  const [panelStatus, setPanelStatus] = useState(() => {
    return showNewUserGuide ? DefaultPanelStatus : getPanelStatus();
  });
  const [prePanelStatus, setPrePanelStatus] = useState<PanelStatus>(DefaultPanelStatus);

  const togglePanel: TogglePanel = useCallback(
    (key) => {
      let newPanelStatus;
      if (key) {
        newPanelStatus = Object.assign({}, panelStatus);
        newPanelStatus[key] = !panelStatus[key];
      } else {
        if (Object.values(panelStatus).some((value) => value)) {
          setPrePanelStatus(panelStatus);
          newPanelStatus = { left: false, bottom: false, right: false };
        } else {
          newPanelStatus = prePanelStatus;
        }
      }
      setPanelStatus(newPanelStatus);
      savePanelStatus(newPanelStatus);
    },
    [panelStatus, prePanelStatus]
  );

  const onCompDrag = useCallback(
    (dragCompKey: string) => {
      editorState.setDraggingCompType(dragCompKey);
    },
    [editorState]
  );
  const setShowPropertyPane = useCallback(
    (tabKey: string) => {
      editorState.setShowPropertyPane(tabKey === "property");
    },
    [editorState]
  );

  const hookCompViews = useMemo(() => {
    return Object.keys(editorState.getHooksComp().children).map((key) => (
      // use appId as key, remount hook comp when app change. fix hookStateComp empty value
      <div key={key + "-" + application?.applicationId}>
        {editorState.getHooksComp().children[key].getView()}
      </div>
    ));
  }, [editorState]);

  useLayoutEffect(() => {
    function updateSize() {
      setHeight(window.innerHeight);
    }

    const eventType = "orientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(eventType, updateSize);
    updateSize();
    return () => window.removeEventListener(eventType, updateSize);
  }, []);

  const hideBodyHeader = useTemplateViewMode();

  if (readOnly && hideHeader) {
    return (
      <CustomShortcutWrapper>
        {uiComp.getView()}
        <div style={{ zIndex: Layers.hooksCompContainer }}>{hookCompViews}</div>
      </CustomShortcutWrapper>
    );
  }

  if (readOnly && !showAppSnapshot) {
    return (
      <CustomShortcutWrapper>
        <Helmet>{application && <title>{application.name}</title>}</Helmet>
        {!hideBodyHeader && <PreviewHeader />}
        <EditorContainerWithViewMode>
          <ViewBody hideBodyHeader={hideBodyHeader} height={height}>
            {uiComp.getView()}
          </ViewBody>
          <div style={{ zIndex: Layers.hooksCompContainer }}>{hookCompViews}</div>
        </EditorContainerWithViewMode>
      </CustomShortcutWrapper>
    );
  }
  // history mode, display with the right panel, a little trick
  const showRight = panelStatus.right || showAppSnapshot;
  let uiCompView;
  if (showAppSnapshot) {
    uiCompView = (
      <ViewBody hideBodyHeader={hideBodyHeader} height={height}>
        <EditorContainer>{uiComp.getView()}</EditorContainer>
      </ViewBody>
    );
  } else {
    uiCompView = uiComp.getView();
  }

  const clickMenu = (params: { key: string }) => {
    let left = true;
    if (panelStatus.left && params.key === menuKey) {
      left = false;
    }
    setPanelStatus({ ...panelStatus, left });
    savePanelStatus({ ...panelStatus, left });
    setMenuKey(params.key);
  };
  const appSettingsComp = editorState.getAppSettingsComp();

  return (
    <Height100Div
      onDragEnd={(e) => {
        // log.debug("layout: onDragEnd. Height100Div");
        editorState.setDragging(false);
        draggingUtils.clearData();
      }}
    >
      <Header togglePanel={togglePanel} panelStatus={panelStatus} />
      <Helmet>{application && <title>{application.name}</title>}</Helmet>
      {showNewUserGuide && <EditorTutorials />}
      <EditorGlobalHotKeys
        disabled={readOnly}
        togglePanel={togglePanel}
        panelStatus={panelStatus}
        toggleShortcutList={toggleShortcutList}
      >
        <Body>
          <SiderWrapper>
            <Sider width={40}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[SiderKey.State]}
                selectedKeys={panelStatus.left ? [menuKey] : [""]}
                items={items}
                disabled={showAppSnapshot}
                onClick={(params) => clickMenu(params)}
              />
              {!showAppSnapshot && (
                <HelpDiv>
                  <HelpDropdown
                    showShortcutList={showShortcutList}
                    setShowShortcutList={setShowShortcutList}
                    isEdit={true}
                  />
                </HelpDiv>
              )}
            </Sider>
          </SiderWrapper>

          {panelStatus.left && (
            <LeftPanel>
              {menuKey === SiderKey.State && <LeftContent uiComp={uiComp} />}
              {menuKey === SiderKey.Setting && (
                <SettingsDiv>
                  <ScrollBar>
                    {application &&
                      !isAggregationApp(AppUILayoutType[application.applicationType]) && (
                        <>
                          {appSettingsComp.getPropertyView()}
                          <Divider />
                        </>
                      )}
                    <TitleDiv>{trans("leftPanel.toolbarTitle")}</TitleDiv>
                    {props.preloadComp.getPropertyView()}
                    <PreloadDiv
                      onClick={() =>
                        dispatch(setEditorExternalStateAction({ showScriptsAndStyleModal: true }))
                      }
                    >
                      <LeftPreloadIcon />
                      {trans("leftPanel.toolbarPreload")}
                    </PreloadDiv>
                  </ScrollBar>

                  {props.preloadComp.getJSLibraryPropertyView()}
                </SettingsDiv>
              )}
            </LeftPanel>
          )}
          <MiddlePanel>
            <EditorWrapper className={editorContentClassName}>
              <EditorHotKeys disabled={readOnly}>
                <EditorContainerWithViewMode>
                  {uiCompView}
                  <HookCompContainer>{hookCompViews}</HookCompContainer>
                </EditorContainerWithViewMode>
              </EditorHotKeys>
            </EditorWrapper>
            {panelStatus.bottom && <Bottom />}
          </MiddlePanel>
          {showRight && (
            <RightPanel
              uiComp={uiComp}
              onCompDrag={onCompDrag}
              showPropertyPane={editorState.showPropertyPane}
              onTabChange={setShowPropertyPane}
            />
          )}
        </Body>
      </EditorGlobalHotKeys>
    </Height100Div>
  );
}

export default EditorView;
