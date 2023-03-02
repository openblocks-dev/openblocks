import { safeJsonStringify } from "../../../common/util";
import { OpenAPIV3 } from "openapi-types";
import { ActionParamConfig, ActionParamType } from "openblocks-sdk/dataSource";
import {
  ConfigKeySplit,
  getSchemaExample,
  isOas3RefObject as isRefObject,
  MediaTypeMultiPartFormData,
  MediaTypeUrlEncoded,
  selectMediaType,
} from "../util";

function getOpenApiV3ParamType(
  type: OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
  format: string,
  hasOptions: boolean = false
): ActionParamType {
  if (format === "binary") {
    return "file";
  }
  if (type === "boolean") {
    return "booleanInput";
  }
  if (type === "integer" || type === "number") {
    return "numberInput";
  }
  if (type === "string") {
    return hasOptions ? "select" : "textInput";
  }
  if (type === "array" || type === "object") {
    return "jsonInput";
  }
  return "textInput";
}

const schemaToActionParamConfig = (
  name: string,
  desc: string,
  position: string,
  schema: OpenAPIV3.SchemaObject,
  example?: any
) => {
  const { type = "array", enum: options } = schema;
  const paramType = getOpenApiV3ParamType(type, schema.format || "", !!options);
  const defaultValue = example || getSchemaExample(schema);
  const shouldJsonStringify = type === "array" || type === "object";
  const param: ActionParamConfig = {
    label: name,
    tooltip: desc || schema.description,
    options:
      options?.map((i) => {
        return {
          label: String(i),
          value: String(i),
        };
      }) || [],
    type: paramType,
    defaultValue: shouldJsonStringify ? safeJsonStringify(defaultValue) : defaultValue,
    key: `${position}${ConfigKeySplit}${name}`,
  };
  return param;
};

export function parseOperation(
  operation?: OpenAPIV3.OperationObject,
  pathSpec?: OpenAPIV3.PathItemObject
): ActionParamConfig[] {
  const params: ActionParamConfig[] = [];
  if (!operation || !pathSpec) {
    return [];
  }
  const { parameters: pathParameters = [] } = pathSpec;
  const { parameters = [], requestBody } = operation;

  pathParameters.concat(parameters).forEach((i) => {
    if (isRefObject(i)) {
      console.warn("unexpected ref parameters:", i);
      return;
    }

    const { name, description = "", in: position, schema: paramSchema } = i;

    let schema = paramSchema;
    if (!paramSchema) {
      schema = {
        type: "string",
      };
    }
    if (!schema || isRefObject(schema)) {
      console.warn("parameter spec with unexpected schema", i);
      return;
    }

    const param = schemaToActionParamConfig(name, description, position, schema);
    params.push(param);
  });

  if (requestBody) {
    if (isRefObject(requestBody)) {
      console.warn("unexpected requestBody of operation:", operation);
    } else {
      const mediaTypes = Object.keys(requestBody.content);
      if (mediaTypes.length > 0) {
        const mediaType = selectMediaType(mediaTypes);
        const mediaTypeObj = requestBody.content[mediaType];
        const schema = mediaTypeObj.schema;

        // get media level example
        let example: any = mediaTypeObj.example;
        const mediaTypeExample = Object.values(mediaTypeObj.examples || {})[0];
        if (
          !example &&
          mediaTypeExample &&
          !isRefObject(mediaTypeExample) &&
          mediaTypeExample.value
        ) {
          example = mediaTypeExample.value;
        }

        if (schema && !isRefObject(schema)) {
          if (
            schema.properties &&
            (mediaType === MediaTypeUrlEncoded || mediaType === MediaTypeMultiPartFormData)
          ) {
            // for application/x-www-form-urlencoded or multipart/form-data, user can specify every property independently
            Object.keys(schema.properties || {}).forEach((name) => {
              const propSchema = schema.properties?.[name];

              if (!propSchema) {
                return;
              }

              if (isRefObject(propSchema)) {
                console.warn("unexpected propSchema:", propSchema);
                return;
              }

              if (propSchema.readOnly) {
                return;
              }

              const param = schemaToActionParamConfig(
                name,
                "",
                "body",
                propSchema,
                example?.[name]
              );
              params.push(param);
            });
          } else {
            // for other Content-Type of request body, specify all property in a widget as body__@__body
            const param = schemaToActionParamConfig("body", "", "body", schema, example);
            params.push(param);
          }
        } else {
          console.warn("unexpected schema:", schema);
        }
      }
    }
  }

  return params;
}
