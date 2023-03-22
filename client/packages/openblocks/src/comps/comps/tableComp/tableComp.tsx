import { tableDataRowExample } from "comps/comps/tableComp/column/tableColumnListComp";
import { getPageSize } from "comps/comps/tableComp/paginationControl";
import { TableCompView } from "comps/comps/tableComp/tableCompView";
import { TableFilter } from "comps/comps/tableComp/tableToolbarComp";
import {
  columnHide,
  ColumnsAggrData,
  COLUMN_CHILDREN_KEY,
  filterData,
  genSelectionParams,
  getColumnsAggr,
  getOriDisplayData,
  OB_ROW_ORI_INDEX,
  RecordType,
  sortData,
  transformDispalyData,
  tranToTableRecord,
} from "comps/comps/tableComp/tableUtils";
import { isTriggerAction } from "comps/controls/actionSelector/actionSelectorControl";
import { withPropertyViewFn, withViewFn } from "comps/generators";
import { childrenToProps } from "comps/generators/multi";
import { HidableView } from "comps/generators/uiCompBuilder";
import { withDispatchHook } from "comps/generators/withDispatchHook";
import {
  CompDepsConfig,
  depsConfig,
  DepsConfig,
  NameConfig,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { MAP_KEY } from "comps/generators/withMultiContext";
import { NameGenerator } from "comps/utils";
import { trans } from "i18n";
import _ from "lodash";
import {
  changeChildAction,
  CompAction,
  CompActionTypes,
  deferAction,
  executeQueryAction,
  fromRecord,
  onlyEvalAction,
  routeByNameAction,
  withFunction,
  wrapChildAction,
} from "openblocks-core";
import { saveDataAsFile } from "util/fileUtils";
import { JSONObject, JSONValue } from "util/jsonTypes";
import { lastValueIfEqual, shallowEqual } from "util/objectUtils";
import { IContainer } from "../containerBase";
import { getSelectedRowKeys } from "./selectionControl";
import { compTablePropertyView } from "./tablePropertyView";
import { RowColorComp, TableChildrenView, TableInitComp } from "./tableTypes";

export class TableImplComp extends TableInitComp implements IContainer {
  private prevUnevaledValue?: string;
  readonly filterData: RecordType[] = [];
  readonly columnAggrData: ColumnsAggrData = {};

  private getSlotContainer() {
    return this.children.expansion.children.slot.getSelectedComp().getComp().children.container;
  }

  findContainer(key: string) {
    return this.getSlotContainer().findContainer(key);
  }

  getCompTree() {
    return this.getSlotContainer().getCompTree();
  }

  getPasteValue(nameGenerator: NameGenerator) {
    return {
      ...this.toJsonValue(),
      expansion: this.children.expansion.getPasteValue(nameGenerator),
    };
  }

  realSimpleContainer(key?: string) {
    return this.getSlotContainer().realSimpleContainer(key);
  }

  downloadData(fileName: string) {
    saveDataAsFile({
      data: (this as any).exposingValues["displayData"],
      filename: fileName,
      fileType: "csv",
    });
  }

  refreshData(allQueryNames: Array<string>, setLoading: (loading: boolean) => void) {
    const deps: Array<string> = this.children.data.exposingNode().dependNames();
    const depsQueryNames = deps.map((d) => d.split(".")[0]);
    if (_.isEmpty(depsQueryNames)) {
      // Independent query, using local data, giving a fake loading effect
      setLoading(true);
      setTimeout(() => setLoading(false), 200);
      return;
    }
    const queryNameSet = new Set(allQueryNames);
    depsQueryNames.forEach((name) => {
      if (queryNameSet.has(name)) {
        this.dispatch(deferAction(routeByNameAction(name, executeQueryAction({}))));
      }
    });
  }

  // only for test?
  getProps() {
    return childrenToProps(_.omit(this.children, "style")) as TableChildrenView;
  }

  shouldGenerateColumn(comp: this, nextRowExample?: JSONObject) {
    const columnKeys = comp.children.columns
      .getView()
      .map((col) => {
        const colView = col.getView();
        if (colView.isCustom) {
          return "";
        } else {
          return colView.dataIndex;
        }
      })
      .filter((t) => !!t);
    const nextUnevaledVal = comp.children.data.unevaledValue;
    const prevUnevaledVal = this.prevUnevaledValue;
    if (!nextRowExample) {
      this.prevUnevaledValue = nextUnevaledVal;
      return false;
    }
    let doGenColumn = false;
    const nextRowKeys = Object.keys(nextRowExample);
    const dynamicColumn = comp.children.dynamicColumn.getView();
    if (!prevUnevaledVal && columnKeys.length === 0) {
      // the first time
      doGenColumn = true;
    } else if (prevUnevaledVal && nextUnevaledVal !== prevUnevaledVal) {
      // modify later
      doGenColumn = true;
    } else if (dynamicColumn) {
      doGenColumn = true;
    } else if (
      columnKeys.length < nextRowKeys.length &&
      columnKeys.every((key) => nextRowKeys.includes(key))
    ) {
      // new column is automatically generated
      doGenColumn = true;
    }
    if (!doGenColumn) {
      const toBeGenRow = comp.children.dataRowExample.getView();
      const columnKeyChanged =
        columnKeys.length !== nextRowKeys.length ||
        !_.isEqual(_.sortBy(columnKeys), _.sortBy(nextRowKeys));
      // The data has changed, but can't judge the auto generation
      if (columnKeyChanged && !_.isEqual(toBeGenRow, nextRowExample)) {
        setTimeout(() => {
          comp.children.dataRowExample.dispatchChangeValueAction(nextRowExample);
        });
      } else if (!columnKeyChanged && toBeGenRow) {
        setTimeout(() => {
          comp.children.dataRowExample.dispatchChangeValueAction(null);
        });
      }
    }
    this.prevUnevaledValue = nextUnevaledVal;
    return doGenColumn;
  }

  override reduce(action: CompAction): this {
    let comp = super.reduce(action);

    let dataChanged = false;
    if (action.type === CompActionTypes.UPDATE_NODES_V2) {
      const nextRowExample = tableDataRowExample(comp.children.data.getView());
      dataChanged =
        comp.children.data !== this.children.data &&
        !_.isEqual(this.children.data.getView(), comp.children.data.getView());
      if (dataChanged) {
        // update rowColor context
        comp = comp.setChild(
          "rowColor",
          comp.children.rowColor.reduce(
            RowColorComp.changeContextDataAction({
              currentRow: nextRowExample,
              currentIndex: 0,
              currentOriginalIndex: 0,
              columnTitle: nextRowExample ? Object.keys(nextRowExample)[0] : undefined,
            })
          )
        );
      }

      if (dataChanged) {
        const doGene = comp.shouldGenerateColumn(comp, nextRowExample);
        const actions: CompAction[] = [];
        actions.push(
          wrapChildAction(
            "columns",
            comp.children.columns.dataChangedAction({
              rowExample: nextRowExample || {},
              doGeneColumn: doGene,
              dynamicColumn: comp.children.dynamicColumn.getView(),
              data: comp.children.data.getView(),
            })
          )
        );
        doGene && actions.push(comp.changeChildAction("dataRowExample", null));
        setTimeout(() => {
          actions.forEach((action) => comp.dispatch(deferAction(action)));
        }, 0);
      }
    }

    let needMoreEval = false;

    const thisSelection = getSelectedRowKeys(this.children.selection)[0] ?? "0";
    const newSelection = getSelectedRowKeys(comp.children.selection)[0] ?? "0";
    const selectionChanged =
      this.children.selection !== comp.children.selection && thisSelection !== newSelection;
    if (
      (action.type === CompActionTypes.CUSTOM &&
        comp.children.columns.getView().length !== this.children.columns.getView().length) ||
      selectionChanged
    ) {
      comp = comp.setChild(
        "columns",
        comp.children.columns.reduce(comp.children.columns.setSelectionAction(newSelection))
      );
      needMoreEval = true;
    }

    let params = comp.children.expansion.children.slot.getCachedParams(newSelection);
    if (selectionChanged || _.isNil(params) || dataChanged) {
      params =
        _.isNil(params) || dataChanged
          ? genSelectionParams(comp.filterData, newSelection)
          : undefined;
      comp = comp.setChild(
        "expansion",
        comp.children.expansion.reduce(
          comp.children.expansion.setSelectionAction(newSelection, params)
        )
      );
      needMoreEval = true;
    }
    if (action.type === CompActionTypes.UPDATE_NODES_V2 && needMoreEval) {
      setTimeout(() => comp.dispatch(onlyEvalAction()));
    }
    // console.info("exit tableComp reduce. action: ", action, "\nthis: ", this, "\ncomp: ", comp);
    return comp;
  }

  override extraNode() {
    const extra = {
      sortedData: this.sortDataNode(),
      filterData: this.filterNode(),
      oriDisplayData: this.oriDisplayDataNode(),
      columnAggrData: this.columnAggrNode(),
    };
    return {
      node: extra,
      updateNodeFields: (value: any) => ({
        filterData: value.filterData,
        columnAggrData: value.columnAggrData,
      }),
    };
  }

  // handle sort: data -> sortedData
  sortDataNode() {
    const nodes = {
      data: this.children.data.exposingNode(),
      sort: this.children.sort.node(),
      dataIndexes: this.children.columns.getColumnsNode("dataIndex"),
      sortables: this.children.columns.getColumnsNode("sortable"),
    };
    const sortedDataNode = withFunction(fromRecord(nodes), (input) => {
      const { data, sort, dataIndexes, sortables } = input;
      const columns = _(dataIndexes)
        .mapValues((dataIndex, idx) => ({ sortable: !!sortables[idx] }))
        .mapKeys((sortable, idx) => dataIndexes[idx])
        .value();
      const sortedData = sortData(data, columns, sort);
      // console.info( "sortNode. data: ", data, " sort: ", sort, " columns: ", columns, " sortedData: ", sortedData);
      return sortedData;
    });
    return lastValueIfEqual(this, "sortedDataNode", [sortedDataNode, nodes] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }

  // handle hide/search/filter: sortedData->filteredData
  filterNode() {
    const nodes = {
      data: this.sortDataNode(),
      searchValue: this.children.toolbar.children.searchText.node(),
      filter: this.children.toolbar.children.filter.node(),
      showFilter: this.children.toolbar.children.showFilter.node(),
    };
    const filteredDataNode = withFunction(fromRecord(nodes), (input) => {
      const { data, searchValue, filter, showFilter } = input;
      const filteredData = filterData(data, searchValue.value, filter, showFilter.value);
      // console.info("filterNode. data: ", data, " filter: ", filter, " filteredData: ", filteredData);
      return filteredData.map((row) => tranToTableRecord(row, row[OB_ROW_ORI_INDEX]));
    });
    return lastValueIfEqual(this, "filteredDataNode", [filteredDataNode, nodes] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }

  oriDisplayDataNode() {
    const nodes = {
      data: this.filterNode(),
      // --> pageSize
      showSizeChanger: this.children.pagination.children.showSizeChanger.node(),
      pageSize: this.children.pagination.children.pageSize.node(),
      pageSizeOptions: this.children.pagination.children.pageSizeOptions.node(),
      changablePageSize: this.children.pagination.children.changeablePageSize.node(),
      // <-- pageSize
      withParams: this.children.columns.withParamsNode(),
      dataIndexes: this.children.columns.getColumnsNode("dataIndex"),
    };
    const resNode = withFunction(fromRecord(nodes), (input) => {
      const columns = _(input.dataIndexes)
        .mapValues((dataIndex, idx) => ({
          dataIndex,
          render: input.withParams[idx],
        }))
        .value();
      const pageSize = getPageSize(
        input.showSizeChanger.value,
        input.pageSize.value,
        input.pageSizeOptions.value,
        input.changablePageSize
      );
      return getOriDisplayData(input.data, pageSize, Object.values(columns));
    });
    return lastValueIfEqual(this, "oriDisplayDataNode", [resNode, nodes] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }

  displayDataIndexesNode() {
    const nodes = {
      oriDisplayData: this.oriDisplayDataNode(),
    };
    const resNode = withFunction(fromRecord(nodes), (input) => {
      return _(input.oriDisplayData)
        .map((row, idx) => [row[OB_ROW_ORI_INDEX], idx] as [string, number])
        .fromPairs()
        .value();
    });
    return lastValueIfEqual(this, "displayDataIndexesNode", [resNode, nodes] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }

  changeSetNode() {
    const nodes = {
      dataIndexes: this.children.columns.getColumnsNode("dataIndex"),
      renders: this.children.columns.getColumnsNode("render"),
    };
    const resNode = withFunction(fromRecord(nodes), (input) => {
      // merge input.dataIndexes and input.withParams into one structure
      const dataIndexRenderDict = _(input.dataIndexes)
        .mapValues((dataIndex, idx) => input.renders[idx])
        .mapKeys((render, idx) => input.dataIndexes[idx])
        .value();
      const record: Record<string, Record<string, JSONValue>> = {};
      _.forEach(dataIndexRenderDict, (render, dataIndex) => {
        _.forEach(render[MAP_KEY], (value, key) => {
          const changeValue = (value.comp as any).comp.changeValue;
          if (!_.isNil(changeValue)) {
            if (!record[key]) record[key] = {};
            record[key][dataIndex] = changeValue;
          }
        });
      });
      return record;
    });
    return lastValueIfEqual(this, "changeSetNode", [resNode, nodes] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }

  toUpdateRowsNode() {
    const nodes = {
      oriDisplayData: this.oriDisplayDataNode(),
      indexes: this.displayDataIndexesNode(),
      changeSet: this.changeSetNode(),
    };
    const resNode = withFunction(fromRecord(nodes), (input) => {
      const res = _(input.changeSet)
        .map((changeValues, oriIndex) => {
          const idx = input.indexes[oriIndex];
          const oriRow = _.omit(input.oriDisplayData[idx], OB_ROW_ORI_INDEX);
          return { ...oriRow, ...changeValues };
        })
        .value();
      // console.info("toUpdateRowsNode. input: ", input, " res: ", res);
      return res;
    });
    return lastValueIfEqual(this, "toUpdateRowsNode", [resNode, nodes] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }

  columnAggrNode() {
    const nodes = {
      oriDisplayData: this.oriDisplayDataNode(),
      withParams: this.children.columns.withParamsNode(),
      dataIndexes: this.children.columns.getColumnsNode("dataIndex"),
    };
    const resNode = withFunction(fromRecord(nodes), (input) => {
      const dataIndexWithParamsDict = _(input.dataIndexes)
        .mapValues((dataIndex, idx) => input.withParams[idx])
        .mapKeys((withParams, idx) => input.dataIndexes[idx])
        .value();
      const res = getColumnsAggr(input.oriDisplayData, dataIndexWithParamsDict);
      // console.info("columnAggrNode: ", res);
      return res;
    });
    return lastValueIfEqual(this, "columnAggrNode", [resNode, nodes] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }
}

let TableTmpComp = withViewFn(TableImplComp, (comp) => {
  return (
    <HidableView hidden={comp.children.hidden.getView()}>
      <TableCompView
        comp={comp}
        onRefresh={(allQueryNames, setLoading) => comp.refreshData(allQueryNames, setLoading)}
        onDownload={(fileName) => comp.downloadData(fileName)}
      />
    </HidableView>
  );
});

TableTmpComp = withPropertyViewFn(TableTmpComp, compTablePropertyView);

/**
 * Hijack children's execution events and ensure that selectedRow is modified first (you can also add a triggeredRow field).
 */
TableTmpComp = withDispatchHook(TableTmpComp, (dispatch) => (action) => {
  if (!dispatch) {
    return;
  }
  if (isTriggerAction(action)) {
    const context = action.value.context;
    if (context && !_.isNil(context["currentOriginalIndex"])) {
      const key = context["currentOriginalIndex"] + "";
      dispatch(wrapChildAction("selection", changeChildAction("selectedRowKey", key, false)));
    }
    // action.context;
  }
  return dispatch(action);
});

function _indexKeyToRecord(data: JSONObject[], key: string) {
  const keyPath = (key + "").split("-");
  let currentData = data;
  let res = undefined;
  for (let k of keyPath) {
    const index = Number(k);
    if (index >= 0 && Array.isArray(currentData) && index < currentData.length) {
      res = currentData[index];
      currentData = res[COLUMN_CHILDREN_KEY] as JSONObject[];
    }
  }
  return res;
}

function toDisplayIndex(displayData: JSONObject[], selectRowKey: string) {
  const keyPath = selectRowKey.split("-");
  const originSelectKey = keyPath[0];
  if (!originSelectKey) {
    return "";
  }
  let displayIndex;
  displayData.forEach((data, index) => {
    if (data[OB_ROW_ORI_INDEX] === originSelectKey) {
      displayIndex = index;
    }
  });
  if (displayIndex && keyPath.length > 1) {
    return [displayIndex, ...keyPath.slice(1)].join("-");
  }
  return displayIndex;
}

TableTmpComp = withMethodExposing(TableTmpComp, [
  {
    method: {
      name: "setFilter",
      description: "",
      params: [{ name: "filter", type: "JSON" }],
    },
    execute: (comp, values) => {
      if (values[0]) {
        const param = values[0] as TableFilter;
        const currentVal = comp.children.toolbar.children.filter.getView();
        comp.children.toolbar.children.filter.dispatchChangeValueAction({
          ...currentVal,
          ...param,
        });
      }
    },
  },
  {
    method: {
      name: "setPage",
      description: "",
      params: [{ name: "page", type: "number" }],
    },
    execute: (comp, values) => {
      const page = values[0] as number;
      if (page && page > 0) {
        comp.children.pagination.children.pageNo.dispatchChangeValueAction(page);
      }
    },
  },
  {
    method: {
      name: "setSort",
      description: "",
      params: [
        { name: "sortColumn", type: "string" },
        { name: "sortDesc", type: "boolean" },
      ],
    },
    execute: (comp, values) => {
      if (values[0]) {
        comp.children.sort.dispatchChangeValueAction([
          {
            column: values[0] as string,
            desc: values[1] as boolean,
          },
        ]);
      }
    },
  },
  {
    method: {
      name: "resetSelections",
      description: "",
      params: [],
    },
    execute: (comp) => {
      comp.children.selection.children.selectedRowKey.dispatchChangeValueAction("0");
      comp.children.selection.children.selectedRowKeys.dispatchChangeValueAction([]);
    },
  },
]);

// exposing data
export const TableComp = withExposingConfigs(TableTmpComp, [
  new DepsConfig(
    "selectedRow",
    (children) => {
      return {
        selectedRowKey: children.selection.children.selectedRowKey.node(),
        data: children.data.exposingNode(),
      };
    },
    (input) => {
      if (!input.data) {
        return undefined;
      }
      return _indexKeyToRecord(input.data, input.selectedRowKey);
    },
    trans("table.selectedRowDesc")
  ),
  new DepsConfig(
    "selectedRows",
    (children) => {
      return {
        selectedRowKeys: children.selection.children.selectedRowKeys.node(),
        data: children.data.exposingNode(),
      };
    },
    (input) => {
      if (!input.data) {
        return undefined;
      }
      return input.selectedRowKeys.flatMap((key: string) => {
        const result = _indexKeyToRecord(input.data, key);
        return result === undefined ? [] : [result];
      });
    },
    trans("table.selectedRowsDesc")
  ),
  new CompDepsConfig(
    "selectedIndex",
    (comp) => {
      return {
        oriDisplayData: comp.oriDisplayDataNode(),
        selectedRowKey: comp.children.selection.children.selectedRowKey.node(),
      };
    },
    (input) => {
      return toDisplayIndex(input.oriDisplayData, input.selectedRowKey);
    },
    trans("table.selectedIndexDesc")
  ),
  new CompDepsConfig(
    "selectedIndexes",
    (comp) => {
      return {
        oriDisplayData: comp.oriDisplayDataNode(),
        selectedRowKeys: comp.children.selection.children.selectedRowKeys.node(),
      };
    },
    (input) => {
      return input.selectedRowKeys.flatMap((key: string) => {
        const result = toDisplayIndex(input.oriDisplayData, key);
        return result === undefined ? [] : [result];
      });
    },
    trans("table.selectedIndexDesc")
  ),
  new CompDepsConfig(
    "changeSet",
    (comp) => ({
      changeSet: comp.changeSetNode(),
    }),
    (input) => input.changeSet,
    trans("table.changeSetDesc")
  ),
  new CompDepsConfig(
    "toUpdateRows",
    (comp) => ({
      toUpdateRows: comp.toUpdateRowsNode(),
    }),
    (input) => {
      return input.toUpdateRows;
    },
    trans("table.toUpdateRowsDesc")
  ),
  new DepsConfig(
    "pageNo",
    (children) => {
      return {
        pageNo: children.pagination.children.pageNo.exposingNode(),
      };
    },
    (input) => input.pageNo,
    trans("table.pageNoDesc")
  ),
  new DepsConfig(
    "pageSize",
    (children) => {
      return {
        showSizeChanger: children.pagination.children.showSizeChanger.node(),
        changeablePageSize: children.pagination.children.changeablePageSize.node(),
        pageSize: children.pagination.children.pageSize.node(),
        pageSizeOptions: children.pagination.children.pageSizeOptions.node(),
      };
    },
    (input) => {
      return getPageSize(
        input.showSizeChanger.value,
        input.pageSize.value,
        input.pageSizeOptions.value,
        input.changeablePageSize
      );
    },
    trans("table.pageSizeDesc")
  ),
  new DepsConfig(
    "sortColumn",
    (children) => {
      return {
        sort: children.sort.node(),
        columns: children.columns.node()!,
      };
    },
    (input) => {
      const sortIndex = input.sort[0]?.column;
      const column = Object.values(input.columns as any).find(
        (c: any) => c.dataIndex === sortIndex
      ) as any;
      if (column?.isCustom && column?.title.value) {
        return column.title.value;
      } else {
        return sortIndex;
      }
    },
    trans("table.sortColumnDesc")
  ),
  depsConfig({
    name: "sortDesc",
    desc: trans("table.sortDesc"),
    depKeys: ["sort"],
    func: (input) => {
      return input.sort[0]?.desc || false;
    },
  }),
  new DepsConfig(
    "pageOffset",
    (children) => {
      return {
        showSizeChanger: children.pagination.children.showSizeChanger.node(),
        changeablePageSize: children.pagination.children.changeablePageSize.node(),
        pageSize: children.pagination.children.pageSize.node(),
        pageSizeOptions: children.pagination.children.pageSizeOptions.node(),
        pageNo: children.pagination.children.pageNo.node(),
      };
    },
    (input) => {
      return (
        getPageSize(
          input.showSizeChanger.value,
          input.pageSize.value,
          input.pageSizeOptions.value,
          input.changeablePageSize
        ) *
        (input.pageNo - 1)
      );
    },
    trans("table.pageOffsetDesc")
  ),
  new CompDepsConfig(
    "displayData",
    (comp) => {
      return {
        oriDisplayData: comp.oriDisplayDataNode(),
        dataIndexes: comp.children.columns.getColumnsNode("dataIndex"),
        titles: comp.children.columns.getColumnsNode("title"),
        // --> hide
        hides: comp.children.columns.getColumnsNode("hide"),
        tempHides: comp.children.columns.getColumnsNode("tempHide"),
        columnSetting: comp.children.toolbar.children.columnSetting.node(),
        // <-- hide
      };
    },
    (input) => {
      const dataIndexTitleDict = _(input.dataIndexes)
        .pickBy(
          (_1, idx) =>
            !columnHide({
              hide: input.hides[idx].value,
              tempHide: input.tempHides[idx],
              enableColumnSetting: input.columnSetting.value,
            })
        )
        .mapValues((_dataIndex, idx) => input.titles[idx]?.value)
        .mapKeys((_title, idx) => input.dataIndexes[idx])
        .value();
      return transformDispalyData(input.oriDisplayData, dataIndexTitleDict);
    },
    trans("table.displayDataDesc")
  ),
  new DepsConfig(
    "filter",
    (children) => {
      return {
        filter: children.toolbar.children.filter.node(),
      };
    },
    (input) => {
      return input.filter;
    },
    trans("table.filterDesc")
  ),
  new NameConfig("data", trans("table.dataDesc")),
]);
