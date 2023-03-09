import { Badge } from "antd";
import {
  ColumnTypeCompBuilder,
  ColumnTypeViewFn,
} from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { trans } from "i18n";
import { StringControl, stringUnionControl } from "comps/controls/codeControl";
import { DropdownStyled, Wrapper } from "./columnTagsComp";
import { ReactNode, useContext, useState } from "react";
import { StatusContext } from "components/table/EditableCell";
import { CustomSelect, PackUpIcon, ScrollBar } from "openblocks-design";
import { PresetStatusColorType } from "antd/lib/_util/colors";

export const ColumnValueTooltip = trans("table.columnValueTooltip");

export const BadgeStatusOptions = [
  "none",
  "success",
  "error",
  "default",
  "warning",
  "processing",
] as const;

export type StatusType = PresetStatusColorType | "none";

const childrenMap = {
  text: StringControl,
  status: stringUnionControl(BadgeStatusOptions, "none"),
};

const getBaseValue: ColumnTypeViewFn<
  typeof childrenMap,
  { value: string; status: StatusType },
  { value: string; status: StatusType }
> = (props) => ({
  value: props.text,
  status: props.status,
});

type StatusEditPropsType = {
  value: { value: string; status: StatusType };
  onChange: (value: { value: string; status: StatusType }) => void;
  onChangeEnd: () => void;
};

const StatusEdit = (props: StatusEditPropsType) => {
  const defaultStatus = useContext(StatusContext);
  const [status, setStatus] = useState(defaultStatus);
  const [open, setOpen] = useState(true);
  return (
    <Wrapper>
      <CustomSelect
        autoFocus
        defaultOpen
        bordered={false}
        optionLabelProp="children"
        open={open}
        defaultValue={props.value.value}
        style={{ width: "100%" }}
        suffixIcon={<PackUpIcon />}
        showSearch
        onSearch={(value) => {
          if (defaultStatus.findIndex((item) => item.text.includes(value)) < 0) {
            setStatus([
              ...defaultStatus,
              {
                text: value,
                status: "none",
              },
            ]);
          } else {
            setStatus(defaultStatus);
          }
          props.onChange({
            value,
            status: status.find((item) => item.text === value)?.status || "none",
          });
        }}
        onChange={(value) => {
          props.onChange({
            value,
            status: status.find((item) => item.text === value)?.status || "none",
          });
        }}
        dropdownRender={(originNode: ReactNode) => (
          <DropdownStyled>
            <ScrollBar style={{ maxHeight: "256px" }}>{originNode}</ScrollBar>
          </DropdownStyled>
        )}
        dropdownStyle={{ marginTop: "7px", padding: "8px 0 6px 0" }}
        onBlur={props.onChangeEnd}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.onChangeEnd();
          }
        }}
        onClick={() => setOpen(!open)}
      >
        {status.map((value, index) => (
          <CustomSelect.Option value={value.text} key={index}>
            {value.status === "none" ? (
              value.text
            ) : (
              <Badge status={value.status} text={value.text} />
            )}
          </CustomSelect.Option>
        ))}
      </CustomSelect>
    </Wrapper>
  );
};

export const BadgeStatusComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const text = props.changeValue?.value ?? getBaseValue(props, dispatch).value;
      const status = props.changeValue?.status ?? getBaseValue(props, dispatch).status;
      return status === "none" ? text : <Badge status={status} text={text} />;
    },
    (nodeValue) => [nodeValue.status.value, nodeValue.text.value].filter((t) => t).join(" "),
    getBaseValue
  )
    .setEditViewFn((props) => {
      return (
        <StatusEdit value={props.value} onChange={props.onChange} onChangeEnd={props.onChangeEnd} />
      );
    })
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
