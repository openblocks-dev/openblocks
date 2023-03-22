import { useDroppable } from "@dnd-kit/core";
import { useContext } from "react";
import styled from "styled-components";
import { DraggableTreeContext } from "./DraggableTreeContext";
import { IDropData } from "./types";

interface IDroppablePlaceholderProps {
  path: number[];
  disabled?: boolean;
  targetListSize: number;
}

const PlaceHolderWrapper = styled.div<{
  active: boolean;
  positionLineIndent?: number;
  positionLineHeight?: number;
  showPositionLineDot?: boolean;
  positionLineDotDiameter?: number;
  itemHeight?: number;
}>`
  pointer-events: none;
  position: absolute;
  width: 100%;
  top: -${(props) => props.positionLineHeight ?? 4}px;
  height: ${(props) => (props.itemHeight ?? 30) * 0.6}px;
  z-index: 10;
  /* background-color: rgba(0, 0, 0, 0.2); */
  .position-line {
    height: ${(props) => props.positionLineHeight ?? 4}px;
    border-radius: 4px;
    background-color: ${(props) => (props.active ? "#315efb" : "transparent")};
    width: 100%;
    margin-left: ${(props) => props.positionLineIndent ?? 0}px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background-color: #315efb;
      display: ${(props) =>
        (props.showPositionLineDot ?? false) && props.active ? "block" : "none"};
      left: 0;
      height: ${(props) => props.positionLineDotDiameter ?? 8}px;
      width: ${(props) => props.positionLineDotDiameter ?? 8}px;
      top: ${(props) =>
        -((props.positionLineDotDiameter ?? 8) - (props.positionLineHeight ?? 4)) / 2}px;
      border-radius: 100%;
    }
  }
`;

export default function DroppablePlaceholder(props: IDroppablePlaceholderProps) {
  const { path, disabled, targetListSize } = props;
  const data: IDropData = {
    targetPath: path,
    targetListSize,
    dropInAsSub: false,
  };
  const { setNodeRef: setDropNodeRef, isOver } = useDroppable({
    id: `p_${path.join("_")}`,
    disabled,
    data,
  });
  const context = useContext(DraggableTreeContext);
  return (
    <PlaceHolderWrapper
      itemHeight={context.itemHeight}
      showPositionLineDot={context.showPositionLineDot}
      positionLineDotDiameter={context.positionLineDotDiameter}
      positionLineHeight={context.positionLineHeight}
      positionLineIndent={context.positionLineIndent?.(path, false)}
      active={isOver}
      ref={setDropNodeRef}
    >
      <div className="position-line"></div>
    </PlaceHolderWrapper>
  );
}
