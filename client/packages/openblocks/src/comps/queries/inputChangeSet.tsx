import React from "react";
import { changeChildAction } from "openblocks-core";
import { buildQueryCommand } from "./queryCompUtils";
import { valueComp, withDefault, withType } from "../generators";
import { ParamsJsonControl } from "../controls/paramsControl";
import { ControlPropertyViewWrapper, Input, KeyValueList } from "openblocks-design";
import { list } from "../generators/list";
import { ControlParams } from "../controls/controlParams";

const SingleField = class extends buildQueryCommand({
  column: valueComp<string>(""),
  value: ParamsJsonControl,
}) {
  propertyView() {
    return (
      <div style={{ display: "flex", flexGrow: 1, gap: "8px" }}>
        <div style={{ width: "184px", flexGrow: 1 }}>
          <Input
            defaultValue={this.children.column.getView()}
            allowClear
            autoComplete="off"
            placeholder={"field"}
            onChange={(e) => this.dispatch(changeChildAction("column", e.target.value))}
          />
        </div>
        <div style={{ width: "232px", flexGrow: 1 }}>
          {this.children.value.propertyView({ placeholder: "value", indentWithTab: false })}
        </div>
      </div>
    );
  }
};
const Record = class extends list(SingleField) {
  override getView(): any {
    return super.getView().reduce((result: Record<string, Function>, cur) => {
      return {
        ...result,
        ...cur.children.value.getView(),
      };
    }, {});
  }

  propertyView(params: ControlParams) {
    return (
      <ControlPropertyViewWrapper {...params}>
        <KeyValueList
          list={super.getView().map((child) => child.propertyView())}
          onAdd={() => this.dispatch(this.pushAction({}))}
          onDelete={(item, index) => this.dispatch(this.deleteAction(index))}
        />
      </ControlPropertyViewWrapper>
    );
  }
};

export const InputChangeSet = withType(
  {
    KEY_VALUE_PAIRS: withDefault(Record, [{ column: "", value: "" }]),
    OBJECT: ParamsJsonControl,
  },
  "KEY_VALUE_PAIRS"
);
