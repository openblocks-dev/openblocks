import { readFileSync } from "fs";
import _ from "lodash";
import { OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin, QueryConfig } from "openblocks-sdk/dataSource";
import path from "path";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

const specJson = readFileSync(path.join(__dirname, "./jira.spec.json")).toString();

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "textInput",
      key: "serverUrl",
      label: "Server URL",
      placeholder: "https://your-domain.atlassian.net",
    },
    {
      type: "groupTitle",
      key: "basicAuth",
      label: "HTTP Basic Auth",
    },
    {
      type: "textInput",
      key: "basicAuth.username",
      label: "Account Email",
      tooltip: "The email of your atlassian account",
      placeholder: "<The email of your atlassian account>",
    },
    {
      type: "password",
      key: "basicAuth.password",
      label: "Api Token",
      tooltip: "Basic auth password",
      placeholder: "<API Token>",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return _.upperFirst(operation.operationId || "");
  },
  actionDescription(method, path, operation) {
    return operation.description || "";
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

let queryConfig: QueryConfig;

const jiraPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "jira",
  name: "Jira",
  icon: "jira.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    if (!queryConfig) {
      const { actions, categories } = await parseOpenApi(JSON.parse(specJson), parseOptions);
      queryConfig = {
        type: "query",
        label: "Action",
        categories: {
          label: "Category",
          items: categories,
        },
        actions,
      };
    }
    return queryConfig;
  },
  run: function (actionData, dataSourceConfig): Promise<any> {
    const spec = JSON.parse(specJson);
    const runApiDsConfig = {
      url: "",
      serverURL: dataSourceConfig.serverUrl,
      dynamicParamsConfig: dataSourceConfig,
    };
    return runOpenApi(actionData, runApiDsConfig, spec);
  },
};

export default jiraPlugin;
