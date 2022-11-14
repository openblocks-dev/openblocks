import { CodeType } from "openblocks-core";
import { relaxedJSONToJSON } from "openblocks-core";
import { getDynamicStringSegments, isDynamicSegment } from "openblocks-core";
import { format as formatSQL } from "sql-formatter";
import { Language } from "./codeEditorTypes";

export async function getJavascriptFormatter() {
  const prettier = await import("prettier/standalone");
  const parserBabel = await import("prettier/parser-babel");
  return (text: string) =>
    prettier.format(text, { parser: "babel", plugins: [parserBabel], semi: false }).trim();
}

export async function getJsonFormatter() {
  const prettier = await import("prettier/standalone");
  const parserBabel = await import("prettier/parser-babel");
  return (text: string) => prettier.format(text, { parser: "json", plugins: [parserBabel] }).trim();
}

async function getJsSegmentFormatter() {
  const formatter = await getJavascriptFormatter();
  return (segment: string) => {
    const formatted = formatter(segment.slice(2, -2));
    return "{{" + formatted + "}}";
  };
}

export async function formatStringWithJsSnippets(text: string): Promise<string> {
  const jsSegmentFormatter = await getJsSegmentFormatter();
  return getDynamicStringSegments(text)
    .map((s) => (isDynamicSegment(s) ? jsSegmentFormatter(s) : s))
    .join("");
}

export async function formatSqlWithJsSnippets(text: string) {
  if (!text) {
    return "";
  }
  const jsSegmentFormatter = await getJsSegmentFormatter();
  const jsSegments: string[] = [];
  let newText = getDynamicStringSegments(text)
    .map((segment) => {
      // transform Javascript code to avoid auto formatting
      if (isDynamicSegment(segment)) {
        jsSegments.push(segment);
        return "{ { " + (jsSegments.length - 1) + " } }";
      }
      return segment;
    })
    .join("");
  newText = formatSQL(newText);
  if (jsSegments.length === 0) {
    return newText;
  }
  return newText.replace(/{ { \d+ } }/g, (s) => {
    const index = parseInt(s.slice(4, -4));
    if (index >= 0 && index < jsSegments.length) {
      return jsSegmentFormatter(jsSegments[index]);
    }
    return s;
  });
}

async function formatJsonWithJsSnippetsImpl(text: string) {
  if (!text || text.trim().length === 0) {
    return "";
  }
  const jsonFormatter = await getJsonFormatter();
  const jsSegmentFormatter = await getJsSegmentFormatter();
  const segments = getDynamicStringSegments(text);
  // replace the original "{{...}}" as relaxed-json adaptive "\{\{ + ${index} + \}\}"
  const indexedRelaxedJsonString = segments
    .map((s, i) => (isDynamicSegment(s) ? "\\{\\{" + i + "\\}\\}" : s))
    .join("");
  // transform to standard JSON strings with RELAXED JSON
  // here is a trick: if "\{\{ \}\}" is in quotes, keep it unchanged; otherwise transform to "{{ }}"
  const indexedJsonString = relaxedJSONToJSON(indexedRelaxedJsonString, false);
  // in case that format will transform "\{" in quotes to "{", here handles this
  const formattedJSON = jsonFormatter(
    indexedJsonString.replace(
      /\\{\\{\d+\\}\\}/g,
      (s) => "\\\\{\\\\{" + s.slice(4, -4) + "\\\\}\\\\}"
    )
  );
  // here are 3 cases.
  // - when the original "{{}}" is not in quotes as the single key or value, the whole "{{ index }}" should be replaced.
  // - when the original "{{}}" is for concatenating strings, "{{ index }}" or "\\{\\{ index \\}\\}" should be replaced.
  return formattedJSON.replace(/("{{\d+}}")|({{\d+}})|(\\\\{\\\\{\d+\\\\}\\\\})/g, (s) => {
    const index = parseInt(
      s.startsWith('"{{') ? s.slice(3, -3) : s.startsWith("{{") ? s.slice(2, -2) : s.slice(6, -6)
    );
    if (index >= 0 && index < segments.length) {
      const segment = segments[index];
      if (isDynamicSegment(segment)) {
        return jsSegmentFormatter(segment);
      }
    }
    return s;
  });
}

export async function formatJsonWithJsSnippets(text: string): Promise<string> {
  try {
    const ret = await formatJsonWithJsSnippetsImpl(text);
    return ret;
  } catch (e) {
    return formatStringWithJsSnippets(text);
  }
}

export function getFormatter(
  language?: Language,
  codeType?: CodeType
): ((s: string) => Promise<string>) | undefined {
  if (codeType) {
    switch (codeType) {
      case "JSON":
        return formatJsonWithJsSnippets;
      case "Function":
        return (text: string) => getJavascriptFormatter().then((f) => f(text));
    }
  } else {
    if (language === undefined) {
      return formatStringWithJsSnippets;
    }
    switch (language) {
      case "sql":
        return formatSqlWithJsSnippets;
    }
  }
}
