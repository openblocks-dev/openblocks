import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";
import { IDropData } from "./types";

interface IDroppablePlaceholderProps {
  path: number[];
  disabled?: boolean;
  targetListSize: number;
}

const PlaceHolderWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  width: 100%;
  top: -4px;
  height: 25px;
  z-index: 10;
  /* background-color: rgba(0, 0, 0, 0.2); */
  .position-line {
    height: 4px;
    border-radius: 4px;
    background-color: ${(props) => (props.active ? "#315efb" : "transparent")};
    width: 100%;
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
  return (
    <PlaceHolderWrapper active={isOver} ref={setDropNodeRef}>
      <div className="position-line"></div>
    </PlaceHolderWrapper>
  );
}
