import { OpenAPIV2 } from "openapi-types";
import { ActionParamType, ActionParamConfig, ParamOption } from "openblocks-sdk/dataSource";
import {
  ConfigKeySplit,
  getSchemaExample,
  getSchemaType,
  isSwagger2RefObject as isRefObject,
  MediaTypeMultiPartFormData,
  MediaTypeUrlEncoded,
} from "../util";
import { safeJsonStringify } from "../../../common/util";

function getMediaType(operation: OpenAPIV2.OperationObject) {
  let mediaType = operation.consumes?.[0];
  if (mediaType) {
    return mediaType;
  }
  if (operation.parameters?.find((i) => !isRefObject(i) && i.type === "file")) {
    return MediaTypeMultiPartFormData;
  }
  if (operation.parameters?.find((i) => !isRefObject(i) && i.in === "formData")) {
    return MediaTypeUrlEncoded;
  }
  return;
}

const openApiV2TypeMap: Record<string, ActionParamType> = {
  integer: "numberInput",
  number: "numberInput",
  boolean: "booleanInput",
  string: "textInput",
  object: "jsonInput",
  file: "file",
};

export function parseOperation(
  operation: OpenAPIV2.OperationObject,
  pathSpec: OpenAPIV2.PathItemObject
): ActionParamConfig[] {
  const params: ActionParamConfig[] = [];
  const pathParametersSpec = pathSpec.parameters || [];
  const operationParametersSpec = operation.parameters || [];
  pathParametersSpec.concat(operationParametersSpec).forEach((paramSpec) => {
    if (isRefObject(paramSpec)) {
      console.warn("unexpected ref parameters:", paramSpec);
      return;
    }
    const specType = paramSpec.type || paramSpec.schema?.type;
    let type: ActionParamType = openApiV2TypeMap[specType];
    if (!type) {
      type = "jsonInput";
    }
    if (specType === "array") {
      type = "jsonInput";
      if (paramSpec.in === "query") {
        type = "textInput";
      }
      if (paramSpec.items?.enum) {
        type = "select";
      }
    }

    let options: ParamOption[] = [];
    let enumList: any[] = [];
    let defaultValue = getSchemaExample(paramSpec.schema);
    if (specType === "array" || specType === "object") {
      defaultValue = safeJsonStringify(defaultValue);
    }
    if (paramSpec.enum) {
      enumList = paramSpec.enum;
    }
    const items: OpenAPIV2.ItemsObject | OpenAPIV2.ReferenceObject = paramSpec.items;
    if (items && !isRefObject(items) && items.enum) {
      enumList = items.enum;
      defaultValue = items.default;
    }
    enumList.forEach((i: any) => {
      options.push({
        label: String(i),
        value: String(i),
      });
    });

    const config: ActionParamConfig = {
      label: paramSpec.name,
      tooltip: paramSpec.description,
      defaultValue,
      options,
      type,
      key: `${paramSpec.in}${ConfigKeySplit}${paramSpec.name}`,
    };
    params.push(config);
  });

  return params;
}
