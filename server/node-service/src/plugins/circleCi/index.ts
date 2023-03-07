import _ from "lodash";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

import spec from "./circleCi.spec.json";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "password",
      key: "api_key_header.value",
      label: "API Token",
      tooltip:
        "[Personal API Token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token)",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return _.upperFirst(operation.operationId || "");
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const circleCiPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "circleCi",
  name: "CircleCI",
  icon: "circleCI.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const { actions, categories } = await parseOpenApi(
      spec as unknown as OpenAPI.Document,
      parseOptions
    );
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
      serverURL: "",
      dynamicParamsConfig: dataSourceConfig,
    };
    return runOpenApi(actionData, runApiDsConfig, spec as unknown as OpenAPIV3.Document);
  },
};

export default circleCiPlugin;
