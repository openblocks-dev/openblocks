import { DispatchType } from "openblocks-core";
import React, { useContext } from "react";
import { Dropdown, OptionsType } from "openblocks-design";
import { useSelector } from "react-redux";
import { getDataSourceStructures } from "../../../redux/selectors/datasourceSelectors";
import { isEmpty } from "lodash";
import { changeValueAction } from "openblocks-core";
import { valueComp } from "../../generators";
import { QueryContext } from "../../../util/context/QueryContext";
import { trans } from "i18n";

const PropertyView = (props: { value: string; dispatch: DispatchType }) => {
  const context = useContext(QueryContext);
  const datasourceId = context?.datasourceId ?? "";
  const tables: OptionsType =
    useSelector(getDataSourceStructures)[datasourceId]?.map((structure) => ({
      label: structure.name,
      value: structure.name,
    })) ?? [];
  return (
    <Dropdown
      showSearch={true}
      label={trans("sqlQuery.table")}
      placeholder={"table"}
      placement={"bottom"}
      options={tables}
      value={isEmpty(props.value) ? undefined : props.value}
      allowClear={true}
      onChange={(value) => props.dispatch(changeValueAction(value))}
    />
  );
};
export const TableNameComp = class extends valueComp<string>("") {
  override getPropertyView() {
    return <PropertyView value={this.value} dispatch={this.dispatch} />;
  }
};
