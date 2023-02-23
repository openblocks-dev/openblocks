import { AutocompleteDataType } from "base/codeEditor/completion/ternServer";
import _ from "lodash";
import { evalScript } from "openblocks-core";
import { checkCursorInBinding } from "../codeEditorUtils";
import { Completion, CompletionContext, CompletionResult, EditorView } from "../codeMirror";
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
    const matchPath = context.matchBefore(
      /(?:[A-Za-z_$][\w$]*(?:\[\s*(?:\d+|(["'])(?:[^\1\\]|\\.)*?\1)\s*\])*\.)*(?:[A-Za-z_$][\w$]*)?/
    );
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
        apply:
          offset === 0
            ? undefined
            : (view: EditorView, c: Completion, from: number, to: number) => {
                view.dispatch({
                  changes: {
                    from: from - 1,
                    to: to,
                    insert: key.match(/^[A-Za-z_$][\w$]*$/)
                      ? `.${key}`
                      : `['${key.replace(/[\\']/g, (c) => "\\" + c)}']`,
                  },
                });
              },
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
  const pos = path.lastIndexOf(".");
  if (pos < 0) {
    return [data, 0, path];
  }
  try {
    const value = evalScript(path.slice(0, pos), data);
    if (typeof value === "object" && value && !Array.isArray(value)) {
      return [value, pos + 1, path.slice(pos + 1)];
    }
  } catch (e) {
    return;
  }
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
