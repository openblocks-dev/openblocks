import { BoolControl } from "comps/controls/boolControl";
import { StringControl } from "comps/controls/codeControl";
import { dropdownControl, HorizontalAlignmentControl } from "comps/controls/dropdownControl";
import { MultiCompBuilder, stateComp, valueComp, withParamsForMap } from "comps/generators";
import { genRandomKey } from "comps/utils/idGenerator";
import { trans } from "i18n";
import _ from "lodash";
import {
  changeChildAction,
  changeValueAction,
  ConstructorToComp,
  ConstructorToDataType,
  ConstructorToNodeType,
  ConstructorToView,
  deferAction,
  fromRecord,
  multiChangeAction,
  withFunction,
  wrapChildAction,
} from "openblocks-core";
import { AlignClose, AlignLeft, AlignRight } from "openblocks-design";
import { ColumnTypeComp, ColumnTypeCompMap } from "./columnTypeComp";

export const RenderComp = withParamsForMap(ColumnTypeComp, [
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
  editable: BoolControl,
};

/**
 * export for test.
 * Put it here temporarily to avoid circular dependencies
 */
const ColumnInitComp = new MultiCompBuilder(columnChildrenMap, (props, dispatch) => {
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
  .setPropertyViewFn(() => <></>)
  .build();

export class ColumnComp extends ColumnInitComp {
  override getView() {
    const superView = super.getView();
    const columnType = this.children.render.getOriginalComp().getComp().children.compType.getView();
    return {
      ...superView,
      editable: ColumnTypeCompMap[columnType].canBeEditable() && superView.editable,
    };
  }

  exposingNode() {
    const titleNode = this.children.title.exposingNode();
    const dataIndexNode = this.children.dataIndex.exposingNode();

    const renderNode = withFunction(this.children.render.node(), (render) => ({
      wrap: render.__comp__.wrap,
      map: _.mapValues(render.__map__, (value) => value.comp),
      length: _.size(this.children.render.getView()),
    }));
    return fromRecord({
      title: titleNode,
      dataIndex: dataIndexNode,
      render: renderNode,
    });
  }

  propertyView(key: string) {
    const columnType = this.children.render.getOriginalComp().getComp().children.compType.getView();
    return (
      <>
        {this.children.title.propertyView({
          label: trans("table.columnTitle"),
        })}
        {/* FIXME: cast type currently, return type of withContext should be corrected later */}
        {this.children.render.propertyView(key)}
        {ColumnTypeCompMap[columnType].canBeEditable() &&
          this.children.editable.propertyView({ label: trans("table.editable") })}
        {this.children.sortable.propertyView({
          label: trans("table.sortable"),
        })}
        {this.children.hide.propertyView({
          label: trans("prop.hide"),
        })}
        {this.children.align.propertyView({
          label: trans("table.align"),
          radioButton: true,
        })}
        {this.children.fixed.propertyView({
          label: trans("table.fixedColumn"),
          radioButton: true,
        })}
        {this.children.autoWidth.propertyView({
          label: trans("table.autoWidth"),
          radioButton: true,
        })}
      </>
    );
  }

  getChangeSet() {
    const dataIndex = this.children.dataIndex.getView();
    const changeSet = _.mapValues(this.children.render.getView(), (value) =>
      value.getComp().children.comp.children.changeValue.getView()
    );
    return { [dataIndex]: changeSet };
  }

  clearChangeSet() {
    this.dispatch(
      deferAction(
        wrapChildAction(
          "render",
          wrapChildAction(
            "__comp__",
            wrapChildAction("comp", changeChildAction("changeValue", null))
          )
        )
      )
    );
  }
}

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
  title?: string,
  isTag?: boolean
): ConstructorToDataType<typeof ColumnComp> {
  return {
    title: title ?? key,
    dataIndex: key,
    isCustom: false,
    render: { compType: isTag ? "tag" : "text", comp: { text: "{{currentCell}}" } },
  };
}
