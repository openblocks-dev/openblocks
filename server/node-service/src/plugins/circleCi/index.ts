import { readYaml } from "../../common/util";
import _ from "lodash";
import path from "path";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

import spec from "./circleCi.spec.json";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "groupTitle",
      key: "api_key_header",
      label: "Api Key Auth",
    },
    {
      type: "password",
      key: "api_key_header.value",
      label: "Circle-Token",
    },
    {
      type: "groupTitle",
      key: "basic_auth",
      label: "HTTP Basic Auth",
    },
    {
      type: "textInput",
      key: "basic_auth.username",
      label: "Username",
      tooltip: "Basic auth username",
      placeholder: "<Basic Auth Username>",
    },
    {
      type: "password",
      key: "basic_auth.password",
      label: "Password",
      tooltip: "Basic auth password",
      placeholder: "<Basic Auth Password>",
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
  icon: "circleCi.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const { actions, categories } = await parseOpenApi(spec, parseOptions);
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
    return runOpenApi(actionData, runApiDsConfig, spec as unknown as OpenAPIV3.Document);
  },
};

export default circleCiPlugin;
