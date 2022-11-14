import {
  DataSourceTypeConfig,
  FullColumnInfo,
  generateInsertSql,
  QueryDataType,
} from "./dataSourceCommon";
import {
  CompSelection,
  dateCompSelection,
  allCompSelection,
  numberCompSelection,
  dateTimeCompSelection,
} from "./comp";

function getCompSelection(columnType: string): CompSelection | undefined {
  if (!columnType) {
    return undefined;
  }
  switch (columnType.toLowerCase()) {
    case "number":
    case "float":
    case "binary_float":
    case "binary_double":
      return numberCompSelection(true);
    case "date":
      return dateCompSelection();
    case "timestamp":
      return dateTimeCompSelection();
  }
  return allCompSelection();
}

function getQueryInitData(
  formName: string,
  tableName: string,
  infos: FullColumnInfo[]
): QueryDataType {
  return {
    compType: "oracle",
    comp: {
      sql: generateInsertSql(tableName, infos),
      commandType: "INSERT",
      mode: "SQL",
    },
  };
}

export const oracleSqlConfig: DataSourceTypeConfig = {
  type: "oracle",
  getCompSelection,
  getQueryInitData,
};
