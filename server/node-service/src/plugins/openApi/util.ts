import _ from "lodash";
import url from "url";
import { File } from "formdata-node";
import { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import swaggerClient from "swagger-client";
import { ActionCategory } from "openblocks-sdk/dataSource";
import SwaggerClient from "swagger-client";

export const MediaTypeOctetStream = "application/octet-stream";
export const MediaTypeUrlEncoded = "application/x-www-form-urlencoded";
export const MediaTypeMultiPartFormData = "multipart/form-data";
export const MediaTypeJson = "application/json";
export const ConfigKeySplit = "_@_";

interface FileParamValue {
  data: string;
  name?: string;
  type?: string;
}

export function getFileData(value: FileParamValue | string): File | Buffer | null {
  if (!value) {
    return null;
  }
  if (typeof value === "string") {
    return Buffer.from(value, "base64");
  }
  if (value instanceof Buffer || value instanceof File) {
    return value;
  }
  const { data = "", name = "file", type } = value || {};
  if (!data) {
    return null;
  }
  return new File([Buffer.from(data, "base64")], name, { type });
}

export function specVersion(doc: any) {
  const defaultMain = 2;
  const defaultSecondary = 0;
  const version = doc.openapi || doc.swagger;
  if (!version) {
    return [defaultMain, defaultSecondary];
  }
  const parts = version.split(".");
  return [Number(parts[0] || defaultMain), Number(parts[1] || defaultSecondary)];
}

export function isOas3(doc: any): doc is OpenAPIV3.Document {
  const [main] = specVersion(doc);
  return main === 3;
}

export function isOas3RefObject(obj: any): obj is OpenAPIV3.ReferenceObject {
  return !!obj.$ref;
}

export function isSwagger2RefObject(obj: any): obj is OpenAPIV2.ReferenceObject {
  return !!obj.$ref;
}

// { 'a.b.c': 1, other: 2 } ---> { a: { 'b.c': 1 }}
export function extractLevelData(data: any) {
  const ret: any = {};
  Object.keys(data).forEach((key) => {
    const [parent, ...subs] = key.split(".");
    const subKey = subs.join(".");
    if (!subKey) {
      return;
    }
    if (!ret[parent]) {
      ret[parent] = {};
    }
    ret[parent][subKey] = data[key];
  });
  return ret;
}

interface NormalizedParams {
  parameters: any;
  requestBody?: any;
}

export function extractSecurityParams(config: any, spec: OpenAPI.Document) {
  if (!config) {
    return {};
  }
  const isOas3Spec = isOas3(spec);
  const authData = extractLevelData(config);
  let names: string[] = [];
  if (isOas3Spec) {
    const oas3Spec = spec as OpenAPIV3.Document;
    names = Object.keys(oas3Spec.components?.securitySchemes || {});
  } else {
    const swagger2Spec = spec as OpenAPIV2.Document;
    names = Object.keys(swagger2Spec.securityDefinitions || {});
  }
  const authorized = _.pick(authData, names);
  return { authorized, specSecurity: spec.security };
}

export function normalizeParams(
  params: any,
  operation: OpenAPI.Operation,
  isOas3: boolean
): NormalizedParams {
  const paramEntries: [string, any][] = [];
  const bodyEntries: [string, any][] = [];

  Object.keys(params).forEach((key) => {
    const [position, name] = key.split(ConfigKeySplit);
    if (!name) {
      return;
    }
    const isFile = isFileData(name, operation, isOas3);
    const value = isFile ? getFileData(params[key]) : params[key];
    if (value) {
      if (isOas3 && position === "body") {
        bodyEntries.push([name, value]);
      } else {
        paramEntries.push([name, value]);
      }
    }
  });

  let requestBody: any;
  if (isOas3) {
    const oas3Operation = operation as OpenAPIV3.OperationObject;
    const requestBodyDef = oas3Operation.requestBody;
    if (requestBodyDef && !isOas3RefObject(requestBodyDef)) {
      const mediaTypes = Object.keys(requestBodyDef.content);
      const mediaType = selectMediaType(mediaTypes);
      const schema = requestBodyDef.content[mediaType].schema;

      if (bodyEntries.length > 0) {
        // if no body fields, should ensure requestBody is undefined.
        requestBody = Object.fromEntries(bodyEntries);
        if (mediaType === MediaTypeMultiPartFormData) {
          // process file fields
          const fileFields = findOas3FilePropertiesFromSchema(schema);
          fileFields.forEach(([name]) => {
            const file = getFileData(requestBody[name]);
            if (file) {
              requestBody[name] = file;
            }
          });
        }
      }

      if (
        bodyEntries.length === 1 &&
        mediaType !== MediaTypeMultiPartFormData &&
        mediaType !== MediaTypeUrlEncoded
      ) {
        const [name, value] = bodyEntries[0];
        if (name === "body") {
          if (mediaType === MediaTypeOctetStream) {
            const file = getFileData(value);
            if (file) {
              requestBody = file;
            }
          } else {
            requestBody = value;
          }
        }
      }
    }
  }

  return {
    parameters: Object.fromEntries(paramEntries),
    requestBody,
  };
}

export function findOas3FilePropertiesFromSchema(
  schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
) {
  if (!schema || isOas3RefObject(schema) || schema.type === "array") {
    return [];
  }
  return Object.entries(schema.properties || {}).filter(([name, def]) => {
    if (isOas3RefObject(def)) {
      return false;
    }
    return def.format === "binary";
  });
}

export function findOperation(id: string, spec: OpenAPI.Document, specId: string = "") {
  if (!spec.paths) {
    return null;
  }
  for (const path of Object.keys(spec.paths)) {
    const pathObj = spec.paths[path];
    if (!pathObj) {
      continue;
    }
    for (const method of Object.keys(pathObj)) {
      const operation: OpenAPI.Operation = (pathObj as any)[method];
      if (getOperationId(operation, path, method, specId) === id) {
        return {
          operation,
          realOperationId: getOperationId(operation, path, method),
        };
      }
    }
  }
  return null;
}

export function isFile(file: any): file is File {
  return file instanceof File;
}

export function isFileData(name: string, operation: OpenAPI.Operation, isOas3: boolean): boolean {
  if (isOas3) {
    const oas3Operation = operation as OpenAPIV3.OperationObject;
    if (!oas3Operation.requestBody || isOas3RefObject(oas3Operation.requestBody)) {
      return false;
    }
    const schema = oas3Operation.requestBody?.content[MediaTypeMultiPartFormData]?.schema;
    if (!schema || isOas3RefObject(schema)) {
      return false;
    }
    const props = schema.properties;
    if (!props || isOas3RefObject(props)) {
      return false;
    }
    for (const propName of Object.keys(props)) {
      if (propName === name) {
        const propObject = props[propName];
        if (isOas3RefObject(propObject)) {
          return false;
        }
        return propObject.format === "binary";
      }
    }
    return false;
  }

  const swagger2Operation = operation as OpenAPIV2.OperationObject;
  for (const param of swagger2Operation.parameters || []) {
    if (isSwagger2RefObject(param)) {
      continue;
    }
    if (param.name === name) {
      return param.type === "file";
    }
  }
  return false;
}

// the same with swagger-client
export function selectMediaType(types: string[]): string {
  return types[0];
}

export function isOas3HttpMethods(method: string): method is OpenAPIV3.HttpMethods {
  return Object.values(OpenAPIV3.HttpMethods).includes(method as any);
}

export function isSwagger2HttpMethods(method: string): method is OpenAPIV2.HttpMethods {
  return Object.values(OpenAPIV2.HttpMethods).includes(method as any);
}

export function isValidHttpMethods(method: string) {
  return isOas3HttpMethods(method) || isSwagger2HttpMethods(method);
}

function fixServers(server: OpenAPIV3.ServerObject, url: string) {
  if (server.url) {
    server.url = url;
    return server;
  }
}

export function traversalOpenApiOperation(
  schema: OpenAPI.Document,
  fn: (operation: OpenAPI.Operation) => void
) {
  Object.values(schema.paths || {}).forEach(
    (pathObj: OpenAPIV2.PathItemObject | OpenAPIV3.PathItemObject) => {
      Object.entries(pathObj).forEach(([key, value]) => {
        if (
          Object.values(OpenAPIV2.HttpMethods).includes(key as OpenAPIV2.HttpMethods) ||
          Object.values(OpenAPIV3.HttpMethods).includes(key as OpenAPIV3.HttpMethods)
        ) {
          fn(value);
        }
      });
    }
  );
}

export function appendTags(schema: OpenAPI.Document, tag: string) {
  if (!schema.tags) {
    schema.tags = [{ name: tag }];
  } else if (!schema.tags.find((i) => i.name === tag)) {
    schema.tags.push({ name: tag });
  }

  traversalOpenApiOperation(schema, (op) => {
    if (!op.tags) {
      op.tags = [tag];
    } else if (!op.tags.includes(tag)) {
      op.tags.push(tag);
    }
  });
}

export function replaceServersUrl(schema: OpenAPIV3.Document, url: string) {
  if (schema.servers) {
    // Root level servers array's fixup
    schema.servers.map((server) => fixServers(server, url));
  } else {
    schema.servers = [{ url }];
  }

  Object.keys(schema.paths).forEach((path) => {
    const pathItem = schema.paths[path];
    if (!pathItem) {
      return;
    }
    Object.keys(pathItem).forEach((opItem) => {
      if (opItem === "servers") {
        // servers at path item level
        pathItem[opItem]?.forEach((server) => fixServers(server, url));
      } else if (isOas3HttpMethods(opItem)) {
        // servers at operation level
        if (pathItem[opItem]?.servers) {
          pathItem[opItem]?.servers?.forEach((server) => fixServers(server, url));
        }
      }
    });
  });
}

export function getSchemaType(
  schema?:
    | OpenAPIV2.SchemaObject
    | OpenAPIV2.ReferenceObject
    | OpenAPIV3.SchemaObject
    | OpenAPIV3.ReferenceObject
) {
  if (!schema || isOas3RefObject(schema) || isSwagger2RefObject(schema)) {
    return;
  }
  return schema.type;
}

type SchemaObject =
  | OpenAPIV2.SchemaObject
  | OpenAPIV2.ReferenceObject
  | OpenAPIV3.SchemaObject
  | OpenAPIV3.ReferenceObject;

export function getSchemaExample(schema?: SchemaObject): any {
  if (!schema || isOas3RefObject(schema) || isSwagger2RefObject(schema)) {
    return;
  }
  if (schema.readOnly) {
    return;
  }
  if (schema.default) {
    return schema.default;
  }
  if (schema.example) {
    return schema.example;
  }
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum[0];
  }
  if (schema.type === "string") {
    return "";
  }
  if (schema.type === "array") {
    const itemExample = getSchemaExample(
      (schema as OpenAPIV3.ArraySchemaObject | OpenAPIV2.SchemaObject).items
    );
    return _.isNil(itemExample) ? [] : [itemExample];
  }
  if (schema.oneOf && schema.oneOf.length > 0) {
    const firstSchema = schema.oneOf[0];
    return getSchemaExample(firstSchema as SchemaObject);
  }
  if (schema.anyOf && schema.anyOf.length > 0) {
    const firstSchema = schema.anyOf[0];
    return getSchemaExample(firstSchema as SchemaObject);
  }
  if (schema.allOf && schema.allOf.length > 0) {
    return (schema.allOf as SchemaObject[]).reduce((a: any, b: SchemaObject) => {
      return {
        ...a,
        ...getSchemaExample(b),
      };
    }, {});
  }
  let ret: any;
  if (schema.properties) {
    Object.entries(schema.properties).forEach(([name, def]) => {
      if (!ret) {
        ret = {};
      }
      ret[name] = getSchemaExample(def);
    });
  }
  return ret;
}

export function parseUrl(target: string) {
  if (!target.startsWith("https") && !target.startsWith("http")) {
    throw new Error("invalid http url");
  }
  const { pathname, host, protocol } = url.parse(target);
  return {
    pathname,
    host,
    schema: protocol?.replace(/\W/g, "") || "https",
  };
}

export function mergeCategories(a: ActionCategory[], b: ActionCategory[]) {
  const ret = [...a];
  b.forEach((i) => {
    if (ret.find((j) => i.value === j.value)) {
      return;
    }
    ret.push(i);
  });
  return ret;
}

export function appendCategories(a: ActionCategory[], b: ActionCategory[]) {
  b.forEach((i) => {
    if (a.find((j) => i.value === j.value)) {
      return;
    }
    a.push(i);
  });
}

export function getOperationId(
  operation: OpenAPI.Operation,
  path: string,
  method: string,
  specId: string = ""
) {
  const operationId: string = SwaggerClient.helpers.opId(operation, path, method);
  if (!operationId) {
    return "";
  }
  return operationId + specId;
}
