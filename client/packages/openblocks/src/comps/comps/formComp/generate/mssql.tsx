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
  timeCompSelection,
  dateTimeCompSelection,
} from "./comp";

function getCompSelection(columnType: string): CompSelection | undefined {
  if (!columnType) {
    return undefined;
  }
  switch (columnType.toLowerCase()) {
    case "bit":
    case "tinyint":
    case "smallint":
    case "int":
    case "bigint":
    case "dec":
    case "decimal":
    case "numeric":
    case "smallmoney":
    case "money":
    case "float":
    case "real":
      return numberCompSelection(true);
    case "date":
      return dateCompSelection();
    case "datetime":
    case "datetime2":
    case "datetimeoffset":
    case "smalldatetime":
      return dateTimeCompSelection();
    case "time":
      return timeCompSelection();
  }
  return allCompSelection();
}

function getQueryInitData(
  formName: string,
  tableName: string,
  infos: FullColumnInfo[]
): QueryDataType {
  return {
    compType: "mssql",
    comp: {
      sql: generateInsertSql(tableName, infos),
      commandType: "INSERT",
      mode: "SQL",
    },
  };
}

export const msSqlConfig: DataSourceTypeConfig = {
  type: "mssql",
  getCompSelection,
  getQueryInitData,
};
