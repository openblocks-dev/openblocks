import { DispatchType } from "openblocks-core";
import { ControlPlacement } from "../../controls/controlParams";
import React, { useContext } from "react";
import { Dropdown, OptionsType } from "openblocks-design";
import { isEmpty, values } from "lodash";
import { useSelector } from "react-redux";
import { getDataSourceStructures } from "../../../redux/selectors/datasourceSelectors";
import { changeValueAction } from "openblocks-core";
import { QueryContext } from "../../../util/context/QueryContext";

export const ColumnNameDropdown = (props: {
  table: string;
  value: string;
  dispatch: DispatchType;
  label?: string;
  placement?: ControlPlacement;
  changeEditDSL?: boolean;
}) => {
  const context = useContext(QueryContext);
  const datasourceId = context?.datasourceId ?? "";
  const columns: OptionsType =
    values(useSelector(getDataSourceStructures)[datasourceId])
      ?.find((t) => t.name === props.table)
      ?.columns.map((column) => ({
        label: column.name,
        value: column.name,
      })) ?? [];
  return (
    <Dropdown
      options={columns}
      placeholder={"column"}
      value={isEmpty(props.value) ? undefined : props.value}
      onChange={(value) => props.dispatch(changeValueAction(value, props.changeEditDSL ?? true))}
      allowClear={true}
      placement={props.placement}
      label={props.label}
    />
  );
};
