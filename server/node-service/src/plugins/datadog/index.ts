import { readYaml } from "../../common/util";
import _ from "lodash";
import path from "path";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

const spec = readYaml(path.join(__dirname, "./datadog.spec.yaml"));

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "textInput",
      key: "serverURL",
      label: "Server URL",
      defaultValue: "https://api.datadoghq.com",
    },
    {
      type: "password",
      key: "apiKeyAuth.value",
      label: "Api Key",
    },
    {
      type: "password",
      key: "appKeyAuth.value",
      label: "Application Key",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || "";
  },
  actionDescription(method, path, operation) {
    return operation.description || "";
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const datadogPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "datadog",
  name: "Datadog",
  icon: "datadog.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const { actions, categories } = await parseOpenApi(spec, parseOptions);
    return {
      type: "query",
      label: "Action",
      categories: {
        label: "Resources",
        items: categories,
      },
      actions,
    };
  },
  run: function (actionData, dataSourceConfig): Promise<any> {
    const runApiDsConfig = {
      url: "",
      serverURL: dataSourceConfig.serverURL,
      dynamicParamsConfig: dataSourceConfig,
    };
    return runOpenApi(actionData, runApiDsConfig, spec as OpenAPIV3.Document);
  },
};

export default datadogPlugin;
