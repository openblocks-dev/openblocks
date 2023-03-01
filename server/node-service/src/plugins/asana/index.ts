import { readYaml } from "../../common/util";
import _ from "lodash";
import path from "path";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";


const spec = readYaml(path.join(__dirname, "./asana.spec.yaml"));


const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      "type": "groupTitle",
      "key": "personalAccessToken",
      "label": "Api Token Auth"
    },
    {
      "type": "password",
      "key": "personalAccessToken.value",
      "label": "Token",
      "tooltip": "A [personal access token](https://developers.asana.com/docs/personal-access-token) allows access to the api for the user who created it. This should be kept a secret and be treated like a password.",
    }
  ]
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return _.upperFirst(operation.operationId || "");
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const asanaPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "asana",
  name: "Asana",
  icon: "asana.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const { actions, categories } = await parseOpenApi(spec as OpenAPI.Document, parseOptions);
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
    return runOpenApi(actionData, runApiDsConfig, spec as OpenAPIV3.Document);
  },
};

export default asanaPlugin;
