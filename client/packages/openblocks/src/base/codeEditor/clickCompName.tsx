import { CodeType } from "openblocks-core";
import { getDynamicStringSegments, isDynamicSegment } from "openblocks-core";
import { useEffect } from "react";
import { Decoration, DecorationSet, EditorView, StateEffect, StateField } from "./codeMirror";

export const clickCompNameClass = "cm-click-comp-name";

const clickCompMark = Decoration.mark({ class: clickCompNameClass });
const clickCompEffect = StateEffect.define<DecorationSet>();
const clickCompField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(value, transaction) {
    value = value.map(transaction.changes);
    const clickCompEffects = transaction.effects.filter((e) => e.is(clickCompEffect));
    if (clickCompEffects.length > 0) {
      return clickCompEffects[0].value;
    }
    return value;
  },
  provide: (f) => EditorView.decorations.from(f),
});

export function getJsCompNameRanges(js: string, exposingData?: Record<string, unknown>) {
  if (!js || !exposingData) {
    return [];
  }
  const ranges: [number, number][] = [];
  let position = 0;
  js.replace(/[a-zA-Z_$][\w$]*/g, (s) => {
    const start = js.indexOf(s, position);
    if (start >= 0) {
      if (exposingData.hasOwnProperty(s) && (start === 0 || js[start - 1] !== ".")) {
        ranges.push([start, start + s.length]);
      }
      position = start + s.length;
    }
    return s;
  });
  return ranges;
}

export function getCompNameRanges(
  value?: string,
  codeType?: CodeType,
  exposingData?: Record<string, unknown>
) {
  if (!value || !exposingData) {
    return [];
  }
  if (codeType === "Function") {
    return getJsCompNameRanges(value, exposingData);
  }
  const ranges: [number, number][] = [];
  let i = 0;
  for (const segment of getDynamicStringSegments(value)) {
    if (isDynamicSegment(segment)) {
      const j = i + 2;
      getJsCompNameRanges(segment.slice(2, -2), exposingData).forEach(([start, end]) =>
        ranges.push([start + j, end + j])
      );
    }
    i += segment.length;
  }
  return ranges;
}

export function useClickCompNameEffect(
  view?: EditorView,
  value?: string,
  codeType?: CodeType,
  exposingData?: Record<string, unknown>
) {
  useEffect(() => {
    if (!view) {
      return;
    }
    if (value !== view.state.doc.toString()) {
      return;
    }
    const ranges = getCompNameRanges(value, codeType, exposingData).map(([from, to]) =>
      clickCompMark.range(from, to)
    );
    const effects: StateEffect<unknown>[] = [clickCompEffect.of(Decoration.set(ranges))];
    if (!view.state.field(clickCompField, false)) {
      effects.push(StateEffect.appendConfig.of([clickCompField]));
    }
    view.dispatch({ effects });
  }, [view, value, codeType, exposingData]);
}
