import { CellViewReturn, SizeWrapper } from "components/EditableCell";
import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { ColumnValueTooltip } from "comps/comps/tableComp/column/simpleColumnTypeComps";
import { StringControl } from "comps/controls/codeControl";
import { withDefault } from "comps/generators";
import { formatPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import moment from "moment";
import { DateParser, DATE_FORMAT } from "util/dateTimeUtils";

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
