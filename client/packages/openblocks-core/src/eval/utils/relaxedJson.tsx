import { toJson } from "really-relaxed-json";

export function relaxedJSONToJSON(text: string, compact: boolean): string {
  if (text.trim().length === 0) {
    return "";
  }
  return toJson(text, compact);
}
