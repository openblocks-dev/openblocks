import { ToolTipLabel } from "./toolTip";
import styled, { css } from "styled-components";
import { PropsWithChildren, ReactNode } from "react";

type ControlLayout = "horizontal" | "vertical"; // set propertyView's layout, default horizontal;
type ControlPlacement = "bottom" | "right" | "modal"; // set propertyView's position, default right;

// place common comps of control comps

const Wrapper = styled.div<{
  layout: ControlLayout;
  placement: ControlPlacement;
}>`
  width: 100%;
  ${(props) => {
    switch (props.layout) {
      case "horizontal":
        return css`
          display: flex;
          flex-direction: row;
          align-items: ${props.placement === "bottom" ? "baseline" : "center"};
          justify-content: space-between;
        `;
      case "vertical":
        return css`
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;

          &:first-child {
            margin: 0;
          }
        `;
      default:
        return css``;
    }
  }}
`;

function getWidth(placement: ControlPlacement) {
  switch (placement) {
    case "right":
      return 96;
    case "bottom":
      return 112;
    default:
      return 136;
  }
}

const LabelWrapper = styled.div<{
  layout: ControlLayout;
  placement: ControlPlacement;
  labelEllipsis?: boolean;
}>`
  ${(props) => {
    switch (props.layout) {
      case "horizontal":
        return css`
          flex: 0 0 ${getWidth(props.placement)}px;
        `;
      case "vertical":
        return css`
          display: block;
        `;
    }
  }}
  ${(props) => {
    if (props.labelEllipsis && props.layout === "horizontal") {
      return css`
        .tooltipLabel {
          width: ${getWidth(props.placement)}px;
          padding-right: 2px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      `;
    }
  }}
`;
const ChildrenWrapper = styled.div<{ layout: ControlLayout }>`
  min-width: 0;
  ${(props) => {
    switch (props.layout) {
      case "horizontal":
        return `
            flex:1 1 auto;
          `;
      case "vertical":
        return css`
          display: inline;
        `;
    }
  }}
`;

const LastNode = styled.div`
  margin-left: 8px;
  display: inline-flex;
  align-items: center;

  .ant-select-selection-item {
    width: 40px;
  }
`;

interface ControlPropertyViewWrapperProps {
  key?: string;
  label?: ReactNode;
  tooltip?: ReactNode;
  width?: string;
  layout?: ControlLayout;
  labelEllipsis?: boolean;
  placement?: ControlPlacement;
  lastNode?: ReactNode;
  preInputNode?: ReactNode;
  childrenWrapperStyle?: React.CSSProperties;
  labelTooltipOverlayInnerStyle?: React.CSSProperties;
  extraChildren?: ReactNode;
}

export const ControlPropertyViewWrapper = (
  props: PropsWithChildren<ControlPropertyViewWrapperProps>
) => {
  const {
    tooltip,
    label,
    layout = "horizontal",
    placement = "right",
    childrenWrapperStyle,
    labelEllipsis,
    preInputNode,
    children,
    extraChildren,
    labelTooltipOverlayInnerStyle,
    lastNode,
  } = props;

  return (
    <Wrapper layout={layout} placement={placement}>
      {label && (
        <LabelWrapper layout={layout} placement={placement} labelEllipsis={labelEllipsis}>
          <ToolTipLabel
            title={tooltip}
            label={label}
            overlayInnerStyle={labelTooltipOverlayInnerStyle}
          />
        </LabelWrapper>
      )}
      {preInputNode}
      <ChildrenWrapper style={childrenWrapperStyle} layout={layout}>
        {children}
        {extraChildren}
      </ChildrenWrapper>
      {lastNode && <LastNode>{lastNode}</LastNode>}
    </Wrapper>
  );
};
