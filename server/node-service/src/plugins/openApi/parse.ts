import SwaggerParser from "@apidevtools/swagger-parser";
import { badRequest, ServiceError } from "../../common/error";
import { OpenAPI, OpenAPIV2, OpenAPIV3 } from "openapi-types";
import {
  ActionCategory,
  ActionConfig,
  ActionParamConfig,
  DataSourceParamConfig,
} from "openblocks-sdk/dataSource";
import { parseOperation as parseOas3Operation } from "./parse/oas3";
import { parseOperation as parseSwagger2Operation } from "./parse/swagger2";
import _ from "lodash";
// @ts-ignore
import SwaggerClient from "swagger-client";
import {
  appendCategories,
  getOperationId,
  isOas3HttpMethods,
  isOas3RefObject,
  isSwagger2HttpMethods,
  isValidHttpMethods,
  mergeCategories,
  specVersion,
} from "./util";

function apiKeyAuthConfig(
  authName: string,
  schema: OpenAPIV2.SecuritySchemeApiKey | OpenAPIV3.ApiKeySecurityScheme
) {
  const config: DataSourceParamConfig = {
    type: "password",
    key: [authName, "value"].join("."),
    label: schema.name,
    tooltip: schema.description,
    placeholder: schema.description,
  };

  return [config];
}

function bearerBasicAuthConfig(authName: string, schema: OpenAPIV3.HttpSecurityScheme) {
  const config: DataSourceParamConfig = {
    type: "password",
    key: [authName, "value"].join("."),
    label: "Token",
    tooltip: schema.description,
    placeholder: schema.description,
  };

  return [config];
}

function basicAuthConfig(
  authName: string,
  schema: OpenAPIV2.SecuritySchemeBasic | OpenAPIV3.HttpSecurityScheme
) {
  const username: DataSourceParamConfig = {
    type: "textInput",
    key: [authName, "username"].join("."),
    label: "Username",
    tooltip: "Basic auth username",
    placeholder: "<Basic Auth Username>",
  };
  const password: DataSourceParamConfig = {
    type: "password",
    key: [authName, "password"].join("."),
    label: "Password",
    tooltip: "Basic auth password",
    placeholder: "<Basic Auth Password>",
  };
  return [username, password];
}

export async function authParamsConfig(spec: OpenAPI.Document): Promise<DataSourceParamConfig[]> {
  const configs: DataSourceParamConfig[] = [];
  const [main] = specVersion(spec);
  if (main === 2) {
    const doc = spec as OpenAPIV2.Document;
    if (!doc.securityDefinitions) {
      return [];
    }
    Object.entries(doc.securityDefinitions).forEach(([authName, schema]) => {
      const groupTitle: DataSourceParamConfig = {
        type: "groupTitle",
        key: authName,
        label: "",
      };
      if (schema.type === "apiKey") {
        const title = { ...groupTitle, label: "Api Key Auth" };
        configs.push(title, ...apiKeyAuthConfig(authName, schema));
      }
      if (schema.type === "basic") {
        const title = { ...groupTitle, label: "HTTP Basic Auth" };
        configs.push(title, ...basicAuthConfig(authName, schema));
      }
      if (schema.type === "oauth2") {
        // TODO
      }
    });
  }
  if (main === 3) {
    const doc = spec as OpenAPIV3.Document;
    const securitySchemas = doc.components?.securitySchemes;
    if (!securitySchemas) {
      return [];
    }
    Object.entries(securitySchemas).forEach(([authName, schema]) => {
      if (isOas3RefObject(schema)) {
        return;
      }
      const groupTitle: DataSourceParamConfig = {
        type: "groupTitle",
        key: authName,
        label: "",
      };
      if (schema.type === "apiKey") {
        const title = { ...groupTitle, label: "Api Key Auth" };
        configs.push(title, ...apiKeyAuthConfig(authName, schema));
      }
      if (schema.type === "http") {
        if (/^basic$/i.test(schema.scheme)) {
          const title = { ...groupTitle, label: "HTTP Basic Auth" };
          configs.push(title, ...basicAuthConfig(authName, schema));
        }
        if (/^bearer$/i.test(schema.scheme)) {
          const title = { ...groupTitle, label: "Api Token Auth" };
          configs.push(title, ...bearerBasicAuthConfig(authName, schema));
        }
      }
      if (schema.type === "oauth2") {
        // TODO
      }
      if (schema.type === "openIdConnect") {
        // TODO
      }
    });
  }
  return configs;
}

export async function retrieveSpec(url: string) {
  if (!url.startsWith("http") && !url.startsWith("https")) {
    throw badRequest(`Invalid spec url: ${url}`);
  }
  const openApiDoc = await SwaggerParser.bundle(url, {
    resolve: {
      file: false,
    },
  });
  const version = specVersion(openApiDoc);
  const [main] = version;
  if (main !== 2 && main !== 3) {
    throw new ServiceError("Only OpenApi v2 and v3 supported");
  }
  return {
    spec: openApiDoc,
  };
}

export interface ParseOpenApiOptions {
  actionLabel?: (method: string, path: string, operation: OpenAPI.Operation) => string;
  actionDescription?: (method: string, path: string, operation: OpenAPI.Operation) => string;
}

export const defaultParseOpenApiOptions: Required<ParseOpenApiOptions> = {
  actionLabel: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.operationId || `${method.toUpperCase()} - ${path}`;
  },
  actionDescription: (method: string, path: string, operation: OpenAPI.Operation) => {
    return operation.summary || operation.description || "";
  },
};

interface OpenAPIParseResult {
  actions: ActionConfig[];
  categories: ActionCategory[];
}

export type MultiOpenApiSpecItem = {
  spec: OpenAPI.Document | string;
  id: string;
};

export async function parseMultiOpenApi(
  specList: MultiOpenApiSpecItem[],
  options?: Omit<ParseOpenApiOptions, "specId">
): Promise<OpenAPIParseResult> {
  const results = await Promise.all(
    specList.map(({ id, spec }) => parseOpenApi(spec, options, id))
  );
  const reducedResults = results.reduce(
    (a, b) => {
      return {
        actions: a.actions.concat(b.actions),
        categories: mergeCategories(a.categories, b.categories),
      };
    },
    { actions: [], categories: [] }
  );
  return reducedResults;
}

export async function parseOpenApi(
  specJsonOrObj: OpenAPI.Document | string,
  options?: ParseOpenApiOptions,
  /**
   * when parse multi open api this field is required.
   * This will be used to ensure operationId is unique among all operations in all specs.
   */
  specId?: string
): Promise<OpenAPIParseResult> {
  let spec = specJsonOrObj;
  if (typeof specJsonOrObj === "string") {
    spec = JSON.parse(specJsonOrObj);
  }
  const openApiDoc = await SwaggerParser.dereference(spec, { dereference: { circular: "ignore" } });
  const actions: ActionConfig[] = [];
  const categories: ActionCategory[] = [];
  if (!openApiDoc.paths) {
    return {
      actions,
      categories,
    };
  }

  const [main] = specVersion(openApiDoc);
  if (main !== 2 && main !== 3) {
    throw new ServiceError("Only OpenApi v2 and v3 supported");
  }

  const { actionLabel, actionDescription } = _.defaults(options || {}, defaultParseOpenApiOptions);

  openApiDoc.tags?.forEach((tag) => {
    categories.push({
      label: _.upperFirst(tag.name),
      value: tag.name,
    });
  });

  // paths
  Object.keys(openApiDoc.paths).forEach((path) => {
    if (!openApiDoc.paths) {
      return;
    }
    const pathSpec = openApiDoc.paths[path];
    if (!pathSpec) {
      return;
    }

    // methods
    Object.keys(pathSpec).forEach((httpMethod: string) => {
      if (!isValidHttpMethods(httpMethod)) {
        return;
      }

      const operation = (pathSpec as any)[httpMethod] as OpenAPI.Operation;
      if (!operation) {
        return;
      }

      const operationId: string = getOperationId(operation, path, httpMethod, specId);
      if (!operationId) {
        console.warn("can not get operationId:", operation);
        return;
      }

      const { tags } = operation;
      if (tags) {
        appendCategories(
          categories,
          tags.map((i) => ({ label: _.upperFirst(i), value: i }))
        );
      }

      // params
      let params: ActionParamConfig[] = [];

      if (main === 2) {
        params = parseSwagger2Operation(
          operation as OpenAPIV2.OperationObject,
          pathSpec as OpenAPIV2.PathItemObject
        );
      }
      if (main === 3) {
        params = parseOas3Operation(
          operation as OpenAPIV3.OperationObject,
          pathSpec as OpenAPIV3.PathItemObject
        );
      }
      const action: ActionConfig = {
        category: operation.tags || "",
        actionName: operationId,
        label: actionLabel(httpMethod, path, operation),
        description: actionDescription(httpMethod, path, operation),
        params,
      };
      actions.push(action);
    });
  });

  return {
    actions,
    categories,
  };
}
