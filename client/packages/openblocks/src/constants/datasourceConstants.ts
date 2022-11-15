import { DatasourceType } from "@openblocks-ee/constants/queryConstants";

export const databasePlugins: Partial<DatasourceType>[] = [
  "mysql",
  "mongodb",
  "postgres",
  "redis",
  "es",
  "mssql",
  "oracle",
  "clickHouse",
  "googleSheets",
];

export const apiPluginsForQueryLibrary: Partial<DatasourceType>[] = ["restApi", "smtp"];

export const apiPlugins: Partial<DatasourceType>[] = [...apiPluginsForQueryLibrary];
