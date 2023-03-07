import { badRequest } from "../../common/error";
import _ from "lodash";
import { OpenAPIV2, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { defaultParseOpenApiOptions, parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";
import spec from "./woocommerce-spec.json";

export function prepareServerUrl(url: string) {
  if (/\/wc\/v[12]$/.test(url)) {
    throw badRequest("only woocommerce api v3 is supported");
  }
  if (/\/wc\/v3$/.test(url)) {
    return url;
  }
  if (!url.endsWith("/")) {
    url += "/";
  }
  return url + "wp-json/wc/v3";
}

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "serverURL",
      type: "textInput",
      label: "Server URL",
      rules: [{ required: true, message: "The server url is required" }],
      placeholder: "https://localhost/wp-json/wc/v3",
      tooltip: "HTTPS is required",
    },
    { type: "groupTitle", key: "BasicAuth", label: "HTTP Basic Auth" },
    {
      type: "textInput",
      key: "basicAuth.username",
      label: "Username",
      tooltip: "Basic auth username",
      placeholder: "<username>",
    },
    {
      type: "password",
      key: "basicAuth.password",
      label: "Password",
      tooltip: "",
      placeholder: "<password>",
    },
  ],
} as const;

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || defaultParseOpenApiOptions.actionLabel(method, path, operation);
  },
  actionDescription: (method: string, path: string, operation: OpenAPI.Operation) => {
    return `${method} ${path}`;
  },
};

const wooCommercePlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "woocommerce",
  name: "WooCommerce",
  icon: "woocommerce.svg",
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
    const { serverURL, ...otherDataSourceConfig } = dataSourceConfig;
    const runApiDsConfig = {
      url: "",
      serverURL: prepareServerUrl(serverURL),
      dynamicParamsConfig: otherDataSourceConfig,
    };
    return runOpenApi(actionData, runApiDsConfig, spec as unknown as OpenAPIV2.Document);
  },
};

export default wooCommercePlugin;
