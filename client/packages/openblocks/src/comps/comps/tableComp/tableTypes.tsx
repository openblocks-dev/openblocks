import { ColumnListComp } from "comps/comps/tableComp/column/tableColumnListComp";
import { TableToolbarComp } from "comps/comps/tableComp/tableToolbarComp";
import { BoolControl, BoolPureControl } from "comps/controls/boolControl";
import {
  ArrayStringControl,
  BoolCodeControl,
  ColorOrBoolCodeControl,
  JSONObjectArrayControl,
} from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { eventHandlerControl } from "comps/controls/eventHandlerControl";
import { styleControl } from "comps/controls/styleControl";
import { TableStyle } from "comps/controls/styleControlConstants";
import {
  MultiCompBuilder,
  stateComp,
  UICompBuilder,
  valueComp,
  withContext,
  withDefault,
} from "comps/generators";
import { uiChildren } from "comps/generators/uiCompBuilder";
import { withIsLoadingMethod } from "comps/generators/withIsLoading";
import { trans } from "i18n";
import {
  ConstructorToView,
  RecordConstructorToComp,
  RecordConstructorToView,
} from "openblocks-core";
import { controlItem } from "openblocks-design";
import { JSONObject } from "util/jsonTypes";
import { ExpansionControl } from "./expansionControl";
import { PaginationControl } from "./paginationControl";
import { SelectionControl } from "./selectionControl";

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
    label: trans("table.saveChanges"),
    value: "saveChanges",
    description: trans("table.saveChanges"),
  },
  {
    label: trans("table.cancelChanges"),
    value: "cancelChanges",
    description: trans("table.cancelChanges"),
  },
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
  {
    label: trans("table.filterChange"),
    value: "filterChange",
    description: trans("table.filterChange"),
  },
  {
    label: trans("table.sortChange"),
    value: "sortChange",
    description: trans("table.sortChange"),
  },
  {
    label: trans("table.pageChange"),
    value: "pageChange",
    description: trans("table.pageChange"),
  },
  {
    label: trans("table.refresh"),
    value: "refresh",
    description: trans("table.refresh"),
  },
] as const;

export type SortValue = {
  column?: string;
  desc?: boolean;
};

const TableEventControl = eventHandlerControl(TableEventOptions);

const rowColorLabel = trans("table.rowColor");
const RowColorTempComp = withContext(
  new MultiCompBuilder({ color: ColorOrBoolCodeControl }, (props) => props.color)
    .setPropertyViewFn((children) =>
      children.color.propertyView({
        label: rowColorLabel,
        tooltip: trans("table.rowColorDesc"),
      })
    )
    .build(),
  ["currentRow", "currentIndex", "currentOriginalIndex", "columnTitle"] as const
);

// @ts-ignore
export class RowColorComp extends RowColorTempComp {
  override getPropertyView() {
    return controlItem({ filterText: rowColorLabel }, super.getPropertyView());
  }
}

// fixme, should be infer from RowColorComp, but withContext type incorrect
export type RowColorViewType = (param: {
  currentRow: any;
  currentIndex: number;
  currentOriginalIndex: number | string;
  columnTitle: string;
}) => string;

const tableChildrenMap = {
  hideBordered: BoolControl,
  hideHeader: BoolControl,
  data: withIsLoadingMethod(JSONObjectArrayControl),
  showDataLoadSpinner: withDefault(BoolPureControl, true),
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
  dynamicColumn: BoolPureControl,
  // todo: support object config
  dynamicColumnConfig: ArrayStringControl,
  expansion: ExpansionControl,
};

export const TableInitComp = (function () {
  return new UICompBuilder(tableChildrenMap, () => {
    return <></>;
  })
    .setPropertyViewFn(() => <></>)
    .build();
})();

const uiChildrenMap = uiChildren(tableChildrenMap);
export type TableChildrenType = RecordConstructorToComp<typeof uiChildrenMap>;
export type TableChildrenView = RecordConstructorToView<typeof uiChildrenMap>;
export type TableOnEventView = ConstructorToView<typeof TableEventControl>;
