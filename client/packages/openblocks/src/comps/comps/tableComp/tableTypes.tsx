import {
  ConstructorToView,
  RecordConstructorToComp,
  RecordConstructorToView,
} from "openblocks-core";
import {
  BoolCodeControl,
  ColorOrBoolCodeControl,
  JSONObjectArrayControl,
} from "comps/controls/codeControl";
import { BoolControl } from "comps/controls/boolControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { uiChildren } from "comps/generators/uiCompBuilder";
import { PaginationControl } from "./paginationControl";
import { SelectionControl } from "./selectionControl";
import { ColumnListComp } from "comps/comps/tableComp/column/tableColumnListComp";
import { MultiCompBuilder, stateComp, valueComp, withContext } from "comps/generators";
import { TableToolbarComp } from "comps/comps/tableComp/tableToolbarComp";
import { styleControl } from "comps/controls/styleControl";
import { TableStyle } from "comps/controls/styleControlConstants";
import { JSONObject } from "util/jsonTypes";
import { trans } from "i18n";
import { eventHandlerControl } from "comps/controls/eventHandlerControl";
import { withIsLoadingMethod } from "comps/generators/withIsLoading";

const sizeOptions = [
  {
    label: trans("table.small"),
    value: "small",
  },
  {
    label: trans("table.middle"),
    value: "middle",
  },
  {
    label: trans("table.large"),
    value: "large",
  },
] as const;

export const TableEventOptions = [
  {
    label: trans("table.rowSelectChange"),
    value: "rowSelectChange",
    description: trans("table.rowSelectChange"),
  },
  {
    label: trans("table.rowClick"),
    value: "rowClick",
    description: trans("table.rowClick"),
  },
] as const;

export type SortValue = {
  column?: string;
  desc?: boolean;
};

const TableEventControl = eventHandlerControl(TableEventOptions);

export const RowColorComp = withContext(
  new MultiCompBuilder({ color: ColorOrBoolCodeControl }, (props) => props.color)
    .setPropertyViewFn((children) =>
      children.color.propertyView({
        label: trans("table.rowColor"),
        tooltip: trans("table.rowColorDesc"),
      })
    )
    .build(),
  ["currentRow", "currentIndex", "currentOriginalIndex", "columnTitle"] as const
);

// fixme, should be infer from RowColorComp, but withContext type incorrect
export type RowColorViewType = (param: {
  currentRow: any;
  currentIndex: number;
  currentOriginalIndex: number;
  columnTitle: string;
}) => string;

export const tableChildrenMap = {
  hideBordered: BoolControl,
  hideHeader: BoolControl,
  data: withIsLoadingMethod(JSONObjectArrayControl),
  columns: ColumnListComp,
  size: dropdownControl(sizeOptions, "middle"),
  selection: SelectionControl,
  pagination: PaginationControl,
  sort: valueComp<Array<SortValue>>([]),
  toolbar: TableToolbarComp,
  style: styleControl(TableStyle),
  viewModeResizable: BoolControl,
  // sample data for regenerating columns
  dataRowExample: stateComp<JSONObject | null>(null),
  onEvent: TableEventControl,
  loading: BoolCodeControl,
  rowColor: RowColorComp,
};
const uiChildrenMap = uiChildren(tableChildrenMap);
export type TableChildrenType = RecordConstructorToComp<typeof uiChildrenMap>;
export type TableChildrenView = RecordConstructorToView<typeof uiChildrenMap>;
export type TableOnEventView = ConstructorToView<typeof TableEventControl>;

/**
 * Wrap the original line, mainly for the logic of the default key
 */
export type RowWrapper = {
  record: any;
  index: number;
};
export type RecordType = RowWrapper;
