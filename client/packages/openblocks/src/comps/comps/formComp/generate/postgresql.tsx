import {
  DataSourceTypeConfig,
  FullColumnInfo,
  generateInsertSql,
  QueryDataType,
} from "./dataSourceCommon";
import {
  allCompSelection,
  booleanCompSelection,
  CompSelection,
  dateCompSelection,
  numberCompSelection,
  timeCompSelection,
  timestampCompSelection,
} from "./comp";

function getCompSelection(columnType: string): CompSelection | undefined {
  if (!columnType) {
    return undefined;
  }
  switch (columnType.toLowerCase()) {
    case "bool":
    case "boolean":
      return booleanCompSelection();
    case "smallint":
    case "int2":
    case "integer":
    case "int":
    case "int4":
    case "bigint":
    case "int8":
    case "smallserial":
    case "serial2":
    case "serial":
    case "serial4":
    case "bigserial":
    case "serial8":
    case "real":
    case "float4":
    case "double precision":
    case "float8":
    case "numeric":
    case "decimal":
      return numberCompSelection(true);
    case "date":
      return dateCompSelection();
    case "timestamp":
    case "timestamptz":
      return timestampCompSelection();
    case "time":
    case "timetz":
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
    compType: "postgres",
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

export const postgreSqlConfig: DataSourceTypeConfig = {
  type: "postgres",
  getCompSelection,
  getQueryInitData,
};
