import { S3ServiceException } from "@aws-sdk/client-s3";
import { ServiceError } from "../../common/error";
import _ from "lodash";
import { PluginContext } from "openblocks-sdk/dataSource";
import queryConfig, { ActionDataType } from "./queryConfig";
import { DataSourceDataType } from "./dataSourceConfig";
import run, { validateDataSourceConfig } from "./run";
import { dataSourceConfig } from "./dataSourceConfig";

const gcsPlugin = {
  id: "googleCloudStorage",
  name: "Google Cloud Storage",
  icon: "gcs.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: queryConfig,

  validateDataSourceConfig: async (dataSourceConfig: DataSourceDataType) => {
    return validateDataSourceConfig(dataSourceConfig);
  },

  run: async (action: ActionDataType, dataSourceConfig: DataSourceDataType, ctx: PluginContext) => {
    try {
      return await run(action, dataSourceConfig);
    } catch (e) {
      if (e instanceof S3ServiceException) {
        throw new ServiceError(e.message, 400);
      }
      throw e;
    }
  },
};

export default gcsPlugin;
