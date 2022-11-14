import { DataSourceTypeConfig } from "./dataSourceCommon";
import { msSqlConfig } from "./mssql";
import { mysqlConfig } from "./mysql";
import { oracleSqlConfig } from "./oracle";
import { postgreSqlConfig } from "./postgresql";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";

export function getDataSourceTypeConfig(
  dataSourceType?: DatasourceType
): DataSourceTypeConfig | undefined {
  if (dataSourceType) {
    switch (dataSourceType) {
      case "mysql":
        return mysqlConfig;
      case "postgres":
        return postgreSqlConfig;
      case "mssql":
        return msSqlConfig;
      case "oracle":
        return oracleSqlConfig;
    }
  }
}
