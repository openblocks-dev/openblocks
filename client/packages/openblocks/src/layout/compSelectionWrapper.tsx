import { EditorContext } from "comps/editorState";
import { UICompType } from "comps/uiCompRegistry";
import { Layers } from "constants/Layers";
import { ModulePrimaryColor, PrimaryColor } from "constants/style";
import { fadeColor } from "openblocks-design";
import { CloseEyeIcon } from "openblocks-design";
import { DragWhiteIcon } from "openblocks-design";
import { WidthDragIcon } from "openblocks-design";
import React, {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import ReactResizeDetector, { useResizeDetector } from "react-resize-detector";
import styled, { css } from "styled-components";
import { EllipsisTextCss } from "openblocks-design";
import { draggingUtils } from "./draggingUtils";
import { ResizeHandleAxis } from "./gridLayoutPropTypes";

export type DragHandleName = "w" | "e" | "nw" | "ne" | "sw" | "se";
type NamePos = "top" | "bottom" | "bottomInside";

const NameDiv = styled.div<{
  isSelected: boolean;
  position: NamePos;
  compType: UICompType;
  isDraggable: boolean;
}>`
  background: ${(props) => {
    if (props.isSelected) {
      return props.compType === "module" ? ModulePrimaryColor : PrimaryColor;
    }
    return "#B8B9BF";
  }};
  border-radius: ${(props) => (props.position === "top" ? "2px 2px 0 0" : "0 0 2px 2px")};
  font-weight: 500;
  color: #ffffff;
  position: absolute;
  font-size: 12px;
  line-height: 16px;
  top: ${(props) => (props.position === "top" ? "-16px" : "unset")};
  bottom: ${(props) =>
    props.position === "top" ? "unset" : props.position === "bottom" ? "-16px" : "0px"};
  height: 16px;
  right: 0;
  padding-right: 5px;
  padding-left: ${(props) => (props.isDraggable ? 0 : "5px")};
  display: flex;
  cursor: ${(props) => (props.isDraggable ? "grab" : "pointer")};
  z-index: 10;
`;
const NameLabel = styled.span`
  max-width: 208px;
  ${EllipsisTextCss};
`;

export const GRID_ITEM_BORDER_WIDTH = 1.5;

export function getGridItemPadding(compType: UICompType) {
  if (compType === "module") {
    return [0, 0];
  }
  return [8, 4];
}

function getLineStyle(
  hover: boolean,
  showDashLine: boolean,
  isSelected: boolean,
  compType: UICompType,
  isHidden: boolean
) {
  const isModule = compType === "module";
  const primaryColor = isModule ? ModulePrimaryColor : PrimaryColor;
  const padding = getGridItemPadding(compType);

  let borderColor = "transparent";
  let borderStyle = "solid";

  if (isSelected || hover) {
    borderColor = primaryColor;
  } else if (showDashLine) {
    borderColor = fadeColor(primaryColor, 0.5);
    borderStyle = "dashed";
  }

  return `
      border: ${GRID_ITEM_BORDER_WIDTH}px ${borderStyle} ${borderColor};
      padding: ${isHidden && !isSelected ? 0 : padding[1] - GRID_ITEM_BORDER_WIDTH}px;
      padding-left: ${padding[0] - GRID_ITEM_BORDER_WIDTH}px;
      padding-right: ${padding[0] - GRID_ITEM_BORDER_WIDTH}px;
  `;
}

// padding: ${props => props.hover || props.showDashline ? 3 : 4}px;
const SelectableDiv = styled.div<{
  hover: boolean;
  showDashLine: boolean;
  isSelected: boolean;
  compType: UICompType;
  isHidden: boolean;
  needResizeDetector: boolean;
}>`
  width: 100%;
  height: 100%;
  overflow: hidden;

  ${(props) =>
    `${getLineStyle(
      props.hover,
      props.showDashLine,
      props.isSelected,
      props.compType,
      props.isHidden
    )}`}
  & .module-wrapper {
    margin: ${-GRID_ITEM_BORDER_WIDTH}px;
  }

  ${(props) =>
    props.compType === "image" &&
    props.needResizeDetector &&
    `
    display: inline-flex;
    align-items: center;
    > div:nth-last-of-type(1)
    {
      flex-grow: 1;
    }
  `}
`;

interface DragHandleProps {
  $compType: UICompType;
  $resizeHandles: ResizeHandleAxis[];
}

const dragDisplay = (handle: ResizeHandleAxis, props: DragHandleProps) => {
  if (props.$resizeHandles.includes(handle)) {
    return "block";
  }
  return "none";
};

// draggable handles (height unchangable)
const dragIconCss = (props: DragHandleProps, handle: ResizeHandleAxis) => css`
  position: absolute;
  top: 50%;
  z-index: 1;
  pointer-events: none;
  color: ${props.$compType === "module" ? ModulePrimaryColor : PrimaryColor};
  display: ${dragDisplay(handle, props)};
`;

const DragLeftIcon = styled(WidthDragIcon)<DragHandleProps>`
  ${(props) => dragIconCss(props, "w")};
  left: -3.5px;
  transform: translate(0px, -50%);
`;

const DragRightIcon = styled(WidthDragIcon)<DragHandleProps>`
  ${(props) => dragIconCss(props, "e")};
  right: -3.5px;
  transform: translate(0px, -50%);
`;

// (height changable)
const dragCss = (props: DragHandleProps, handle: ResizeHandleAxis) => css`
  position: absolute;
  height: 8px;
  width: 8px;
  border: 1px solid ${props.$compType === "module" ? ModulePrimaryColor : PrimaryColor};
  border-radius: 2px;
  background-color: #f5f5f6;
  z-index: 11;
  pointer-events: none;
  display: ${dragDisplay(handle, props)};
`;

const dragAutoHeightCss = (props: DragHandleProps, handle: ResizeHandleAxis) => css`
  position: absolute;
  min-height: 7px;
  width: 7px;
  border: 1px solid ${props.$compType === "module" ? ModulePrimaryColor : PrimaryColor};
  border-radius: 4px;
  background-color: #f5f5f6;
  z-index: 1;
  pointer-events: none;
  display: ${dragDisplay(handle, props)};
`;

const DragW = styled.div<DragHandleProps>`
  ${(props) => dragAutoHeightCss(props, "w")};
  left: -2.5px;
  top: 50%;
  transform: translate(0px, -50%);
`;
const DragE = styled.div<DragHandleProps>`
  ${(props) => dragAutoHeightCss(props, "e")};
  right: -2.5px;
  top: 50%;
  transform: translate(0px, -50%);
`;
const DragNW = styled.div<DragHandleProps>`
  ${(props) => dragCss(props, "nw")};
  left: -2.5px;
  top: -2.5px;
`;
const DragNE = styled.div<DragHandleProps>`
  ${(props) => dragCss(props, "ne")};
  right: -2.5px;
  top: -2.5px;
`;
const DragSW = styled.div<DragHandleProps>`
  ${(props) => dragCss(props, "sw")};
  left: -2.5px;
  bottom: -2.5px;
`;
const DragSE = styled.div<DragHandleProps>`
  ${(props) => dragCss(props, "se")};
  right: -2.5px;
  bottom: -2.5px;
`;

const HiddenIcon = styled(CloseEyeIcon)`
  g g {
    fill: #f5f5f6;
  }
`;

export const CompSelectionWrapper = (props: {
  id?: string;
  compType: UICompType;
  className?: string;
  style?: Record<string, any>;
  isSelected: boolean;
  autoHeight: boolean;
  placeholder?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: JSX.Element | React.ReactNode;
  hidden: boolean;
  nameConfig: {
    show: boolean;
    name: string | undefined;
    pos: NamePos;
  };
  onInnerResize: (width?: number, height?: number) => void;
  onWrapperResize: (width?: number, height?: number) => void;
  isSelectable: boolean;
  isDraggable: boolean;
  isResizable: boolean;
  resizeHandles: ResizeHandleAxis[];
  resizeIconSize: "small" | "normal";
}) => {
  const nameDivRef = useRef<HTMLDivElement>(null);
  const editorState = useContext(EditorContext);
  let [hover, setHover] = useState(false);
  const onMouseOver = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      // log.debug("onMouseOver. name: ", props.name, " hover: ", hover, " relateTarget: ", e.relatedTarget, " target: ", e.target);
      if (draggingUtils.isDragging()) return; // no hover when dragging
      // don't handle mouse events when moving from nameDiv
      let relatedTarget = e.relatedTarget;
      while (relatedTarget) {
        if (relatedTarget === nameDivRef.current) return;
        relatedTarget = (relatedTarget as any).parentNode;
      }
      setHover(true);
    },
    [setHover]
  );
  const onMouseOut = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      // log.debug("onMouseOut. name: ", props.name, " hover: ", hover, " relateTarget: ", e.relatedTarget, " target: ", e.target);
      // don't handle events moving to nameDiv
      let relatedTarget = e.relatedTarget;
      while (relatedTarget) {
        if (relatedTarget === nameDivRef.current) return;
        relatedTarget = (relatedTarget as any).parentNode;
      }
      setHover(false);
    },
    [setHover]
  );

  const selectableDivProps = props.isSelectable
    ? {
        onMouseOver,
        onMouseOut,
        onClick: props.onClick,
        hover: hover,
        showDashLine: editorState.showGridLines() || props.hidden,
        isSelected: props.isSelected,
        isHidden: props.hidden,
      }
    : {
        hover: false,
        showDashLine: false,
        isSelected: false,
        isHidden: false,
      };

  const zIndex = props.isSelected
    ? Layers.compSelected
    : hover
    ? Layers.compHover
    : props.hidden
    ? Layers.compHidden
    : undefined;

  const needResizeDetector = props.autoHeight && !props.placeholder;
  const { ref: wrapperRef } = useResizeDetector({
    onResize: props.onWrapperResize,
    handleHeight: needResizeDetector,
    handleWidth: false,
  });
  // log.debug("CompSelectionWrapper. name: ", props.name, " zIndex: ", zIndex);
  const { nameConfig, resizeIconSize } = props;
  return (
    <div id={props.id} style={{ ...props.style, zIndex }} className={props.className}>
      <SelectableDiv
        {...selectableDivProps}
        compType={props.compType}
        ref={wrapperRef}
        needResizeDetector={needResizeDetector}
      >
        {props.isSelectable && nameConfig.show && (hover || props.isSelected || props.hidden) && (
          <NameDiv
            compType={props.compType}
            isSelected={hover || props.isSelected}
            position={nameConfig.pos}
            isDraggable={props.isDraggable}
            ref={nameDivRef}
          >
            {props.isDraggable && <DragWhiteIcon />}
            <NameLabel>{nameConfig.name}</NameLabel>
            {props.hidden && <HiddenIcon />}
          </NameDiv>
        )}
        {props.isResizable &&
          props.isSelected &&
          props.autoHeight &&
          (resizeIconSize === "normal" ? (
            <>
              <DragLeftIcon $compType={props.compType} $resizeHandles={props.resizeHandles} />
              <DragRightIcon $compType={props.compType} $resizeHandles={props.resizeHandles} />
            </>
          ) : (
            <>
              <DragE $compType={props.compType} $resizeHandles={props.resizeHandles} />
              <DragW $compType={props.compType} $resizeHandles={props.resizeHandles} />
            </>
          ))}
        {props.isResizable && props.isSelected && !props.autoHeight && (
          <>
            <DragNW $compType={props.compType} $resizeHandles={props.resizeHandles} />
            <DragNE $compType={props.compType} $resizeHandles={props.resizeHandles} />
            <DragSW $compType={props.compType} $resizeHandles={props.resizeHandles} />
            <DragSE $compType={props.compType} $resizeHandles={props.resizeHandles} />
          </>
        )}
        {!needResizeDetector && props.children}
        {needResizeDetector && (
          <ReactResizeDetector
            onResize={props.onInnerResize}
            observerOptions={{ box: "border-box" }}
          >
            <div>{props.children}</div>
          </ReactResizeDetector>
        )}
      </SelectableDiv>
    </div>
  );
};
