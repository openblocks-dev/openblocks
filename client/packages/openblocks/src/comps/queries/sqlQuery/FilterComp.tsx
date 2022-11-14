import { buildQueryCommand } from "../queryCompUtils";
import { valueComp, withDefault } from "../../generators";
import { dropdownControl } from "../../controls/dropdownControl";
import { ParamsJsonControl } from "../../controls/paramsControl";
import { ColumnNameDropdown } from "./columnNameDropdown";
import { list } from "../../generators/list";
import { ControlParams } from "../../controls/controlParams";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { KeyValueList } from "openblocks-design";
import React from "react";

const SingleFilter = class extends buildQueryCommand({
  column: valueComp<string>(""),
  condition: dropdownControl(
    [
      { label: "=", value: "=" },
      { label: "!=", value: "!=" },
      { label: ">", value: ">" },
      { label: "<", value: "<" },
      { label: ">=", value: ">=" },
      { label: "<=", value: "<=" },
      { label: "IS", value: "IS" },
      { label: "IS NOT", value: "IS NOT" },
      { label: "IN", value: "IN" },
      { label: "NOT IN", value: "NOT IN" },
    ] as const,
    "="
  ),
  value: ParamsJsonControl,
}) {
  propertyView(table: string) {
    return (
      <div style={{ display: "flex", flexGrow: 1, gap: "8px" }}>
        <div style={{ width: "184px", flexGrow: 1, display: "flex", gap: "8px" }}>
          <ColumnNameDropdown
            table={table}
            value={this.children.column.value}
            dispatch={this.children.column.dispatch}
          />
          <div style={{ flexShrink: 0, width: "30%" }}>
            {this.children.condition.propertyView({})}
          </div>
        </div>
        <div style={{ width: "232px", flexGrow: 1 }}>
          {this.children.value.propertyView({ placeholder: "value", indentWithTab: false })}
        </div>
      </div>
    );
  }
};
class FilterList extends list(SingleFilter) {
  override getView(): any {
    return super.getView().reduce((result: Record<string, Function>, cur) => {
      return {
        ...result,
        ...cur.children.value.getView(),
      };
    }, {});
  }

  propertyView(params: ControlParams & { table: string }) {
    return (
      <ControlPropertyViewWrapper {...params}>
        <KeyValueList
          list={super.getView().map((child) => child.propertyView(params.table))}
          onAdd={() => this.dispatch(this.pushAction({}))}
          onDelete={(item, index) => this.dispatch(this.deleteAction(index))}
        />
      </ControlPropertyViewWrapper>
    );
  }
}
export const FilterComp = withDefault(FilterList, [{ column: "", value: "" }]);
