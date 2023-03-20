import { trans } from "i18n";
import { isEmpty } from "lodash";
import { changeValueAction, DispatchType } from "openblocks-core";
import { Dropdown, OptionsType } from "openblocks-design";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { getDataSourceStructures } from "../../../redux/selectors/datasourceSelectors";
import { QueryContext } from "../../../util/context/QueryContext";
import { valueComp } from "../../generators";

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
      onChange={(value) => props.dispatch(changeValueAction(value, true))}
    />
  );
};
export const TableNameComp = class extends valueComp<string>("") {
  override getPropertyView() {
    return <PropertyView value={this.value} dispatch={this.dispatch} />;
  }
};
