import { JSONObject, JSONValue } from "util/jsonTypes";

/**
 * Put some common types of executeComp feature
 */
export type ParamType =
  | "string"
  | "number"
  | "boolean"
  | "arrayString"
  | "arrayNumberString"
  | "JSON"
  | "JSONValue";

export type ParamConfig = {
  name: string;
  type: ParamType;
};
export type ParamsConfig = Array<ParamConfig>;
export type MethodConfig = {
  name: string;
  params: ParamsConfig;
  description?: string;
};

export type EvalParamType = string | number | boolean | string[] | JSONObject | JSONValue;
export type ExecuteAction = {
  type: "execute";
  methodName: string;
  params: Array<EvalParamType>;
};
