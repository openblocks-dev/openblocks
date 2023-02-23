import { JSONObject } from "util/jsonTypes";

export const EMPTY_OBJECT = {};
export type ListCompType = "listView" | "grid";

export function getData(data: number | Array<JSONObject>): {
  data: Array<JSONObject>;
  itemCount: number;
} {
  if (typeof data === "number") return { data: [], itemCount: data };
  return { data, itemCount: data.length };
}

export function getCurrentItemParams(data: Array<JSONObject>, idx?: number) {
  return data[idx ?? 0] ?? EMPTY_OBJECT;
}

export function genKey(i: number) {
  return String(i);
}
