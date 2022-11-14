import styled, { css } from "styled-components";

type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
type ReactRef<T extends HTMLElement> = {
  readonly current: T | null;
};

const color = "rgb(118, 136, 150)";
const EdgeHandle = css`
  &::before {
    position: absolute;
    // background: ${color};
    content: "";
  }
  // small middle circles
  &::after {
    position: absolute;
    content: "";
    width: 6px;
    height: 6px;
    // border-radius: 50%;
    // background: ${color};
    top: calc(50% - 2px);
    left: calc(50% - 2px);
    border: none !important;
  }
`;

const HorizontalHandle = css<{ axis: string }>`
  ${EdgeHandle}
  ${(props) => (props.axis === "s" ? "bottom: -10px;" : "top: -10px;")}
  /* left: -4px; */
  height: 12px !important;
  /* width: calc(100% + 8px) !important; */
  width: 100%;
  cursor: row-resize;
  &::before {
    top: 50%;
    right: 0px;
    left: 0px;
    height: 1px;
  }
`;

const VerticalHandleStyles = css<{ axis: string }>`
  ${EdgeHandle}
  ${(props) => (props.axis === "e" ? "right: -10px;" : "left: -10px;")}
  width: 12px !important;
  top: 0px;
  /* height: calc(100% + 8px) !important; */
  height: 100%;
  cursor: col-resize;
  &::before {
    left: 50%;
    bottom: 0px;
    top: 0px;
    width: 1px;
  }
`;

const CornerHandle = css<{ axis: string }>`
  position: absolute;
  z-index: 3;
  width: 10px !important;
  height: 10px !important;
  &::after {
    width: 10px !important;
    height: 10px !important;
    border: none !important;
  }
  cursor: ${(props) => props.axis + "-resize"} !important;
  ${(props) => (["nw", "ne"].indexOf(props.axis) >= 0 ? "top: -5px;" : "")};
  ${(props) => (["sw", "se"].indexOf(props.axis) >= 0 ? "bottom: -5px;" : "")};
  ${(props) => (["sw", "nw"].indexOf(props.axis) >= 0 ? "left: -5px;" : "")};
  ${(props) => (["se", "ne"].indexOf(props.axis) >= 0 ? "right: -5px;" : "")};
`;

const ResizeHandle = styled.div<{ axis: string }>`
  position: absolute;
  background-image: none;
  ${(props) => (["s", "n"].indexOf(props.axis) >= 0 ? HorizontalHandle : "")};
  ${(props) => (["w", "e"].indexOf(props.axis) >= 0 ? VerticalHandleStyles : "")};
  ${(props) => (["sw", "nw", "se", "ne"].indexOf(props.axis) >= 0 ? CornerHandle : "")};
`;

const Handle = (axis: ResizeHandleAxis, ref: ReactRef<HTMLDivElement>) => {
  return <ResizeHandle ref={ref} axis={axis} className={`react-resizable-handle`}></ResizeHandle>;
};

export default Handle;
