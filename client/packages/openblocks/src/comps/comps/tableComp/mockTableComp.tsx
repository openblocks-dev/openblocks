import { withDefault } from "comps/generators";
import { TableComp } from ".";
import { newPrimaryColumn } from "comps/comps/tableComp/column/tableColumnComp";
import { NameGenerator } from "../../utils";
import { ConstructorToDataType } from "openblocks-core";
import { EditorState } from "../../editorState";
import { isArrayLikeObject } from "lodash";
import { i18nObjs } from "i18n";
import { calcColumnWidth } from "comps/comps/tableComp/tableUtils";
// for test only
const dataSource = [
  {
    key: 0,
    date: "2018-02-11",
    amount: 120,
    type: "income",
    note: "transfer",
  },
  {
    key: 1,
    date: "2018-03-11",
    amount: 243,
    type: "income",
    note: "transfer",
  },
  {
    key: 2,
    date: "2018-04-11",
    amount: 98,
    type: "income",
    note: "transfer",
  },
];
for (let i = 0; i < 53; i += 1) {
  dataSource.push({
    key: 3 + i,
    date: "2018-04-11",
    amount: 98 + i,
    type: "income" + (i % 3),
    note: "transfer" + (i % 5),
  });
}

const tableInitValue = {
  toolbar: {
    showDownload: true,
    showFilter: true,
    showRefresh: true,
  },
};

const tableData = {
  ...tableInitValue,
  data: JSON.stringify(i18nObjs.table.defaultData, null, " "),
  columns: i18nObjs.table.columns.map((t) =>
    newPrimaryColumn(t.key, calcColumnWidth(t.key, i18nObjs.table.defaultData), t.title, t.isTag)
  ),
};
export const MockTableComp = withDefault(TableComp, tableData);

export function defaultTableData(
  compName: string,
  nameGenerator: NameGenerator,
  editorState?: EditorState
): ConstructorToDataType<typeof TableComp> {
  const selectedQueryComp = editorState?.selectedQueryComp();
  const data = selectedQueryComp?.children.data.getView();
  const queryName = selectedQueryComp?.children.name.getView();
  return isArrayLikeObject(data)
    ? { ...tableInitValue, data: `{{ ${queryName}.data }}` }
    : tableData;
}
