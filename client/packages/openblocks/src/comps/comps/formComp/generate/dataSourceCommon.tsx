import { ConstructorToDataType } from "openblocks-core";
import { QueryComp } from "comps/queries/queryComp";
import { CompConfig, CompSelection, generateWrapJs } from "./comp";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";

export type TableColumn = {
  // The type of column, different data sources have different definitions
  type: string;
  // column name
  name: string;
  // the selected comp info
  comp: CompConfig;
  label: string;
  required: boolean;
};

export type FullColumnInfo = {
  column: TableColumn;
  compName: string;
};

export type QueryDataType = ConstructorToDataType<typeof QueryComp>;

export type DataSourceTypeConfig = {
  type: DatasourceType;
  getCompSelection: (columnType: string) => CompSelection | undefined;
  getQueryInitData: (formName: string, tableName: string, infos: FullColumnInfo[]) => QueryDataType;
};

export function generateInsertSql(tableName: string, infos: FullColumnInfo[]) {
  return (
    "insert into " +
    tableName +
    "\n  (" +
    infos.map((info) => info.column.name).join(", ") +
    ")\n  values (\n    " +
    infos.map((info) => generateWrapJs(info.compName, info.column.comp)).join(",\n    ") +
    "\n  )"
  );
}
