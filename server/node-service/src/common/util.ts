import yaml from "yaml";
import fs from "fs";

export function kvToRecord(
  kvs: { key: string; value: string }[],
  trimEmpty: boolean = true
): Record<string, string> {
  const ret: Record<string, string> = {};
  (kvs || []).forEach(({ key, value }) => {
    if (trimEmpty && !value) {
      return;
    }
    ret[key] = value;
  });
  return ret;
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

export function toBoolean(value: any): boolean {
  if (value === "0" || value === "false") {
    return false;
  }
  return !!value;
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

export function safeJsonParse(json: string) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.warn("can not json parse:", json);
    return {};
  }
}

export function safeJsonStringify(data: any) {
  if (data === null || data === undefined) {
    return data;
  }
  try {
    return JSON.stringify(data, null, 4);
  } catch (e) {
    console.warn("can not json stringify:", data, e);
    return null;
  }
}
