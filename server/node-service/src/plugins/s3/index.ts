import { S3ServiceException } from "@aws-sdk/client-s3";
import { ServiceError } from "../../common/error";
import _ from "lodash";
import { DataSourcePluginFactory, PluginContext } from "openblocks-sdk/dataSource";
import { ActionDataType } from "./queryConfig";
import { DataSourceDataType } from "./dataSourceConfig";
import run, { validateDataSourceConfig } from "./run";
import getI18nTranslator from "./i18n";
import getDataSourceConfig from "./dataSourceConfig";
import getQueryConfig from "./queryConfig";

const s3Plugin: DataSourcePluginFactory = (context: PluginContext) => {
  const i18n = getI18nTranslator(context.languages);
  return {
    id: "s3",
    name: i18n.trans("name"),
    icon: "s3.svg",
    description: i18n.trans("description"),
    category: "api",
    dataSourceConfig: getDataSourceConfig(i18n),
    queryConfig: getQueryConfig(i18n),

    validateDataSourceConfig: async (dataSourceConfig: DataSourceDataType) => {
      return validateDataSourceConfig(dataSourceConfig);
    },

    run: async (
      action: ActionDataType,
      dataSourceConfig: DataSourceDataType,
      ctx: PluginContext
    ) => {
      const i18n = getI18nTranslator(ctx.languages);
      try {
        return await run(action, dataSourceConfig, i18n);
      } catch (e) {
        if (e instanceof S3ServiceException) {
          throw new ServiceError(e.message, 400);
        }
        throw e;
      }
    },
  };
};

export default s3Plugin;
