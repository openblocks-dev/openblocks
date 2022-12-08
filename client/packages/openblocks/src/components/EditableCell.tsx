import { constantColors } from "openblocks-design";
import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { developEnv } from "util/envUtils";

export const TABLE_EDITABLE_SWITCH_ON = developEnv();
export type UpdateChangeSet<T> = (value: T) => void;

// a top-right triangle chip
const EditableChip = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 2;

  width: 0px;
  height: 0px;
  border: 4.5px solid transparent;
  border-radius: 2px;
  border-top-color: ${constantColors[1].color};
  border-right-color: ${constantColors[1].color};
`;

export interface CellProps {
  editable?: boolean;
  size?: string;
}
export type CellViewReturn = (props: CellProps) => ReactNode;

export const SizeWrapper = styled.div<{ $size?: string }>`
  ${(props) =>
    props.$size &&
    `padding: ${
      props.$size === "small" ? "8.5px 8px" : props.$size === "large" ? "16.5px 16px" : "12.5px 8px"
    }`}
`;

const BorderDiv = styled.div`
  position: absolute;
  border: 1.5px solid #315efb;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

interface EditableCellProps<T> extends CellProps {
  status?: "normal" | "toSave";
  normalView: ReactNode;
  editView?: ReactElement<{ updateChangeSet?: UpdateChangeSet<T> }>;
  updateChangeSet: UpdateChangeSet<T>;
}

export function EditableCell<T>(props: EditableCellProps<T>) {
  const { editable, normalView, status } = props;
  const [isEditing, setIsEditing] = useState(false);
  const updateChangeSet = useCallback(
    (value: T) => {
      setIsEditing(false);
      props.updateChangeSet(value);
    },
    [props.updateChangeSet]
  );
  const editView = useMemo(
    () => (props.editView ? React.cloneElement(props.editView, { updateChangeSet }) : <></>),
    [props.editView, updateChangeSet]
  );
  const enterEditFn = useCallback(() => {
    if (editable) setIsEditing(true);
  }, [editable]);

  if (isEditing) {
    return (
      <>
        <BorderDiv />
        {editView}
      </>
    );
  }

  return (
    <>
      {status === "toSave" && !isEditing && <EditableChip />}
      <SizeWrapper $size={props.size} onDoubleClick={enterEditFn}>
        {normalView}
      </SizeWrapper>
    </>
  );
}
