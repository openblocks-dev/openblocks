import { Drawer as AntdDrawer, DrawerProps as AntdDrawerProps } from "antd";
import Handle from "./Modal/handler";
import { useEffect, useMemo, useState } from "react";
import { Resizable, ResizeHandle } from "react-resizable";
import { useResizeDetector } from "react-resize-detector";
import styled from "styled-components";

const StyledDrawer = styled(AntdDrawer)`
  & .ant-drawer-content-wrapper {
    transition-duration: 0s;
  }
`;

type Placement = "top" | "bottom" | "left" | "right";
function getResizeHandle(placement?: Placement): ResizeHandle {
  switch (placement) {
    case "top":
      return "s";
    case "bottom":
      return "n";
    case "left":
      return "e";
  }
  return "w";
}

type DrawerProps = {
  resizable?: boolean;
  onResizeStart?: (
    e: React.SyntheticEvent,
    node: HTMLElement,
    size: { width: number; height: number },
    handle: ResizeHandle
  ) => void;
  onResize?: (
    e: React.SyntheticEvent,
    node: HTMLElement,
    size: { width: number; height: number },
    handle: ResizeHandle
  ) => void;
  onResizeStop?: (
    e: React.SyntheticEvent,
    node: HTMLElement,
    size: { width: number; height: number },
    handle: ResizeHandle
  ) => void;
} & AntdDrawerProps;

export function Drawer(props: DrawerProps) {
  const { resizable, width: drawerWidth, height: drawerHeight, children, ...otherProps } = props;
  const placement = useMemo(() => props.placement ?? "right", [props.placement]);
  const resizeHandles = useMemo(
    () => (resizable ? [getResizeHandle(placement)] : []),
    [placement, resizable]
  );
  const isTopBom = ["top", "bottom"].includes(placement);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    setWidth(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerWidth]);
  useEffect(() => {
    setHeight(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerHeight]);
  const { width: detectWidth, height: detectHeight, ref } = useResizeDetector();
  // log.info("Drawer. drawerWidth: ", drawerWidth, " width: ", width, "detectWidth: ", detectWidth);
  return (
    <StyledDrawer width={width ?? drawerWidth} height={height ?? drawerHeight} {...otherProps}>
      <Resizable
        width={width ?? detectWidth ?? 0}
        height={height ?? detectHeight ?? 0}
        resizeHandles={resizeHandles}
        handle={Handle}
        onResizeStart={(event, { node, size, handle }) =>
          props.onResizeStart?.(event, node, size, handle)
        }
        onResize={(event, { node, size, handle }) => {
          isTopBom ? setHeight(size.height) : setWidth(size.width);
          props.onResize?.(event, node, size, handle);
        }}
        onResizeStop={(event, { node, size, handle }) =>
          props.onResizeStop?.(event, node, size, handle)
        }
      >
        <div ref={ref} style={{ height: "100%" }}>
          {children}
        </div>
      </Resizable>
    </StyledDrawer>
  );
}
