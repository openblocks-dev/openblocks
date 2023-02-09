import React, { CSSProperties } from "react";
import styled from "styled-components";

import { message } from "antd";
import { CommonGrayLabel, EmptyDataIcon } from "openblocks-design";
import { Layers } from "constants/Layers";
import _ from "lodash";
import { useResizeDetector } from "react-resize-detector";
import { EditorContainerPadding, TopHeaderHeight } from "constants/style";
import { trans } from "i18n";

export const Height100Div = styled.div`
  height: 100%;
`;
export const Body = styled.div`
  height: calc(100vh - ${TopHeaderHeight});
  background: #f1f2f5;
  display: flex;
`;
const Card = ({ className, children }: any) => <div className={className}>{children}</div>;

const StyledCard = styled(Card)`
  width: 289px;
  height: 100%;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 2px;
  border-right: 1px solid #e1e3eb;
`;
const RightStyledCard = styled(Card)`
  width: 313px;
  height: 100%;
  background: #ffffff;
  box-sizing: border-box;
  border-left: 1px solid #e1e3eb;
  display: flex;
  flex-direction: column;
`;

export const LeftPanel = styled(StyledCard)`
  display: block;
`;
export const RightPanelWrapper = styled(RightStyledCard)`
  display: flex;
  overflow: hidden;
  z-index: ${Layers.rightPanel};
`;
export const EditorContainerWithViewMode = styled.div`
  height: 100%;

  div {
    ::-webkit-scrollbar {
      width: 16px;
    }
  }

  div {
    ::-webkit-scrollbar-thumb {
      border: 5px solid transparent;
      background-clip: content-box;
      border-radius: 9999px;
      background-color: rgba(139, 143, 163, 0.2);
      min-height: 30px;
    }
  }

  div {
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(139, 143, 163, 0.5);
    }
  }
`;
export const EditorContainer = styled.div`
  height: 100%;
  background: #e1e3eb;
  box-sizing: border-box;
  border-radius: 2px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  outline: none;
  padding: ${EditorContainerPadding};
  padding-right: 0;
  scrollbar-gutter: stable;

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.2);
    min-height: 30px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.5);
  }
`;

export const StyledLink = styled.a`
  color: #4965f2;

  :hover {
    color: #315efb;
  }
`;
//align-items: "center";
export const MiddlePanel = styled.div`
  display: flex;
  flex: 1 1 0;
  height: 100%;
  outline: none;
  overflow: hidden;
  user-select: text;
  bottom: 0;
  flex-direction: column;
  min-height: 100%;
  top: 0;
  width: 100%;
  background-color: #e1e3eb;
`;

const EmptyContentWrapper = styled.div`
  width: 100%;
  height: 159px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const EmptyContent = (props: {
  className?: string;
  style?: CSSProperties;
  text?: string;
}) => {
  const { text = trans("emptyContent") } = props;
  return (
    <EmptyContentWrapper style={props.style} className={props.className}>
      <EmptyDataIcon />
      <CommonGrayLabel style={{ marginTop: "12px" }}>{text}</CommonGrayLabel>
    </EmptyContentWrapper>
  );
};

const ReadOnlyMaskDiv = styled.div`
  position: absolute;
  z-index: 3;
  pointer-events: all;
  height: 100%;
  cursor: not-allowed;
`;
const readOnlyWarn = _.throttle(() => message.warn(trans("header.editError")), 3000, {
  leading: true,
  trailing: false,
});

export const ReadOnlyMask = (props: {
  children: JSX.Element | React.ReactNode;
  readOnly: boolean;
}) => {
  const { width, ref } = useResizeDetector({ handleHeight: false });
  if (!props.readOnly) {
    return <>{props.children}</>;
  }
  return (
    <div ref={ref}>
      <ReadOnlyMaskDiv onClick={readOnlyWarn} style={{ width: width }} />
      {props.children}
    </div>
  );
};
