import styled from "styled-components";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import { Layers } from "../../constants/Layers";
import { BottomResComp } from "../../types/bottomRes";
import * as React from "react";
import { useState } from "react";
import { HeaderWrapper, useResultPanel } from "./index";

const StyledResizableBox = styled(ResizableBox)`
  position: absolute;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e1e3eb;
  z-index: ${Layers.queryResultPanel};
  width: 100%;
  bottom: 0;
  left: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  .react-resizable-handle {
    position: absolute;
    border-top: transparent solid 3px;
    width: 100%;
    padding: 0 3px 3px 0;
    top: 0;
    cursor: row-resize;
  }
`;
const QueryLibraryResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const preventDefault = (e: any) => {
  e.preventDefault();
};
const addListener = () => {
  window.addEventListener("mousedown", preventDefault);
};
const removeListener = () => {
  window.removeEventListener("mousedown", preventDefault);
};
export const QueryLibraryResultPanel = (props: { comp: BottomResComp; onClose: () => void }) => {
  const result = props.comp?.result();
  const [bottomHeight, setBottomHeight] = useState(360);

  const { header, body } = useResultPanel({
    ...(result ?? { data: "", dataType: "default", success: true }),
    onClose: props.onClose,
  });

  if (!result) {
    return null;
  }

  const clientHeight = document.documentElement.clientHeight;
  const resizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setBottomHeight(data.size.height);
    removeListener();
  };

  return (
    <StyledResizableBox
      width={Infinity}
      height={bottomHeight}
      resizeHandles={["n"]}
      minConstraints={[680, 285]}
      maxConstraints={[Infinity, clientHeight - 48 - 95]}
      onResizeStart={addListener}
      onResizeStop={resizeStop}
    >
      <QueryLibraryResultWrapper>
        <HeaderWrapper style={{ cursor: "default" }}>{header}</HeaderWrapper>
        {body}
      </QueryLibraryResultWrapper>
    </StyledResizableBox>
  );
};
