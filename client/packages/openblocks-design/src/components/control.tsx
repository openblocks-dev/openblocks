import { ToolTipLabel } from "./toolTip";
import styled, { css } from "styled-components";
import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  labelStyle?: React.CSSProperties;
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
    labelStyle,
  } = props;

  return (
    <Wrapper layout={layout} placement={placement}>
      {label && (
        <LabelWrapper
          layout={layout}
          placement={placement}
          labelEllipsis={labelEllipsis}
          style={labelStyle}
        >
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

export const SearchTextContext = React.createContext("");

const OnMatchContext = React.createContext<(() => void) | undefined>(undefined);

function MatchWrapper(props: { children: ReactNode }) {
  const onMatch = useContext(OnMatchContext);
  useEffect(() => {
    onMatch?.();
  }, [onMatch]);
  return <OnMatchContext.Provider value={undefined}>{props.children}</OnMatchContext.Provider>;
}

function SearchChildWrapper(props: { children: (hasChildMatch: boolean) => ReactNode }) {
  const searchText = useContext(SearchTextContext);
  const [matchText, setMatchText] = useState("");
  const onMatch = useContext(OnMatchContext);
  return (
    <OnMatchContext.Provider
      value={() => {
        onMatch?.();
        setMatchText(searchText);
      }}
    >
      {props.children(matchText === searchText)}
    </OnMatchContext.Provider>
  );
}

const ForceShowContext = React.createContext(false);

function ControlItemWrapper(props: {
  filterText: string;
  searchChild?: boolean;
  children: ReactNode;
}) {
  const { filterText, searchChild, children } = props;
  const searchText = useContext(SearchTextContext);
  const forceShow = useContext(ForceShowContext);
  if (!searchText) {
    return <>{props.children}</>;
  }
  if (filterText.toLowerCase().includes(searchText.toLowerCase())) {
    return (
      <MatchWrapper>
        {!searchChild ? (
          <SearchTextContext.Provider value="">{children}</SearchTextContext.Provider>
        ) : (
          <SearchChildWrapper>
            {(hasChildMatch) => (
              <ForceShowContext.Provider value={!hasChildMatch}>
                {children}
              </ForceShowContext.Provider>
            )}
          </SearchChildWrapper>
        )}
      </MatchWrapper>
    );
  }
  if (!searchChild) {
    return forceShow ? (
      <SearchTextContext.Provider value="">{children}</SearchTextContext.Provider>
    ) : null;
  }
  return (
    <SearchChildWrapper>
      {(hasChildMatch) =>
        hasChildMatch || forceShow ? children : <div style={{ display: "none" }}>{children}</div>
      }
    </SearchChildWrapper>
  );
}

export type ControlItemData = {
  filterText?: ReactNode;
  searchChild?: boolean;
};
export type ControlItem = ReactElement & { __control__: true };
// extends ReactNode
export type ControlNode = ControlItem | ControlNode[] | boolean | undefined | "";

export function controlItem(data: ControlItemData, propertyView: ReactElement): ControlItem {
  const { filterText, searchChild } = data;
  const item = (
    <ControlItemWrapper
      filterText={typeof filterText === "string" ? filterText : ""}
      searchChild={searchChild}
      key={propertyView.key ?? (typeof filterText === "string" ? filterText : null)}
    >
      {propertyView}
    </ControlItemWrapper>
  );
  return { ...item, __control__: true };
}

// ControlPropertyViewWrapper to ControlItem
export function wrapperToControlItem(controlPropertyViewWrapper: ReactElement) {
  const { label } = controlPropertyViewWrapper.props as ControlPropertyViewWrapperProps;
  return controlItem({ filterText: label }, controlPropertyViewWrapper);
}
