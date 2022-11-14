import _ from "lodash";
import { GridItemProps } from "./gridItem";
import { GridLayoutProps } from "./gridLayoutPropTypes";
import type { Position } from "./utils";
export type PositionParams = Pick<
  GridItemProps,
  "margin" | "containerPadding" | "containerWidth" | "cols" | "rowHeight" | "maxRows"
>;

export const DEFAULT_GRID_COLUMNS = 24;
export const DEFAULT_ROW_HEIGHT = 8;

export const DEFAULT_POSITION_PARAMS: PositionParams = {
  margin: [0, 0],
  containerPadding: [0, 0],
  containerWidth: 0,
  cols: DEFAULT_GRID_COLUMNS,
  rowHeight: DEFAULT_ROW_HEIGHT,
  maxRows: Infinity,
};

// Helper for generating column width
export function calcGridColWidth(positionParams: PositionParams): number {
  const { margin, containerPadding, containerWidth, cols } = positionParams;
  return (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols;
}

// check whether touch the right or bottom boundary
export function isTouchBound(maxUnits: number, unitSize: number, size: number, offsetPx: number) {
  const offset = Math.round(offsetPx / unitSize);
  return offset + size >= maxUnits;
}

// This can either be called:
// calcGridItemWHPx(w, colWidth, margin[0], false/true)
// or
// calcGridItemWHPx(h, rowHeight, margin[1], false/true)
export function calcGridItemWHPx(
  gridUnits: number,
  colOrRowSize: number,
  marginPx: number,
  isTouchEndBound: boolean
): number {
  // 0 * Infinity === NaN, which causes problems with resize contraints
  if (!Number.isFinite(gridUnits)) return gridUnits;
  let ret = Math.round(colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx);
  return ret;
  // NOTE(2022-08-26): there's not clear reason for the addition 1.5; keep the 1.5 for a while, and then delete it.
  return isTouchEndBound ? ret : ret + 1.5;
}

/**
 * Return position on the page given an x, y, w, h.
 * left, top, width, height are all in pixels.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
 * @param  {Number}  x                      X coordinate in grid units.
 * @param  {Number}  y                      Y coordinate in grid units.
 * @param  {Number}  w                      W coordinate in grid units.
 * @param  {Number}  h                      H coordinate in grid units.
 * @return {Position}                       Object containing coords.
 */
export function calcGridItemPosition(
  positionParams: PositionParams,
  x: number,
  y: number,
  w: number,
  h: number
): Position {
  const { margin, containerPadding, rowHeight } = positionParams;
  const colWidth = calcGridColWidth(positionParams);

  const top = Math.round((rowHeight + margin[1]) * y + containerPadding[1]);
  const left = Math.round((colWidth + margin[0]) * x + containerPadding[0]);

  const { width, height } = calcGridItemSizePx(positionParams, w, h, top, left);

  return { width, height, top, left };
}

export function calcGridItemSizePx(
  positionParams: PositionParams,
  w: number,
  h: number,
  top?: number,
  left?: number
) {
  const { margin, rowHeight, cols, maxRows } = positionParams;
  const colWidth = calcGridColWidth(positionParams);

  const isTouchEBound = left ? isTouchBound(cols, colWidth, w, left) : false;
  // const width = calcGridItemWHPx(w, colWidth, margin[0], isTouchEBound);
  const width = calcGridItemWHPx(w, colWidth, margin[0], false);

  const isTouchSBound = top ? isTouchBound(maxRows, rowHeight, h, top) : false;
  const height = calcGridItemWHPx(h, rowHeight, margin[1], isTouchSBound);
  return { width, height };
}

export function calcPosition(state: Record<string, any>) {
  let width, height, top, left;
  // If resizing, use the exact width and height as returned from resizing callbacks.
  if (state.resizing) {
    width = Math.round(state.resizing.width);
    height = Math.round(state.resizing.height);
  } // Otherwise, calculate from grid units.
  else {
    width = state.position.width;
    height = state.position.height;
  }

  // If dragging, use the exact width and height as returned from dragging callbacks.
  if (state.dragging) {
    top = Math.round(state.dragging.top);
    left = Math.round(state.dragging.left);
  } // Otherwise, calculate from grid units.
  else {
    top = state.position.top;
    left = state.position.left;
  }
  return { width, height, top, left };
}

/**
 * Translate x and y coordinates from pixels to grid units.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
 * @param  {Number} top                     Top position (relative to parent) in pixels.
 * @param  {Number} left                    Left position (relative to parent) in pixels.
 * @param  {Number} w                       W coordinate in grid units.
 * @param  {Number} h                       H coordinate in grid units.
 * @return {Object}                         x and y in grid units.
 */
export function calcXY(
  positionParams: PositionParams,
  top: number,
  left: number,
  w: number,
  h: number,
  needClamp: { x: boolean; y: boolean } = { x: true, y: true }
): { x: number; y: number } {
  const { margin, cols, rowHeight, maxRows, containerPadding } = positionParams;
  const colWidth = calcGridColWidth(positionParams);
  // left = colWidth * x + margin * (x + 1)
  // l = cx + m(x+1)
  // l = cx + mx + m
  // l - m = cx + mx
  // l - m = x(c + m)
  // (l - m) / (c + m) = x
  // x = (left - margin) / (coldWidth + margin)
  let x = Math.round((left - containerPadding[0]) / (colWidth + margin[0]));
  let y = Math.round((top - containerPadding[1]) / (rowHeight + margin[1]));
  // Capping
  if (needClamp.x) {
    x = clamp(x, 0, cols - w);
  }
  if (needClamp.y) {
    y = clamp(y, 0, maxRows - h);
  }
  return { x, y };
}

/**
 * Given a height and width in pixel values, calculate grid units.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calcluations.
 * @param  {Number} height                  Height in pixels.
 * @param  {Number} width                   Width in pixels.
 * @param  {Number} x                       X coordinate in grid units.
 * @param  {Number} y                       Y coordinate in grid units.
 * @return {Object}                         w, h as grid units.
 */
export function calcWH(
  positionParams: PositionParams,
  width: number,
  height: number,
  needClamp: { w: boolean; h: boolean; ceil?: boolean } = { w: true, h: true, ceil: false }
): { w: number; h: number } {
  const { margin, maxRows, cols, rowHeight } = positionParams;
  const colWidth = calcGridColWidth(positionParams);
  // width = colWidth * w - (margin * (w - 1))
  // ...
  // w = (width + margin) / (colWidth + margin)
  const calc = needClamp.ceil ? Math.ceil : Math.round;
  let w = calc((width + margin[0]) / (colWidth + margin[0]));
  let h = calc((height + margin[1]) / (rowHeight + margin[1]));
  if (needClamp.w) {
    w = clamp(w, 1, cols);
  }
  if (needClamp.h) {
    h = clamp(h, 1, maxRows);
  }
  return { w, h };
}

// Similar to _.clamp
export function clamp(num: number, lowerBound?: number, upperBound?: number): number {
  if (!_.isNil(lowerBound)) {
    num = Math.max(num, lowerBound);
  }
  if (!_.isNil(upperBound)) {
    num = Math.min(num, upperBound);
  }
  return num;
}

export function genPositionParams(props: GridLayoutProps): PositionParams {
  const { cols, margin, maxRows, rowHeight, width, containerPadding } =
    props as Required<GridLayoutProps>;
  const params = {
    cols,
    margin,
    maxRows,
    rowHeight,
    containerWidth: width,
    containerPadding: containerPadding ?? margin,
  };
  return params;
}

/**
 * convert size units when move an item through containers.
 */
export function switchLayoutWH(
  w: number,
  h: number,
  sourceParams: PositionParams,
  targetParams: PositionParams
): { w: number; h: number } {
  const { width, height } = calcGridItemSizePx(sourceParams, w, h);
  return calcWH(targetParams, width, height);
}

export function calcRowCount(
  containerHeight: number,
  containerTopBottomPadding: number,
  rowHeight: number
): number {
  return Math.floor((containerHeight - containerTopBottomPadding * 2) / rowHeight);
}

export function calcRowHeight(
  containerHeight: number,
  containerTopBottomPadding: number,
  rowCount: number
): number {
  return (containerHeight - containerTopBottomPadding * 2) / rowCount;
}
