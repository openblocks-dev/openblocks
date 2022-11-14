import { changeValueAction, multiChangeAction } from "openblocks-core";
import {
  ConstructorToComp,
  ConstructorToDataType,
  ConstructorToNodeType,
  ConstructorToView,
} from "openblocks-core";
import { StringControl } from "comps/controls/codeControl";
import { BoolControl } from "comps/controls/boolControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { MultiCompBuilder, stateComp, valueComp, withContext } from "comps/generators";
import { genRandomKey } from "comps/utils/idGenerator";
import { ColumnTypeComp } from "comps/comps/tableComp/column/columnTypeComp";
import { HorizontalAlignmentControl } from "comps/controls/dropdownControl";
import { AlignClose, AlignLeft, AlignRight } from "openblocks-design";
import { trans } from "i18n";

export const RenderComp = withContext(ColumnTypeComp, [
  "currentCell",
  "currentRow",
  "currentIndex",
  "currentOriginalIndex",
] as const);

const columnWidthOptions = [
  {
    label: trans("table.auto"),
    value: "auto",
  },
  {
    label: trans("table.fixed"),
    value: "fixed",
  },
] as const;

const columnFixOptions = [
  {
    label: <AlignLeft />,
    value: "left",
  },
  {
    label: <AlignClose />,
    value: "close",
  },
  {
    label: <AlignRight />,
    value: "right",
  },
] as const;

export const columnChildrenMap = {
  // column title
  title: StringControl,
  // a custom column or a data column
  isCustom: valueComp<boolean>(false),
  // If it is a data column, it must be the name of the column and cannot be duplicated as a react key
  dataIndex: valueComp<string>(""),
  hide: BoolControl,
  sortable: BoolControl,
  width: valueComp<number>(-1),
  autoWidth: dropdownControl(columnWidthOptions, "auto"),
  render: RenderComp,
  align: HorizontalAlignmentControl,
  tempHide: stateComp<boolean>(false),
  fixed: dropdownControl(columnFixOptions, "close"),
};

/**
 * export for test.
 * Put it here temporarily to avoid circular dependencies
 */
export const ColumnComp = new MultiCompBuilder(columnChildrenMap, (props, dispatch) => {
  return {
    ...props,
    onWidthResize: (width: number) => {
      dispatch(
        multiChangeAction({
          width: changeValueAction(width),
          autoWidth: changeValueAction("fixed"),
        })
      );
    },
  };
})
  .setPropertyViewFn((children) => {
    return (
      <>
        {children.title.propertyView({
          label: trans("table.columnTitle"),
        })}
        {/* FIXME: cast type currently, return type of withContext should be corrected later */}
        {children.render.getPropertyView()}
        {children.sortable.propertyView({
          label: trans("table.sortable"),
        })}
        {children.hide.propertyView({
          label: trans("prop.hide"),
        })}
        {children.align.propertyView({
          label: trans("table.align"),
          radioButton: true,
        })}
        {children.fixed.propertyView({
          label: trans("table.fixedColumn"),
          radioButton: true,
        })}
        {children.autoWidth.propertyView({
          label: trans("table.autoWidth"),
          radioButton: true,
        })}
      </>
    );
  })
  .build();

export type RawColumnType = ConstructorToView<typeof ColumnComp>;
export type ColumNodeType = ConstructorToNodeType<typeof ColumnComp>;
export type ColumnCompType = ConstructorToComp<typeof ColumnComp>;

/**
 * Custom column initialization data
 */
export function newCustomColumn(): ConstructorToDataType<typeof ColumnComp> {
  return {
    title: trans("table.customColumn"),
    dataIndex: genRandomKey(),
    isCustom: true,
  };
}

/**
 * Initialization data of primary column
 */
export function newPrimaryColumn(
  key: string,
  title?: string
): ConstructorToDataType<typeof ColumnComp> {
  return {
    title: title ?? key,
    dataIndex: key,
    isCustom: false,
    render: { compType: "text", comp: { text: "{{currentCell}}" } },
  };
}
