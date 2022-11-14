import { JSONObject, JSONValue } from "util/jsonTypes";
import { CompAction, customAction, isMyCustomAction, wrapChildAction } from "openblocks-core";
import { list } from "comps/generators/list";
import _ from "lodash";
import {
  ColumnComp,
  newPrimaryColumn,
  RenderComp,
} from "comps/comps/tableComp/column/tableColumnComp";

/**
 * column list
 */
const ColumnListTmpComp = list(ColumnComp);

/**
 * rowExample is used for code prompts
 */
type RowExampleType = JSONObject | undefined;
type ActionDataType = {
  type: "dataChanged";
  rowExample: RowExampleType;
  doGeneColumn: boolean;
};

export function tableDataRowExample(data: Array<JSONObject>) {
  if (data.length <= 0) {
    return undefined;
  }
  if (typeof data[0] === "string") {
    // do not parse arrays in string format
    return undefined;
  }
  const rowExample: Record<string, JSONValue | undefined> = {};
  // merge head 50 data keys
  data.slice(0, 50).forEach((d) => {
    Object.keys(d).forEach((key) => {
      if (!rowExample.hasOwnProperty(key)) {
        rowExample[key] = d[key];
      }
    });
  });
  return rowExample;
}

export class ColumnListComp extends ColumnListTmpComp {
  override reduce(action: CompAction): this {
    if (isMyCustomAction<ActionDataType>(action, "dataChanged")) {
      const rowExample = action.value.rowExample;
      let comp = this;
      if (action.value.doGeneColumn) {
        const actions = this.geneColumnsAction(rowExample);
        comp = this.reduce(this.multiAction(actions));
      }
      return comp.updateContext(rowExample);
    }
    return super.reduce(action);
  }

  updateContext(rowExample: RowExampleType) {
    return this.setChildren(
      _.mapValues(this.children, (columnComp, key) => {
        const columnName = columnComp.children.dataIndex.getView();
        const isCustom = columnComp.children.isCustom.getView();
        return columnComp.reduce(
          wrapChildAction(
            "render",
            RenderComp.changeContextDataAction({
              currentRow: rowExample,
              currentCell: isCustom ? undefined : _.get(rowExample, columnName),
              currentIndex: 0,
              currentOriginalIndex: 0,
            })
          )
        );
      })
    );
  }

  /**
   * If the table data changes, call this method to trigger the action
   */
  dispatchDataChanged(rowExample: JSONObject, doGeneColumn: boolean): void {
    this.dispatch(
      customAction<ActionDataType>({
        type: "dataChanged",
        rowExample: rowExample,
        doGeneColumn: doGeneColumn,
      })
    );
  }

  /**
   * According to the data, adjust the column
   */
  private geneColumnsAction(rowExample: RowExampleType) {
    // If no data, return directly
    if (rowExample === undefined || rowExample === null) {
      return [];
    }
    const dataKeys = Object.keys(rowExample);
    if (dataKeys.length === 0) {
      return [];
    }
    const columnsView = this.getView();
    const actions: Array<any> = [];
    let deleteCnt = 0;
    columnsView.forEach((column, index) => {
      if (column.getView().isCustom) {
        return;
      }
      const dataIndex = column.getView().dataIndex;
      if (!dataKeys.find((key) => dataIndex === key)) {
        // to Delete
        actions.push(this.deleteAction(index - deleteCnt));
        deleteCnt += 1;
      }
    });
    // The order should be the same as the data
    dataKeys.forEach((key) => {
      if (!columnsView.find((column) => column.getView().dataIndex === key)) {
        // to Add
        actions.push(this.pushAction(newPrimaryColumn(key)));
      }
    });
    if (actions.length === 0) {
      return [];
    }
    return actions;
  }
}
