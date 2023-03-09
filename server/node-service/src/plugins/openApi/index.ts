import SwaggerClient from "swagger-client";
import SwaggerParser from "@apidevtools/swagger-parser";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";
import { authParamsConfig, MultiOpenApiSpecItem, parseOpenApi, retrieveSpec } from "./parse";
import {
  extractSecurityParams,
  findOperation,
  replaceServersUrl,
  isOas3,
  normalizeParams,
  parseUrl,
  isFile,
} from "./util";
import { badRequest } from "../../common/error";
import { safeJsonParse } from "../../common/util";
import { OpenAPI, OpenAPIV2, OpenAPIV3 } from "openapi-types";
import _ from "lodash";
import { fetch } from "../../common/fetch";
import { RequestInit, Response } from "node-fetch";

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
  spec: OpenAPI.Document | MultiOpenApiSpecItem[],
  defaultHeaders?: Record<string, string>
) {
  const specList = Array.isArray(spec) ? spec : [{ spec, id: "" }];
  const definitions = await Promise.all(
    specList.map(async ({ id, spec }) => {
      const deRefedSpec = await SwaggerParser.dereference(spec);
      return {
        def: deRefedSpec,
        id,
      };
    })
  );
  const { actionName, ...otherActionData } = actionData;
  const { serverURL } = dataSourceConfig;

  let definition: OpenAPI.Document | undefined;
  let operation;
  let realOperationId;

  for (const { id, def } of definitions) {
    const ret = findOperation(actionName, def, id);
    if (ret) {
      definition = def;
      operation = ret.operation;
      realOperationId = ret.realOperationId;
      break;
    }
  }

  if (!operation || !definition) {
    throw badRequest(`unknown operation: ${actionName}`);
  }

  const isOas3Spec = isOas3(definition);
  if (serverURL) {
    if (isOas3Spec) {
      replaceServersUrl(definition as OpenAPIV3.Document, serverURL);
    } else {
      const swaggerDoc = definition as OpenAPIV2.Document;
      const { host, pathname, schema } = parseUrl(serverURL);
      swaggerDoc.host = host || swaggerDoc.host;
      swaggerDoc.basePath = pathname || swaggerDoc.basePath;
      swaggerDoc.schemes = [schema];
    }
  }

  try {
    const { parameters, requestBody } = normalizeParams(otherActionData, operation, isOas3Spec);
    const securities = extractSecurityParams(dataSourceConfig.dynamicParamsConfig, definition);
    const response = await SwaggerClient.execute({
      spec: definition,
      operationId: realOperationId,
      parameters,
      requestBody,
      securities,
      responseContentType: "application/json",
      userFetch: async (url: string, req: RequestInit) => {
        return fetch(url, req);
      },
      requestInterceptor: (req: any) => {
        const headers = _.omitBy(req.headers, (i) => !i);
        const ret = {
          ...req,
          duplex: "half",
          headers: {
            ...defaultHeaders,
            ...headers,
          },
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
  name: "Open API",
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
