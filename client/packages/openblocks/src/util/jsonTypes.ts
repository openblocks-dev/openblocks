export type JSONValue = string | number | boolean | JSONObject | JSONArray | null;

export interface JSONObject {
  [x: string]: JSONValue | undefined;
}

export type JSONArray = Array<JSONValue>;
