import { readYaml } from "../../common/util";
import _ from "lodash";
import path from "path";
import { OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { parseOpenApi, ParseOpenApiOptions } from "../openApi/parse";
import { mergeCategories } from "../../plugins/openApi/util";

// all OpenAPI specs generated from https://www.postman.com/cloudinaryteam/workspace/programmable-media/collection/16080251-d28221d4-b2f8-4244-a4eb-7e77abe3a857?ctx=documentation
const adminApiSpec = readYaml(path.join(__dirname, "./adminApi.spec.yaml"));
const uploadApiSpec = readYaml(path.join(__dirname, "./uploadApi.spec.yaml"));

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "textInput",
      key: "basicAuth.username",
      label: "Username",
      tooltip: "Basic auth username",
      placeholder: "<Basic Auth Username>",
    },
    {
      type: "password",
      key: "basicAuth.password",
      label: "Password",
      tooltip: "Basic auth password",
      placeholder: "<Basic Auth Password>",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || "";
  },
  actionDescription(method, path, operation) {
    return operation.description || "";
  },
};

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const cloudinaryPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "cloudinary",
  name: "cloudinary",
  icon: "cloudinary.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    const [parsedAdminApi, parsedUploadApi] = await Promise.all([
      parseOpenApi(adminApiSpec, parseOptions),
      parseOpenApi(uploadApiSpec, parseOptions),
    ]);
    return {
      type: "query",
      label: "Action",
      categories: {
        label: "Resources",
        items: mergeCategories(parsedUploadApi.categories, parsedAdminApi.categories),
      },
      actions: parsedAdminApi.actions.concat(parsedUploadApi.actions),
    };
  },
  run: function (actionData, dataSourceConfig): Promise<any> {
    const runApiDsConfig = {
      url: "",
      serverURL: "",
      dynamicParamsConfig: dataSourceConfig,
    };
    return runOpenApi(actionData, runApiDsConfig, [adminApiSpec, uploadApiSpec]);
  },
};

export default cloudinaryPlugin;
