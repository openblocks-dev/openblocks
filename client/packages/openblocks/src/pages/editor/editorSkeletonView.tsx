import Header from "pages/common/header";
import React from "react";
import {
  Body,
  EditorContainer,
  Height100Div,
  LeftPanel,
  MiddlePanel,
} from "pages/common/styledComponent";
import { getPanelStatus, getPanelStyle } from "util/localStorageUtil";
import { BottomSkeleton } from "pages/editor/bottom/BottomContent";
import RightPanel from "pages/editor/right/RightPanel";
import _ from "lodash";
import styled from "styled-components";
import { Skeleton, Spin } from "antd";
import { useTemplateViewMode, useUserViewMode } from "util/hooks";
import { ProductLoading } from "components/ProductLoading";

const StyledSkeleton = styled(Skeleton)`
  padding: 16px;
`;

const StyledSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f6;
  height: 100%;
`;

const SiderStyled = styled.div`
  height: calc(100vh - 48px);
  width: 40px;
  background-color: #373945;
`

export const EditorLoadingSpin = (props: { height?: string | number }) => {
  const { height = "100vh" } = props;
  return (
    <div style={{ height: height }}>
      <StyledSpin />
    </div>
  );
};

export default function EditorSkeletonView() {
  const panelStatus = getPanelStatus();
  const panelStyle = getPanelStyle();
  const isUserViewMode = useUserViewMode();
  const isTemplate = useTemplateViewMode();

  if (isUserViewMode) {
    return <ProductLoading hideHeader={isTemplate} />;
  }

  return (
    <>
      <Height100Div>
        <Header panelStatus={panelStatus} togglePanel={_.noop} />
        <Body>
          <SiderStyled />
          {panelStatus.left && (
            <LeftPanel>
              <StyledSkeleton active paragraph={{ rows: 10 }} />
            </LeftPanel>
          )}
          <MiddlePanel>
            <EditorContainer>
              <EditorLoadingSpin />
            </EditorContainer>
            {panelStatus.bottom && (
              <div style={{ height: panelStyle.bottom.h + "px" }}>
                <BottomSkeleton />
              </div>
            )}
          </MiddlePanel>
          {panelStatus.right && (
            <RightPanel showPropertyPane={false} onCompDrag={_.noop} onTabChange={_.noop} />
          )}
        </Body>
      </Height100Div>
    </>
  );
}
