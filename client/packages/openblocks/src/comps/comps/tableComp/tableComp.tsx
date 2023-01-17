import { message } from "antd";
import { tableDataRowExample } from "comps/comps/tableComp/column/tableColumnListComp";
import { getPageSize } from "comps/comps/tableComp/paginationControl";
import { TableFilter, TableToolbar } from "comps/comps/tableComp/tableToolbarComp";
import {
  columnsToAntdFormat,
  getDisplayData,
  getTableTransData,
  onTableChange,
} from "comps/comps/tableComp/tableUtils";
import { isTriggerAction } from "comps/controls/actionSelector/actionSelectorControl";
import { CompNameContext, EditorContext } from "comps/editorState";
import { UICompBuilder, withPropertyViewFn, withViewFn } from "comps/generators";
import { childrenToProps } from "comps/generators/multi";
import { HidableView } from "comps/generators/uiCompBuilder";
import { withDispatchHook } from "comps/generators/withDispatchHook";
import { DepsConfig, NameConfig, withExposingConfigs } from "comps/generators/withExposing";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { trans } from "i18n";
import _ from "lodash";
import {
  changeChildAction,
  CompAction,
  CompActionTypes,
  deferAction,
  executeQueryAction,
  routeByNameAction,
  wrapChildAction,
} from "openblocks-core";
import { useCallback, useContext, useMemo, useState } from "react";
import { saveDataAsFile } from "util/fileUtils";
import { useUserViewMode } from "util/hooks";
import { JSONObject, JSONValue } from "util/jsonTypes";
import { ResizeableTable, TableWrapper } from "./resizeableTable";
import { compTablePropertyView } from "./tablePropertyView";
import { RecordType, RowColorComp, tableChildrenMap, TableChildrenView } from "./tableTypes";

function TableView(props: {
  comp: InstanceType<typeof TableTmpComp>;
  onRefresh: (allQueryNames: Array<string>, setLoading: (loading: boolean) => void) => void;
  onDownload: (fileName: string) => void;
}) {
  const editorState = useContext(EditorContext);
  const viewMode = useUserViewMode();
  const compName = useContext(CompNameContext);
  const [loading, setLoading] = useState(false);
  const { comp, onDownload, onRefresh } = props;
  const compChildren = comp.children;
  const style = compChildren.style.getView();
  const changeSet = useMemo(() => compChildren.columns.getChangeSet(), [compChildren.columns]);
  const hasChange = useMemo(() => _.size(changeSet) !== 0, [changeSet]);
  const columns = useMemo(() => compChildren.columns.getView(), [compChildren.columns]);
  const columnViews = useMemo(() => columns.map((c) => c.getView()), [columns]);
  const data = useMemo(() => compChildren.data.getView(), [compChildren.data]);
  const sort = useMemo(() => compChildren.sort.getView(), [compChildren.sort]);
  const toolbar = useMemo(() => compChildren.toolbar.getView(), [compChildren.toolbar]);
  const pagination = useMemo(() => compChildren.pagination.getView(), [compChildren.pagination]);
  const size = useMemo(() => compChildren.size.getView(), [compChildren.size]);
  const onEvent = useMemo(() => compChildren.onEvent.getView(), [compChildren.onEvent]);
  const dynamicColumn = compChildren.dynamicColumn.getView();
  const dynamicColumnConfig = useMemo(
    () => compChildren.dynamicColumnConfig.getView(),
    [compChildren.dynamicColumnConfig]
  );
  const antdColumns = useMemo(
    () =>
      columnsToAntdFormat(
        columnViews,
        sort,
        toolbar.columnSetting,
        size,
        dynamicColumn,
        dynamicColumnConfig
      ),
    [columnViews, sort, toolbar.columnSetting, size, dynamicColumnConfig, dynamicColumn]
  );
  const transformedData = useMemo(() => {
    return getTableTransData(
      data,
      columnViews,
      pagination.pageSize,
      toolbar.filter,
      sort,
      toolbar.searchText,
      toolbar.showFilter,
      toolbar.columnSetting
    );
  }, [columnViews, data, pagination.pageSize, sort, toolbar]);

  const pageDataInfo = useMemo(() => {
    // Data pagination
    let pagedData = transformedData;
    let current = pagination.current;
    const total = pagination.total || transformedData.length;
    if (data.length > pagination.pageSize) {
      // Local pagination
      let offset = (current - 1) * pagination.pageSize;
      if (offset >= total) {
        current = 1;
        offset = 0;
      }
      pagedData = pagedData.slice(offset, offset + pagination.pageSize);
    }
    return {
      total: total,
      current: current,
      data: pagedData.map((record: any, index) => ({
        record: record.originData,
        index: record.originIndex,
      })),
    };
  }, [data.length, pagination, transformedData]);

  const handleChangeEvent = useCallback(
    (eventName) => {
      if (eventName === "saveChanges" && !compChildren.onEvent.isBind(eventName)) {
        !viewMode && message.warn(trans("table.saveChangesNotBind"));
        return;
      }
      compChildren.onEvent.getView()(eventName);
      compChildren.columns.dispatchClearChangeSet();
    },
    [viewMode, compChildren.onEvent, compChildren.columns]
  );

  const toolbarView = (
    <TableToolbar
      toolbar={toolbar}
      $style={style}
      pagination={{
        ...pagination,
        total: pageDataInfo.total,
        current: pageDataInfo.current,
      }}
      columns={columns}
      onRefresh={() =>
        onRefresh(
          editorState.queryCompInfoList().map((info) => info.name),
          setLoading
        )
      }
      onDownload={() => onDownload(`${compName}-data`)}
      hasChange={hasChange}
      onSaveChanges={() => handleChangeEvent("saveChanges")}
      onCancelChanges={() => handleChangeEvent("cancelChanges")}
      onEvent={onEvent}
    />
  );

  return (
    <TableWrapper $style={style} toolbarPosition={toolbar.position}>
      {toolbar.position === "above" && toolbarView}
      <ResizeableTable<RecordType>
        rowColor={compChildren.rowColor.getView() as any}
        {...compChildren.selection.getView()(onEvent)}
        bordered={!compChildren.hideBordered.getView()}
        onChange={(pagination, filters, sorter, extra) => {
          onTableChange(pagination, filters, sorter, extra, comp.dispatch, onEvent);
        }}
        showHeader={!compChildren.hideHeader.getView()}
        columns={antdColumns}
        viewModeResizable={compChildren.viewModeResizable.getView()}
        dataSource={pageDataInfo.data}
        size={compChildren.size.getView()}
        tableLayout="fixed"
        loading={
          loading ||
          // fixme isLoading type
          (compChildren.showDataLoadSpinner.getView() && (compChildren.data as any).isLoading()) ||
          compChildren.loading.getView()
        }
      />
      {toolbar.position === "below" && toolbarView}
    </TableWrapper>
  );
}

let TableTmpInitComp = (function () {
  return new UICompBuilder(tableChildrenMap, () => {
    return <></>;
  })
    .setPropertyViewFn(() => <></>)
    .build();
})();

let TableTmpComp = class extends TableTmpInitComp {
  private prevUnevaledValue?: string;

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

  updateContext() {
    const data = this.children.data.getView();
    const newColumns = this.children.columns.updateRenderData(data);
    return this.setChild("columns", newColumns);
  }

  override reduce(action: CompAction): this {
    let comp = super.reduce(action);
    if (action.type === CompActionTypes.CUSTOM) {
      // If a new custom column is added, then update it as well
      const columnAdded =
        comp.children.columns.getView().length !== this.children.columns.getView().length;
      if (columnAdded) {
        comp = comp.updateContext();
      }
    } else if (action.type === CompActionTypes.UPDATE_NODES_V2) {
      const nextRowExample = tableDataRowExample(comp.children.data.getView());
      const dataChanged =
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
        setTimeout(() => {
          comp.children.columns.dispatchDataChanged({
            rowExample: nextRowExample || {},
            doGeneColumn: doGene,
            dynamicColumn: comp.children.dynamicColumn.getView(),
            data: comp.children.data.getView(),
          });
          doGene && comp.children.dataRowExample.dispatchChangeValueAction(null);
        }, 0);
      }
    }
    return comp;
  }
};

TableTmpComp = withViewFn(TableTmpComp, (comp) => {
  return (
    <HidableView hidden={comp.children.hidden.getView()}>
      <TableView
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
    if (context && context["currentOriginalIndex"]) {
      const key = context["currentOriginalIndex"] + "";
      dispatch(wrapChildAction("selection", changeChildAction("selectedRowKey", key)));
    }
    // action.context;
  }
  return dispatch(action);
});

function _indexKeyToRecord(data: JSONValue[], key: string) {
  const index = Number(key);
  if (index >= 0 && index < data.length) {
    return data[index];
  }
  return undefined;
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
  new DepsConfig(
    "changeSet",
    (children) => {
      return { columns: children.columns.exposingNode() };
    },
    (input) => {
      const record: Record<string, Record<string, JSONValue>> = {};
      Object.values(input.columns).forEach((column: any) => {
        const dataIndex: string = column.dataIndex;
        // const title: string = column.title;
        const render = column.render; // {comp, map: [0].comp.changeValue, length}
        _.forEach(render.map, (value, key) => {
          const changeValue = value.comp?.changeValue;
          if (changeValue) {
            if (!record[key]) record[key] = {};
            record[key][dataIndex] = changeValue;
          }
        });
      });
      return record;
    },
    trans("table.changeSetDesc")
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
      const column = Object.values(input.columns).find(
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
  new DepsConfig(
    "sortDesc",
    (children) => {
      return {
        sort: children.sort.node(),
      };
    },
    (input) => {
      return input.sort[0]?.desc || false;
    },
    trans("table.sortDesc")
  ),
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
  new DepsConfig(
    "displayData",
    (children) => {
      return {
        data: children.data.exposingNode(),
        columns: children.columns.node()!,
        pagination: children.pagination.node(),
        sort: children.sort.node(),
        toolbar: children.toolbar.node(),
      };
    },
    (input) => {
      return getDisplayData(
        input.data,
        input.pagination,
        input.columns,
        input.toolbar.filter,
        input.sort,
        input.toolbar.searchText.value,
        input.toolbar.showFilter.value,
        input.toolbar.columnSetting.value
      );
    },
    trans("table.displayDataDesc")
  ),
  new DepsConfig(
    "filter",
    (children) => {
      return {
        toolbar: children.toolbar.node(),
      };
    },
    (input) => {
      return input.toolbar.filter;
    },
    trans("table.filterDesc")
  ),
  new NameConfig("data", trans("table.dataDesc")),
]);
