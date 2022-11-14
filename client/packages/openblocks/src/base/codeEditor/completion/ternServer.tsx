import { checkCursorInBinding } from "base/codeEditor/codeEditorUtils";
import { Completion, CompletionContext, CompletionResult } from "base/codeEditor/codeMirror";
import { CompletionsQuery, Def, Server } from "tern";
import ecma from "./defs/ecmascript.json";
import { CompletionSource } from "./completion";

const DEFS: Def[] = [
  // @ts-ignore
  ecma,
];

export enum AutocompleteDataType {
  OBJECT = "Object",
  NUMBER = "Number",
  ARRAY = "Array",
  FUNCTION = "Function",
  BOOLEAN = "Boolean",
  STRING = "String",
  UNKNOWN = "Unknown",
}

export function getDataType(type: string): AutocompleteDataType {
  if (type === "?") return AutocompleteDataType.UNKNOWN;
  else if (type === "number") return AutocompleteDataType.NUMBER;
  else if (type === "string") return AutocompleteDataType.STRING;
  else if (type === "bool") return AutocompleteDataType.BOOLEAN;
  else if (type === "array") return AutocompleteDataType.ARRAY;
  else if (/^fn\(/.test(type)) return AutocompleteDataType.FUNCTION;
  else if (/^\[/.test(type)) return AutocompleteDataType.ARRAY;
  else return AutocompleteDataType.OBJECT;
}

const server = new Server({ defs: DEFS });

export class TernServer extends CompletionSource {
  completionSource(
    context: CompletionContext
  ): CompletionResult | Promise<CompletionResult | null> | null {
    // log.log("complete pos:", context.pos, "\nselection:", context.state);
    const isCursorInBinding = checkCursorInBinding(context, this.isFunction);
    if (!isCursorInBinding) {
      return null;
    }
    if (
      context.matchBefore(/\w[\w\.]*/) === null &&
      (this.isFunction || context.matchBefore(/\{\{\s*/) === null)
    ) {
      return null;
    }
    const state = context.state;
    const pos = context.pos;
    const query: CompletionsQuery = {
      type: "completions",
      types: true,
      docs: true,
      urls: true,
      origins: true,
      caseInsensitive: true,
      guess: false,
      inLiteral: false,
      includeKeywords: true,
      end: pos,
      file: "#0",
    };
    const files = [
      {
        type: "full",
        name: "_temp",
        text: state.sliceDoc(),
      },
    ];

    const request = { query, files };
    let error;
    let data: any;
    server.request(request as any, (rError, rData) => {
      error = rError;
      data = rData;
    });
    // log.log("ternComplete. error:", error, "\ndata: ", data);
    if (error || data.completions.length === 0) {
      return null;
    }
    const options = [];
    for (const completion of data.completions) {
      // log.log("completion: ", completion);
      const dataType = getDataType(completion.type);
      const completionOption: Completion = {
        type: dataType, // icon
        label: completion.name,
        detail: dataType, // short message after label
        // apply,
        // info to add: completion.name, completion.url, completion.type, completion.doc
        info:
          completion.doc === undefined
            ? undefined
            : (complete: Completion) => {
                let dom = document.createElement("div");
                dom.innerHTML = `
                  <div class="hintDiv" onclick='javascript:window.open("${completion.url}")' >
                    <svg width="16px" height="16px" class="hintSvg" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                          <g transform="translate(8.000000, 8.000000) rotate(30.000000) translate(-8.000000, -8.000000) translate(5.000000, 1.500000)" stroke="#4965F2" stroke-width="1.5">
                              <path d="M0,4.5 L0,3 C0,1.34314575 1.34314575,0 3,0 C4.65685425,0 6,1.34314575 6,3 L6,4.5 L6,4.5 M6,8.5 L6,10 C6,11.6568542 4.65685425,13 3,13 C1.34314575,13 0,11.6568542 0,10 L0,8.5 L0,8.5"></path>
                              <line x1="3" y1="4" x2="3" y2="9"></line>
                          </g>
                      </g>
                    </svg>
                    <span class="hintName">${completion.name}</span>
                  </div>
                  <span class="hintType">${completion.type}</span>
                  <span class="hintDoc">${completion.doc}</span>
                  `;
                return dom;
              },
        boost: -1,
      };
      options.push(completionOption);
    }

    const completions = {
      from: data.start,
      validFor: /^\w*$/,
      options,
    };
    // const token = context.state.sliceDoc(completions.from, context.pos);
    // const testFlag = completions.span.test(token)
    // log.log("Tern completeContext: ", context, "\ncompletionResult: ", completions, `\ntoken: ${token}, testFlag: ${testFlag}`);
    return completions;
  }
}
