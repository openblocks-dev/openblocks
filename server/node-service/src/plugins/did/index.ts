import { readYaml } from "../../common/util";
import _ from "lodash";
import path from "path";
import { OpenAPIV3, OpenAPI } from "openapi-types";
import { QueryConfig, ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { MultiOpenApiSpecItem, parseMultiOpenApi, ParseOpenApiOptions } from "../openApi/parse";
import { appendTags } from "../../plugins/openApi/util";
import { readdirSync } from "fs";

const specList: MultiOpenApiSpecItem[] = [];
const specFiles = readdirSync(path.join(__dirname, "./did.spec"));
const start = performance.now();
specFiles.forEach((specFile) => {
  const spec = readYaml(path.join(__dirname, "./did.spec", specFile));
  const tag = _.upperFirst(specFile.replace(".json", ""));
  appendTags(spec, tag);
  specList.push({
    spec,
    id: tag,
  });
});
logger.info("did spec list loaded, duration: %d ms", performance.now() - start);

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "groupTitle",
      key: "basic",
      label: "HTTP Basic Auth",
    },
    {
      type: "textInput",
      key: "basic.username",
      label: "Username",
      tooltip: "Basic auth username",
      placeholder: "<Basic Auth Username>",
    },
    {
      type: "password",
      key: "basic.password",
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

let queryConfig: QueryConfig | undefined;

const didPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "did",
  name: "D-ID",
  icon: "did.svg",
  category: "api",
  dataSourceConfig,
  queryConfig: async () => {
    if (!queryConfig) {
      const { actions, categories } = await parseMultiOpenApi(specList, parseOptions);
      queryConfig = {
        type: "query",
        label: "Action",
        categories: {
          label: "Resources",
          items: categories,
        },
        actions,
      };
    }
    return queryConfig;
  },
  run: function (actionData, dataSourceConfig): Promise<any> {
    const runApiDsConfig = {
      url: "",
      serverURL: "",
      dynamicParamsConfig: dataSourceConfig,
    };
    return runOpenApi(actionData, runApiDsConfig, specList);
  },
};

export default didPlugin;
