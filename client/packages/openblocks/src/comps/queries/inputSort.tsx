import { buildQueryCommand } from "./queryCompUtils";
import { withDefault } from "../generators";
import { dropdownControl } from "../controls/dropdownControl";
import { ParamsStringControl } from "../controls/paramsControl";
import { list } from "../generators/list";
import {
  ControlPropertyViewWrapper,
  KeyValueList,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
} from "openblocks-design";
import { trans } from "i18n";

const SingleSort = class extends buildQueryCommand({
  field: ParamsStringControl,
  order: dropdownControl(
    [
      { label: trans("googleSheets.ASC"), value: "ASC" },
      { label: trans("googleSheets.DESC"), value: "DESC" },
    ] as const,
    "ASC"
  ),
}) {
  propertyView() {
    return (
      <div style={{ display: "flex", flexGrow: 1, gap: "8px" }}>
        <div style={{ width: "184px", flexGrow: 1, display: "flex", gap: "8px" }}>
          {this.children.field.propertyView({ placeholder: trans("googleSheets.sortPlaceholder") })}
          <div style={{ flexShrink: 0, width: "30%" }}>{this.children.order.propertyView({})}</div>
        </div>
      </div>
    );
  }
};
const SortList = class extends list(SingleSort) {
  override getView(): any {
    return super.getView().reduce((result: Record<string, Function>, cur) => {
      return {
        ...result,
        ...cur.children.field.getView(),
      };
    }, {});
  }

  override getPropertyView() {
    return (
      <QueryConfigWrapper>
        <QueryConfigLabel>{trans("googleSheets.sort")}</QueryConfigLabel>
        <QueryConfigItemWrapper>
          <ControlPropertyViewWrapper placement={"bottom"}>
            <KeyValueList
              list={super.getView().map((child) => child.propertyView())}
              onAdd={() => this.dispatch(this.pushAction({}))}
              onDelete={(item, index) => this.dispatch(this.deleteAction(index))}
            />
          </ControlPropertyViewWrapper>
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>
    );
  }
};
export const InputSort = withDefault(SortList, [{ field: "" }]);
