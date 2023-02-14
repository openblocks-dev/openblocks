import SwaggerClient from "swagger-client";
import SwaggerParser from "@apidevtools/swagger-parser";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { authParamsConfig, parseOpenApi, retrieveSpec } from "./parse";
import {
  extractSecurityParams,
  findOperation,
  replaceServersUrl,
  isOas3,
  normalizeParams,
  safeJsonParse,
  parseUrl,
} from "./util";
import { badRequest } from "../../common/error";
import { OpenAPI, OpenAPIV2 } from "openapi-types";
import _ from "lodash";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      label: "Spec URL",
      key: "url",
      type: "textInput",
      updatable: false,
      rules: [
        {
          required: true,
        },
      ],
      tooltip: "JSON/YAML format spec url of Swagger or OpenApi.",
      placeholder: "https://petstore.swagger.io/v2/swagger.yaml",
    },
    {
      label: "Server URL",
      key: "serverURL",
      type: "textInput",
      tooltip: "Change the default server url written in the spec file.",
      placeholder: "https://example.com/api/v1",
    },
  ],
} as const;

type DataSourceDataType = ConfigToType<typeof dataSourceConfig>;
interface ActionDataType {
  actionName: string;
  [key: string]: any;
}

export async function runOpenApi(
  actionData: ActionDataType,
  dataSourceConfig: DataSourceDataType,
  spec: OpenAPI.Document
) {
  const definition = await SwaggerParser.dereference(spec);
  const { actionName, ...otherActionData } = actionData;
  const { serverURL } = dataSourceConfig;
  const isOas3Spec = isOas3(definition);

  if (serverURL) {
    if (isOas3Spec) {
      replaceServersUrl(definition, serverURL);
    } else {
      const swaggerDoc = definition as OpenAPIV2.Document;
      const { host, pathname, schema } = parseUrl(serverURL);
      swaggerDoc.host = host || swaggerDoc.host;
      swaggerDoc.basePath = pathname || swaggerDoc.basePath;
      swaggerDoc.schemes = [schema];
    }
  }

  const operation = findOperation(actionName, definition);
  if (!operation) {
    throw badRequest(`unknown operation: ${actionName}`);
  }

  try {
    const { parameters, requestBody } = normalizeParams(otherActionData, operation, isOas3Spec);
    const securities = extractSecurityParams(dataSourceConfig.dynamicParamsConfig, definition);
    const response = await SwaggerClient.execute({
      spec: definition,
      operationId: actionName,
      parameters,
      requestBody,
      securities,
      responseContentType: "application/json",
      requestInterceptor: (req: any) => {
        const ret = {
          ...req,
          duplex: "half",
          headers: _.omitBy(req.headers, (i) => !i),
        };
        return ret;
      },
    });
    return response.body;
  } catch (e: any) {
    if (e.response?.body) {
      return e.response.body;
    }
    if (e.status) {
      throw badRequest(`status: ${e.status}`);
    }
    throw e;
  }
}

const openApiPlugin: DataSourcePlugin<ActionDataType, DataSourceDataType> = {
  id: "openApi",
  name: "OpenApi",
  icon: "swagger.svg",
  category: "api",
  dataSourceConfig: {
    ...dataSourceConfig,
    extra: async (dataSourceConfig) => {
      const { url, extra } = dataSourceConfig;
      let spec: string = extra?.spec;
      let specObj: OpenAPI.Document;
      if (!spec) {
        // retrieve spec from remote only once
        const { spec: remoteSpec } = await retrieveSpec(url);
        specObj = remoteSpec;
        spec = JSON.stringify(remoteSpec);
      } else {
        specObj = safeJsonParse(spec);
      }
      const extraParams = await authParamsConfig(specObj);
      return {
        data: {
          spec,
        },
        extraParams,
      };
    },
  },
  queryConfig: async (data) => {
    const spec = data.extra?.spec;
    if (!spec) {
      throw badRequest("Specification not found in extra field, please recreate the data source.");
    }
    const { actions, categories } = await parseOpenApi(spec);
    return {
      type: "query",
      label: "Operation",
      categories: {
        label: "Resource",
        items: categories,
      },
      actions,
    } as const;
  },
  run: (actionData, dataSourceConfig) => {
    let spec = dataSourceConfig.extra?.spec;
    if (!spec) {
      throw badRequest("Specification not found in extra field, please recreate the data source.");
    }

    if (typeof spec === "string") {
      spec = JSON.parse(spec);
    }

    return runOpenApi(actionData, dataSourceConfig, spec);
  },
};

export default openApiPlugin;
