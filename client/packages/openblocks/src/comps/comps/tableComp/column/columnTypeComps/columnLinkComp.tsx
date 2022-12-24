import { Input } from "antd";
import {
  ColumnTypeCompBuilder,
  ColumnTypeViewFn,
} from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { ActionSelectorControlInContext } from "comps/controls/actionSelector/actionSelectorControl";
import { StringControl } from "comps/controls/codeControl";
import { trans } from "i18n";

export const ColumnValueTooltip = trans("table.columnValueTooltip");

const childrenMap = {
  text: StringControl,
  onClick: ActionSelectorControlInContext,
};

const getBaseValue: ColumnTypeViewFn<typeof childrenMap, string, string> = (props) => props.text;

export const LinkComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      return <a onClick={props.onClick}>{value}</a>;
    },
    (nodeValue) => nodeValue.text.value,
    getBaseValue
  )
    .setEditViewFn((props) => (
      <Input
        defaultValue={props.value}
        autoFocus
        bordered={false}
        onChange={(e) => {
          const value = e.target.value;
          props.onChange(value);
        }}
        onBlur={props.onChangeEnd}
        onPressEnter={props.onChangeEnd}
      />
    ))
    .setPropertyViewFn((children) => (
      <>
        {children.text.propertyView({
          label: trans("table.columnValue"),
          tooltip: ColumnValueTooltip,
        })}
        {children.onClick.propertyView({
          label: trans("table.action"),
          placement: "table",
        })}
      </>
    ))
    .build();
})();
