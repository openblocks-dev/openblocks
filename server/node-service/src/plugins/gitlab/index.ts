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
      placeholder: "https://gitlab.mycompany.com/api/graphql",
    },
    {
      type: "password",
      label: "Access Token",
      key: "token",
      rules: [{ required: true }],
    },
    {
      type: "keyValueInput",
      label: "Headers",
      key: "headers",
      valueType: "string",
    },
  ],
} as const;

const gitlabPlugin: DataSourcePlugin<
  ConfigToType<typeof graphQLQueryConfig>,
  ConfigToType<typeof dataSourceConfig>
> = {
  id: "gitlab",
  name: "Gitlab",
  category: "api",
  icon: "gitlab.svg",
  dataSourceConfig,
  queryConfig: graphQLQueryConfig,
  run: function (actionData, dataSourceConfig, context: PluginContext): Promise<any> {
    const { endpoint, token, headers: defaultHeaders } = dataSourceConfig;
    const { query, variables: variableKvs, headers: queryHeaders } = actionData;
    const headers = {
      ...kvToRecord(defaultHeaders),
      ...kvToRecord(queryHeaders),
      "PRIVATE-TOKEN": token,
    };
    const variables = kvToRecord(variableKvs);
    return runGraphQL(endpoint, query, variables, headers);
  },
};

export default gitlabPlugin;
