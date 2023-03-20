import { ColumnComp, newPrimaryColumn } from "comps/comps/tableComp/column/tableColumnComp";
import {
  calcColumnWidth,
  COLUMN_CHILDREN_KEY,
  supportChildrenTree,
} from "comps/comps/tableComp/tableUtils";
import { list } from "comps/generators/list";
import { getReduceContext } from "comps/utils/reduceContext";
import _ from "lodash";
import {
  CompAction,
  customAction,
  fromRecord,
  isMyCustomAction,
  RecordNode,
} from "openblocks-core";
import { shallowEqual } from "react-redux";
import { JSONObject, JSONValue } from "util/jsonTypes";
import { lastValueIfEqual } from "util/objectUtils";

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
  dynamicColumn: boolean;
  data: Array<JSONObject>;
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
      const { readOnly } = getReduceContext();
      let comp = this;
      if (action.value.doGeneColumn && (action.value.dynamicColumn || !readOnly)) {
        const actions = this.geneColumnsAction(rowExample, action.value.data);
        comp = this.reduce(this.multiAction(actions));
      }
      return comp;
    }
    return super.reduce(action);
  }

  getChangeSet() {
    const changeSet: Record<string, Record<string, JSONValue>> = {};
    const columns = this.getView();
    columns.forEach((column) => {
      const columnChangeSet = column.getChangeSet();
      Object.keys(columnChangeSet).forEach((dataIndex) => {
        Object.keys(columnChangeSet[dataIndex]).forEach((key) => {
          if (!_.isNil(columnChangeSet[dataIndex][key])) {
            if (!changeSet[key]) changeSet[key] = {};
            changeSet[key][dataIndex] = columnChangeSet[dataIndex][key];
          }
        });
      });
    });
    return changeSet;
  }

  dispatchClearChangeSet() {
    const columns = this.getView();
    columns.forEach((column) => column.dispatchClearChangeSet());
  }

  /**
   * If the table data changes, call this method to trigger the action
   */
  dataChangedAction(param: {
    rowExample: JSONObject;
    doGeneColumn: boolean;
    dynamicColumn: boolean;
    data: Array<JSONObject>;
  }) {
    return customAction<ActionDataType>(
      {
        type: "dataChanged",
        ...param,
      },
      false
    );
  }

  /**
   * According to the data, adjust the column
   */
  private geneColumnsAction(rowExample: RowExampleType, data: Array<JSONObject>) {
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
      if (dataIndex === COLUMN_CHILDREN_KEY || !dataKeys.find((key) => dataIndex === key)) {
        // to Delete
        actions.push(this.deleteAction(index - deleteCnt));
        deleteCnt += 1;
      }
    });
    // The order should be the same as the data
    dataKeys.forEach((key) => {
      if (key === COLUMN_CHILDREN_KEY && supportChildrenTree(data)) {
        return;
      }
      if (!columnsView.find((column) => column.getView().dataIndex === key)) {
        // to Add
        actions.push(this.pushAction(newPrimaryColumn(key, calcColumnWidth(key, data))));
      }
    });
    if (actions.length === 0) {
      return [];
    }
    return actions;
  }

  withParamsNode() {
    const columns = this.getView();
    const nodes = _(columns)
      .map((col) => col.children.render.getOriginalComp().node())
      .toPairs()
      .fromPairs()
      .value();
    const result = lastValueIfEqual(
      this,
      "withParamsNode",
      [fromRecord(nodes), nodes] as const,
      (a, b) => shallowEqual(a[1], b[1])
    )[0];
    return result;
  }

  getColumnsNode<T extends keyof ColumnComp["children"]>(
    field: T
  ): RecordNode<Record<string, ReturnType<ColumnComp["children"][T]["node"]>>> {
    const columns = this.getView();
    const nodes = _(columns)
      .map((col) => col.children[field].node() as ReturnType<ColumnComp["children"][T]["node"]>)
      .toPairs()
      .fromPairs()
      .value();
    const result = lastValueIfEqual(
      this,
      "col_nodes_" + field,
      [fromRecord(nodes), nodes] as const,
      (a, b) => shallowEqual(a[1], b[1])
    )[0];
    return result;
  }

  setSelectionAction(key: string) {
    return this.forEachAction(ColumnComp.setSelectionAction(key));
  }
}
