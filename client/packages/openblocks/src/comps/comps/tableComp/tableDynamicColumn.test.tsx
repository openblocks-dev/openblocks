import { TableComp } from "comps/comps/tableComp/tableComp";
import { columnsToAntdFormat } from "comps/comps/tableComp/tableUtils";
import { evalAndReduce } from "comps/utils";
import { reduceInContext } from "comps/utils/reduceContext";
import _ from "lodash";
import { changeChildAction, fromValue, SimpleNode } from "openblocks-core";
import { JSONObject } from "util/jsonTypes";

const expectColumn = (
  comp: InstanceType<typeof TableComp>,
  expectValues: Array<{
    dataIndex: string;
    title: string;
    hide?: boolean;
    isCustom?: boolean;
  }>
) => {
  const columns = comp.children.columns.getView();
  const columnViews = columns.map((c) => c.getView());
  expect(expectValues.length).toEqual(columnViews.length);
  expectValues.forEach((val) => {
    const column = columnViews.find((c) => c.dataIndex === val.dataIndex);
    if (!column) {
      throw new Error(`expect column: ${JSON.stringify(val)}, but not found.`);
    }
    Object.keys(val).forEach((key) => {
      const colVal = (column as any)[key];
      const expectVal = (val as any)[key];
      if (expectVal !== undefined) {
        if (!_.isEqual(colVal, expectVal)) {
          throw new Error(`ColumnKey:${key}, expect: "${expectVal}", but found: "${colVal}"`);
        }
      }
    });
  });
  // with dynamic config
  const dynamicColumnConfig = comp.children.dynamicColumnConfig.getView();
  if (dynamicColumnConfig?.length > 0) {
    const antdColumns = columnsToAntdFormat(
      columnViews,
      comp.children.sort.getView(),
      comp.children.toolbar.getView().columnSetting,
      comp.children.size.getView(),
      comp.children.dynamicColumn.getView(),
      dynamicColumnConfig,
      comp.columnAggrData
    );
    expect(columnViews.length).toBeGreaterThanOrEqual(antdColumns.length);
    antdColumns.forEach((column) => {
      const dataIndex = (column as any).dataIndex;
      const colView = columnViews.find((c) => c.dataIndex === dataIndex);
      if (!colView) {
        throw new Error(`Error, column should not be undefined, column: ${JSON.stringify(column)}`);
      }
      const configName = colView.isCustom ? colView.title : colView.dataIndex;
      if (!dynamicColumnConfig.includes(configName)) {
        throw new Error(`dynamic config test fail: unexpect column: ${configName}`);
      }
    });
  }
};

function getTableInitData() {
  const exposingInfo: Record<string, SimpleNode<any>> = {
    query1: fromValue({ data: [{ q1: 1 }] }),
    query2: fromValue({ data: [{ q2: 2 }] }),
  };
  return {
    tableData: {
      data: JSON.stringify([{ a: 1 }]),
      columns: [
        {
          dataIndex: "a",
          title: "a",
          hide: true,
        },
        {
          title: "custom",
          dataIndex: "custom1",
          isCustom: true,
        },
      ],
    },
    exposingInfo: exposingInfo,
    initColumns: [
      {
        dataIndex: "a",
        hide: true,
        title: "a",
      },
      {
        dataIndex: "custom1",
        hide: false,
        title: "custom",
        isCustom: true,
      },
    ],
  };
}

async function sleep() {
  await new Promise((r) => setTimeout(r, 20));
}

test("test table dynamic columns: Change unEvalValue", async () => {
  // 0. Init check
  const { initColumns, tableData, exposingInfo } = getTableInitData();
  let comp = new TableComp({
    dispatch: (action) => {
      comp = evalAndReduce(comp.reduce(action), exposingInfo);
    },
    value: tableData,
  });
  comp = evalAndReduce(comp);
  expectColumn(comp, initColumns);
  /** 1. Change unEvalValue data, change column whatever **/
  // 1.1 add column c & d
  comp = evalAndReduce(
    comp.reduce(comp.changeChildAction("data", JSON.stringify([{ a: 1, c: 2, d: 3 }])))
  );
  await sleep();
  const columnsAfterAdd = [
    ...initColumns,
    {
      dataIndex: "c",
      hide: false,
      title: "c",
    },
    {
      dataIndex: "d",
      title: "d",
    },
  ];
  expectColumn(comp, columnsAfterAdd);
  // 1.2 del column a
  comp = evalAndReduce(
    comp.reduce(comp.changeChildAction("data", JSON.stringify([{ c: 2, d: 3 }])))
  );
  await sleep();
  expectColumn(
    comp,
    columnsAfterAdd.filter((c) => c.dataIndex !== "a")
  );
}, 1000);

async function dynamicColumnsTest(
  dynamicColumn: boolean,
  isViewMode: boolean,
  dynamicConfigs?: Array<string>
) {
  const { initColumns, tableData, exposingInfo } = getTableInitData();
  // init comp
  let comp = new TableComp({
    dispatch: (action) => {
      let tmpComp;
      if (isViewMode) {
        tmpComp = reduceInContext({ readOnly: isViewMode }, () => comp.reduce(action));
      } else {
        tmpComp = comp.reduce(action);
      }
      comp = evalAndReduce(tmpComp, exposingInfo);
    },
    value: {
      ...tableData,
      dynamicColumn: dynamicColumn,
      ...(dynamicColumn &&
        dynamicConfigs && { dynamicColumnConfig: JSON.stringify(dynamicConfigs) }),
    },
  });
  comp = evalAndReduce(comp);

  const updateTableComp = async () => {
    comp = evalAndReduce(
      comp.reduce(comp.changeChildAction("data", "{{query1.data}}")),
      exposingInfo
    );
    await sleep();
  };
  // change data to query1
  const query1Columns = [
    {
      dataIndex: "q1",
      title: "q1",
    },
    {
      dataIndex: "custom1",
      title: "custom",
      isCustom: true,
    },
  ];
  await updateTableComp();
  if (!dynamicColumn && isViewMode) {
    expectColumn(comp, initColumns);
  } else {
    expectColumn(comp, query1Columns);
  }
  // change query data, add column: a
  const addData: Array<JSONObject> = [{ q1: 1, a: 2 }];
  exposingInfo.query1 = fromValue({ data: addData });
  await updateTableComp();
  const columnsAfterAdd = [
    ...query1Columns,
    {
      dataIndex: "a",
      title: "a",
    },
  ];
  expect(comp.children.data.getView()).toEqual(addData);
  if (!dynamicColumn && isViewMode) {
    expectColumn(comp, initColumns);
  } else {
    expectColumn(comp, columnsAfterAdd);
  }
  // change query data, del column: q1
  const delData = [{ a: 2 }];
  exposingInfo.query1 = fromValue({ data: delData });
  await updateTableComp();
  expect(comp.children.data.getView()).toEqual(delData);
  if (dynamicColumn) {
    expectColumn(
      comp,
      columnsAfterAdd.filter((c) => c.dataIndex !== "q1")
    );
  } else if (isViewMode) {
    expectColumn(comp, initColumns);
  } else {
    expectColumn(comp, columnsAfterAdd);
  }
}

test("test table dynamic columns", async () => {
  await dynamicColumnsTest(false, false);
  await dynamicColumnsTest(false, true);
  await dynamicColumnsTest(true, false);
  await dynamicColumnsTest(true, true);
  await dynamicColumnsTest(true, false, ["custom", "q1"]);
  await dynamicColumnsTest(true, true, ["custom", "q1"]);
}, 2000);
