import {
  DataSourceTypeConfig,
  FullColumnInfo,
  generateInsertSql,
  QueryDataType,
} from "./dataSourceCommon";
import {
  booleanCompSelection,
  CompSelection,
  dateCompSelection,
  dateTimeCompSelection,
  enumCompSelection,
  numberCompSelection,
  setCompSelection,
  stringCompSelection,
  timeCompSelection,
  timestampCompSelection,
} from "./comp";

function getCompSelection(columnType: string): CompSelection | undefined {
  if (!columnType) {
    return undefined;
  }
  switch (columnType.toLowerCase()) {
    case "char":
    case "varchar":
    case "binary":
    case "varbinary":
    case "tinyblob":
    case "tinytext":
    case "text":
    case "blob":
    case "mediumtext":
    case "mediumblob":
    case "longtext":
    case "longblob":
      return stringCompSelection();
    case "enum":
      return enumCompSelection();
    case "set":
      return setCompSelection();
    case "bool":
    case "boolean":
      return booleanCompSelection();
    case "bit":
    case "tinyint":
    case "smallint":
    case "mediumint":
    case "int":
    case "integer":
    case "bigint":
    case "serial":
    case "float":
    case "double":
    case "double precision":
    case "decimal":
    case "dec":
      return numberCompSelection(true);
    case "date":
      return dateCompSelection();
    case "datetime":
      return dateTimeCompSelection();
    case "timestamp":
      return timestampCompSelection();
    case "time":
      return timeCompSelection();
    case "year":
      return numberCompSelection();
  }
  return undefined;
}

function getQueryInitData(
  formName: string,
  tableName: string,
  infos: FullColumnInfo[]
): QueryDataType {
  return {
    compType: "mysql",
    comp: {
      sql: generateInsertSql(tableName, infos),
      commandType: "INSERT",
      mode: "GUI",
      command: {
        table: tableName,
        changeSet: {
          compType: "OBJECT",
          comp: `{{ ${formName}.data }}`,
        },
      },
    },
  };
}

export const mysqlConfig: DataSourceTypeConfig = {
  type: "mysql",
  getCompSelection: getCompSelection,
  getQueryInitData: getQueryInitData,
};
