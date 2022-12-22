import { DatePicker } from "antd";
import {
  ColumnTypeCompBuilder,
  ColumnTypeViewFn,
} from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { ColumnValueTooltip } from "comps/comps/tableComp/column/simpleColumnTypeComps";
import { StringControl } from "comps/controls/codeControl";
import { withDefault } from "comps/generators";
import { formatPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import moment from "moment";
import styled from "styled-components";
import { DateParser, DATE_FORMAT } from "util/dateTimeUtils";

function formatDate(date: string, format: string) {
  const mom = moment(date, DateParser);
  return mom.isValid() ? mom.format(format) : "";
}

const childrenMap = {
  text: StringControl,
  format: withDefault(StringControl, DATE_FORMAT),
};

const getBaseValue: ColumnTypeViewFn<typeof childrenMap, string, string> = (props) => props.text;

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  input {
    padding-right: 18px;
    cursor: pointer;
  }
  .ant-picker-suffix {
    position: absolute;
    right: 0;
  }
`;

export const DateTimeComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      return formatDate(value, props.format);
    },
    (nodeValue) => formatDate(nodeValue.text.value, nodeValue.format.value),
    getBaseValue
  )
    .setEditViewFn((props) => {
      let datePickOpen = false;
      return (
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter" && datePickOpen) {
              props.onChangeEnd();
            }
          }}
        >
          <DatePickerStyled
            allowClear={false}
            bordered={false}
            autoFocus
            defaultValue={moment(props.value)}
            showTime
            showNow={false}
            defaultOpen={true}
            onOpenChange={(open) => (datePickOpen = open)}
            onChange={(value, dateString) => props.onChange(dateString)}
            onBlur={props.onChangeEnd}
          />
        </div>
      );
    })
    .setPropertyViewFn((children) => (
      <>
        {children.text.propertyView({
          label: trans("table.columnValue"),
          tooltip: ColumnValueTooltip,
        })}
        {formatPropertyView({ children, placeholder: DATE_FORMAT })}
      </>
    ))
    .build();
})();
