import { Tag } from "antd";
import { PresetColorTypes } from "antd/lib/_util/colors";
import { hashToNum } from "util/stringUtils";
import { codeControl } from "comps/controls/codeControl";
import _ from "lodash";
import { ColumnValueTooltip } from "comps/comps/tableComp/column/simpleColumnTypeComps";
import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { toJson } from "really-relaxed-json";
import { trans } from "i18n";

const colors = PresetColorTypes;

const isStringArray = (value: any) => {
  return (
    _.isArray(value) &&
    value.every((v) => {
      const type = typeof v;
      return type === "string" || type === "number" || type === "boolean";
    })
  );
};

// accept string, number, boolean and array input
const TagsControl = codeControl<Array<string> | string>(
  (value) => {
    if (isStringArray(value)) {
      return value;
    }
    const valueType = typeof value;
    if (valueType === "string") {
      try {
        const result = JSON.parse(toJson(value));
        if (isStringArray(result)) {
          return result;
        }
        return value;
      } catch (e) {
        return value;
      }
    } else if (valueType === "number" || valueType === "boolean") {
      return value;
    }
    throw new TypeError(
      `Type "Array<string> | string" is required, but find value: ${JSON.stringify(value)}`
    );
  },
  { expectedType: "string | Array<string>", codeType: "JSON" }
);

function getTagColor(text: string) {
  const index = Math.abs(hashToNum(text)) % colors.length;
  return colors[index];
}

export const ColumnTagsComp = (function () {
  const childrenMap = {
    text: TagsControl,
  };
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props) => {
      const tags = _.isArray(props.text) ? props.text : [props.text];
      return tags.map((tag, index) => {
        // The actual eval value is of type number or boolean
        const tagText = String(tag);
        return (
          <Tag color={getTagColor(tagText)} key={index}>
            {tagText}
          </Tag>
        );
      });
    },
    (nodeValue) => {
      const text = nodeValue.text.value;
      return _.isArray(text) ? text.join(",") : text;
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {children.text.propertyView({
          label: trans("table.columnValue"),
          tooltip: ColumnValueTooltip,
        })}
      </>
    ))
    .build();
})();
