import _ from "lodash";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

import spec from "./front.spec.json";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "password",
      key: "http.value",
      label: "Token",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || "";
  },
  actionDescription: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.description || "";
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const frontPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "front",
  name: "Front",
  icon: "front.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const { actions, categories } = await parseOpenApi(spec as OpenAPI.Document, parseOptions);
    return {
      type: "query",
      label: "Action",
      categories: {
        label: "Category",
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
    return runOpenApi(actionData, runApiDsConfig, spec as OpenAPIV3.Document);
  },
};

export default frontPlugin;
