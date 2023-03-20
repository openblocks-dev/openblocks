import { trans } from "i18n";
import { ControlPropertyViewWrapper, Dropdown, KeyValueList } from "openblocks-design";
import { ControlParams } from "../../controls/controlParams";
import { ParamsJsonControl } from "../../controls/paramsControl";
import { valueComp, withDefault, withType } from "../../generators";
import { list } from "../../generators/list";
import { buildQueryCommand } from "../queryCompUtils";
import { ColumnNameDropdown } from "./columnNameDropdown";

export const ChangeSetTypeDropdown = (props: {
  label: string;
  tooltip?: string;
  value: "KEY_VALUE_PAIRS" | "OBJECT";
  comp: InstanceType<ReturnType<typeof withType>>;
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
      onChange={(value) => props.comp.dispatchChangeAndPreserveAction({ compType: value })}
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

export const ChangeSetComp = class extends withType(
  {
    KEY_VALUE_PAIRS: withDefault(ChangeSet, [{ column: "", value: "" }]),
    OBJECT: ParamsJsonControl,
  },
  "KEY_VALUE_PAIRS"
) {
  propertyView(
    params: ControlParams & {
      table: string;
      label: string;
      tooltip?: string;
    }
  ) {
    return (
      <>
        <ChangeSetTypeDropdown
          label={params.label}
          tooltip={params.tooltip}
          value={this.children.compType.getView()}
          comp={this}
        />
        {this.children.comp.propertyView({
          table: params.table,
          styleName: "medium" as const,
          placeholder: `{{ form.data }}`,
          label: " ",
          placement: "bottom" as const,
        })}
      </>
    );
  }
};
