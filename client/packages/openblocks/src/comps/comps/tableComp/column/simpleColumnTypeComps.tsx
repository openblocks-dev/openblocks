import { Badge, Button } from "antd";
import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { ActionSelectorControlInContext } from "comps/controls/actionSelector/actionSelectorControl";
import {
  BoolCodeControl,
  StringControl,
  stringUnionControl,
} from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { disabledPropertyView, loadingPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import styled from "styled-components";

export const ColumnValueTooltip = trans("table.columnValueTooltip");

const Button100 = styled(Button)`
  width: 100%;
`;

const ButtonTypeOptions = [
  {
    label: trans("table.primaryButton"),
    value: "primary",
  },
  {
    label: trans("table.defaultButton"),
    value: "default",
  },
] as const;

export const ButtonComp = (function () {
  const childrenMap = {
    text: StringControl,
    buttonType: dropdownControl(ButtonTypeOptions, "primary"),
    onClick: ActionSelectorControlInContext,
    loading: BoolCodeControl,
    disabled: BoolCodeControl,
  };
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props) => {
      return (
        <Button100
          type={props.buttonType}
          onClick={props.onClick}
          loading={props.loading}
          disabled={props.disabled}
        >
          {/* prevent the button from disappearing */}
          {!props.text ? " " : props.text}
        </Button100>
      );
    },
    (nodeValue) => nodeValue.text.value
  )
    .setPropertyViewFn((children) => (
      <>
        {children.text.propertyView({
          label: trans("table.columnValue"),
          tooltip: ColumnValueTooltip,
        })}
        {children.buttonType.propertyView({
          label: trans("table.type"),
          radioButton: true,
        })}
        {loadingPropertyView(children)}
        {disabledPropertyView(children)}
        {children.onClick.propertyView({
          label: trans("table.action"),
          placement: "table",
        })}
      </>
    ))
    .build();
})();

const BadgeStatusOptions = [
  "none",
  "success",
  "error",
  "default",
  "warning",
  "processing",
] as const;

export const BadgeStatusComp = (function () {
  const childrenMap = {
    text: StringControl,
    status: stringUnionControl(BadgeStatusOptions, "none"),
  };
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props) => {
      return props.status === "none" ? (
        props.text
      ) : (
        <Badge status={props.status} text={props.text} />
      );
    },
    (nodeValue) => [nodeValue.status.value, nodeValue.text.value].filter((t) => t).join(" ")
  )
    .setPropertyViewFn((children) => {
      return (
        <>
          {children.text.propertyView({
            label: trans("table.columnValue"),
            tooltip: ColumnValueTooltip,
          })}
          {children.status.propertyView({
            label: trans("table.status"),
            tooltip: trans("table.statusTooltip"),
          })}
        </>
      );
    })
    .build();
})();
