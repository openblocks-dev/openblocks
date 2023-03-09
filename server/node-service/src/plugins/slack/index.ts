import { PluginContext } from "openblocks-sdk/dataSource";
import queryConfig, { ActionDataType } from "./queryConfig";
import { dataSourceConfig, DataSourceDataType } from "./dataSourceConfig";
import run from "./run";

const slackPlugin = {
  id: "slack",
  name: "Slack",
  icon: "slack.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: queryConfig,

  run: async (action: ActionDataType, dataSourceConfig: DataSourceDataType, ctx: PluginContext) => {
    try {
      return await run(action, dataSourceConfig);
    } catch (e) {
      throw e;
    }
  },
};

export default slackPlugin;
