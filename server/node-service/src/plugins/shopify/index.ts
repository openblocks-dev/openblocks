import { kvToRecord } from "../../common/util";
import { ConfigToType, DataSourcePlugin, PluginContext } from "openblocks-sdk/dataSource";
import { graphQLQueryConfig } from "../graphql/queryConfig";
import { runGraphQL } from "../graphql/run";

export const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "textInput",
      label: "Endpoint",
      key: "endpoint",
      rules: [{ required: true }],
    },
  ],
} as const;

const shopifyPlugin: DataSourcePlugin<
  ConfigToType<typeof graphQLQueryConfig>,
  ConfigToType<typeof dataSourceConfig>
> = {
  id: "shopify",
  name: "Shopify",
  category: "api",
  icon: "shopify.svg",
  dataSourceConfig,
  queryConfig: graphQLQueryConfig,
  run: function (actionData, dataSourceConfig, context: PluginContext): Promise<any> {
    const { query, variables: variableKvs, headers: queryHeaders } = actionData;
    const variables = kvToRecord(variableKvs);
    return runGraphQL(dataSourceConfig.endpoint, query, variables, {});
  },
};

export default shopifyPlugin;
