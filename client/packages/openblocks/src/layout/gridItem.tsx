import clsx from "clsx";
import _ from "lodash";
import { UICompType } from "comps/uiCompRegistry";
import React, {
  DragEvent,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { TransparentImg } from "../util/commonUtils";
import { calcGridItemPosition, calcWH, calcXY, clamp } from "./calculateUtils";
import { CompSelectionWrapper, getGridItemPadding } from "./compSelectionWrapper";
import { draggingUtils } from "./draggingUtils";
import type { ResizeHandleAxis } from "./gridLayoutPropTypes";
import Handle from "./handler";
import {
  calcResizeXY,
  getDraggingNewPosition,
  GridDragEvent,
  GridResizeEvent,
  Position,
  setTransform,
} from "./utils";
import styled from "styled-components";

type GridItemCallback<Data extends GridDragEvent | GridResizeEvent> = (
  i: string,
  w: number,
  h: number,
  arg3: Data
) => void;
export type GridItemProps = {
  children: ReactElement;
  cols: number;
  containerWidth: number;
  margin: [number, number];
  containerPadding: [number, number]; // [left/right, top/bottom]
  rowHeight: number;
  maxRows: number;
  isDraggable: boolean;
  isResizable: boolean;
  isSelectable: boolean;
  static?: boolean;
  transformScale?: number;
  className?: string;
  style?: Record<string, any>;
  compType: UICompType;
  // Draggability
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  placeholder?: boolean;
  layoutHide?: boolean;
  i: string;
  resizeHandles: ResizeHandleAxis[];
  onDragStart?: (i: string, e: DragEvent<HTMLDivElement>, node: HTMLDivElement) => void;
  onDrag?: (i: string, e: DragEvent<HTMLDivElement>, node: HTMLDivElement) => void;
  onDragEnd?: (i: string, e: DragEvent<HTMLDivElement>, node: HTMLDivElement) => void;
  onResizeStart?: GridItemCallback<GridResizeEvent>;
  onResize?: GridItemCallback<GridResizeEvent>;
  onResizeStop?: GridItemCallback<GridResizeEvent>;
  onHeightChange?: (i: string, h: number) => void;
  name?: string;
  autoHeight?: boolean;
  isSelected?: boolean;
  hidden?: boolean;
  selectedSize?: number;
  clickItem?: (e: React.MouseEvent<HTMLDivElement>, name: string) => void;
  // the display space in the top and bottom for the nameDiv
  showName: { top: number; bottom: number };
};

export const IsDroppable = React.createContext(true);

const ResizableStyled = styled(Resizable)`
  &:hover {
    z-index: 1;
  }
`;

/**
 * An individual item within a ReactGridLayout.
 */
export function GridItem(props: GridItemProps) {
  const position = calcGridItemPosition(props, props.x, props.y, props.w, props.h);
  const [resizing, setResizing] = useState<{ width: number; height: number } | undefined>();
  const [dragging, setDragging] = useState<{ top: number; left: number } | undefined>();
  const elementRef = useRef<HTMLDivElement>(null);

  // record the real height of the comp content
  const itemHeightRef = useRef<number | undefined>(undefined);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { i } = props as Required<GridItemProps>;
    draggingUtils.clearData();
    draggingUtils.setData("i", i);
    e.dataTransfer.setDragImage(TransparentImg, 0, 0);
    props.onDragStart?.(i, e, elementRef.current as HTMLDivElement);
  };

  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { i } = props as Required<GridItemProps>;
    props.onDrag?.(i, e, elementRef.current as HTMLDivElement);
  };

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const { i } = props as Required<GridItemProps>;
    props.onDragEnd?.(i, e, elementRef.current as HTMLDivElement);
    draggingUtils.clearData();
  };

  const mixinDraggable = (child: ReactElement, isDraggable: boolean): ReactElement => {
    const { i } = props as Required<GridItemProps>;
    return (
      <div
        ref={elementRef}
        draggable={isDraggable}
        onDragStart={isDraggable ? onDragStart : undefined}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onMouseDown={(e) => {
          e.stopPropagation();
          const event = new MouseEvent("mousedown");
          document.dispatchEvent(event);
        }}
      >
        <IsDroppable.Provider value={draggingUtils.getData("i") !== i}>
          {child}
        </IsDroppable.Provider>
      </div>
    );
  };

  /**
   * Mix a Resizable instance into a child.
   * @param  {Element} child    Child element.
   * @param  {Object} position  Position object (pixel values)
   * @return {Element}          Child wrapped in Resizable.
   */
  const mixinResizable = (
    child: ReactElement,
    position: Position,
    isResizable: boolean
  ): ReactElement => {
    const { cols, x, minW, minH, maxW, maxH, resizeHandles } = props;
    // This is the max possible width - doesn't go to infinity because of the width of the window
    const maxWidth = calcGridItemPosition(props, 0, 0, cols - x, 0).width;
    // Calculate min/max constraints using our min & maxes
    const mins = calcGridItemPosition(props, 0, 0, minW as number, minH as number);
    const maxes = calcGridItemPosition(props, 0, 0, maxW as number, maxH as number);
    const minConstraints: [number, number] = [mins.width, mins.height];
    const maxConstraints: [number, number] = [
      Math.min(maxes.width, Infinity),
      Math.min(maxes.height, Infinity),
    ];
    return (
      <ResizableStyled // These are opts for the resize handle itself
        draggableOpts={{
          disabled: !isResizable,
        }}
        className={isResizable ? undefined : "react-resizable-hide"}
        width={position.width}
        height={position.height}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeStop={onResizeStop}
        resizeHandles={resizeHandles}
        handle={Handle}
      >
        {child}
      </ResizableStyled>
    );
  };

  /**
   * onResizeStop event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  const onResizeStop = (e: React.SyntheticEvent, callbackData: ResizeCallbackData) => {
    onResizeHandler(e, callbackData, "onResizeStop");
  };

  /**
   * onResizeStart event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  const onResizeStart = (e: React.SyntheticEvent, callbackData: ResizeCallbackData) => {
    onResizeHandler(e, callbackData, "onResizeStart");
  };

  /**
   * onResize event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  const onResize = (e: React.SyntheticEvent, callbackData: ResizeCallbackData) => {
    onResizeHandler(e, callbackData, "onResize");
  };

  /**
   * Wrapper around drag events to provide more useful data.
   * All drag events call the function with the given handler name,
   * with the signature (index, x, y).
   *
   * @param  {String} handlerName Handler name to wrap.
   * @return {Function}           Handler function.
   */
  const onResizeHandler = (
    e: SyntheticEvent<Element>,
    { node, size, handle }: ResizeCallbackData,
    handlerName: "onResizeStart" | "onResize" | "onResizeStop"
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    const handler = props[handlerName];
    if (!handler) return;
    const oldSize = resizing;
    let localDragging = dragging;
    let { cols, maxRows, x, y, w, h, i, maxH, minH, minW, maxW } = props;
    let [xx, yy] = [x, y];

    const resizeNorth = handle.indexOf("n") >= 0;
    const resizeWest = handle.indexOf("w") >= 0;
    if (resizeNorth || resizeWest) {
      if (handlerName === "onResizeStart") {
        localDragging = {
          left: position.left,
          top: position.top,
        };
      } else {
        if (!localDragging) {
          throw new Error("onResize called before onResizeStart.");
        }
        if (handlerName === "onResize") {
          let deltaX = 0;
          let deltaY = 0;
          if (oldSize) {
            // Left or top handles need repositioning when dragging. Only bottom right can be left alone
            const delta = calcResizeXY(
              handle,
              size.width - oldSize.width,
              size.height - oldSize.height
            );
            [deltaX, deltaY] = [delta.deltaX, delta.deltaY];
          }
          localDragging = getDraggingNewPosition(localDragging, deltaX, deltaY);
        }
        const xy = calcXY(props, localDragging.top, localDragging.left, props.w, props.h);
        [xx, yy] = [xy.x, xy.y];
      }
    }
    setResizing(handlerName === "onResizeStop" ? undefined : size);
    setDragging(handlerName === "onResizeStop" ? undefined : localDragging);

    // Get new XY
    let { w: ww, h: hh } = calcWH(props, size.width, size.height);
    // Min/max capping
    ww = clamp(ww, minW, maxW);
    hh = clamp(hh, minH, maxH);
    let boundW = resizeWest ? x + w : cols - x;
    let boundH = resizeNorth ? y + h : maxRows - y;
    ww = clamp(ww, 1, boundW);
    hh = clamp(hh, 1, boundH);
    handler(i, ww, hh, {
      e,
      node,
      size,
      handle,
      x: xx,
      y: yy,
    });
  };

  const adjustWrapperHeight = (width?: number, height?: number, src?: string) => {
    if (_.isNil(height)) return;
    if (!width) {
      width = position.width;
    }
    const padding = getGridItemPadding(props.compType);
    const { h } = calcWH(props, width + padding[0] * 2, height + padding[1] * 2, {
      w: true,
      h: true,
      ceil: true,
    });
    if (props.h !== h) {
      props.onHeightChange?.(props.i, h);
    }
  };

  /**
   * re-calculate the occupied grid-cells
   * called when item size changes and `autoHeight === true`
   */
  const onInnerSizeChange = (width?: number, height?: number) => {
    // log.log("onInnerSizeChange. name: ", props.name, " width: ", width, " height: ", height);
    if (!_.isNil(height)) {
      itemHeightRef.current = height;
    }
    adjustWrapperHeight(width, height);
  };

  /**
   * re-calculate the occupied gird-cells.
   * when isRowCountLocked === true, wrapper height will change, re-calculation is needed.
   *
   * called when item wrapper's size changes and autoHeight === true
   */
  const onWrapperSizeChange = () => {
    adjustWrapperHeight(undefined, itemHeightRef.current);
  };

  const mixinChildWrapper = (child: React.ReactElement): React.ReactElement => {
    const {
      i,
      name,
      autoHeight,
      isSelected,
      hidden,
      selectedSize,
      clickItem,
      placeholder,
      showName,
      isSelectable,
      isResizable,
      compType,
      resizeHandles,
    } = props;
    // log.debug("GridItem. name: ", name, " filpNameDiv: ", flipNameDiv, " position.top: ", position.top);
    const nameBottom = showName.bottom - position.top - position.height;
    const nameTop = showName.top + position.top;
    return (
      <CompSelectionWrapper
        compType={compType}
        id={i}
        onClick={(e) => {
          name && clickItem?.(e, name);
        }}
        resizeIconSize={props.h >= 4 ? "normal" : "small"}
        autoHeight={!!autoHeight}
        isSelected={!!isSelected}
        hidden={!!hidden}
        nameConfig={{
          // module container is not draggable and not show name
          show: !!(isDraggable && name),
          name: name,
          pos: nameTop > 16 ? "top" : nameBottom > 16 ? "bottom" : "bottomInside",
        }}
        placeholder={placeholder}
        onInnerResize={onInnerSizeChange}
        onWrapperResize={onWrapperSizeChange}
        isSelectable={isSelectable}
        isResizable={isResizable && selectedSize === 1}
        isDraggable={isDraggable}
        resizeHandles={resizeHandles}
      >
        {child}
      </CompSelectionWrapper>
    );
  };

  const calcPosition = useCallback((): Position => {
    let width, height, top, left;
    // If resizing, use the exact width and height as returned from resizing callbacks.
    if (resizing) {
      width = Math.round(resizing.width);
      height = Math.round(resizing.height);
    } // Otherwise, calculate from grid units.
    else {
      width = position.width;
      height = position.height;
    }

    // If dragging, use the exact width and height as returned from dragging callbacks.
    if (dragging) {
      top = Math.round(dragging.top);
      left = Math.round(dragging.left);
    } // Otherwise, calculate from grid units.
    else {
      top = position.top;
      left = position.left;
    }
    return { width, height, top, left };
  }, [dragging, position.height, position.left, position.top, position.width, resizing]);

  const { isDraggable, isResizable, layoutHide, children, isSelected, clickItem } = props;
  const pos = calcPosition();
  const render = () => {
    let child = React.Children.only(children);
    // Create the child element. We clone the existing element but modify its className and style.
    let newChild: React.ReactElement = React.cloneElement(child, {
      ref: elementRef,
      className: clsx(
        "react-grid-item",
        props.name,
        `ui-comp-${props.compType}`,
        child.props.className,
        props.className
      ),
      // We can set the width and height on the child, but unfortunately we can't set the position.
      style: {
        ...props.style,
        ...child.props.style,
      },
    });
    newChild = mixinChildWrapper(newChild);
    newChild = React.cloneElement(newChild, {
      className: clsx({
        static: props.static,
        resizing: Boolean(resizing),
        "react-draggable": isDraggable,
        "react-draggable-dragging": Boolean(dragging),
        cssTransforms: true,
      }),
      style: {
        ...setTransform(pos),
        opacity: layoutHide ? 0 : undefined,
        pointerEvents: layoutHide ? "none" : "auto",
      },
    });
    // Resizable support. This is usually on but the user can toggle it off.
    newChild = mixinResizable(newChild, pos, isResizable);
    // Draggable support. This is always on, except for with placeholders.
    newChild = mixinDraggable(newChild, isDraggable);
    return newChild;
  };

  const renderResult = useMemo(render, [pos, children, layoutHide, isSelected, clickItem]);

  return renderResult;
}

GridItem.defaultProps = {
  className: "",
  minH: 1,
  minW: 1,
  maxH: Infinity,
  maxW: Infinity,
  transformScale: 1,
};
