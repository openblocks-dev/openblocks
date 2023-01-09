import clsx from "clsx";
import { colord } from "colord";
import { UICompType } from "comps/uiCompRegistry";
import { ModulePrimaryColor, PrimaryColor } from "constants/style";
import _ from "lodash";
import log from "loglevel";
import React, { DragEvent, DragEventHandler, MouseEventHandler, ReactElement } from "react";
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";
import { isDirectionKey, isFilterInputTarget, modKeyPressed } from "util/keyUtils";
import {
  calcGridItemPosition,
  calcGridItemSizePx,
  calcRowCount,
  calcWH,
  calcXY,
  genPositionParams,
  PositionParams,
} from "./calculateUtils";
import { draggingUtils } from "./draggingUtils";
import { FlyOverInfo, FlyStartInfo } from "./flyInfo";
import { GridItem } from "./gridItem";
import { GridLayoutProps } from "./gridLayoutPropTypes";
import { GridLines } from "./gridLines";
import { changeItemOp, deleteItemOp, LayoutOp, renameItemOp } from "./layoutOp";
import { getUILayout, LayoutOps, layoutOpUtils } from "./layoutOpUtils";
import {
  bottom,
  calcLeftAdjacentItems,
  calcOffsetXY,
  canResizeBottom,
  canResizeRight,
  childrenEqual,
  collides,
  edgeScroll,
  ExtraItem,
  ExtraLayout,
  getInCanvasCount,
  getItemResizeHandles,
  gridLayoutPropsEquals,
  GridResizeEvent,
  isItemDraggable,
  isItemResizable,
  isValidLayoutItem,
  Layout,
  LayoutItem,
  narrow,
  narrowItems,
  Position,
  shiftInside,
  synchronizeLayoutWithChildren,
  updateInCanvasCount,
} from "./utils";

type GridLayoutState = {
  layout: Layout;
  changedHs?: Record<string, number>;
  ops?: LayoutOps;
  startOps?: LayoutOps;
  nextLayout?: Layout;
  nextTime: number;
  // Mirrored props
  children: ReactElement[];
  propsLayout?: Layout;
};
const LAYOUT_CLASS_NAME = "react-grid-layout";
const DRAGGING_ITEM = "draggingItem";
const DELAY_COLLISION_MS = 100;
const DELAY_HIGHER_MS = 5;
export const FLY_START_INFO = "flyStartInfo";
export const FLY_OVER_INFO = "flyOverInfo";

const DragPlaceHolder = styled.div<{ compType: UICompType }>`
  height: 100%;
  background-color: ${(props) =>
    props.compType === "module" ? ModulePrimaryColor : PrimaryColor} !important;
`;

/**
 * A reactive, fluid grid layout with draggable, resizable components.
 */
class GridLayout extends React.Component<GridLayoutProps, GridLayoutState> {
  static defaultProps: Partial<GridLayoutProps> = {
    cols: 12,
    className: "",
    style: {},
    isRowCountLocked: false,
    maxRows: Infinity,
    // infinite vertical growth
    layout: {},
    margin: [10, 10],
    isResizable: true,
    isDroppable: false,
    transformScale: 1,
    droppingItem: {
      i: "__dropping-elem__",
      h: 1,
      w: 1,
    },
    onLayoutChange: _.noop,
    onResizeStart: _.noop,
    onResize: _.noop,
    onResizeStop: _.noop,
    onDrop: _.noop,
    onDropDragOver: (e) => undefined,
    children: [],
  };
  state: GridLayoutState = {
    layout: synchronizeLayoutWithChildren(
      this.props.layout as Layout,
      this.props.children as NonNullable<typeof this.props.children>,
      this.props.cols as NonNullable<typeof this.props.cols> // Legacy support for verticalCompact: false
    ),
    nextTime: 0,
    children: [],
  };
  dragEnterCounter: number = 0;
  innerRef = React.createRef<HTMLDivElement>();
  ref = this.props.innerRef ?? this.innerRef;
  innerHeight = 0;

  static getDerivedStateFromProps(
    nextProps: Readonly<GridLayoutProps>,
    prevState: GridLayoutState
  ): Partial<GridLayoutState> | null {
    let newLayoutBase;

    if (draggingUtils.isDragging()) {
      return null;
    }

    // Legacy support for compactType
    // Allow parent to set layout directly.
    if (
      !_.isEqual(nextProps.layout, prevState.propsLayout) ||
      !childrenEqual(nextProps.children, prevState.children)
    ) {
      newLayoutBase = nextProps.layout;
    }

    // We need to regenerate the layout.
    if (newLayoutBase) {
      const newLayout = synchronizeLayoutWithChildren(
        newLayoutBase,
        nextProps.children,
        nextProps.cols as number
      );
      // log.debug("layout: getDrivedState. nextProps: ", nextProps.layout, " prevState: ", prevState.layout, " newLayoutBase: ", newLayoutBase, " newLayout: ", newLayout);
      return {
        layout: newLayout,
        // We need to save these props to state for using
        // getDerivedStateFromProps instead of componentDidMount (in which we would get extra rerender)
        children: nextProps.children,
        propsLayout: nextProps.layout,
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps: GridLayoutProps, nextState: GridLayoutState): boolean {
    return (
      // NOTE: this is almost always unequal. Therefore the only way to get better performance
      // from SCU is if the user intentionally memoizes children. If they do, and they can
      // handle changes properly, performance will increase.
      this.props.children !== nextProps.children ||
      !_.isEqual(this.state.ops, nextState.ops) ||
      !_.isEqual(this.state.changedHs, nextState.changedHs) ||
      !_.isEqual(nextState.layout, this.state.layout) ||
      !gridLayoutPropsEquals(this.props, nextProps)
    );
  }

  componentDidUpdate(prevProps: GridLayoutProps, prevState: GridLayoutState) {
    const uiLayout = this.getUILayout();
    if (!draggingUtils.isDragging()) {
      // log.debug("render. clear ops. layout: ", uiLayout);
      // only change in changeHs, don't change state
      if (_.size(this.state.ops) > 0) {
        this.setState({ layout: uiLayout, changedHs: undefined, ops: undefined });
      }
    }
    if (!draggingUtils.isDragging() && _.isNil(this.state.ops)) {
      const newLayout = this.state.layout;
      const oldLayout = prevState.layout;
      // log.debug( "layout: didUpdate. oldLayout: ", oldLayout, " newLayout: ", newLayout, " prevProps: ", prevProps.layout, "thisProps: ", this.props.layout);
      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }
  }

  isValidMounted(): boolean {
    return _.isNumber(this.props.width) && this.props.width > 0;
  }

  /**
   * Calculates a pixel value for the container.
   * @return {String} Container height in pixels.
   */
  containerHeight(): string {
    const { margin, rowHeight } = this.props as Required<GridLayoutProps>;
    const { extraHeight, emptyRows } = this.props;
    const positionParams = genPositionParams(this.props);
    const { containerPadding } = positionParams;
    const layout = this.getUILayout(undefined, true);
    let nbRow = bottom(layout);
    if (!_.isNil(emptyRows) && _.size(layout) === 0) {
      nbRow = emptyRows;
    }
    const containerHeight = Math.max(
      nbRow * rowHeight + (nbRow - 1) * margin[1] + containerPadding[1] * 2
    );
    // log.debug("layout: containerHeigh=", containerHeight, " minHeight: ", this.props.minHeight);
    const height = extraHeight
      ? `calc(${containerHeight}px + ${extraHeight})`
      : containerHeight + "px";
    // log.log( "containerHeight. nbRow: ", nbRow, " containerPadding: ", containerPadding[1], " containerHeight: ", containerHeight, " height: ", height);
    return height;
  }

  onDragStart = (i: string, e: DragEvent<HTMLDivElement>, node: HTMLDivElement) => {
    let { transformScale, extraLayout, droppingItem } = this.props;
    const droppingKey = droppingItem?.i as string;

    // don't drag the input component when focus
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
      e.preventDefault();
      return;
    }

    let keys = this.getSelectedKeys();
    if (!keys.includes(i)) {
      // special case: the dragging comps are not selected
      keys = [i];
      extraLayout = _.mapValues(extraLayout, (extraItem, key) => {
        if (key === i && !extraItem.isSelected) {
          return { ...extraItem, isSelected: true };
        } else if (key !== i && extraItem.isSelected) {
          return { ...extraItem, isSelected: false };
        }
        return extraItem;
      });
    }
    let layout = this.getUILayout();
    let draggingLayout = _.pick(layout, keys);
    this.props.onFlyStart?.(layout, draggingLayout);

    // layout
    layout = _.mapValues(layout, (item, key) => (key === i ? { ...item, i: droppingKey } : item));
    layout = _.mapKeys(layout, (item, key) => (key === i ? droppingKey : key));
    // keys
    keys = keys.map((key) => (key === i ? droppingKey : key));
    keys = _.sortBy(keys, (key) => layout[key].x);
    // extraLayout
    if (extraLayout) {
      extraLayout = _.mapKeys(extraLayout, (value, key) => (key === i ? droppingKey : key));
    }
    // solve the neighbor collision problem when dragging multiple comps
    draggingLayout = _.pick(layout, keys);
    const leftAdjacentItems = calcLeftAdjacentItems(draggingLayout);
    // position params
    const positionParams = genPositionParams(this.props);
    // coordinate
    let { offsetX, offsetY } = calcOffsetXY(e, this.ref.current as HTMLDivElement, transformScale);

    const recoverDragStartFn = () => {
      this.setState({ ops: undefined });
    };

    // -------- set DragStart varibles --------
    draggingUtils.setData(FLY_START_INFO, {
      flyStartLayout: layout,
      flyItemKeys: keys,
      sourceLayoutFn: this.getUILayout.bind(this),
      flyExtraLayout: extraLayout,
      flyLeftAdjItems: leftAdjacentItems,
      flyPositionParams: positionParams,
      flyStartOffsetX: offsetX,
      flyStartOffsetY: offsetY,
      flyItemI: i,
      flyStartRecoverFn: recoverDragStartFn,
    });

    // log.debug("layout: onDragStart completed.");
  };

  onDrag = (i: string, e: DragEvent<HTMLDivElement>, node: HTMLDivElement) => {
    // log.debug("onDrag. inCanvasCount: ", getInCanvasCount());
    updateInCanvasCount(-1);

    const flyStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    const flyOverInfo = draggingUtils.getData<FlyOverInfo>(FLY_OVER_INFO);
    const isFlyStart = !!flyStartInfo && !flyOverInfo;

    /**
     * trick: this is part of the onDragStart job, since chrome's some bug prevents the style update on the draging items in the onDragStart function.
     */
    if (isFlyStart) {
      const keys = flyStartInfo.flyItemKeys;
      const layout = flyStartInfo.flyStartLayout;
      const { droppingItem } = this.props;
      const droppingKey = droppingItem?.i as string;
      const item = layout[droppingKey];

      const startOps = _.flattenDeep<LayoutOp>([
        changeItemOp(i, {
          y: bottom(layout) - item.h,
          hide: true,
          static: undefined,
        }),
        // hideItemOp(i),
        // changeItemOp(droppingKey, layout[droppingKey]),
        keys.map((key) => deleteItemOp(key)),
      ]);
      // log.debug( "layout: onDragStart. keys: ", keys, " ops: ", ops, "start layout: ", this.getUILayout(), " virtual layout: ", getUILayout(this.getUILayout(), ops));
      this.setState({ startOps: startOps });

      this.mayDelayOver(
        keys.map((key) => ({ ...layout[key], isDragging: true, placeholder: true })),
        startOps,
        true
      );
    }
  };

  onLayoutMaybeChanged(newLayout: Layout, oldLayout?: Layout) {
    // log.debug("layout: layoutMayBeChanged. oldLayout: ", oldLayout, " newLayout: ", newLayout);
    if (!oldLayout) oldLayout = this.state.layout;

    if (!_.isEqual(oldLayout, newLayout)) {
      this.props.onLayoutChange?.(newLayout);
    }
  }

  onResizeStart: (i: string, w: number, h: number, arg3: GridResizeEvent) => void = (
    i,
    w,
    h,
    { e, node }
  ) => {
    draggingUtils.clearData();
    const { layout } = this.state;
    const l = layout[i];
    if (!l) return;
    // this.setState({ ops: undefined });
    draggingUtils.setData(DRAGGING_ITEM, l);
    this.props.onResizeStart?.(layout, l, l, undefined, e, node);
  };
  onResize: (i: string, w: number, h: number, arg3: GridResizeEvent) => void = (
    i,
    w,
    h,
    { e, node, handle, x, y }
  ) => {
    const droppingItem = { x, y, w, h };
    let ops = layoutOpUtils.push(
      this.state.ops,
      changeItemOp(i, { ...droppingItem, isDragging: true })
    );
    this.setState({ ops });

    const layout = getUILayout(
      this.state.layout,
      this.props.extraLayout,
      this.state.changedHs,
      ops
    );
    const oldResizeItem = draggingUtils.getData<LayoutItem>(DRAGGING_ITEM);
    this.props.onResize?.(layout, oldResizeItem, layout[i], undefined, e, node);
  };
  onResizeStop: (i: string, w: number, h: number, arg3: GridResizeEvent) => void = (
    i,
    w,
    h,
    { e, node }
  ) => {
    const layout = this.getUILayout();
    const oldResizeItem = draggingUtils.getData<LayoutItem>(DRAGGING_ITEM);

    this.props.onResizeStop?.(layout, oldResizeItem, layout[i], undefined, e, node);
    draggingUtils.clearData();
    this.onLayoutMaybeChanged(this.getUILayout());
  };

  onHeightChange = (i: string, h: number): void => {
    // log.debug("onHeightChange. i: ", i, " h: ", h, " ops: ", this.state.ops);
    // const ops = layoutOpUtils.push(this.state.ops, stickyItemOp(i, { h }));
    // this.setState({ ops });
    if (this.state.changedHs?.[i] !== h) {
      const changedHeights = { ...this.state.changedHs, [i]: h };
      this.setState({ changedHs: changedHeights });
    }
  };

  processGridItem(
    item: LayoutItem,
    childrenMap: _.Dictionary<React.ReactElement>
  ): React.ReactElement | undefined {
    const draggingExtraLayout = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO)?.flyExtraLayout;
    const extraItem = this.props.extraLayout?.[item.i] ?? draggingExtraLayout?.[item.i];
    const child = item.placeholder ? (
      <DragPlaceHolder compType={extraItem?.compType} className="react-grid-placeholder" />
    ) : (
      childrenMap[item.i]
    );
    if (!child) return;
    const {
      width,
      cols,
      margin,
      rowHeight,
      maxRows,
      isDraggable,
      isResizable,
      isSelectable,
      transformScale,
      selectedSize,
      clickItem,
    } = this.props as Required<GridLayoutProps>;
    const { showName } = this.props;
    const selectable = isSelectable;
    const positionParams = genPositionParams(this.props);
    return (
      <GridItem
        compType={extraItem?.compType}
        key={item.i}
        containerWidth={width}
        cols={cols}
        margin={margin}
        containerPadding={positionParams.containerPadding}
        maxRows={maxRows}
        rowHeight={rowHeight}
        onDragStart={this.onDragStart}
        onDrag={this.onDrag}
        onDragEnd={this.onDragEnd}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
        onHeightChange={this.onHeightChange}
        isDraggable={isDraggable && isItemDraggable(item)}
        isResizable={isResizable && isItemResizable(item)}
        isSelectable={selectable}
        transformScale={transformScale}
        w={item.w}
        h={extraItem?.hidden && !extraItem?.isSelected ? 0 : item.h}
        x={item.x}
        y={item.y}
        i={item.i}
        minH={item.minH}
        minW={item.minW}
        maxH={item.maxH}
        maxW={item.maxW}
        placeholder={item.placeholder}
        layoutHide={item.hide}
        static={item.static}
        resizeHandles={getItemResizeHandles(item, extraItem)}
        name={extraItem?.name}
        autoHeight={extraItem?.autoHeight}
        isSelected={extraItem?.isSelected}
        hidden={extraItem?.hidden}
        selectedSize={selectedSize}
        clickItem={clickItem}
        showName={{
          top: showName?.top ?? 0,
          bottom: (showName?.bottom ?? 0) + (this.ref.current?.scrollHeight ?? 0),
        }}
      >
        {child}
      </GridItem>
    );
  }

  getFinalDroppingItem(
    onDragOverResult:
      | { size: { w?: number; h?: number }; positionParams?: PositionParams }
      | undefined,
    left: number,
    top: number
  ): LayoutItem {
    const droppingItem = {
      ...this.props.droppingItem,
      ...onDragOverResult?.size,
      placeholder: true,
    };
    let { w, h } = droppingItem as Required<LayoutItem>;
    const positionParams: PositionParams = genPositionParams(this.props);
    // convert grid units, in order to keep comps' size stable when they are through containers
    const sourcePositionParams = onDragOverResult?.positionParams;
    if (sourcePositionParams) {
      const { width, height } = calcGridItemSizePx(sourcePositionParams, w, h);
      // log.debug("layout: sourceTransform. w: ", w, " h: ", h, " sourcePositinParams: ", sourcePositionParams, " width: ", width, " height: ", height);
      const { w: ww, h: hh } = calcWH(positionParams, width, height, {
        w: false,
        h: false,
        ceil: false,
      });
      [w, h] = [ww, hh];
    }
    const { width, height } = calcGridItemSizePx(positionParams, w, h);
    // log.debug("layout: getFinalDroppingItem. w: ", w, " h: ", h, " sourcePositinParams: ", sourcePositionParams, " width: ", width, " height: ", height);
    left -= width * 0.5;
    top -= height * 0.5;
    const calculatedPosition = calcXY(positionParams, top, left, w, h, { x: false, y: true });
    let finalItem = {
      ...droppingItem,
      w: w,
      h: h,
      x: calculatedPosition.x,
      y: calculatedPosition.y,
      // isDraggable: true,
      isDragging: true,
    } as LayoutItem;
    finalItem = narrow(finalItem, 0, positionParams.cols);
    return finalItem;
  }

  getFinalFlyingItems(offsetX: number, offsetY: number): LayoutItem[] {
    const flyStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    const startOffsetX = flyStartInfo.flyStartOffsetX;
    const startOffsetY = flyStartInfo.flyStartOffsetY;
    const deltaX = offsetX - startOffsetX;
    const deltaY = offsetY - startOffsetY;
    const keys = flyStartInfo.flyItemKeys;
    const originalLayout = flyStartInfo.flyStartLayout;
    const sourcePositionParams = flyStartInfo.flyPositionParams;
    const positionParams: PositionParams = genPositionParams(this.props);

    // log.debug("layout: getFinalDraggingItem. positinParams: ", positionParams, " colWidth: ", calcGridColWidth(positionParams));
    // calculate according to the stable logic
    const calcedItems = keys.map((key) => {
      const item = originalLayout[key];
      const sourcePosition = calcGridItemPosition(
        sourcePositionParams,
        item.x,
        item.y,
        item.w,
        item.h
      );
      const newPosition = {
        ...sourcePosition,
        left: sourcePosition.left + deltaX,
        top: sourcePosition.top + deltaY,
      };
      let { w, h } = calcWH(positionParams, newPosition.width, newPosition.height, {
        w: false,
        h: true,
      });
      let { x, y } = calcXY(positionParams, newPosition.top, newPosition.left, w, h, {
        x: false,
        y: false,
      });
      const finalItem = {
        ...item,
        x,
        y,
        w,
        h,
        isDragging: true,
        placeholder: true,
      };
      // log.debug("key: ", key, " newPosition: ", newPosition, " right: ", newPosition.left + newPosition.width, " finalItem: ", finalItem);
      return finalItem;
    });

    // comps will finally have a bit change in size. we should special handle this to remain their neighbor relation.
    const flyLeftAdjItems = flyStartInfo.flyLeftAdjItems;
    const adjOKItemMap: Layout = {};
    calcedItems.forEach((item) => {
      const x = _.max(
        flyLeftAdjItems[item.i]
          ?.filter((leftItemKey) => !_.isNil(adjOKItemMap[leftItemKey]))
          ?.map((leftItemKey) => adjOKItemMap[leftItemKey].x + adjOKItemMap[leftItemKey].w)
      );
      !_.isNil(x) && (item.x = x);
      adjOKItemMap[item.i] = item;
    });

    // handle the boundary problems for multi-drag
    const narrowedItems = narrowItems(Object.values(adjOKItemMap), positionParams.cols);
    const finalItems = shiftInside(positionParams, narrowedItems);

    return finalItems;
  }

  mayScroll(offsetY: number) {
    const element = this.props.scrollContainerRef?.current;
    if (!element) return;
    // log.debug("mayScroll. offsetTop: ", element.offsetTop, " offsetHeight: ", element.offsetHeight, " scrollTop: ", element.scrollTop, " scrollHeight: ", element.scrollHeight, " element: ", element);
    const topRatio = (offsetY - element.scrollTop) / element.clientHeight;
    edgeScroll(element, topRatio);
  }

  getFlyOverInfo(startOps: LayoutOps | undefined) {
    const innerHeight = this.innerHeight;
    const switchFn = (flyOverInfo?: FlyOverInfo) => {
      // log.debug("flyOverRecoverFn: ", startOps, " layout: ", getUILayout(this.state.layout, startOps));
      const isSameRef = flyOverInfo?.layoutRef === this.ref;
      if (!isSameRef) {
        this.setState({ ops: startOps });
      }
      if (flyOverInfo) {
        const newFlyOverInfo = isSameRef
          ? { ...flyOverInfo, startOps, switchFn, innerHeight }
          : flyOverInfo;
        draggingUtils.setData<FlyOverInfo>(FLY_OVER_INFO, newFlyOverInfo);
      }
    };
    const flyDropFn = () => this.onFlyDrop();
    const newFlyOverInfo = {
      layoutRef: this.ref,
      switchFn,
      dropFn: flyDropFn,
      innerHeight,
      startOps,
    };
    return newFlyOverInfo;
  }

  restrictHeight(items: LayoutItem[]): LayoutItem[] {
    const flyOverInfo = draggingUtils.getData<FlyOverInfo>(FLY_OVER_INFO);
    const { autoHeight, minHeight, emptyRows } = this.props;
    if (autoHeight && !minHeight && flyOverInfo) {
      const layout = getUILayout(
        this.state.layout,
        this.props.extraLayout,
        this.state.changedHs,
        flyOverInfo.startOps
      );
      const bottomY = Math.max(
        ...Object.values(layout).map((item) => item.y + item.h),
        emptyRows ?? -Infinity
      );
      const itemsTopY = Math.min(...items.map((item) => item.y));
      if (bottomY + 1 < itemsTopY) {
        const delta = bottomY + 1 - itemsTopY;
        items = items.map((item) => ({ ...item, y: item.y + delta }));
      }
    }
    return items;
  }

  mayDelayOver = (items: LayoutItem[], startOps?: LayoutOps, isFlyStart: boolean = false) => {
    const flyStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    const flyOverInfo = draggingUtils.getData<FlyOverInfo>(FLY_OVER_INFO);
    const checkFlyStart = !!flyStartInfo && !flyOverInfo;
    if (!isFlyStart && checkFlyStart) return; // wait for the grand onDragStart, aka. the trick in the onDrag function
    const newFlyOverInfo = this.getFlyOverInfo(startOps);
    // log.debug("mayDelayOver. isFlyStart: ", isFlyStart, " checkFlyStart: ", checkFlyStart, " newFlyOverInfo: ", newFlyOverInfo);

    items = this.restrictHeight(items);

    const ops = layoutOpUtils.batchPush(
      startOps,
      items.map((item) => changeItemOp(item.i, item))
    );

    const setStateFn = () => {
      if (!flyOverInfo) {
        draggingUtils.setData<FlyOverInfo>(FLY_OVER_INFO, newFlyOverInfo);
      } else {
        flyOverInfo.switchFn(newFlyOverInfo);
      }
      this.setState({ ops, nextLayout: undefined });
      // log.debug("setStateFn. ops: ", ops);
    };

    const delayTime = this.shouldDelayOverTime(items, startOps, ops);
    if (delayTime > 0) {
      // log.debug("layout: onDragOver. nextLayout: ", this.state.nextLayout, " curLayout: ", curLayout, " equal: ", _.isEqual(this.state.nextLayout, curLayout));
      let nextTime = this.state.nextTime;
      const nextLayout = getUILayout(
        this.state.layout,
        this.props.extraLayout,
        this.state.changedHs,
        ops
      );
      if (!_.isEqual(this.state.nextLayout, nextLayout)) {
        nextTime = Date.now() + delayTime;
        this.setState({ nextLayout: nextLayout, nextTime: nextTime });
      }
      if (Date.now() >= nextTime) {
        setStateFn();
      }
    } else {
      setStateFn();
    }
  };

  /**
   * if the following condition is true, delay x ms:
   * - if items with delayCollision property changes the position, delay 100ms
   * - if height changes, delay 5ms
   */
  shouldDelayOverTime(
    items: LayoutItem[],
    startOps: LayoutOps | undefined,
    ops: LayoutOps
  ): number {
    const { autoHeight } = this.props;
    const flyStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    const originalLayout = getUILayout(
      this.state.layout,
      this.props.extraLayout,
      this.state.changedHs,
      startOps
    );
    const currentLayout = this.getUILayout();
    const nextLayout = getUILayout(
      this.state.layout,
      this.props.extraLayout,
      this.state.changedHs,
      ops
    );
    const movedItemKeys = Object.keys(originalLayout).filter(
      (key) => !_.isEqual(originalLayout[key], currentLayout[key])
    );

    // the keys of all the unchanged comps with 'delayCollision' layout property
    const standingDelayKeys = _.difference(
      Object.values(originalLayout)
        .filter((item) => item.delayCollision)
        .map((item) => item.i),
      [...items.map((item) => item.i), flyStartInfo?.flyItemI, ...movedItemKeys]
    );
    if (standingDelayKeys.some((key) => !_.isEqual(originalLayout[key], nextLayout[key]))) {
      return DELAY_COLLISION_MS;
    }
    if (autoHeight && bottom(nextLayout) > bottom(currentLayout) && !this.props.isCanvas) {
      return DELAY_HIGHER_MS;
    }
    return 0;
  }

  // only for onDragOver
  throttleDebug = _.throttle(log.debug, 200);
  // Called while dragging an element. Part of browser native drag/drop API.
  // Native event target might be the layout itself, or an element within the layout.
  onDragOver: DragEventHandler<HTMLElement> = (e) => {
    // log.debug("layout: onDragOver. this: ", this.props);
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();
    // trick: in order to check the mouse is in the canvas when dragging ends.
    updateInCanvasCount(2);

    // we should ignore events from layout's children in Firefox
    // to avoid unpredictable jumping of a dropping placeholder
    // FIXME remove this hack
    // if (
    //   isFirefox && // $FlowIgnore can't figure this out
    //   !e.nativeEvent.target?.classList.contains(layoutClassName)
    // ) {
    //   return false;
    // }

    const { onDropDragOver, transformScale } = this.props as Required<GridLayoutProps>;
    // Allow user to customize the dropping item or short-circuit the drop based on the results
    // of the `onDragOver(e: Event)` callback.
    const onDragOverResult = onDropDragOver(e);
    const startDragInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);

    if (!onDragOverResult && _.isNil(startDragInfo)) {
      return;
    }

    // coordinates in the current container
    const { offsetX, offsetY } = calcOffsetXY(
      e,
      this.ref.current as HTMLDivElement,
      transformScale
    );
    this.mayScroll(offsetY);

    let items = [];
    if (!startDragInfo) {
      // drag a new comp from the pannel
      const item = this.getFinalDroppingItem(onDragOverResult, offsetX, offsetY);
      items.push(item);
      this.mayDelayOver(items);
    } else {
      // drag existed comps from the canvas
      items = this.getFinalFlyingItems(offsetX, offsetY);
      this.mayDelayOver(items, this.state.startOps);
    }
  };

  removePlaceholder() {
    const flyStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    if (!flyStartInfo) {
      const { droppingItem } = this.props as Required<GridLayoutProps>;
      const ops = layoutOpUtils.push(this.state.ops, deleteItemOp(droppingItem.i as string));
      this.setState({ ops });
    }
  }

  onDragEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();
    // if (!(e.target as any).className.includes("react-grid-layout")) {
    //   return;
    // }

    ++this.dragEnterCounter;
    // log.warn("layout: onDragEnter. counter: ", this.dragEnterCounter, " event: ", e);
  };

  onDragLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();
    // if (!(e.target as any).className.includes("react-grid-layout")) {
    //   return;
    // }

    // onDragLeave can be triggered on each layout's child.
    // But we know that count of dragEnter and dragLeave events
    // will be balanced after leaving the layout's container
    // so we can increase and decrease count of dragEnter and
    // when it'll be equal to 0 we'll remove the placeholder
    --this.dragEnterCounter;
    // log.warn("layout: onDragLeave. counter: ", this.dragEnterCounter, " event: ", e);
    if (this.dragEnterCounter === 0) {
      this.removePlaceholder();
    }
  };

  onFlyDrop = () => {
    const { droppingItem, onFlyDrop } = this.props as Required<GridLayoutProps>;
    const droppingKey = droppingItem.i as string;

    const dragStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    let keys = dragStartInfo?.flyItemKeys;
    const i = dragStartInfo.flyItemI;

    const ops = layoutOpUtils.batchPush(
      this.state.ops,
      _.flattenDeep<LayoutOp>([
        keys.map((key) => changeItemOp(key, { placeholder: undefined })),
        renameItemOp(droppingKey, i),
      ])
    );
    this.dragEnterCounter = 0;
    this.setState({ ops });

    const layout = getUILayout(
      this.state.layout,
      this.props.extraLayout,
      this.state.changedHs,
      ops
    );
    keys = keys.map((key) => (key === droppingKey ? i : key));
    const items = _.pick(layout, keys);
    onFlyDrop?.(layout, items);
  };

  onDrop: DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();

    const { droppingItem, onDrop } = this.props as Required<GridLayoutProps>;
    const droppingKey = droppingItem.i as string;

    const dragStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    if (dragStartInfo) {
      // move the logic to onDragEnd function when dragging from the canvas
      return;
    }

    let layout = this.getUILayout();
    const ops = layoutOpUtils.push(this.state.ops, deleteItemOp(droppingKey));
    const items = _.pick(layout, droppingKey);
    layout = _.omit(layout, droppingKey);
    // log.debug("layout: onDrop gridLayout. items: ", items);
    // reset dragEnter counter on drop
    this.dragEnterCounter = 0;
    this.setState({ ops });

    onDrop?.(layout, items, e);
    draggingUtils.clearData();
  };

  onDragEnd = (i: string, e: DragEvent<HTMLDivElement>, node: HTMLDivElement) => {
    if (!draggingUtils.isDragging()) return;

    let flyStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    let flyOverInfo = draggingUtils.getData<FlyOverInfo>(FLY_OVER_INFO);

    const inCanvas = getInCanvasCount() >= 0;
    const dropEffect = e.dataTransfer.dropEffect;
    this.setState({ startOps: undefined });
    // log.debug("layout: onDragEnd. inCanvasCount: ", getInCanvasCount(), " inCanvas: ", inCanvas, " dropEffect: ", dropEffect);
    // regard this state as canceling dragging
    if (inCanvas && dropEffect === "none") {
      flyOverInfo && flyOverInfo.switchFn();
      flyStartInfo.flyStartRecoverFn();
    } else {
      /**
       * FIXME: here's a small bug.
       * pressing esc outside the canvas still causes a side-drop,
       * since html5's native drop-n-drag api can distinguish the condition from pressing esc and mouse outside of the canvs.
       * reference: https://github.com/react-dnd/react-dnd/issues/600
       */
      flyOverInfo && flyOverInfo.dropFn();
    }
  };

  getUILayout(ops?: LayoutOps, setHiddenCompHeightZero: boolean = false): Layout {
    return getUILayout(
      this.state.layout,
      this.props.extraLayout,
      this.state.changedHs,
      ops ?? this.state.ops,
      setHiddenCompHeightZero
    );
  }

  getDefaultStyle(): Record<string, any> {
    let { autoHeight, minHeight } = this.props;
    const flyOverInfo = draggingUtils.getData<FlyOverInfo>(FLY_OVER_INFO);
    if (flyOverInfo?.layoutRef === this.ref) {
      const flyOverMinHeight = flyOverInfo.innerHeight + "px";
      minHeight = minHeight ? `max(${minHeight}, ${flyOverMinHeight})` : flyOverMinHeight;
    }

    const style: Record<string, any> = {
      minHeight: autoHeight ? minHeight ?? "100%" : "100%",
    };
    // log.debug("defaultStyle. style: ", style, " minHeight: ", minHeight, " autoHeight: ", autoHeight);
    return style;
  }

  getSelectedKeys() {
    return Object.keys(_.pickBy(this.props.extraLayout, (extraItem) => !!extraItem.isSelected));
  }

  hintPlaceholder(): React.ReactNode | undefined {
    const { hintPlaceholder } = this.props;
    const layout = this.getUILayout();
    if (_.size(layout) > 0) {
      return undefined;
    }
    return hintPlaceholder;
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    if (this.props.disableDirectionKey || !isDirectionKey(e) || isFilterInputTarget(e)) {
      return;
    }
    const isResize = modKeyPressed(e);
    if (isResize ? !this.props.isResizable : !this.props.isDraggable) {
      return;
    }
    const newOps = moveOrResize(
      e,
      isResize,
      this.getUILayout(),
      this.props.extraLayout ?? {},
      genPositionParams(this.props)
    );
    if (!newOps || newOps.length === 0) {
      return;
    }
    const ops = layoutOpUtils.batchPush(this.state.ops, newOps);
    this.setState({ ops });
    this.onLayoutMaybeChanged(this.getUILayout(ops));
  };

  gridLines() {
    const positionParams = genPositionParams(this.props);
    const { containerPadding, rowHeight, containerWidth } = positionParams;

    const [left, top] = containerPadding;
    const rowCount = calcRowCount(this.innerHeight, containerPadding[1], rowHeight);
    const height = rowCount * rowHeight + 1;
    const width = containerWidth - containerPadding[0] * 2 + 1;
    const position: Position = { left, top, width, height };

    const bgColor = this.props.bgColor ?? "#ffffff";
    const contrastBgColor = colord(bgColor).invert().alpha(0.05).toHex();

    // log.log( "GridLines. bgColor: ", this.props.bgColor, " computedBgColor: ", bgColor, " contrastBgColor: ", contrastBgColor);
    return (
      <GridLines positionParams={positionParams} position={position} lineColor={contrastBgColor} />
    );
  }

  render() {
    const { className, style, isDroppable, children, showGridLines } = this
      .props as Required<GridLayoutProps>;
    const mergedClassName = clsx(LAYOUT_CLASS_NAME, className);

    const contentStyle = {
      // ...style,
      height: this.containerHeight(),
      ...this.getDefaultStyle(),
    };

    const childrenMap: _.Dictionary<typeof children[0]> = _.fromPairs(
      children.filter((child) => child.key).map((child) => [child.key, child])
    );
    const layout = this.getUILayout();
    const mounted = this.isValidMounted();
    this.ref = this.props.innerRef ?? this.innerRef;

    // log.debug("GridLayout render. layout: ", layout, " oriLayout: ", this.state.layout, " extraLayout: ", this.props.extraLayout);
    return (
      <LayoutContainer
        ref={this.ref}
        className={mergedClassName}
        style={style}
        bgColor={this.props.bgColor}
        radius={this.props.radius}
        autoHeight={this.props.autoHeight}
        overflow={this.props.overflow}
        tabIndex={-1}
        onDrop={isDroppable ? this.onDrop : _.noop}
        onDragLeave={isDroppable ? this.onDragLeave : _.noop}
        onDragEnter={isDroppable ? this.onDragEnter : _.noop}
        onDragOver={isDroppable ? this.onDragOver : _.noop}
        onKeyDown={this.onKeyDown}
      >
        <ReactResizeDetector
          onResize={(width?: number, height?: number) => {
            if (height) this.innerHeight = height;
          }}
          observerOptions={{ box: "border-box" }}
        >
          <div style={contentStyle}>
            {showGridLines && this.gridLines()}
            {mounted &&
              Object.values(layout).map((item) => this.processGridItem(item, childrenMap))}
            {this.hintPlaceholder()}
          </div>
        </ReactResizeDetector>
      </LayoutContainer>
    );
  }
}

const LayoutContainer = styled.div<{
  bgColor?: string;
  autoHeight?: boolean;
  overflow?: string;
  radius?: string;
}>`
  border-radius: ${(props) => props.radius ?? "4px"};
  background-color: ${(props) => props.bgColor ?? "#f5f5f6"};
  /* height: 100%; */
  height: ${(props) => (props.autoHeight ? "auto" : "100%")};

  overflow: auto;
  overflow: ${(props) => props.overflow ?? "overlay"};
  ${(props) =>
    props.autoHeight &&
    `::-webkit-scrollbar {
    display: none;
  }`}
`;

export const ReactGridLayout = GridLayout;

function moveOrResize(
  e: React.KeyboardEvent,
  isResize: boolean,
  layout: Layout,
  extraLayout: ExtraLayout,
  positionParams: PositionParams
) {
  const selectedKeys = Object.keys(layout).filter((k) => extraLayout[k]?.isSelected);
  if (selectedKeys.length === 0 || (isResize && selectedKeys.length !== 1)) {
    return;
  }
  e.preventDefault();
  const newSelectLayout: Layout = {};
  const newOps: LayoutOps = [];
  for (const key of selectedKeys) {
    const newItem = getNewLayoutItem(e, isResize, layout[key], extraLayout[key]);
    if (!newItem || !isValidLayoutItem(newItem, positionParams)) {
      return;
    }
    newSelectLayout[key] = newItem;
    newOps.push(changeItemOp(key, newItem));
  }
  const otherKeys = Object.keys(layout).filter((k) => !newSelectLayout[k]);
  for (const newItem of Object.values(newSelectLayout)) {
    if (otherKeys.some((k) => collides(newItem, layout[k]))) {
      return;
    }
  }
  return newOps;
}

function getNewLayoutItem(
  e: React.KeyboardEvent,
  isResize: boolean,
  item: LayoutItem,
  extraItem?: ExtraItem
) {
  if (isResize) {
    if (isItemResizable(item)) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (canResizeRight(item, extraItem)) {
          return { ...item, w: item.w + (e.key === "ArrowLeft" ? -1 : 1) };
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        if (canResizeBottom(item, extraItem)) {
          return { ...item, h: item.h + (e.key === "ArrowUp" ? -1 : 1) };
        }
      }
    }
  } else if (isItemDraggable(item)) {
    const x = item.x + (e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0);
    const y = item.y + (e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0);
    return { ...item, x, y };
  }
}
