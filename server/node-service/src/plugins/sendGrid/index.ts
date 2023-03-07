import _ from "lodash";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";

import spec from "./sendGrid.spec.json";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "password",
      key: "Authorization.value",
      label: "API Key",
      tooltip:
        "[Documentation](https://docs.sendgrid.com/ui/account-and-settings/api-keys#creating-an-api-key)",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) =>
    operation.operationId?.replace("_", " ") || "",
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const sendGridPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "sendGrid",
  name: "SendGrid",
  icon: "sendGrid.svg",
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
      serverURL: "https://api.sendgrid.com/v3",
      dynamicParamsConfig: {
        ...dataSourceConfig,
        "Authorization.value": "Bearer " + dataSourceConfig["Authorization.value"],
      },
    };
    return runOpenApi(actionData, runApiDsConfig, spec as unknown as OpenAPIV3.Document);
  },
};

export default sendGridPlugin;
