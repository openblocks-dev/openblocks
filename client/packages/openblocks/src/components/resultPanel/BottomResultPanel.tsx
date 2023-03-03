import styled from "styled-components";
import Draggable from "react-draggable";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import { EditorContext } from "../../comps/editorState";
import { Layers } from "constants/Layers";
import { HeaderWrapper, useResultPanel } from "./index";

const Wrapper = styled.div<{ bottom?: number }>`
  right: calc(313px + 4px); // FIXME: don't rely on the width of the right panel
  bottom: ${(props) => (props.bottom ? props.bottom + 4 + "px" : 285 + 4 + "px")};
  position: fixed;
  z-index: ${Layers.queryResultPanel};

  display: flex;
  flex-direction: column;
  width: 592px;
  height: fit-content;
  max-height: 250px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  pointer-events: auto;
  padding-bottom: 16px;
`;

interface BottomResultPanelProps {
  bottom: number;
}

export const BottomResultPanel = (props: BottomResultPanelProps) => {
  const { bottom } = props;
  const editorState = useContext(EditorContext);
  const showResultComp = editorState.showResultComp();
  const result = showResultComp?.result();

  const draggableRef = useRef<HTMLDivElement>(null);
  const [unDraggable, setUnDraggable] = useState(true);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const { header, body } = useResultPanel({
    ...(result ?? { data: "", dataType: "default", success: true }),
    onClose: () => editorState.setShowResultCompName(undefined),
  });

  if (!result) {
    return null;
  }

  return (
    <Draggable
      disabled={unDraggable}
      bounds={bounds}
      enableUserSelectHack={false}
      onStart={(event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggableRef.current?.getBoundingClientRect();
        if (!targetRect) {
          return;
        }
        setBounds({
          left: -targetRect.left + uiData.x,
          right: clientWidth - (targetRect.right - uiData.x),
          top: -targetRect.top + uiData.y,
          bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
      }}
    >
      <Wrapper bottom={bottom} ref={draggableRef}>
        <HeaderWrapper
          onMouseOver={() => setUnDraggable(false)}
          onMouseOut={() => setUnDraggable(true)}
        >
          {header}
        </HeaderWrapper>
        {body}
      </Wrapper>
    </Draggable>
  );
};
