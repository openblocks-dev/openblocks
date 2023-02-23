import { ValueAndMsg } from "../types/valueAndMsg";
import _ from "lodash";
import { getErrorMessage } from "./nodeUtils";
import { evalFunc, evalScript, SandboxScope } from "./evalScript";
import { getDynamicStringSegments, isDynamicSegment } from "./segmentUtils";
import { CodeFunction, CodeType, EvalMethods } from "../types/evalTypes";
import { relaxedJSONToJSON } from "./relaxedJson";

export type Fn = (context: Record<string, unknown>) => ValueAndMsg<unknown>;

function call(
  content: string,
  context: Record<string, unknown>,
  segment: string
): ValueAndMsg<unknown> {
  if (!content) {
    return new ValueAndMsg("", undefined, { segments: [{ value: segment, success: true }] });
  }
  try {
    const value = evalScript(content, context);
    return new ValueAndMsg(value, undefined, { segments: [{ value: segment, success: true }] });
  } catch (err) {
    return new ValueAndMsg("", getErrorMessage(err), {
      segments: [{ value: segment, success: false }],
    });
  }
}

export function evalDefault(unevaledValue: string, context: Record<string, unknown>) {
  return new DefaultParser(unevaledValue, context).parse();
}

class DefaultParser {
  protected readonly segments: string[];
  private readonly valueAndMsgs: ValueAndMsg<unknown>[] = [];
  constructor(unevaledValue: string, readonly context: Record<string, unknown>) {
    this.segments = getDynamicStringSegments(unevaledValue.trim());
  }

  parse() {
    try {
      const object = this.parseObject();
      if (this.valueAndMsgs.length === 0) {
        return new ValueAndMsg(object);
      }
      return new ValueAndMsg(object, _.find(this.valueAndMsgs, "msg")?.msg, {
        segments: this.valueAndMsgs.flatMap((v) => v?.extra?.segments ?? []),
      });
    } catch (err) {
      // return null, the later transform will determine the default value
      return new ValueAndMsg("", getErrorMessage(err));
    }
  }

  parseObject() {
    const values = this.segments.map((segment) =>
      isDynamicSegment(segment) ? this.evalDynamicSegment(segment) : segment
    );
    return values.length === 1 ? values[0] : values.join("");
  }

  evalDynamicSegment(segment: string) {
    const valueAndMsg = call(segment.slice(2, -2).trim(), this.context, segment);
    this.valueAndMsgs.push(valueAndMsg);
    return valueAndMsg.value;
  }
}

export function evalJson(unevaledValue: string, context: Record<string, unknown>) {
  return new RelaxedJsonParser(unevaledValue, context).parse();
}

// this will also be used in node-service
export class RelaxedJsonParser extends DefaultParser {
  constructor(unevaledValue: string, context: Record<string, unknown>) {
    super(unevaledValue, context);
    this.evalIndexedObject = this.evalIndexedObject.bind(this);
  }

  override parseObject() {
    try {
      return this.parseRelaxedJson();
    } catch (e) {
      return super.parseObject();
    }
  }

  parseRelaxedJson() {
    // replace the original {{...}} as relaxed-json adaptive \{\{ + ${index} + \}\}
    const indexedRelaxedJsonString = this.segments
      .map((s, i) => (isDynamicSegment(s) ? "\\{\\{" + i + "\\}\\}" : s))
      .join("");
    if (indexedRelaxedJsonString.length === 0) {
      // return empty, let the later transform determines the default value
      return "";
    }
    // transform to standard JSON strings with RELAXED JSON
    // here is a trick: if "\{\{ \}\}" is in quotes, keep it unchanged; otherwise transform to "{{ }}"
    const indexedJsonString = relaxedJSONToJSON(indexedRelaxedJsonString, true);
    // here use eval instead of JSON.parse, in order to support escaping like JavaScript. JSON.parse will cause error when escaping non-spicial char
    // since eval support escaping, replace "\{\{ + ${index} + \}\}" as "\\{\\{ + ${index} + \\}\\}"
    const indexedJsonObject = evalScript(
      indexedJsonString.replace(
        /\\{\\{\d+\\}\\}/g,
        (s) => "\\\\{\\\\{" + s.slice(4, -4) + "\\\\}\\\\}"
      ),
      {}
    );
    return this.evalIndexedObject(indexedJsonObject);
  }

  evalIndexedObject(obj: any): any {
    if (typeof obj === "string") {
      return this.evalIndexedStringToObject(obj);
    }
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(this.evalIndexedObject);
    }
    const ret: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      ret[this.evalIndexedStringToString(key)] = this.evalIndexedObject(value);
    }
    return ret;
  }

  evalIndexedStringToObject(indexedString: string) {
    // if the whole string is "{{ + ${index} + }}", it indicates that the original "{{...}}" is not in quotes, as a standalone JSON value.
    if (indexedString.match(/^{{\d+}}$/)) {
      return this.evalIndexedSnippet(indexedString);
    }
    return this.evalIndexedStringToString(indexedString);
  }

  evalIndexedStringToString(indexedString: string) {
    // replace all {{ + ${index} + }} and \{\{ + ${index} \}\}
    return indexedString.replace(
      /({{\d+}})|(\\{\\{\d+\\}\\})/g,
      (s) => this.evalIndexedSnippet(s) + ""
    );
  }

  // eval {{ + ${index} + }} or \{\{ + ${index} + \}\}
  evalIndexedSnippet(snippet: string) {
    const index = parseInt(snippet.startsWith("{{") ? snippet.slice(2, -2) : snippet.slice(4, -4));
    if (index >= 0 && index < this.segments.length) {
      const segment = this.segments[index];
      if (isDynamicSegment(segment)) {
        return this.evalDynamicSegment(segment);
      }
    }
    return snippet;
  }
}

export function evalFunction(
  unevaledValue: string,
  context: Record<string, unknown>,
  methods?: EvalMethods,
  isAsync?: boolean
): ValueAndMsg<CodeFunction> {
  try {
    return new ValueAndMsg(
      (
        args?: Record<string, unknown>,
        runInHost: boolean = false,
        scope: SandboxScope = "function"
      ) =>
        evalFunc(
          unevaledValue.startsWith("return")
            ? unevaledValue + "\n"
            : `return ${isAsync ? "async " : ""}function(){'use strict'; ${unevaledValue}\n}()`,
          args ? { ...context, ...args } : context,
          methods,
          { disableLimit: runInHost, scope },
          isAsync
        )
    );
  } catch (err) {
    return new ValueAndMsg(() => {}, getErrorMessage(err));
  }
}

export async function evalFunctionResult(
  unevaledValue: string,
  context: Record<string, unknown>,
  methods?: EvalMethods
): Promise<ValueAndMsg<unknown>> {
  const valueAndMsg = evalFunction(unevaledValue, context, methods, true);
  if (valueAndMsg.hasError()) {
    return new ValueAndMsg("", valueAndMsg.msg);
  }
  try {
    return new ValueAndMsg(await valueAndMsg.value());
  } catch (err) {
    return new ValueAndMsg("", getErrorMessage(err));
  }
}

export function string2Fn(unevaledValue: string, type?: CodeType, methods?: EvalMethods): Fn {
  if (type) {
    switch (type) {
      case "JSON":
        return (context) => evalJson(unevaledValue, context);
      case "Function":
        return (context) => evalFunction(unevaledValue, context, methods);
    }
  }
  return (context) => evalDefault(unevaledValue, context);
}
