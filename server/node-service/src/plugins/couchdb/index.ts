import _ from "lodash";
import { OpenAPIV2, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { defaultParseOpenApiOptions, parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";
import spec from "./CouchDB-3.1.1-resolved.json";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "serverURL",
      type: "textInput",
      label: "Server URL",
      rules: [{ required: true, message: "The server url is required" }],
      placeholder: "https://<your couchdb server host>",
    },
    { type: "groupTitle", key: "BasicAuth", label: "HTTP Basic Auth" },
    {
      type: "textInput",
      key: "BasicAuth.username",
      label: "Username",
      tooltip: "Basic auth username",
      placeholder: "<username>",
    },
    {
      type: "password",
      key: "BasicAuth.password",
      label: "Password",
      tooltip: "",
      placeholder: "<password>",
    },
    { type: "groupTitle", key: "JwtAuth", label: "Api Key Auth" },
    {
      type: "password",
      key: "JwtAuth.value",
      label: "Authorization",
      tooltip: "",
      placeholder: "",
    },
  ],
} as const;

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    const label = defaultParseOpenApiOptions.actionLabel(method, path, operation);
    return _.upperFirst(label);
  },
  actionDescription: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || "";
  },
};

const couchdbPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "couchdb",
  name: "CouchDB",
  icon: "couchdb.svg",
  category: "database",
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
      serverURL: serverURL,
      dynamicParamsConfig: otherDataSourceConfig,
    };
    return runOpenApi(actionData, runApiDsConfig, spec as OpenAPIV2.Document);
  },
};

export default couchdbPlugin;
