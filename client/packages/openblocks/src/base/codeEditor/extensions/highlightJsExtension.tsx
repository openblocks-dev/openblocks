import { useMemo, useRef } from "react";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { CodeType } from "openblocks-core";

const successHighlightMark = Decoration.mark({ class: "cm-success-highlight" });
const errorHighlightMark = Decoration.mark({ class: "cm-error-highlight" });

export const highlightJsTheme = {
  ".cm-success-highlight": { background: "#EFF9F6" },
  ".cm-error-highlight": { background: "#FFF3F1" },
};

function getDecoration(view: EditorView, segments?: { value: string; success: boolean }[]) {
  if (!segments || segments.length === 0) {
    return Decoration.none;
  }
  const value = view.state.doc.toString();
  if (!value) {
    return Decoration.none;
  }
  let ranges = [];
  let i = 0;
  for (const segment of segments) {
    const from = value.indexOf(segment.value, i);
    if (from >= 0) {
      i = from + segment.value.length;
      ranges.push((segment.success ? successHighlightMark : errorHighlightMark).range(from, i));
    }
  }
  return Decoration.set(ranges);
}

export function useHighlightJsExtension(
  codeType: CodeType,
  segments?: { value: string; success: boolean }[]
) {
  const isFunction = codeType === "Function";
  const ref = useRef(segments);
  ref.current = segments;
  return useMemo(
    () =>
      isFunction
        ? []
        : ViewPlugin.fromClass(
            class {
              decoration: DecorationSet;
              constructor(view: EditorView) {
                this.decoration = getDecoration(view, ref.current);
              }
              update(update: ViewUpdate) {
                this.decoration = getDecoration(update.view, ref.current);
              }
            },
            {
              decorations: (v) => v.decoration,
            }
          ),
    [isFunction]
  );
}
