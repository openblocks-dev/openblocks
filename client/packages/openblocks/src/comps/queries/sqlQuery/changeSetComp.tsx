import { DispatchType } from "openblocks-core";
import { Dropdown } from "openblocks-design";
import { changeValueAction } from "openblocks-core";
import { buildQueryCommand } from "../queryCompUtils";
import { valueComp, withDefault, withType } from "../../generators";
import { ParamsJsonControl } from "../../controls/paramsControl";
import { ColumnNameDropdown } from "./columnNameDropdown";
import { list } from "../../generators/list";
import { ControlParams } from "../../controls/controlParams";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { KeyValueList } from "openblocks-design";
import React from "react";
import { trans } from "i18n";

export const ChangeSetTypeDropdown = (props: {
  label: string;
  tooltip?: string;
  value: "KEY_VALUE_PAIRS" | "OBJECT";
  dispatch: DispatchType;
}) => {
  return (
    <Dropdown
      label={props.label}
      toolTip={props.tooltip}
      placement={"bottom"}
      radioButton={true}
      options={
        [
          { label: trans("sqlQuery.keyValuePairs"), value: "KEY_VALUE_PAIRS" },
          { label: trans("sqlQuery.object"), value: "OBJECT" },
        ] as const
      }
      value={props.value}
      onChange={(value) => props.dispatch(changeValueAction({ compType: value }))}
    />
  );
};

const SingleChange = class extends buildQueryCommand({
  column: valueComp<string>(""),
  value: ParamsJsonControl,
}) {
  propertyView(table: string) {
    return (
      <div style={{ display: "flex", flexGrow: 1, gap: "8px" }}>
        <div style={{ width: "184px", flexGrow: 1 }}>
          <ColumnNameDropdown
            table={table}
            value={this.children.column.value}
            dispatch={this.children.column.dispatch}
          />
        </div>
        <div style={{ width: "232px", flexGrow: 1 }}>
          {this.children.value.propertyView({ placeholder: "value", indentWithTab: false })}
        </div>
      </div>
    );
  }
};
const ChangeSet = class extends list(SingleChange) {
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
};

export const ChangeSetComp = withType(
  {
    KEY_VALUE_PAIRS: withDefault(ChangeSet, [{ column: "", value: "" }]),
    OBJECT: ParamsJsonControl,
  },
  "KEY_VALUE_PAIRS"
);
