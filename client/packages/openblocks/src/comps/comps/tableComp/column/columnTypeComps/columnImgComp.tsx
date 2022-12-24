import { Input } from "antd";
import {
  ColumnTypeCompBuilder,
  ColumnTypeViewFn,
} from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { StringControl, NumberControl } from "comps/controls/codeControl";
import { trans } from "i18n";
import { withDefault } from "comps/generators";
import { TacoImage } from "openblocks-design";

export const ColumnValueTooltip = trans("table.columnValueTooltip");

const childrenMap = {
  src: withDefault(StringControl, "{{currentCell}}"),
  size: withDefault(NumberControl, "50"),
};

const getBaseValue: ColumnTypeViewFn<typeof childrenMap, string, string> = (props) => props.src;

export const ImageComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      return <TacoImage style={{ pointerEvents: "auto" }} src={value} width={props.size} />;
    },
    (nodeValue) => nodeValue.src.value,
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
    .setPropertyViewFn((children) => {
      return (
        <>
          {children.src.propertyView({
            label: trans("table.imageSrc"),
            tooltip: ColumnValueTooltip,
          })}
          {children.size.propertyView({
            label: trans("table.imageSize"),
          })}
        </>
      );
    })
    .build();
})();
