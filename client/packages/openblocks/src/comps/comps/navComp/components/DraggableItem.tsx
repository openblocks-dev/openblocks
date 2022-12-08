import { DragIcon } from "openblocks-design";
import React, { Ref } from "react";
import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ dragging: boolean; isOver: boolean; dropInAsSub: boolean }>`
  position: relative;
  width: 100%;
  height: 30px;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  padding: 0 8px;
  background-color: #ffffff;
  align-items: center;
  opacity: ${(props) => (props.dragging ? "0.5" : 1)};

  &::after {
    content: "";
    display: ${(props) => (props.isOver ? "block" : "none")};
    height: 4px;
    border-radius: 4px;
    position: absolute;
    left: ${(props) => (props.dropInAsSub ? "15px" : "-1px")};
    right: 0;
    background-color: #315efb;
    bottom: -5px;
  }

  .draggable-handle-icon {
    &:hover,
    &:focus {
      cursor: grab;
    }

    &,
    & > svg {
      width: 16px;
      height: 16px;
    }
  }

  .draggable-text {
    color: #333;
    font-size: 13px;
    margin-left: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
    cursor: pointer;

    & > div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
      height: 28px;
      line-height: 28px;
    }
  }

  .draggable-extra-icon {
    cursor: pointer;

    &,
    & > svg {
      width: 16px;
      height: 16px;
    }
  }
`;

interface IProps extends HTMLAttributes<HTMLDivElement> {
  content: ReactNode;
  isOver?: boolean;
  extra?: ReactNode;
  dragging?: boolean;
  dropInAsSub?: boolean;
  dragListeners?: Record<string, Function>;
}

function DraggableItem(props: IProps, ref: Ref<HTMLDivElement>) {
  const {
    content: text,
    extra,
    dragging = false,
    dropInAsSub = true,
    isOver = false,
    dragListeners,
    ...divProps
  } = props;
  return (
    <Wrapper isOver={isOver} dragging={dragging} dropInAsSub={dropInAsSub} ref={ref} {...divProps}>
      <div className="draggable-handle-icon">
        <DragIcon {...dragListeners} />
      </div>
      <div className="draggable-text">{text}</div>
      <div className="draggable-extra-icon">{extra}</div>
    </Wrapper>
  );
}

export default React.forwardRef(DraggableItem);
