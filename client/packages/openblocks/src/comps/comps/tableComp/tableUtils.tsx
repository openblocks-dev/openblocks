import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { SortOrder } from "antd/lib/table/interface";
import { __COLUMN_DISPLAY_VALUE_FN } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { ColumNodeType, RawColumnType, Render } from "comps/comps/tableComp/column/tableColumnComp";
import { getPageSize, PaginationNodeType } from "comps/comps/tableComp/paginationControl";
import { TableFilter, tableFilterOperatorMap } from "comps/comps/tableComp/tableToolbarComp";
import { RecordType, SortValue, TableOnEventView } from "comps/comps/tableComp/tableTypes";
import _ from "lodash";
import { changeChildAction, CompAction, NodeToValue } from "openblocks-core";
import { EditableIcon } from "openblocks-design";
import { JSONObject, JSONValue } from "util/jsonTypes";

function transformData(
  data: Array<JSONObject>,
  columnInfos: Array<{ dataIndex: string; hide: boolean; sortable: boolean }>,
  filter: TableFilter,
  sorter: Array<SortValue>,
  searchValue: string,
  showFilter: boolean
) {
  const columnIndexMap = new Map(columnInfos.map((c) => [c.dataIndex, c]));
  let resultData = data;
  if (searchValue) {
    resultData = resultData.filter((d) => {
      let searchLower = searchValue?.toLowerCase();
      if (!searchLower) {
        return true;
      } else {
        return Object.values(d).find((v) => v?.toString().toLowerCase().includes(searchLower));
      }
    });
  }
  if (showFilter && filter.filters.length > 0) {
    resultData = resultData.filter((d) => {
      // filter
      for (let f of filter.filters) {
        const columnValue = d[f.columnKey];
        const result = tableFilterOperatorMap[f.operator].filter(f.filterValue, columnValue);
        if (filter.stackType === "or" && result) {
          // one condition is met
          return true;
        } else if (filter.stackType === "and" && !result) {
          // one condition is not met
          return false;
        }
      }
      if (filter.filters.length === 0) {
        return true;
      } else if (filter.stackType === "and") {
        return true;
      } else if (filter.stackType === "or") {
        return false;
      }
      return true;
    });
  }

  // sort
  if (sorter.length > 0) {
    const sortColumns: string[] = [];
    const sortMethods: ("desc" | "asc")[] = [];
    sorter.forEach((s) => {
      if (!s.column) {
        return;
      }
      const columnInfo = columnIndexMap.get(s.column);
      if (!columnInfo || !columnInfo.sortable || columnInfo.hide) {
        return;
      }
      sortColumns.push(s.column);
      sortMethods.push(s.desc ? "desc" : "asc");
    });
    resultData = _.orderBy(resultData, sortColumns, sortMethods);
  }
  return resultData;
}

export function filterData(
  data: Array<JSONObject>,
  hideInfo: Record<string, { hide: boolean; tempHide: boolean }>,
  searchValue: string,
  filter: TableFilter,
  showFilter: boolean,
  enableColumnSetting: boolean
) {
  let resultData = data;
  if (!_.isEmpty(hideInfo)) {
    resultData = resultData.map((row) =>
      _.omitBy(
        row,
        (cell, key) => hideInfo[key] && columnHide({ ...hideInfo[key], enableColumnSetting })
      )
    );
  }
  if (searchValue) {
    resultData = resultData.filter((d) => {
      let searchLower = searchValue?.toLowerCase();
      if (!searchLower) {
        return true;
      } else {
        return Object.values(d).find((v) => v?.toString().toLowerCase().includes(searchLower));
      }
    });
  }
  if (showFilter && filter.filters.length > 0) {
    resultData = resultData.filter((d) => {
      // filter
      for (let f of filter.filters) {
        const columnValue = d[f.columnKey];
        const result = tableFilterOperatorMap[f.operator].filter(f.filterValue, columnValue);
        if (filter.stackType === "or" && result) {
          // one condition is met
          return true;
        } else if (filter.stackType === "and" && !result) {
          // one condition is not met
          return false;
        }
      }
      if (filter.filters.length === 0) {
        return true;
      } else if (filter.stackType === "and") {
        return true;
      } else if (filter.stackType === "or") {
        return false;
      }
      return true;
    });
  }
  return resultData;
}

export function sortData(
  data: Array<JSONObject>,
  columns: Record<string, { sortable: boolean }>, // key: dataIndex
  sorter: Array<SortValue>
) {
  let resultData = data;
  if (sorter.length > 0) {
    const [sortColumns, sortMethods] = _(sorter)
      .filter((s) => {
        return !!s.column && columns[s.column]?.sortable;
      })
      .map((s) => [s.column, s.desc ? "desc" : "asc"] as const)
      .unzip()
      .value() as [string[], ("desc" | "asc")[]];
    resultData = _.orderBy(resultData, sortColumns, sortMethods);
  }
  return resultData;
}

export function hideData(
  data: Array<JSONObject>,
  hideInfo: Record<
    string,
    {
      hide: boolean;
      tempHide: boolean;
      enableColumnSetting: boolean;
    }
  >
) {
  if (_.size(hideInfo) === 0) return data;
  return data.map((row) =>
    _.omitBy(row, (cell, key) => hideInfo[key] && columnHide(hideInfo[key]))
  );
}

function columnHide({
  hide,
  tempHide,
  enableColumnSetting,
}: {
  hide: boolean;
  tempHide: boolean;
  enableColumnSetting: boolean;
}) {
  if (enableColumnSetting) {
    return tempHide || hide;
  } else {
    return hide;
  }
}

export function getDisplayDataV2(
  data: Array<JSONObject>,
  pageSize: number,
  columns: Array<{
    dataIndex: string;
    title: string;
    render: NodeToValue<ReturnType<Render["node"]>>;
  }>
) {
  return data.map((row, idx) => {
    const displayData: JSONObject = {};
    columns.forEach((col) => {
      // if (!row.hasOwnProperty(col.dataIndex)) return;
      const node = col.render.wrap({
        currentCell: row[col.dataIndex],
        currentRow: row,
        currentIndex: idx % pageSize,
        currentOriginalIndex: idx,
      }) as any;
      const colValue = node.comp[__COLUMN_DISPLAY_VALUE_FN](node.comp);
      if (colValue !== null) {
        displayData[col.title || col.dataIndex] = colValue;
      }
    });
    return displayData;
  });
}

export function getDisplayData(
  dataList: Array<JSONObject>,
  pagination: NodeToValue<PaginationNodeType>,
  columnRecord: NodeToValue<ColumNodeType>[],
  filter: TableFilter,
  sorter: Array<SortValue>,
  searchValue: string,
  showFilter: boolean,
  columnSetting: boolean
) {
  const columns = Object.values(columnRecord);
  if (_.isEmpty(columns)) {
    return [];
  }
  const pageSize = getPageSize(
    pagination.showSizeChanger.value,
    pagination.pageSize.value,
    pagination.pageSizeOptions.value,
    pagination.changeablePageSize
  );
  const toTransDataList: Array<JSONObject> = [];
  dataList.forEach((data, index: number) => {
    const toTransData: JSONObject = {};
    const displayData: JSONObject = {};
    columns.forEach((col) => {
      if (
        columnHide({
          hide: col.hide.value,
          tempHide: col.tempHide,
          enableColumnSetting: columnSetting,
        })
      ) {
        // skip hidden columns
        return;
      }
      const columnNode = col.render.__comp__.wrap({
        currentCell: data[col.dataIndex],
        currentRow: data,
        currentIndex: index % pageSize,
        currentOriginalIndex: index,
      }) as any;
      const colValue = columnNode.comp[__COLUMN_DISPLAY_VALUE_FN](columnNode.comp);
      if (colValue !== null) {
        const title = col.title.value;
        toTransData[col.dataIndex] = colValue;
        displayData[title || col.dataIndex] = colValue;
      }
    });
    if (!_.isEmpty(toTransData)) {
      toTransData["__resultData__"] = displayData;
      toTransDataList.push(toTransData);
    }
  });
  return transformData(
    toTransDataList,
    columns.map((c: any) => ({
      dataIndex: c.dataIndex,
      hide: columnHide({
        hide: c.hide.value,
        tempHide: c.tempHide,
        enableColumnSetting: columnSetting,
      }),
      sortable: c.sortable.value,
    })),
    filter,
    sorter,
    searchValue,
    showFilter
  ).map((d) => d["__resultData__"]!);
}

function renderTitle(props: { title: string; editable: boolean }) {
  const { title, editable } = props;
  return (
    <div>
      {title}
      {editable && <EditableIcon style={{ verticalAlign: "baseline", marginLeft: "4px" }} />}
    </div>
  );
}

function getUniqueTags(column: RawColumnType) {
  const compType = column.render[0]
    ? column.render[0].getComp().children.compType.getView()
    : undefined;
  const uniqueTags: string[] =
    column.editable && compType === "tag"
      ? _.uniq(Object.values(column.render).map((comp) => comp.getView().value))
      : [];
  return uniqueTags;
}

function getUniqueStatus(column: RawColumnType) {
  const compType = column.render[0]
    ? column.render[0].getComp().children.compType.getView()
    : undefined;
  const uniqueStatus =
    column.editable && compType === "badgeStatus"
      ? _.uniqBy(
          Object.values(column.render).map((comp) => {
            const value = comp.getView().value;
            const status = value.slice(0, value.indexOf(' '));
            const text = value.slice(value.indexOf(' ') + 1);
            return {
              status,
              text,
            };
          }),
          "text"
        )
      : [];
  return uniqueStatus;
}

/**
 * convert column in raw format into antd format
 */
export function columnsToAntdFormat(
  columns: Array<RawColumnType>,
  sort: SortValue[],
  enableColumnSetting: boolean,
  size: string,
  dynamicColumn: boolean,
  dynamicColumnConfig: Array<string>
): ColumnsType<RecordType> {
  const sortMap: Map<string | undefined, SortOrder> = new Map(
    sort.map((s) => [s.column, s.desc ? "descend" : "ascend"])
  );
  const sortedColumns = _.sortBy(columns, (c) => {
    if (c.fixed === "left") {
      return -1;
    } else if (c.fixed === "right") {
      return Number.MAX_SAFE_INTEGER;
    } else if (dynamicColumnConfig.length > 0) {
      // sort by dynamic config array
      const index = dynamicColumnConfig.indexOf(c.isCustom ? c.title : c.dataIndex);
      if (index >= 0) {
        return index;
      }
    }
    return 0;
  });
  return sortedColumns.flatMap((column) => {
    if (
      columnHide({
        hide: column.hide,
        tempHide: column.tempHide,
        enableColumnSetting: enableColumnSetting,
      })
    ) {
      return [];
    }
    if (
      dynamicColumn &&
      dynamicColumnConfig.length > 0 &&
      !dynamicColumnConfig.includes(column.isCustom ? column.title : column.dataIndex)
    ) {
      return [];
    }
    const tags = getUniqueTags(column); // warn: this costs O(n) time
    const status = getUniqueStatus(column); // warn: this costs O(n) time
    const title = renderTitle({ title: column.title, editable: column.editable });
    return {
      title: title,
      dataIndex: ["record", column.dataIndex],
      align: column.align,
      width: column.autoWidth === "auto" ? 0 : column.width,
      fixed: column.fixed === "close" ? false : column.fixed,
      onWidthResize: column.onWidthResize,
      render: (value: any, record: RecordType, index: number) => {
        return column.render[record.index]
          .setParams({ currentIndex: index })
          .getView()
          .view({ editable: column.editable, size, candidateTags: tags, candidateStatus: status });
      },
      ...(column.sortable
        ? {
            sorter: true,
            sortOrder: sortMap.get(column.dataIndex),
          }
        : {}),
    };
  });
}

function getSortValue(sortResult: SorterResult<RecordType>) {
  return sortResult.column?.dataIndex
    ? {
        column: (sortResult.column.dataIndex as any)[1],
        desc: sortResult.order === "descend",
      }
    : null;
}

export function onTableChange(
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
  extra: TableCurrentDataSource<RecordType>,
  dispatch: (action: CompAction<JSONValue>) => void,
  onEvent: TableOnEventView
) {
  if (extra.action === "sort") {
    let sortValues: SortValue[] = [];
    if (Array.isArray(sorter)) {
      // multi-column sort
      sorter.forEach((s) => {
        const v = getSortValue(s);
        v && sortValues.push(v);
      });
    } else {
      const v = getSortValue(sorter);
      v && sortValues.push(v);
    }
    dispatch(changeChildAction("sort", sortValues));
    onEvent("sortChange");
  }
}

export function getTableTransData(
  data: Array<JSONObject>,
  columnViews: Array<RawColumnType>,
  pageSize: number,
  filter: TableFilter,
  sorter: Array<SortValue>,
  searchValue: string,
  showFilter: boolean,
  columnSetting: boolean
) {
  if (_.isEmpty(columnViews)) {
    return [];
  }
  const renderedData: Array<JSONObject> = [];
  const length = Math.min(data.length, ...columnViews.map((column) => _.size(column.render)));
  _.range(length).forEach((index) => {
    const d = data[index];
    const toTransData: JSONObject = {};
    columnViews.forEach((col) => {
      if (
        columnHide({
          hide: col.hide,
          tempHide: col.tempHide,
          enableColumnSetting: columnSetting,
        })
      ) {
        // skip hidden columns
        return;
      }
      const columnData = col.render[index].getView().value;
      if (columnData !== null) {
        toTransData[col.dataIndex] = columnData;
      }
    });
    if (!_.isEmpty(toTransData)) {
      toTransData["__originData__"] = d;
      toTransData["__originIndex__"] = index;
      renderedData.push(toTransData);
    }
  });

  return transformData(
    renderedData,
    columnViews.map((c) => ({
      dataIndex: c.dataIndex,
      hide: columnHide({
        hide: c.hide,
        tempHide: c.tempHide,
        enableColumnSetting: columnSetting,
      }),
      sortable: c.sortable,
    })),
    filter,
    sorter,
    searchValue,
    showFilter
  ).map((d) => ({
    originData: d["__originData__"],
    originIndex: d["__originIndex__"],
  }));
}
