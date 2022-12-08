import { EditorState, Facet, Prec, RangeSetBuilder } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { defaultHighlightStyle, HighlightStyle, syntaxTree } from "@codemirror/language";
import { highlightTree } from "@lezer/highlight";
import { Tree } from "@lezer/common";
import { CodeType, getDynamicStringSegments, isDynamicSegment } from "openblocks-core";
import { Language } from "../codeEditorTypes";

const highlighterFacet = Facet.define();

function getHighlighters(state: EditorState) {
  return state.facet(highlighterFacet);
}

function getJsRanges(view: EditorView) {
  const segments = getDynamicStringSegments(view.state.doc.toString());
  const ranges = [];
  let i = 0;
  for (const segment of segments) {
    if (isDynamicSegment(segment)) {
      ranges.push({ from: i + 2, to: i + segment.length - 2 });
    }
    i += segment.length;
  }
  return ranges;
}

function inJs(from: number, to: number, ranges: { from: number; to: number }[]) {
  for (const range of ranges) {
    if (from >= range.from && to <= range.to) {
      return true;
    }
  }
  return false;
}

class TreeHighlighter {
  private markCache: any;
  private tree: Tree;
  decorations: DecorationSet;

  constructor(view: EditorView, readonly filterJs: boolean) {
    this.markCache = Object.create(null);
    this.tree = syntaxTree(view.state);
    this.decorations = this.buildDeco(view, getHighlighters(view.state));
  }

  update(update: ViewUpdate) {
    const tree = syntaxTree(update.state);
    const highlighters = getHighlighters(update.state);
    const styleChange = highlighters !== getHighlighters(update.startState);
    if (tree.length < update.view.viewport.to && !styleChange && tree.type === this.tree.type) {
      this.decorations = this.decorations.map(update.changes);
    } else if (tree !== this.tree || update.viewportChanged || styleChange) {
      this.tree = tree;
      this.decorations = this.buildDeco(update.view, highlighters);
    }
  }

  buildDeco(view: EditorView, highlighters: any) {
    if (!highlighters || !this.tree.length) {
      return Decoration.none;
    }
    const jsRanges = this.filterJs ? getJsRanges(view) : undefined;
    if (jsRanges && jsRanges.length === 0) {
      return Decoration.none;
    }
    const builder = new RangeSetBuilder<Decoration>();
    for (const r of view.visibleRanges) {
      highlightTree(
        this.tree,
        highlighters,
        (from, to, style) => {
          if (!jsRanges || inJs(from, to, jsRanges)) {
            builder.add(
              from,
              to,
              this.markCache[style] || (this.markCache[style] = Decoration.mark({ class: style }))
            );
          }
        },
        r.from,
        r.to
      );
    }
    return builder.finish();
  }
}

function syntaxHighlighting(highlighter: HighlightStyle, filterJs: boolean) {
  const ext = [
    Prec.high(
      ViewPlugin.define((v) => new TreeHighlighter(v, filterJs), {
        decorations: (v) => v.decorations,
      })
    ),
  ];
  if (highlighter.module) {
    ext.push(EditorView.styleModule.of(highlighter.module));
  }
  ext.push(highlighterFacet.of(highlighter));
  return ext;
}

export function highlightSyntaxExtension(language: Language, codeType?: CodeType) {
  return syntaxHighlighting(
    defaultHighlightStyle,
    language === "javascript" && codeType === undefined
  );
}
