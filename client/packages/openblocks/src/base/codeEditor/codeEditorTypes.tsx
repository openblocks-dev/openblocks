import { CodeType } from "openblocks-core";
import React, { ReactNode } from "react";
import { EditorState, EditorView } from "./codeMirror";

// if new style needed, pls contact @libin
export type StyleName = "medium" | "higher" | "window";

export type Language = "sql" | "javascript" | "css" | "html" | "json";

export interface CodeEditorControlParams {
  placeholder?: string;
  styleName?: StyleName;
  disableCard?: boolean;
  language?: Language;
  indentWithTab?: boolean;
  tooltipContainer?: HTMLElement;
  expandable?: boolean;
  onFocus?: (focused: boolean) => void;
  showLineNum?: boolean;

  enableIcon?: boolean;
  widgetPopup?: (v: EditorView) => ReactNode;
  onClick?: (e: React.MouseEvent, v: EditorView) => void;
  extraOnChange?: (state: EditorState) => void;
  cardRichContent?: (s: string) => ReactNode;
  cardTips?: ReactNode;
  enableMetaCompletion?: boolean;
}

export interface CodeEditorProps extends CodeEditorControlParams {
  label?: ReactNode;
  value?: string;
  codeType?: CodeType;

  // extension
  exposingData?: Record<string, unknown>;
  boostExposingData?: Record<string, unknown>;
  enableClickCompName?: boolean;
  onChange?: (state: EditorState) => void;

  // eval info card
  cardTitle?: string;
  cardContent?: string;
  hasError?: boolean;
  segments?: { value: string; success: boolean }[];

  bordered?: boolean;
}

export const MetaDataContext = React.createContext<Record<string, string> | undefined>(undefined);
