import { readYaml } from "../../common/util";
import _ from "lodash";
import path from "path";
import { OpenAPIV2, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

const spec = readYaml(path.join(__dirname, "./salesForce.spec.yaml"));

const dataSourceConfig = {
  type: "dataSource",
  params: [],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return _.upperFirst(operation.operationId || "");
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const salesForcePlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "salesForce",
  name: "SalesForce",
  icon: "salesForce.svg",
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
    return runOpenApi(actionData, runApiDsConfig, spec as OpenAPIV2.Document);
  },
};

export default salesForcePlugin;
