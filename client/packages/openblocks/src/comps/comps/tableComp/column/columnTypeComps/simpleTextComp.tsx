import { Input, InputRef } from "antd";
import { UpdateChangeSet } from "components/EditableCell";
import { StringOrNumberControl } from "comps/controls/codeControl";
import { trans } from "i18n";
import { FocusEventHandler, KeyboardEventHandler, useRef } from "react";
import { ColumnTypeCompBuilder, ColumnTypeViewFn } from "../columnTypeCompBuilder";
import { ColumnValueTooltip } from "../simpleColumnTypeComps";

const TableInput: React.FC<{
  defaultValue?: string | number;
  updateChangeSet?: UpdateChangeSet<string>;
}> = (props) => {
  const { updateChangeSet, ...restProps } = props;
  const inputRef = useRef<InputRef>(null);
  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    updateChangeSet?.(value);
  };
  const onPressEnter: KeyboardEventHandler<HTMLInputElement> = () => {
    inputRef.current!.blur();
  };
  return (
    <Input
      {...restProps}
      ref={inputRef}
      onBlur={onBlur}
      autoFocus
      bordered={false}
      onPressEnter={onPressEnter}
    />
  );
};

const childrenMap = {
  text: StringOrNumberControl,
};

const getBaseValue: ColumnTypeViewFn<typeof childrenMap, string | number, string | number> = (
  props
) => props.text;

export const SimpleTextComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      return value;
    },
    (nodeValue) => nodeValue.text.value,
    getBaseValue
  )
    .setEditViewFn((props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      return <TableInput defaultValue={value} />;
    })
    .setPropertyViewFn((children) => {
      return (
        <>
          {children.text.propertyView({
            label: trans("table.columnValue"),
            tooltip: ColumnValueTooltip,
          })}
        </>
      );
    })
    .build();
})();
