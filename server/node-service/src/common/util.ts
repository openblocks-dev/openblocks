import { relaxedJSONToJSON } from "openblocks-core";
import yaml from "yaml";
import fs from "fs";

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

export function toBoolean(value: any): boolean {
  if (value === "0" || value === "false") {
    return false;
  }
  return !!value;
}

export function toJsonValue(value: any): any {
  if (typeof value !== "string") {
    return value;
  }
  try {
    const json = relaxedJSONToJSON(value, true);
    return JSON.parse(json);
  } catch (e) {
    console.info("invalid json input:", value);
    return {};
  }
}

export function toStringOrJson(value: any): any {
  if (typeof value !== "string") {
    return value;
  }
  try {
    const json = relaxedJSONToJSON(value, true);
    return JSON.parse(json);
  } catch (e) {
    if (typeof value === "string") {
      return value;
    }
    console.info("invalid json input:", value);
    return {};
  }
}

export function readYaml<T = any>(path: string): T {
  try {
    const yamlContent = fs.readFileSync(path, "utf-8");
    return yaml.parse(yamlContent) as T;
  } catch (e) {
    console.info("invalid yaml:", e);
    return {} as T;
  }
}
