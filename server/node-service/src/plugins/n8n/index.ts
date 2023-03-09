import { badRequest } from "common/error";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { defaultParseOpenApiOptions, parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";
import spec from "./spec.json";

export function prepareServerUrl(url: string) {
  if (/\/api\/v[12]$/.test(url)) {
    return url;
  }
  if (!url.endsWith("/")) {
    url += "/";
  }
  return url + "api/v1";
}

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "serverURL",
      type: "textInput",
      label: "Server URL",
      rules: [{ required: true }],
      placeholder: "https://<your-cloud-instance>",
      tooltip: "Input the server url of your n8n cloud instance or your self-hosting instance.",
    },
    {
      key: "apiKey",
      type: "password",
      label: "X-N8N-API-KEY",
      rules: [{ required: true }],
      placeholder: "<Your API KEY>",
      tooltip:
        "You api key, doc: [n8n API authentication](https://docs.n8n.io/api/authentication/)",
    },
  ],
} as const;

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || defaultParseOpenApiOptions.actionLabel(method, path, operation);
  },
  actionDescription: (method: string, path: string, operation: OpenAPI.Operation) => {
    return (
      operation.description || defaultParseOpenApiOptions.actionDescription(method, path, operation)
    );
  },
};

const n8nPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "n8n",
  name: "n8n",
  icon: "n8n.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const { actions, categories } = await parseOpenApi(spec as OpenAPI.Document, parseOptions);
    return {
      type: "query",
      label: "Operation",
      categories: {
        label: "Resource",
        items: categories,
      },
      actions,
    };
  },
  run: function (actionData, dataSourceConfig): Promise<any> {
    const { serverURL, apiKey } = dataSourceConfig;
    const runApiDsConfig = {
      url: "",
      serverURL: prepareServerUrl(serverURL),
      dynamicParamsConfig: {
        "ApiKeyAuth.value": apiKey,
      },
    };
    return runOpenApi(actionData, runApiDsConfig, spec as OpenAPIV3.Document);
  },
};

export default n8nPlugin;
