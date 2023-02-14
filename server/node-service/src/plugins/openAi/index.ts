import _ from "lodash";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";
import spec from "./openai-spec.json";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "ApiKey.value",
      type: "password",
      label: "API Key",
      rules: [{ required: true }],
      placeholder: "<Your API KEY>",
      tooltip:
        "[Document](https://platform.openai.com/account/api-keys) on which you can create your api key",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return _.upperFirst(operation.operationId || "");
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const openAiPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "OpenAI",
  name: "OpenAI",
  icon: "openAI.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const { actions } = await parseOpenApi(spec, parseOptions);
    return {
      type: "query",
      label: "Action",
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

export default openAiPlugin;
