import type { ReactElement, RefObject } from "react";
import { ReactNode } from "react";
import { DraggableEvent } from "react-draggable";
import { PositionParams } from "./calculateUtils";
import { ExtraLayout, Layout, LayoutItem, OnDragCallback, ResizeEventCallback } from "./utils";
// util
export type ReactRef<T extends HTMLElement> = {
  readonly current: T | null;
};
// Defines which resize handles should be rendered (default: 'se')
// Allows for any combination of:
// 's' - South handle (bottom-center)
// 'w' - West handle (left-center)
// 'e' - East handle (right-center)
// 'n' - North handle (top-center)
// 'sw' - Southwest handle (bottom-left)
// 'nw' - Northwest handle (top-left)
// 'se' - Southeast handle (bottom-right)
// 'ne' - Northeast handle (top-right)
// Custom component for resize handles
export type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
export type ResizeHandle =
  | ReactNode
  | ((resizeHandleAxis: ResizeHandleAxis, ref: ReactRef<HTMLElement>) => ReactNode);

export type GridLayoutProps = {
  className?: string;
  style?: Record<string, any>;
  width: number;
  cols?: number;
  layout: Layout;
  extraLayout?: ExtraLayout;
  margin?: [number, number];
  containerPadding?: [number, number];
  rowHeight?: number;
  isRowCountLocked?: boolean;
  emptyRows?: number;
  maxRows?: number;
  isDraggable?: boolean;
  isResizable?: boolean;
  isDroppable?: boolean;
  isSelectable?: boolean;
  transformScale?: number;
  droppingItem?: Partial<LayoutItem>;
  // Callbacks
  onRowHeightChange?: (rowHeight: number) => void;
  onLayoutChange?: (layout: Layout) => void;
  onFlyStart?: (layout: Layout, layoutItems: Layout) => void;
  onFlyDrop?: (layout: Layout, layoutItems: Layout) => void;
  onResizeStart?: ResizeEventCallback;
  onResize?: ResizeEventCallback;
  onResizeStop?: ResizeEventCallback;
  onDropDragOver?: (
    e: DraggableEvent
  ) => { size: { w?: number; h?: number }; positionParams?: PositionParams } | undefined;
  onDrop?: OnDragCallback;
  children: ReactElement[];
  innerRef?: RefObject<HTMLDivElement>;
  scrollContainerRef?: RefObject<HTMLDivElement>;

  showGridLines?: boolean;
  autoHeight?: boolean;
  overflow?: string;
  minHeight?: string;
  extraHeight?: string;
  bgColor?: string;
  radius?: string;
  hintPlaceholder?: ReactNode;
  selectedSize?: number;
  clickItem?: (e: React.MouseEvent<HTMLDivElement>, name: string) => void;
  isCanvas?: boolean;
  // the display space in the top and bottom of the nameDiv
  showName?: { top?: number; bottom?: number };
  disableDirectionKey?: boolean;
};
