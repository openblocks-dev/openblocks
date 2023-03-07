import { JSONObject, JSONValue } from "util/jsonTypes";

class EvalTypeError extends TypeError {
  hint?: string;

  constructor(msg: string, hint?: string) {
    super(msg);
    this.hint = hint;
  }
}

function typeErrorMsg(requiredType: string, value: any, actualType?: string) {
  let displayValue = value;
  const displayActualType = actualType ?? typeof value;
  if (displayActualType === "string") {
    displayValue = "`" + displayValue + "`";
  }
  return `Type "${requiredType}" is required, but find "${displayActualType}" type with value: ${displayValue}`;
}

export function toStringOrNumber(value: any): string | number {
  if (value === undefined || value === null) {
    return "";
  }
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return toString(value);
}

export function toString(value: any): string {
  if (value === undefined || value === null) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (value instanceof RegExp) {
    return value.toString();
  }
  return JSON.stringify(value, (k, v) => {
    switch (typeof v) {
      case "bigint":
        return v.toString();
    }
    return v;
  });
}

export function toNumber(value: any): number {
  if (value === undefined || value === null || value === "" || isNaN(value)) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
}

export function tryToNumber(value: string): number | string {
  const res = Number(value);
  if (isNaN(res)) return value;
  return res;
}

export function toBoolean(value: any): boolean {
  if (value === "0" || value === "false") {
    return false;
  }
  return !!value;
}

export function toJSONObject(value: any): JSONObject {
  if (value === undefined || value === null || value === "") {
    return {};
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return checkJSONValue(value) as JSONObject;
  }
  throw new TypeError(typeErrorMsg("JSON Object", value));
}

function checkJSONValue(value: any) {
  JSON.stringify(value, (key, v) => {
    switch (typeof v) {
      case "string":
      case "number":
      case "boolean":
      case "object":
        return v;
      default:
        throw new TypeError(typeErrorMsg("JSON", v, key));
    }
  });
  return value as JSONValue;
}

export function toJSONValue(value: any): JSONValue {
  if (value === undefined) {
    return "";
  }
  return checkJSONValue(value);
}

export function toObject(value: any): Record<string, unknown> {
  if (value === undefined || value === null || value === "") {
    return {};
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  throw new TypeError(typeErrorMsg("Object", value));
}

export function toArray<T>(value: any, itemTransformFn?: (value: unknown) => T): T[] {
  if (value === undefined || value === null || value === "") {
    return [];
  }
  if (Array.isArray(value)) {
    return itemTransformFn ? value.map(itemTransformFn) : value;
  }
  if (typeof value === "string" && value.startsWith("[")) {
    throw new EvalTypeError(typeErrorMsg("Array", value), "Forget to use JSON.parse()?");
  }
  throw new TypeError(typeErrorMsg("Array", value));
}

export function toStringNumberArray(value: any) {
  return toArray(value, toStringOrNumber);
}

export function toStringArray(value: any) {
  return toArray(value, toString);
}

export function toNumberArray(value: any) {
  return toArray(value, toNumber);
}

export function toJSONObjectArray(value: any) {
  return toArray(value, toJSONObject);
}

export function toJSONArray(value: any) {
  return toArray(value, toJSONValue);
}

export function toNumberOrJSONObjectArray(value: any) {
  const num = Number(value);
  if (Number.isFinite(num)) return num;
  return toArray(value, toJSONObject);
}

export function toStringOrJSONObject(value: any) {
  if (typeof value === "string") {
    return value;
  }
  return toJSONObject(value);
}

export function toArrayJSONObject(value: any) {
  if (Array.isArray(value)) {
    return toJSONArray(value);
  } else {
    return toJSONObject(value);
  }
}

export function showTransform(midValue: any, value: any, unevaledValue?: string): boolean {
  // no transform
  if (midValue === value) {
    return false;
  }
  if (midValue === null || midValue === undefined) {
    return true;
  }
  switch (typeof value) {
    case "string":
      if (typeof midValue === "string") {
        // no show: the same trim results
        return value.trim() !== midValue.trim();
      }
      // no show: JSON serialize
      return value !== toString(midValue);
    case "number":
      // no show: "123" => 123
      return typeof midValue !== "string" || midValue.trim() !== value.toString();
    case "boolean":
      // no show: "true" => true
      return (
        typeof midValue !== "string" ||
        midValue.trim() !== value.toString() ||
        unevaledValue?.trim() !== value.toString()
      );
    case "undefined":
      // non-undefined => undefined
      return true;
    case "object":
      // non-null => null, don't show other object transfrom, avoiding too long info
      return value === null;
    default:
      return false;
  }
}

export function check(
  value: any,
  types: ("string" | "number" | "boolean" | "array" | "object" | "null" | "undefined")[],
  key?: string,
  arrayItemTransformer?: (value: any, key: string) => any
) {
  const type = typeof value;
  switch (type) {
    case "string":
    case "number":
    case "boolean":
    case "undefined":
      if (types.includes(type)) {
        return value;
      }
      break;
    case "object":
      if (value === null) {
        if (types.includes("null")) {
          return value;
        }
      } else if (Array.isArray(value)) {
        if (types.includes("array")) {
          return value.map((v, index) => arrayItemTransformer?.(v, index.toString()));
        }
      } else if (types.includes("object")) {
        return value;
      }
      break;
  }
  throw new TypeError(
    typeErrorMsg(
      types.filter((t) => t !== "undefined").join(" | "),
      value,
      key !== undefined ? key + ": " : ""
    )
  );
}
