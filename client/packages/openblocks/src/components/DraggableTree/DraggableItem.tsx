import React, { Ref, useContext } from "react";
import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { DraggableTreeContext } from "./DraggableTreeContext";

const Wrapper = styled.div<{
  showPositionLine: boolean;
  dragging: boolean;
  isOver: boolean;
  dropInAsSub: boolean;
  positionLineHeight?: number;
  showPositionLineDot?: boolean;
  positionLineDotDiameter?: number;
  positionLineIndent?: number;
  itemHeight?: number;
}>`
  position: relative;
  width: 100%;
  height: ${(props) => props.itemHeight ?? 30}px;
  /* border: 1px solid #d7d9e0; */
  border-radius: 4px;
  margin-bottom: ${(props) => props.positionLineHeight ?? 4}px;
  display: flex;
  /* padding: 0 8px; */
  align-items: center;
  opacity: ${(props) => (props.dragging ? "0.5" : 1)};

  &::before {
    content: "";
    display: ${(props) =>
      (props.showPositionLineDot ?? false) && props.isOver && props.showPositionLine
        ? "block"
        : "none"};
    position: absolute;
    background-color: #315efb;
    height: ${(props) => props.positionLineDotDiameter}px;
    width: ${(props) => props.positionLineDotDiameter}px;
    left: 0;
    border-radius: 100%;
    bottom: ${(props) =>
      -(props.positionLineHeight ?? 4) -
      ((props.positionLineDotDiameter ?? 8) - (props.positionLineHeight ?? 4)) / 2}px;
    left: ${(props) => props.positionLineIndent ?? (props.dropInAsSub ? 15 : -1)}px;
    z-index: 1;
  }

  &::after {
    content: "";
    display: ${(props) => (props.isOver && props.showPositionLine ? "block" : "none")};
    height: ${(props) => props.positionLineHeight ?? 4}px;
    border-radius: 4px;
    position: absolute;
    left: ${(props) => props.positionLineIndent ?? (props.dropInAsSub ? 15 : -1)}px;
    right: 0;
    background-color: #315efb;
    bottom: ${(props) => -(props.positionLineHeight ?? 4)}px;
  }
`;

interface IProps extends HTMLAttributes<HTMLDivElement> {
  isOver?: boolean;
  extra?: ReactNode;
  dragging?: boolean;
  dropInAsSub?: boolean;
  dragListeners?: Record<string, Function>;
  path: number[];
}

function DraggableItem(props: IProps, ref: Ref<HTMLDivElement>) {
  const {
    extra,
    dragging = false,
    dropInAsSub = true,
    isOver = false,
    dragListeners,
    children,
    path,
    ...divProps
  } = props;
  const context = useContext(DraggableTreeContext);
  const positionLineIndent = context.positionLineIndent?.(path, dropInAsSub);
  const showPositionLine = (context.showDropInPositionLine ?? true) || !dropInAsSub;
  return (
    <Wrapper
      showPositionLine={showPositionLine}
      positionLineIndent={positionLineIndent}
      positionLineDotDiameter={context.positionLineDotDiameter}
      showPositionLineDot={context.showPositionLineDot}
      positionLineHeight={context.positionLineHeight}
      itemHeight={context.itemHeight}
      isOver={isOver}
      dragging={dragging}
      dropInAsSub={dropInAsSub}
      ref={ref}
      {...divProps}
      {...dragListeners}
    >
      {children}
    </Wrapper>
  );
}

export default React.forwardRef(DraggableItem);
