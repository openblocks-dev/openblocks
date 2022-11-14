import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function stripLastSlash(str) {
  if (str.endsWith("/")) {
    return str.slice(0, str.length - 1);
  }
  return str;
}

export function ensureLastSlash(str) {
  if (!str) {
    return "/";
  }
  if (!str.endsWith("/")) {
    return `${str}/`;
  }
  return str;
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file).toString());
}

export function currentDirName(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}
