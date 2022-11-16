import { StringControl } from "comps/controls/codeControl";
import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { trans } from "i18n";
import { ColumnValueTooltip } from "comps/comps/tableComp/column/simpleColumnTypeComps";
import { formatPropertyView } from "comps/utils/propertyUtils";
import moment from "moment";
import { DATE_FORMAT, DateParser } from "util/dateTimeUtils";
import { withDefault } from "comps/generators";

function formatDate(date: string, format: string) {
  const mom = moment(date, DateParser);
  return mom.isValid() ? mom.format(format) : "";
}

export const DateTimeComp = (function () {
  const childrenMap = {
    text: StringControl,
    format: withDefault(StringControl, DATE_FORMAT),
  };
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props) => {
      return formatDate(props.text, props.format);
    },
    (nodeValue) => formatDate(nodeValue.text.value, nodeValue.format.value)
  )
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
