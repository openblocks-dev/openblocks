import { readYaml } from "../../common/util";
import _ from "lodash";
import fs from "fs";
import path from "path";
import { OpenAPI } from "openapi-types";
import { ConfigToType, DataSourcePlugin, QueryConfig } from "openblocks-sdk/dataSource";
import { runOpenApi } from "../openApi";
import { MultiOpenApiSpecItem, parseMultiOpenApi, ParseOpenApiOptions } from "../openApi/parse";
import { appendTags } from "../openApi/util";

function genTagFromFileName(name: string) {
  const fileName = name.replace(/\.yaml|twilio_/g, "");
  const parts = fileName.split("_");
  return parts.reduce((a, b) => {
    if (/v\d+/.test(b)) {
      return `${a}(${b})`;
    }
    return a + _.upperFirst(b);
  }, "");
}

const specList: MultiOpenApiSpecItem[] = [];

const start = performance.now();
const specFiles = fs.readdirSync(path.join(__dirname, "./twilio.spec"));
specFiles.forEach((specFile) => {
  const spec = readYaml(path.join(__dirname, "./twilio.spec", specFile));
  const tag = genTagFromFileName(specFile);
  appendTags(spec, tag);
  specList.push({
    id: tag,
    spec,
  });
});
logger.info("twilio spec list loaded, duration: %d ms", performance.now() - start);

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "textInput",
      key: "accountSid_authToken.username",
      label: "SID",
      placeholder: "<SID>",
    },
    {
      type: "password",
      key: "accountSid_authToken.password",
      label: "Secret",
      placeholder: "<Secret>",
    },
  ],
} as const;

const parseOptions: ParseOpenApiOptions = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return _.upperFirst(operation.operationId || "");
  },
};

let queryConfig: QueryConfig;

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;

const twilioPlugin: DataSourcePlugin<any, DataSourceConfigType> = {
  id: "twilio",
  name: "Twilio",
  icon: "twilio.svg",
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

export default twilioPlugin;
