import { DatasourceType } from "@openblocks-ee/constants/queryConstants";
import { DatasourceFormRegistry } from "@openblocks-ee/pages/datasource/form/datasourceFormRegistry";
import { DataSourcePluginMeta } from "openblocks-sdk/dataSource";
import { DatasourceFormManifest } from "./form/datasourceFormRegistry";
import { PluginDataSourceForm } from "./form/pluginDataSourceForm";

export function getDataSourceFormManifest(
  dataSourceType: DatasourceType,
  plugin?: DataSourcePluginMeta
): DatasourceFormManifest | undefined {
  if (plugin) {
    return {
      form: PluginDataSourceForm,
      enableTest: !!plugin.shouldValidateDataSourceConfig,
    };
  }

  return DatasourceFormRegistry[dataSourceType];
}
