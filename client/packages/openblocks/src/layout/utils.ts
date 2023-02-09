import { UICompType } from "comps/uiCompRegistry";
import _ from "lodash";
import React, { ReactElement, SyntheticEvent } from "react";
import { DraggableEvent } from "react-draggable";
import { PositionParams } from "./calculateUtils";
import { draggingUtils } from "./draggingUtils";
import { GridLayoutProps, ResizeHandleAxis } from "./gridLayoutPropTypes";

export type LayoutItem = {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  // dragging items has higher colliding priority
  isDragging?: boolean;
  // just take the position, no display, no collision
  hide?: boolean;
  // placeholder, display the div box, without loading the child
  placeholder?: boolean;
  // mainly solve the container collision problem
  delayCollision?: boolean;
  resizeHandles?: ResizeHandleAxis[];
};
export type ExtraItem = {
  name: string;
  compType: UICompType;
  autoHeight?: boolean;
  isSelected?: boolean;
  hidden?: boolean;
};
export type Layout = Record<string, LayoutItem>;
export type ExtraLayout = Record<string, ExtraItem>;
export type Position = {
  left: number;
  top: number;
  width: number;
  height: number;
};
export type PartialPosition = {
  left: number;
  top: number;
};
export type Size = {
  width: number;
  height: number;
};
export type GridDragEvent = {
  e: DraggableEvent;
  node: HTMLElement;
  newPosition: PartialPosition;
};
export type GridResizeEvent = {
  e: SyntheticEvent<Element>;
  node: HTMLElement;
  size: Size;
  handle: ResizeHandleAxis;
  x: number;
  y: number;
};

export type OnDragCallback = (
  layout: Layout,
  keys: Layout,
  e: React.DragEvent<HTMLElement>
) => void;
// All callbacks are of the signature (layout, oldItem, newItem, placeholder, e).
export type EventCallback = (
  layout: Layout,
  oldItem: LayoutItem | undefined,
  newItem: LayoutItem | undefined,
  placeholder: LayoutItem | undefined,
  e: DraggableEvent,
  node: HTMLElement | undefined
) => void;

export type ResizeEventCallback = (
  layout: Layout,
  oldItem: LayoutItem | undefined,
  newItem: LayoutItem | undefined,
  placeholder: LayoutItem | undefined,
  e: SyntheticEvent<Element>,
  node: HTMLElement | undefined
) => void;

const isProduction = process.env.NODE_ENV === "production";

/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
export function bottom(layout: Layout): number {
  const res = _.max(Object.values(layout).map((item) => item.y + item.h)) ?? 0;
  return _.max([res, 0]) ?? 0;
}

// Modify a layoutItem inside a layout. Returns a new Layout,
// does not mutate. Carries over all other LayoutItems unmodified.
export function modifyLayout(layout: Layout, layoutItem: LayoutItem): Layout {
  return { ...layout, [layoutItem.i]: layoutItem };
}

// Function to be called to modify a layout item.
// Does defensive clones to ensure the layout is not modified.
export function withLayoutItem(
  layout: Layout,
  itemKey: string,
  cb: (arg0: LayoutItem) => LayoutItem
): [Layout, LayoutItem | undefined] {
  if (!layout.hasOwnProperty(itemKey)) {
    return [layout, undefined];
  }
  layout = _.mapValues(layout, (item) => (item.i === itemKey ? cb(cloneLayoutItem(item)) : item));
  return [layout, layout[itemKey]];
}

export function cloneLayoutItem(layoutItem: LayoutItem): LayoutItem {
  return { ...layoutItem };
}

/**
 * Comparing React `children` is a bit difficult. This is a good way to compare them.
 * This will catch differences in keys, order, and length.
 */
export function childrenEqual(a: ReactElement[], b: ReactElement[]): boolean {
  const aKey = React.Children.map(a, (c) => c?.key);
  const bKey = React.Children.map(b, (c) => c?.key);
  return _.isEqual(aKey, bKey);
}

/**
 * See `fastRGLPropsEqual.js`.
 * We want this to run as fast as possible - it is called often - and to be
 * resilient to new props that we add. So rather than call lodash.isEqual,
 * which isn't suited to comparing props very well, we use this specialized
 * function in conjunction with preval to generate the fastest possible comparison
 * function, tuned for exactly our props.
 */
type FastRGLPropsEqual = (
  arg0: Record<string, any>,
  arg1: Record<string, any>,
  arg2: (...args: Array<any>) => any
) => boolean;

export function gridLayoutPropsEquals(a: GridLayoutProps, b: GridLayoutProps) {
  if (a === b) {
    return true;
  }
  return _.isEqual(a, b);
}

/**
 * Given two layoutitems, check if they collide.
 */
export function collides(l1: LayoutItem, l2: LayoutItem): boolean {
  if (l1.i === l2.i) return false; // same element

  if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2
  if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2
  if (l1.y + l1.h <= l2.y) return false; // l1 is above l2
  if (l1.y >= l2.y + l2.h) return false; // l1 is below l2

  return true; // boxes overlap
}

/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * Modifies layout items.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} bounds Number of columns.
 */
export function correctBounds(layout: Layout, cols: number): Layout {
  for (const l of Object.values(layout)) {
    if (l.w > cols) l.w = cols;
    if (l.x + l.w > cols) l.x = cols - l.w;
  }
  return layout;
}

/**
 * Get all static elements.
 * @param  {Array} layout Array of layout objects.
 * @return {Array}        Array of static layout items..
 */
export function getStatics(layout: Layout): Layout {
  return _.pickBy(layout, (l) => l.static);
}

export function setTransform({ top, left, width, height }: Position): Record<string, any> {
  // Replace unitless items with px
  const translate = `translate(${left}px,${top}px)`;
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: `${width}px`,
    height: `${height}px`,
    position: "absolute",
  };
}

/**
 * Generate a layout using the initialLayout and children as a template.
 * Missing entries will be added, extraneous ones will be truncated.
 *
 * Does not modify initialLayout.
 *
 * @param  {Array}  initialLayout Layout passed in through props.
 * @param  {String} breakpoint    Current responsive breakpoint.
 * @param  {?String} compact      Compaction option.
 * @return {Array}                Working layout.
 */
export function synchronizeLayoutWithChildren(
  initialLayout: Layout,
  children: ReactElement[],
  cols: number
): Layout {
  initialLayout = initialLayout || {};
  // Generate one layout item per child.
  const layout: Layout = {};
  React.Children.forEach(children, (child: ReactElement) => {
    // Child may not exist
    if (child?.key == null) return;
    // Don't overwrite if it already exists.
    const exists = initialLayout[child.key];

    if (exists) {
      layout[exists.i] = cloneLayoutItem(exists);
    } else {
      // Nothing provided: ensure this is added to the bottom
      // FIXME clone not really necessary here
      // layout[child.key] = cloneLayoutItem({
      //   w: 1,
      //   h: 1,
      //   x: 0,
      //   y: bottom(layout),
      //   i: String(child.key),
      // });
    }
  });
  // Correct the layout.
  const correctedLayout = correctBounds(layout, cols);
  // const cascadedLayout = cascade(correctedLayout);
  // log.debug("layout: synchronizeLayout. layout: ", cascadedLayout);
  return correctedLayout;
}

/**
 *
 * solve collision, pass collision
 * - first make sure there're no collisions between static items and extra items
 *   - return `success: false`, if collision
 *   - append extra items info static items, if no collision
 * - sort layout by y-axis
 * - iterate items in layout
 *   - if one item collides with static items, move down
 *   - append into static items after settle down
 *
 * @note assume there're no collisions except extra items in layout
 * @param layout layout with collision
 * @param priorLayout items which should not be moved, commonly as the dragging items
 * @returns layout without collision
 *
 */
export function cascade(layout: Layout, priorLayout: Layout = {}): Layout {
  // log.debug("layout: cascade begin. layout: ", layout, " priorLayout: ", priorLayout);
  priorLayout = _.assignIn(
    priorLayout,
    _.mapValues(
      _.pickBy(layout, (item) => item.isDragging),
      (item) => ({ ...item, isDragging: undefined })
    )
  );
  layout = _.mapValues(layout, (item) => ({ ...item, isDragging: undefined }));
  let staticLayout = getStatics(layout);
  staticLayout = { ...staticLayout, ...priorLayout };
  if (_.size(priorLayout) > 0) {
    staticLayout = cascade(staticLayout);
  }

  // sort items by y
  const sortedItems: LayoutItem[] = _.sortBy(Object.values(layout), (item) => item.y);
  // sort static items also by y, and dynamically maintain the order
  let sortedCollisionAreas: LayoutItem[] = _.sortBy(Object.values(staticLayout), (item) => item.y);

  const newLayout: Layout = {};
  for (const item of sortedItems) {
    let newItem;
    if (staticLayout.hasOwnProperty(item.i)) {
      newItem = staticLayout[item.i];
    } else if (!!item.hide) {
      newItem = item;
    } else {
      sortedCollisionAreas = shrinkLayoutByMinY(sortedCollisionAreas, item.y);
      let collisionArea: LayoutItem;
      [newItem, collisionArea] = moveToSolveCollisions(item, sortedCollisionAreas);
      insertWithOrders(sortedCollisionAreas, collisionArea);
    }
    newLayout[newItem.i] = newItem;
    // log.warn("loop item: ", newItem, " hide: ", item.hide, " sortedCollisionAreas: ", { ...sortedCollisionAreas }, " newLayout: ", { ...newLayout });
  }

  // log.debug("layout: cascade. layout: ", layout, " priorLayout: ", priorLayout, " newLayout: ", newLayout, " staticLayout: ", staticLayout);
  return newLayout;
}

// ignore items already iterated
function shrinkLayoutByMinY(items: LayoutItem[], y: number): LayoutItem[] {
  return items.filter((item) => item.y + item.h > y);
}

/**
 * move itemToMove to solve collision, a collision area will be created afterwords
 *
 * @return [@movedItem, @collisionArea]
 * @movedItem moved item
 * @collisionArea this area should not be occupied within latter collision solving
 *
 * FIXME: add unittest
 */
function moveToSolveCollisions(
  itemToMove: LayoutItem,
  items: LayoutItem[]
): [LayoutItem, LayoutItem] {
  const newItem = cloneLayoutItem(itemToMove);
  let collisionArea = newItem;
  for (const item of items) {
    if (newItem.y + newItem.h < item.y) {
      break;
    }
    const deltaY = deltaYToSolveCollision(newItem, item);
    // log.warn("itemToMove: ", newItem, " item: ", item, " deltaY: ", deltaY);
    if (deltaY > 0) {
      collisionArea = { ...collisionArea, h: collisionArea.h + deltaY };
    }
    newItem.y += deltaY;
  }
  return [newItem, collisionArea];
}

// move itemToMove to solve the collision
function deltaYToSolveCollision(itemToMove: LayoutItem, staticItem: LayoutItem): number {
  if (!collides(itemToMove, staticItem)) {
    return 0;
  }
  return staticItem.y + staticItem.h - itemToMove.y;
}

function insertWithOrders(items: LayoutItem[], newItem: LayoutItem) {
  items.push(newItem);
  let idx;
  for (idx = items.length - 1; idx > 0; idx--) {
    const item = items[idx - 1];
    if (newItem.y < item.y || (newItem.y === item.y && newItem.x < item.x)) {
      items[idx] = item;
    } else {
      break;
    }
  }
  items[idx] = newItem;
}

export function calcResizeXY(
  handle: string,
  deltaW: number,
  deltaH: number
): { deltaX: number; deltaY: number } {
  let deltaX = 0;
  let deltaY = 0;
  if (handle.indexOf("w") > -1) {
    deltaX -= deltaW;
  }
  if (handle.indexOf("n") > -1) {
    deltaY -= deltaH;
  }
  return { deltaX, deltaY };
}

export function getDraggingNewPosition(
  dragging: PartialPosition,
  deltaX: number,
  deltaY: number
): PartialPosition {
  let top = dragging.top + deltaY;
  let left = dragging.left + deltaX;
  return { top, left };
}

export function calcOffsetXY(
  e: React.DragEvent<HTMLElement>,
  node: HTMLDivElement,
  transformScale: number = 1.0
): {
  offsetX: number;
  offsetY: number;
} {
  const parentRect = node.getBoundingClientRect();
  const offsetX = (e.clientX - parentRect.left) / transformScale;
  const offsetY = (e.clientY - parentRect.top) / transformScale;
  // log.debug(`layout: calcOffsetXY. node: `, node, `, clientX: ${e.clientX}, clientY: ${e.clientY}, parentX: ${parentRect.left}, parentY: ${parentRect.top}`);
  // log.debug("layout: calcOffsetXY. client: ", e, " parent: ", parentRect);
  return { offsetX, offsetY };
}

export function isOutOfBox(item: LayoutItem): boolean {
  return item.x < 0 || item.y < 0 || !!item.hide;
}

export function isItemDraggable(item: LayoutItem) {
  return _.isNil(item.isDraggable) || item.isDraggable;
}

export function isItemResizable(item: LayoutItem) {
  return _.isNil(item.isResizable) || item.isResizable;
}

function getResizeHandles(isSelected?: boolean, autoHeight?: boolean): Array<ResizeHandleAxis> {
  return isSelected ? (autoHeight ? ["e", "w"] : ["s", "n", "w", "e", "sw", "nw", "se", "ne"]) : [];
}

export function getItemResizeHandles(item: LayoutItem, extraItem?: ExtraItem): ResizeHandleAxis[] {
  return item.resizeHandles && _.size(item.resizeHandles) !== 0
    ? item.resizeHandles
    : getResizeHandles(extraItem?.isSelected, extraItem?.autoHeight);
}

export function canResizeRight(item: LayoutItem, extraItem?: ExtraItem) {
  return getItemResizeHandles(item, extraItem).some((t) => t.includes("e"));
}

export function canResizeBottom(item: LayoutItem, extraItem?: ExtraItem) {
  return getItemResizeHandles(item, extraItem).some((t) => t.includes("s"));
}

/**
 * build adjcent list if there're adjcent items below every item
 */
export function getStickyItemMap(layout: Layout): Record<string, Set<string>> {
  const pairs = Object.values(layout).map((item) => {
    const stickyItems = Object.values(layout)
      .filter(
        (stickyItem) =>
          item.y + item.h === stickyItem.y &&
          item.x < stickyItem.x + stickyItem.w &&
          stickyItem.x < item.x + item.w &&
          item.i !== stickyItem.i
      )
      .map((stickyItem) => stickyItem.i);
    return [item.i, new Set<string>(stickyItems)];
  });
  return _.fromPairs(pairs);
}

export function changeStickyItem(
  layout: Layout,
  changeItem: LayoutItem,
  stickyItemMap?: Record<string, Set<string>>
): Layout {
  layout = { ...layout, [changeItem.i]: changeItem };
  if (!stickyItemMap) {
    return layout;
  }
  const queue = [changeItem.i];
  while (queue.length > 0) {
    const key = queue.shift() as string;
    const item = layout[key];
    if (stickyItemMap.hasOwnProperty(key)) {
      stickyItemMap[key].forEach((stickyKey) => {
        const stickyItem = layout[stickyKey];
        if (stickyItem && !isOutOfBox(stickyItem)) {
          // sticky operation can't chagne the up-down relation, implement this by calculating the minimum sticky coordinate
          const stickyMinY = calcStickyMinY(layout, stickyKey);
          layout[stickyKey] = {
            ...stickyItem,
            y: Math.max(item.y + item.h, stickyMinY),
            // isDragging: true,
          };
          stickyItem.h > 0 && queue.push(stickyKey);
        }
      });
    }
  }
  return layout;
}

function calcStickyMinY(layout: Layout, key: string) {
  const stickyItem = layout[key];
  if (!stickyItem) return 0;
  // log.debug("calcStickyMinY. layout: ", layout, " key: ", key);
  return Object.values(layout)
    .filter((item) => {
      // check item is on top of stickyItem
      return (
        item.x < stickyItem.x + stickyItem.w &&
        stickyItem.x < item.x + item.w &&
        item.y + item.h <= stickyItem.y
      );
    })
    .map((item) => {
      // log.debug("top items: ", item, " y: ", item.y + item.h);
      return item.y + item.h;
    })
    .reduce((prev, cur) => Math.max(prev, cur), 0);
}

export function moveToZero(layout: Layout): Layout {
  const minX = _.min(Object.values(layout).map((item) => item.x)) as number;
  const minY = _.min(Object.values(layout).map((item) => item.y)) as number;
  return _.mapValues(layout, (item) => ({
    ...item,
    x: item.x - minX,
    y: item.y - minY,
  }));
}

// calculate the top-left coordinate of the paste item
export function calcPasteBaseXY(layout: Layout, keys?: string[]): { x: number; y: number } {
  const filterLayout = _.pick(layout, keys ?? []);
  if (_.size(filterLayout) === 0) {
    return { x: 0, y: bottom(layout) };
  }
  const minX = _.min(Object.values(filterLayout).map((item) => item.x)) ?? 0;
  return { x: minX, y: bottom(filterLayout) };
}

/**
 * calculate adjacent items of every items in the layout, to resolve offset issue of multiselect dragging.
 * in order to solve the coordinate-shift problem in multi-dragging
 *
 * brute-force implementation by O(n^2)
 */
export function calcLeftAdjacentItems(layout: Layout): Record<string, string[]> {
  return _.mapValues(layout, (item) => {
    return Object.values(layout)
      .filter((leftItem) => {
        return (
          leftItem.i !== item.i &&
          leftItem.x + leftItem.w === item.x &&
          leftItem.y + leftItem.h > item.y &&
          item.y + item.h > leftItem.y
        );
      })
      .map((leftItem) => leftItem.i);
  });
}

/**
 * keep the items inside the layout by shift
 * if not possible, truncate the right side
 */
export function shiftInside(positionParams: PositionParams, items: LayoutItem[]): LayoutItem[] {
  const minX = Math.min(...items.map((item) => item.x));
  const minY = Math.min(...items.map((item) => item.y));
  const maxX = Math.max(...items.map((item) => item.x + item.w));
  const maxY = Math.max(...items.map((item) => item.y + item.h));
  let deltaX: number = 0;
  let deltaY: number = 0;
  if (minX < 0) {
    // min side first
    deltaX = -minX;
  } else if (maxX > positionParams.cols) {
    // process max side, with min side first
    deltaX = Math.max(positionParams.cols - maxX, -minX);
  }
  if (minY < 0) {
    deltaY = -minY;
  } else if (maxY > positionParams.maxRows) {
    deltaY = Math.max(positionParams.maxRows - maxY, -minY);
  }

  const newItems: LayoutItem[] = items.map((item) => {
    let newItem = {
      ...item,
      x: item.x + deltaX,
      y: item.y + deltaY,
    };
    // min side solved, just check max side
    if (newItem.x + newItem.w > positionParams.cols) {
      // move to min side if exceeded
      newItem.x = Math.max(0, positionParams.cols - newItem.w);
      if (newItem.x + newItem.w > positionParams.cols) {
        // still exceeding after the move, then truncate
        newItem.w = positionParams.cols - newItem.x;
      }
    }
    if (newItem.y + newItem.h > positionParams.maxRows) {
      newItem.y = Math.max(0, positionParams.maxRows - newItem.h);
      if (newItem.y + newItem.h > positionParams.maxRows) {
        newItem.h = positionParams.maxRows - newItem.y;
      }
    }
    return newItem;
  });
  return newItems;
}

/**
 * narrow an item overflowing the boundary, with minimum width of 1
 * @param item item
 * @param start minimun coordinate along the x-axis, Left closed right away
 * @param end maximun coordinate along the x-axis, Left closed right away
 */
export function narrow(item: LayoutItem, start: number = 0, end: number): LayoutItem {
  let { x, w } = item;
  if (x < start) {
    w = Math.max(1, x + w - start);
    x = start;
  }
  if (x + w > end) {
    w = Math.max(1, end - x);
    x = end - w;
  }
  return { ...item, x, w };
}

/**
 * narrow items overflowing the boundary, with minimum width of 1
 * @param items items
 * @param cols maximum width
 */
export function narrowItems(items: LayoutItem[], cols: number): LayoutItem[] {
  // log.debug("start narrowItems. items: ", items);
  // loop from the left
  items = _.sortBy(items, (item) => item.x);
  let newItems: LayoutItem[] = [];
  items.forEach((item) => {
    const start = Math.max(
      0,
      ...newItems
        .filter(
          (newItem) =>
            newItem.y < item.y + item.h &&
            item.y < newItem.y + newItem.h &&
            item.x < newItem.x + newItem.w
        )
        .map((newItem) => newItem.x + newItem.w)
    );
    const newItem = narrow(item, start, Infinity);
    newItems.push(newItem);
  });

  // loop from the right
  items = _.sortBy(newItems, (item) => -(item.x + item.w));
  newItems = [];
  items.forEach((item) => {
    const end = Math.min(
      cols,
      ...newItems
        .filter(
          (newItem) =>
            newItem.y < item.y + item.h &&
            item.y < newItem.y + newItem.h &&
            newItem.x < item.x + item.w
        )
        .map((newItem) => newItem.x)
    );
    const newItem = narrow(item, 0, end);
    // log.debug("item: ", item, " newItems: ", newItems, " end: ", end, " newItem: ", newItem);
    newItems.push(newItem);
  });

  // log.debug("finish narrowItems. items: ", newItems);
  return newItems;
}

export function isValidLayoutItem(item: LayoutItem, positionParams: PositionParams): boolean {
  return (
    item.x >= 0 &&
    item.y >= 0 &&
    item.w > 0 &&
    item.h > 0 &&
    item.x + item.w <= positionParams.cols &&
    item.y + item.h <= positionParams.maxRows
  );
}

function intersect(
  item1: { x: number; y: number; w: number; h: number },
  item2: { x: number; y: number; w: number; h: number }
): boolean {
  return (
    item1.x < item2.x + item2.w &&
    item1.y < item2.y + item2.h &&
    item2.x < item1.x + item1.w &&
    item2.y < item1.y + item1.h
  );
}

export function hasIntersections(items1: LayoutItem[], items2: LayoutItem[]) {
  for (const item1 of items1) {
    for (const item2 of items2) {
      if (intersect(item1, item2)) return true;
    }
  }
  return false;
}

const IN_CANVAS_COUNT = "inCanvasCount";
export function getInCanvasCount() {
  return draggingUtils.getData<number>(IN_CANVAS_COUNT) ?? 0;
}

export function updateInCanvasCount(delta: number) {
  const inCanvas = getInCanvasCount();
  const newInCanvas = Math.max(-1, Math.min(1, inCanvas + delta));
  if (inCanvas !== newInCanvas) {
    // log.debug( "updateInCanvas. delta: ", delta, "inCanvas: ", inCanvas, "newInCanvas: ", newInCanvas);
    draggingUtils.setData(IN_CANVAS_COUNT, newInCanvas);
  }
}

export function edgeScroll(element: HTMLDivElement, topRatio: number) {
  const THR = 0.15;
  if (topRatio < THR) {
    doScroll(element, (THR - topRatio) / THR, -1);
  }
  const bottomRatio = 1 - topRatio;
  if (bottomRatio < THR) {
    doScroll(element, (THR - bottomRatio) / THR, 1);
  }
}

function doScroll(element: HTMLDivElement, ratio: number, step: number) {
  // log.debug("element: ", element, " ratio: ", ratio, " step: ", step);
  element.scrollTop = element.scrollTop + (2 + ratio * 4) * step;
}

export function calcTotalHeight(items: LayoutItem[]) {
  const top = Math.min(...items.map((item) => item.y));
  const bottom = Math.max(...items.map((item) => item.y + item.h));
  return Math.max(0, bottom - top);
}

export type FlowLayoutItem = {
  i: string;
};
export type FlowLayout = Array<FlowLayoutItem>;
