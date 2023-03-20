import {
  acceptCompletion,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  closeCompletion,
  moveCompletionSelection,
} from "@codemirror/autocomplete";
import { esLint, javascript } from "@codemirror/lang-javascript";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { sql } from "@codemirror/lang-sql";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import {
  crosshairCursor,
  dropCursor,
  highlightActiveLineGutter,
  highlightSpecialChars,
  lineNumbers,
  rectangularSelection,
  tooltips,
} from "@codemirror/view";
import {
  bracketMatching,
  codeFolding,
  foldGutter,
  foldKeymap,
  indentOnInput,
} from "@codemirror/language";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { Diagnostic, linter, lintKeymap } from "@codemirror/lint";
import { EditorState, Prec } from "@codemirror/state";
import { TernServer } from "base/codeEditor/completion/ternServer";
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CodeEditorProps, Language, MetaDataContext } from "./codeEditorTypes";
import {
  Compartment,
  EditorView,
  Extension,
  keymap,
  placeholder as extendPlaceholder,
  StateEffect,
  ViewUpdate,
} from "./codeMirror";
import { ExposingCompletionSource } from "./completion/exposingCompletionSource";
import { SQLCompletionSource } from "./completion/sqlCompletionSource";
import { getFormatter } from "./autoFormat";
import { CodeType } from "openblocks-core";
import { CompletionSource } from "./completion/completion";
import { message } from "antd";
import { CodeEditorTooltipContainer } from "./codeEditor";
import { libNames } from "constants/libConstants";
import { QueryContext } from "../../util/context/QueryContext";
import { getIconExtension } from "./extensions/iconExtension";
import { highlightJsTheme, useHighlightJsExtension } from "./extensions/highlightJsExtension";
import { trans } from "i18n";
import log from "loglevel";
import { highlightSyntaxExtension } from "./extensions/highlightSyntax";

// reference: https://github.com/codemirror/basic-setup/blob/main/src/codemirror.ts
const basicSetup = [
  //lineNumbers(),
  //highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(), // Undo & Redo
  //foldGutter(),
  //drawSelection(),
  dropCursor(),
  //EditorState.allowMultipleSelections.of(true),
  indentOnInput(), // auto-indent
  bracketMatching(),
  closeBrackets(),
  //autocompletion(),
  rectangularSelection(),
  crosshairCursor(), // match up rectangularSelection
  //highlightActiveLine(),
  highlightSelectionMatches(),
  EditorView.lineWrapping,
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap, // Undo & Redo
    ...foldKeymap, // fold code
    //...completionKeymap,
    ...lintKeymap,
  ]),
];

const textStyle = {
  "word-wrap": "break-word",
  "word-break": "break-all",
  "white-space": "pre-wrap",
  "font-size": "13px",
  "line-height": "13px",
};

const defaultTheme = EditorView.theme({
  ".cm-content, .cm-gutter": {
    height: "100%",
  },
  "&.cm-editor": {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    "font-size": "13px",
    transition: "all .4s ease",
    outline: "none",
    "min-height": "30px",
  },
  "& .cm-line": {
    "padding-left": "8px",
  },
  ".cm-scroller": {
    "line-height": "22px",
    "font-family": "RobotoMono",
  },
  ".cm-scroller::-webkit-scrollbar": {
    width: "16px",
  },
  ".cm-scroller::-webkit-scrollbar-thumb": {
    border: "5px solid transparent",
    "background-clip": "content-box",
    "border-radius": "9999px",
    "background-color": "rgba(139, 143, 163, 0.2)",
    "min-height": "30px",
  },
  ".cm-scroller::-webkit-scrollbar-thumb:hover": {
    "background-color": "rgba(139, 143, 163, 0.5)",
  },
  "&.cm-editor:hover": {
    transition: "all .4s ease",
    outline: "none",
  },
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
  // matching brackets
  "&.cm-editor .cm-scroller .cm-content[contenteditable=true] .cm-line .cm-matchingBracket": {
    color: "#40A072",
    backgroundColor: "#e9f4e6",
  },
  // line number
  "& .cm-gutters": {
    "flex-shrink": 0,
    width: "40px",
    "background-color": "#f5f5f6",
    color: "#8B8FA3",
    "border-radius": "4px 0px 0px 4px",
    "border-right": "none",
    padding: "0 2px 0 4px",
    "user-select": "none",
  },
  "& .cm-lineNumbers": {
    "flex-grow": 1,
  },
  "& .cm-lineNumbers .cm-gutterElement": {
    "min-width": "unset",
    width: "100%",
    "text-align": "center",
    padding: "0",
    ...textStyle,
    "line-height": "22px",
  },
  "&  .cm-activeLineGutter": {
    "background-color": "unset",
    color: "#222222",
  },
  "& .cm-lineNumbers .cm-activeLineGutter": {
    ...textStyle,
    "line-height": "22px",
    "font-weight": 500,
  },
  ".cm-placeholder": {
    height: 0,
  },
  ...highlightJsTheme,
});

const lineNumberExtensions = [
  lineNumbers(), // display line number
  highlightActiveLineGutter(),
  codeFolding({
    placeholderDOM: () => {
      const dom = document.createElement("div");
      dom.innerHTML = `
                <svg width="23px" height="13px" viewBox="0 0 23 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect fill="#D7D9E0" x="0" y="0" width="23" height="13" rx="3"></rect>
                        <g transform="translate(4.000000, 5.000000)" fill="#FFFFFF">
                            <circle cx="1.5" cy="1.5" r="1.5"></circle>
                            <circle cx="7.5" cy="1.5" r="1.5"></circle>
                            <circle cx="13.5" cy="1.5" r="1.5"></circle>
                        </g>
                    </g>
                </svg>`;
      dom.style.display = "inline-flex";
      dom.style.margin = "4.5px 4px 0";
      dom.style.verticalAlign = "top";
      return dom;
    },
  }),
  foldGutter({
    markerDOM: (open) => {
      const dom = document.createElement("div");
      dom.style.cursor = "pointer";
      dom.innerHTML = "test";
      if (open) {
        dom.innerHTML = `
                  <svg width="12px" height="22px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <path d="M6.78086881,5.47608601 L8.70024396,7.87530495 C9.04525351,8.30656689 8.97533214,8.93585926 8.5440702,9.28086881 C8.36675715,9.42271925 8.14644665,9.5 7.91937515,9.5 L4.08062485,9.5 C3.5283401,9.5 3.08062485,9.05228475 3.08062485,8.5 C3.08062485,8.2729285 3.1579056,8.052618 3.29975604,7.87530495 L5.21913119,5.47608601 C5.56414074,5.04482408 6.19343311,4.9749027 6.62469505,5.31991225 C6.68235975,5.36604401 6.73473705,5.41842131 6.78086881,5.47608601 Z" fill="#B8B9BF" transform="translate(6.000000, 7.000000) scale(1, -1) translate(-6.000000, -7.000000) "></path>
                      </g>
                  </svg>`;
        return dom;
      } else {
        dom.innerHTML = `
                  <svg width="12px" height="22px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <path d="M7.28086881,4.97608601 L9.20024396,7.37530495 C9.54525351,7.80656689 9.47533214,8.43585926 9.0440702,8.78086881 C8.86675715,8.92271925 8.64644665,9 8.41937515,9 L4.58062485,9 C4.0283401,9 3.58062485,8.55228475 3.58062485,8 C3.58062485,7.7729285 3.6579056,7.552618 3.79975604,7.37530495 L5.71913119,4.97608601 C6.06414074,4.54482408 6.69343311,4.4749027 7.12469505,4.81991225 C7.18235975,4.86604401 7.23473705,4.91842131 7.28086881,4.97608601 Z" fill="#B8B9BF" transform="translate(6.500000, 6.500000) scale(1, -1) rotate(90.000000) translate(-6.500000, -6.500000) "></path>
                      </g>
                  </svg>`;
        return dom;
      }
    },
  }),
  // highlightActiveLine(),
];

const languageSupports: Record<Language, Extension> = {
  javascript: javascript(),
  sql: sql(),
  css: css(),
  html: html(),
  json: json(),
};

const keyMapExtensions = Prec.highest(
  keymap.of([
    // {key: "Ctrl-Space", run: startCompletion},
    { key: "Escape", run: closeCompletion },
    { key: "ArrowDown", run: moveCompletionSelection(true) },
    { key: "Ctrl-n", run: moveCompletionSelection(true) },
    { key: "ArrowUp", run: moveCompletionSelection(false) },
    { key: "Ctrl-p", run: moveCompletionSelection(false) },
    { key: "PageDown", run: moveCompletionSelection(true, "page") },
    { key: "PageUp", run: moveCompletionSelection(false, "page") },
    { key: "Tab", run: acceptCompletion },
    { key: "Enter", run: acceptCompletion },
  ])
);

export function useFocusExtension(onFocus?: (focused: boolean) => void): [Extension, boolean] {
  const [isFocus, setFocus] = useState(false);
  const onFocusRef = useRef<(focused: boolean) => void>();
  onFocusRef.current = onFocus;
  const ext = useMemo(
    () =>
      EditorView.updateListener.of((update) => {
        if (update.focusChanged) {
          const focused = update.view.hasFocus;
          setFocus(focused);
          onFocusRef.current?.(focused);
          // log.log("FocusChanged: ", update.view.hasFocus);
          if (!focused) {
            closeCompletion(update.view); // close completion on blur
          }
        }
      }),
    []
  );
  return [ext, isFocus];
}

function indentWithTabExtension(open?: boolean) {
  return open ?? true ? keymap.of([indentWithTab]) : [];
}

export function lineNoExtension(showLineNumber?: boolean) {
  if (showLineNumber) {
    return lineNumberExtensions;
  }
  return [];
}

export function placeholderExtension(placeholder?: string | HTMLElement): Extension {
  return !!placeholder ? extendPlaceholder(placeholder) : [];
}

export function useChangeExtension(
  onChange?: (state: EditorState) => void,
  extraOnChange?: (state: EditorState) => void
): Extension {
  const onChangeRef = useRef<(state: EditorState) => void>();
  onChangeRef.current = extraOnChange
    ? (state: EditorState) => {
        onChange?.(state);
        extraOnChange(state);
      }
    : onChange;
  return useMemo(() => {
    const onUpdate = (update: ViewUpdate) => {
      // log.log("update:", update);
      if (update.docChanged) {
        onChangeRef.current?.(update.state);
      }
    };
    return EditorView.updateListener.of(onUpdate);
  }, []);
}

export function useCompletionSources(props: CodeEditorProps) {
  const { language, codeType, exposingData, boostExposingData, enableMetaCompletion } = props;
  const context = useContext(QueryContext); // FIXME: temporarily handle, expect to delete after the backend supports eval
  // auto-completion for comp exposing
  const exposingSource = useMemo(() => new ExposingCompletionSource(), []);
  // javascript syntax auto-completion
  const ternServer = useMemo(
    () => (context?.disableJSCompletion ? undefined : new TernServer()),
    []
  );
  // sql syntax & meta-data auto-completion
  const sqlSource = useMemo(() => new SQLCompletionSource(), []);

  useEffect(() => {
    exposingSource.data = exposingData;
    exposingSource.boostExposingData = boostExposingData;
  }, [exposingSource, exposingData, boostExposingData]);

  const sqlMetaData = useContext(MetaDataContext);
  useEffect(() => {
    sqlSource.metaData = sqlMetaData;
  }, [sqlSource, sqlMetaData]);

  const completionSources = useMemo(() => {
    const sources: CompletionSource[] = [];
    if (language === "css") {
      // sources.push(cssCompletionSource);
    } else {
      sources.push(exposingSource);
      if (ternServer) {
        sources.push(ternServer);
      }
    }
    if (enableMetaCompletion) {
      sources.push(sqlSource);
    }
    return sources.map((c) => {
      c.setIsFunction(codeType === "Function");
      return c.completionSource;
    });
  }, [enableMetaCompletion, language, codeType, exposingSource, ternServer, sqlSource]);
  return completionSources;
}

export function useAutocompletionExtension(props: CodeEditorProps) {
  const completions = useCompletionSources(props);
  return useMemo(
    () => [
      autocompletion({
        override: completions,
        defaultKeymap: false,
      }),
      keyMapExtensions,
    ],
    [completions]
  );
}

export function languageExtension(language?: Language, codeType?: CodeType): Extension {
  const lang = language ?? "javascript";
  const formatExtension = keymap.of([
    {
      key: "Mod-l",
      run: (view: EditorView) => {
        const formatter = getFormatter(lang, codeType);
        if (formatter) {
          const text = view.state.doc.toString();
          formatter(text)
            .then((newText) => {
              if (newText !== text) {
                view.dispatch({ changes: { from: 0, to: text.length, insert: newText } });
              }
            })
            .catch((e) => {
              message.error(e instanceof Error ? e.message : e);
            });
        } else {
          message.warn(trans("codeEditor.notSupportAutoFormat"));
        }
        return true;
      },
    },
  ]);
  return [languageSupports[lang], highlightSyntaxExtension(lang, codeType), formatExtension];
}

export function themeExtension(): Extension {
  return defaultTheme;
}

function tooltipExtension(tooltipContainer?: HTMLElement): Extension {
  return tooltips({
    position: "absolute",
    parent:
      tooltipContainer ||
      document.querySelector<HTMLElement>(`${CodeEditorTooltipContainer}`) ||
      document.body,
  });
}

const esLintSource = async (view: EditorView) => {
  const eslint4bPrebuilt = await import("eslint4b-prebuilt-2");
  const ESLinter = eslint4bPrebuilt.default;
  const eSLinter = new ESLinter();
  // refer to esLint implementation from @codemirror/lang-javascript
  // config reference: https://eslint.org/docs/head/user-guide/configuring/
  const config: any = {
    parserOptions: { ecmaVersion: "latest", sourceType: "script" },
    env: { browser: true, node: true, es2021: true },
    rules: {
      // https://github.com/mysticatea/eslint4b/issues/17
      "no-useless-escape": "off",
    },
  };
  eSLinter.getRules().forEach((desc: any, name: any) => {
    if (desc.meta.docs.recommended && !(name in config.rules)) config.rules[name] = "error";
  });
  return esLint(eSLinter, config)(view);
};

function getLintExtension(
  codeType: CodeType | undefined,
  exposingDataRef: MutableRefObject<Record<string, unknown>>
) {
  if (codeType === "PureJSON") {
    return [linter(jsonParseLinter())];
  }
  if (codeType !== "Function") {
    return [];
  }
  const markerFilter = (diagnostics: readonly Diagnostic[]) => {
    return diagnostics
      .filter((t) => {
        // exposingData doesn't trigger an error
        if (t.message.endsWith("' is not defined.") && t.message.startsWith("'")) {
          const name = t.message.slice(1, -17);
          if (exposingDataRef.current.hasOwnProperty(name) || libNames.has(name)) {
            return false;
          }
        }
        return true;
      })
      .map((t) => {
        return { ...t, source: undefined, actions: undefined };
      });
  };
  return [linter(esLintSource, { markerFilter })];
}

const compartments: Compartment[] = [];

export function useExtensions(props: CodeEditorProps) {
  const { showLineNum, placeholder, language, codeType, indentWithTab, tooltipContainer } = props;
  // cache the frequently changed data into ref, avoiding reconfigure
  const exposingDataRef = useRef<Record<string, unknown>>({});
  exposingDataRef.current = props.exposingData ?? {};

  // each Extension remains unchangable or useMemo
  // should make sure highlightJsExt stands before iconExt, since they both will modify DOM, otherwise may cause exception.
  const highlightJsExt = useHighlightJsExtension(codeType, props.segments);
  const autocompletionExtension = useAutocompletionExtension(props);
  const [focusExtension, isFocus] = useFocusExtension(props.onFocus);
  const lineNoExt = useMemo(() => lineNoExtension(showLineNum), [showLineNum]);
  const languageExt = useMemo(() => languageExtension(language, codeType), [language, codeType]);
  const onChangeExt = useChangeExtension(props.onChange, props.extraOnChange);
  const placeholderExt = useMemo(() => placeholderExtension(placeholder), [placeholder]);
  const indentWithTabExt = useMemo(() => indentWithTabExtension(indentWithTab), [indentWithTab]);
  const tooltipExt = useMemo(() => tooltipExtension(tooltipContainer), [tooltipContainer]);
  const lintExt = useMemo(() => getLintExtension(codeType, exposingDataRef), [codeType]);
  const iconExt = useMemo(() => getIconExtension(props.enableIcon), [props.enableIcon]);
  const rawExtensions = useMemo(
    () => [
      basicSetup,
      defaultTheme,
      highlightJsExt,
      autocompletionExtension,
      focusExtension,
      lineNoExt,
      languageExt,
      onChangeExt,
      placeholderExt,
      indentWithTabExt,
      tooltipExt,
      lintExt,
      iconExt,
    ],
    [
      highlightJsExt,
      autocompletionExtension,
      focusExtension,
      lineNoExt,
      languageExt,
      onChangeExt,
      placeholderExt,
      indentWithTabExt,
      tooltipExt,
      lintExt,
      iconExt,
    ]
  );
  const extensions = useMemo(() => {
    // auto build global Compartments
    for (let i = compartments.length; i < rawExtensions.length; ++i) {
      compartments.push(new Compartment());
    }
    return rawExtensions.map((e, i) => compartments[i].of(e));
  }, [rawExtensions]);
  // reconfiguration as a baseline, actually extensions remains unchanged.
  const reconfigure = useCallback(
    (view?: EditorView) => {
      if (view) {
        const effects: StateEffect<unknown>[] = [];
        rawExtensions.forEach((e, i) => {
          if (compartments[i].get(view.state) !== e) {
            log.log("reconfigure", i);
            effects.push(compartments[i].reconfigure(e));
          }
        });
        if (effects.length > 0) {
          view.dispatch({ effects });
        }
      }
    },
    [rawExtensions]
  );
  return { extensions, reconfigure, isFocus };
}
