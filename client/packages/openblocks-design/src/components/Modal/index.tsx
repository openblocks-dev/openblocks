import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import { useEffect, useState } from "react";
import { Resizable, ResizeHandle } from "react-resizable";
import { useResizeDetector } from "react-resize-detector";
import Handle from "./handler";

type ModalProps = {
  height?: number | string;
  resizeHandles?: ResizeHandle[];
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
} & AntdModalProps;

export function Modal(props: ModalProps) {
  const {
    resizeHandles,
    width: modalWidth,
    height: modalHeight,
    bodyStyle,
    children,
    ...otherProps
  } = props;

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    setWidth(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalWidth]);
  useEffect(() => {
    setHeight(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalHeight]);

  const { width: detectWidth, height: detectHeight, ref } = useResizeDetector();
  // log.info("Modal. modalWidth: ", modalWidth, " width: ", size?.w, " detectWidth: ", detectWidth);
  return (
    <AntdModal
      width={width ?? modalWidth}
      bodyStyle={{ height: height ?? modalHeight, ...bodyStyle }}
      {...otherProps}
    >
      <Resizable
        width={width ?? detectWidth ?? 0}
        height={height ?? detectHeight ?? 0}
        resizeHandles={resizeHandles}
        handle={Handle}
        onResizeStart={(event, { node, size, handle }) =>
          props.onResizeStart?.(event, node, size, handle)
        }
        onResize={(event, { node, size, handle }) => {
          setWidth(size.width);
          setHeight(size.height);
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
    </AntdModal>
  );
}
