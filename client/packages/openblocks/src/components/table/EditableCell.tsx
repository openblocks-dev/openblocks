import { PresetStatusColorType } from "antd/es/_util/colors";
import _ from "lodash";
import { changeChildAction, DispatchType } from "openblocks-core";
import { constantColors } from "openblocks-design";
import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { JSONValue } from "util/jsonTypes";
import ColumnTypeView from "./columnTypeView";
import { TableCellContext } from "comps/comps/tableComp/tableContext";

type StatusType = PresetStatusColorType | "none";
export const TABLE_EDITABLE_SWITCH_ON = true;
export const TagsContext = React.createContext<string[]>([]);
export const StatusContext = React.createContext<{ text: string; status: StatusType }[]>([]);
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
  candidateTags?: string[];
  candidateStatus?: { text: string; status: StatusType }[];
}

export type CellViewReturn = (props: CellProps) => ReactNode;
export type EditViewFn<T> = (props: {
  value: T;
  onChange: (value: T) => void;
  onChangeEnd: () => void;
}) => ReactNode;

export const SizeWrapper = styled.div<{ $size?: string }>`
  ${(props) =>
    props.$size &&
    `padding: ${
      props.$size === "small" ? "8.5px 8px" : props.$size === "large" ? "16.5px 16px" : "12.5px 8px"
    };
    line-height: 21px;
    min-height: ${props.$size === "small" ? "39px" : props.$size === "large" ? "55px" : "47px"};
    `}
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
  normalView: ReactNode;
  dispatch: DispatchType;

  editViewFn?: EditViewFn<T>;
  baseValue?: T;
  changeValue?: T | null;
}

export function EditableCell<T extends JSONValue>(props: EditableCellProps<T>) {
  const {
    dispatch,
    normalView,
    editViewFn,
    changeValue,
    baseValue,
    candidateTags,
    candidateStatus,
  } = props;
  const status = _.isNil(changeValue) ? "normal" : "toSave";
  const editable = editViewFn ? props.editable : false;
  const { isEditing, setIsEditing } = useContext(TableCellContext);
  const value = changeValue ?? baseValue!;

  const [tmpValue, setTmpValue] = useState<T | null>(value);
  useEffect(() => {
    setTmpValue(value);
  }, [value]);
  const onChange = useCallback(
    (value: T) => {
      setTmpValue(value);
    },
    [setTmpValue]
  );
  const onChangeEnd = useCallback(() => {
    setIsEditing(false);
    dispatch(
      changeChildAction(
        "changeValue",
        _.isNil(tmpValue) || _.isEqual(tmpValue, baseValue) ? null : tmpValue,
        false
      )
    );
  }, [dispatch, baseValue, tmpValue]);
  const editView = useMemo(
    () => editViewFn?.({ value, onChange, onChangeEnd }) ?? <></>,
    [editViewFn, value, onChange, onChangeEnd]
  );
  const enterEditFn = useCallback(() => {
    if (editable) setIsEditing(true);
  }, [editable]);

  if (isEditing) {
    return (
      <>
        <BorderDiv />
        <TagsContext.Provider value={candidateTags ?? []}>
          <StatusContext.Provider value={candidateStatus ?? []}>{editView}</StatusContext.Provider>
        </TagsContext.Provider>
      </>
    );
  }

  return (
    <ColumnTypeView>
      {status === "toSave" && !isEditing && <EditableChip />}
      <SizeWrapper $size={props.size} onDoubleClick={enterEditFn}>
        {normalView}
      </SizeWrapper>
    </ColumnTypeView>
  );
}
