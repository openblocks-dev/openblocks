import { readYaml } from "../../common/util";
import _ from "lodash";
import path from "path";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

const spec = readYaml(path.join(__dirname, "./notion.spec.yaml"));

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "password",
      key: "bearerAuth.value",
      label: "Token",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || "";
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const notionPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "notion",
  name: "Notion",
  icon: "notion.svg",
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
      serverURL: "",
      dynamicParamsConfig: dataSourceConfig,
    };
    console.info(actionData);
    return runOpenApi(actionData, runApiDsConfig, spec as OpenAPIV3.Document);
  },
};

export default notionPlugin;
