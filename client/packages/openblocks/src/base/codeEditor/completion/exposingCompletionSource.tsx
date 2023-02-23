import { AutocompleteDataType } from "base/codeEditor/completion/ternServer";
import _ from "lodash";
import { checkCursorInBinding } from "../codeEditorUtils";
import { Completion, CompletionContext, CompletionResult } from "../codeMirror";
import { CompletionSource } from "./completion";

const PRIORITY_PROPS = ["value", "selectedRow", "data", "text"];
const PRIORITY_FUNCTIONS = ["setValue", "setData"];

export class ExposingCompletionSource extends CompletionSource {
  data?: Record<string, unknown>;
  boostExposingData?: Record<string, unknown>;
  completionSource(
    context: CompletionContext
  ): CompletionResult | Promise<CompletionResult | null> | null {
    // log.log("complete pos:", context.pos, "\nselection:", context.state);
    if (this.data === undefined || !checkCursorInBinding(context, this.isFunction)) {
      return null;
    }
    const matchPath = context.matchBefore(/(\w+(\[\s*\d+\s*\])*\.)*\w*/);
    if (!matchPath) {
      return null;
    }
    if (
      matchPath.text.length === 0 &&
      (this.isFunction || context.matchBefore(/\{\{\s*/) === null)
    ) {
      return null;
    }
    const info = getDataInfo(this.data, matchPath.text);
    if (!info) {
      return null;
    }
    const [currentData, offset, prefix] = info;
    const keys = Object.keys(currentData).filter((key) => key.startsWith(prefix));
    const options = keys.map((key) => {
      const dataType = getDataType(currentData[key]);
      const isBoost = offset === 0 && this.boostExposingData?.hasOwnProperty(key);
      const result: Completion = {
        type: _.lowerCase(dataType),
        label: key,
        detail: _.capitalize(dataType),
        boost: isBoost
          ? 20
          : PRIORITY_PROPS.includes(key)
          ? 3
          : PRIORITY_FUNCTIONS.includes(key)
          ? 2
          : 1,
      };
      return result;
    });
    const completions = {
      from: matchPath.from + offset,
      validFor: /^\w*$/,
      options: getPreCompletions(currentData, keys).concat(options),
    };
    // const token = context.state.sliceDoc(completions.from, context.pos);
    // const testFlag = completions.span.test(token);
    // log.log("Comp completeContext: ", context, "\ncompletionResult: ", completions, `\ntoken: ${token}, testFlag: ${testFlag}`);
    return completions;
  }
}

export function getDataInfo(data: Record<string, unknown>, path: string) {
  let currentData: any = data;
  let offset: number = 0;
  for (let i = 0; i < path.length; ++i) {
    switch (path[i]) {
      case ".":
      case "[":
      case "]":
        if (offset < i) {
          currentData = currentData[path.slice(offset, i).trim()];
          if (!currentData || typeof currentData !== "object") {
            return;
          }
        }
        offset = i + 1;
        if (path[i] === "." && Array.isArray(currentData)) {
          return;
        }
        if (path[i] === "[" && !Array.isArray(currentData)) {
          return;
        }
        break;
    }
  }
  return [currentData, offset, path.slice(offset)];
}

function getDataType(data: unknown): string {
  const type = typeof data;
  if (type === "number") return AutocompleteDataType.NUMBER;
  else if (type === "string") return AutocompleteDataType.STRING;
  else if (type === "boolean") return AutocompleteDataType.BOOLEAN;
  else if (_.isArray(data)) return AutocompleteDataType.ARRAY;
  else if (_.isFunction(data)) return AutocompleteDataType.FUNCTION;
  return AutocompleteDataType.OBJECT;
}

function getPreCompletions(infoList: Record<string, any>, keys: string[]): Completion[] {
  return keys
    .filter((key) => infoList[key])
    .flatMap((key) => {
      return PRIORITY_PROPS.filter((prop) => infoList[key].hasOwnProperty(prop)).map((prop) => {
        const dataType = getDataType(infoList[key][prop]);
        const result: Completion = {
          type: _.lowerCase(dataType),
          label: key + "." + prop,
          detail: _.capitalize(dataType),
          boost: 10,
        };
        return result;
      });
    });
}
