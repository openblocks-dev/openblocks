import { kvToRecord } from "../../common/util";
import { ConfigToType, DataSourcePlugin, PluginContext } from "openblocks-sdk/dataSource";
import { graphQLQueryConfig } from "../graphql/queryConfig";
import { runGraphQL } from "../graphql/run";

export const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "select",
      label: "Region",
      key: "region",
      options: [
        { label: "United States (US)", value: "us" },
        { label: "Europe (EU)", value: "eu" },
        { label: "Classic", value: "classic" },
        { label: "Preview", value: "preview" },
      ],
      defaultValue: "us",
      tooltip:
        "[Document](https://docs.fauna.com/fauna/current/api/graphql/endpoints) on that you can get more information for GraphQL endpoints of Fauna.",
    },
    {
      type: "password",
      label: "Account Key",
      key: "apiKey",
      rules: [{ required: true }],
    },
  ],
} as const;

const endpoints = {
  us: "https://graphql.us.fauna.com/graphql",
  es: "https://graphql.eu.fauna.com/graphql",
  classic: "https://graphql.fauna.com/graphql",
  preview: "https://graphql.fauna-preview.com/graphql",
};

const faunaPlugin: DataSourcePlugin<
  ConfigToType<typeof graphQLQueryConfig>,
  ConfigToType<typeof dataSourceConfig>
> = {
  id: "fauna",
  name: "Fauna",
  category: "api",
  icon: "fauna.svg",
  dataSourceConfig,
  queryConfig: graphQLQueryConfig,
  run: function (actionData, dataSourceConfig, context: PluginContext): Promise<any> {
    const { region, apiKey } = dataSourceConfig;
    const { query, variables: variableKvs, headers: queryHeaders } = actionData;
    const headers = {
      ...kvToRecord(queryHeaders),
      Authorization: `Bearer ${apiKey}`,
    };
    const variables = kvToRecord(variableKvs);
    const endpoint = endpoints[region as keyof typeof endpoints];
    return runGraphQL(endpoint, query, variables, headers);
  },
};

export default faunaPlugin;
