import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { EditorState, EditorView } from "./codeMirror";
import { useExtensions } from "./extensions";
import { PopupCard } from "openblocks-design";
import { CodeEditorPanel } from "../../pages/editor/codeEditorPanel";
import { CodeEditorProps, StyleName } from "./codeEditorTypes";
import { useClickCompNameEffect } from "./clickCompName";
import { Layers } from "../../constants/Layers";

type StyleConfig = {
  minHeight: string;
  maxHeight: string;
  showLineNum?: boolean;
};

const styles: Record<StyleName, StyleConfig> = {
  medium: {
    minHeight: "90px",
    maxHeight: "440px",
    showLineNum: true,
  },
  higher: {
    minHeight: "auto",
    maxHeight: "256px",
  },
  window: {
    minHeight: "320px",
    maxHeight: "320px",
    showLineNum: true,
  },
};

const textStyle = css`
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 13px;
`;

// tooltip style should be placed in the out-most level of the code editor
// tooltip includes auto-completion, lint hinting, etc..
export const CodeEditorTooltipContainer = styled.div`
  // tooltip common
  .cm-tooltip {
    z-index: ${Layers.codeEditorTooltip};
    border: none;
  }
  // make sure antd popover in the code editor available
  .ant-popover {
    z-index: ${Layers.codeEditorTooltip};
  }

  // lint tooltip style
  .cm-tooltip .cm-tooltip-lint {
    background-color: #2c2c2c;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
    color: #ffffff;
    padding: 3px 0px;
  }
  .cm-tooltip .cm-diagnostic {
    padding: 3px 8px;
  }
  .cm-tooltip .cm-diagnostic-error {
    border: none;
  }

  // auto-completion tooltip
  // main tooltip
  .cm-tooltip.cm-tooltip-autocomplete {
    min-width: 280px;
    padding: 16px 4px 16px 8px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transform: translate(-16px, 10px);
  }

  // left minor tooltip
  .cm-tooltip > .cm-completionInfo {
    top: 0 !important;
    right: calc(100% + 4px);
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: none;
    padding: 16px;
  }

  // the right tooltip's gap with the main tooltip
  .cm-completionInfo.cm-completionInfo-right {
    left: calc(100% + 4px);
  }

  .cm-tooltip > .cm-completionInfo .hintDiv {
    display: inline-flex;
    align-items: baseline;
    cursor: pointer;
    color: #4965f2;
    ${textStyle};
    font-weight: 600;
  }

  .cm-tooltip > .cm-completionInfo .hintDiv:hover {
    color: #3377ff;
  }

  .cm-tooltip > .cm-completionInfo .hintDiv:hover .hintSvg g {
    stroke: #3377ff;
  }

  .cm-tooltip > .cm-completionInfo .hintName {
    display: inline-block;
    margin-bottom: 4px;
  }

  .cm-tooltip > .cm-completionInfo .hintType {
    color: #8b8fa3;
    display: block;
    margin: 8px 0;
    ${textStyle};
  }

  .cm-tooltip > .cm-completionInfo .hintDoc {
    color: #333333;
    ${textStyle};
  }

  .cm-tooltip > .cm-completionInfo .hintSvg {
    transform: translateY(3px);
    cursor: pointer;
  }

  // set the min-width of the dropdown
  .cm-tooltip.cm-tooltip-autocomplete > ul {
    min-width: 200px;
    scrollbar-gutter: stable;
    font-family: RobotoMono;
  }

  // each li style
  .cm-tooltip.cm-tooltip-autocomplete > ul > li {
    ${textStyle};
    color: #333333;
    padding: 6px 0;
    display: flex;
    align-items: center;
  }

  // hover in each line
  .cm-tooltip.cm-tooltip-autocomplete > ul > li:hover {
    background-color: rgba(242, 247, 252, 0.7);
    border-radius: 4px;
  }

  // textStyle in each line
  .cm-tooltip.cm-tooltip-autocomplete > ul > li > span:last-child {
    margin-left: auto;
    font-style: normal;
    color: #8b8fa3;
    padding-right: 8px;
    padding-left: 6px;
    ${textStyle};
  }

  // selected line
  .cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected] {
    background-color: #f2f7fc;
    border-radius: 4px;
    font-weight: 600;
  }

  // scrollbar
  .cm-tooltip.cm-tooltip-autocomplete > ul::-webkit-scrollbar {
    width: 4px;
  }

  .cm-tooltip.cm-tooltip-autocomplete > ul::-webkit-scrollbar-thumb {
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.12);
    height: 50px;
    min-height: 50px;
    max-height: 50px;
  }

  .cm-tooltip.cm-tooltip-autocomplete > ul::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.36);
  }
`;

function getStyle(styleName?: StyleName) {
  return styleName ? styles[styleName] : { minHeight: "auto", maxHeight: "180px" };
}

function useCodeMirror(
  props: CodeEditorProps,
  container: MutableRefObject<HTMLDivElement | undefined>
) {
  const { value, onChange } = props;
  const viewRef = useRef<EditorView>();

  // will not trigger view.setState when typing inputs, to avoid focus chaos
  const isTypingRef = useRef(0);
  const showLineNum = props.showLineNum ?? getStyle(props.styleName).showLineNum;

  const handleChange = useCallback(
    (state: EditorState) => {
      window.clearTimeout(isTypingRef.current);
      isTypingRef.current = window.setTimeout(() => (isTypingRef.current = 0), 100);
      onChange?.(state);
    },
    [onChange]
  );

  const { extensions, reconfigure, isFocus } = useExtensions({
    ...props,
    showLineNum,
    onChange: handleChange,
  });
  useEffect(() => reconfigure(viewRef.current), [reconfigure]);
  useEffect(() => {
    const view = viewRef.current;
    /**
     * will trigger in 2 cases
     * 1. switch to the same type of comp
     * 2. change the current comp's value by dispatchChangeValueAction
     */
    if (!view || (!isTypingRef.current && value !== view.state.doc.toString())) {
      const state = EditorState.create({ doc: value, extensions });
      if (view) {
        view.setState(state);
      } else {
        viewRef.current = new EditorView({ state, parent: container.current });
      }
    }
  }, [container, value, extensions]);

  useClickCompNameEffect(viewRef.current, value, props.codeType, props.exposingData);

  useEffect(() => {
    return () => {
      viewRef.current?.destroy();
    };
  }, []);

  return { view: viewRef.current, isFocus };
}

function clickCompNameCss(enableClickCompName?: boolean) {
  if (enableClickCompName) {
    return css`
      .cm-click-comp-name:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    `;
  }
}

const CodeEditorPanelContainer = styled.div<{
  styleName?: StyleName;
  enableClickCompName?: boolean;
}>`
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow: auto;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.2);
    min-height: 30px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.5);
  }

  .cm-content {
    padding-top: 12px;
    padding-bottom: 0;
    height: auto;
  }

  .cm-gutters {
    border-top-left-radius: 0;
    height: auto;
  }

  .cm-editor,
  .cm-scroller {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .cm-scroller {
    align-items: stretch !important;
    flex-grow: 1;
  }

  .cm-editor {
    min-height: 100%;
    height: fit-content;
  }

  .cm-line {
    padding-right: 16px;
  }

  ${(props) => clickCompNameCss(props.enableClickCompName)}
`;

const CodeEditorWrapper = styled.div`
  height: 100%;
`;

function canShowCard(props: CodeEditorProps) {
  return !props.disableCard && (props.codeType !== "Function" || props.hasError);
}

function CodeEditorCommon(
  props: CodeEditorProps & {
    editor: MutableRefObject<HTMLDivElement | undefined>;
    children: ReactNode;
    disabled?: boolean;
    cardStyle?: React.CSSProperties;
  }
) {
  const { editor, children, disabled, cardStyle, onClick, ...editorProps } = props;
  const { view, isFocus } = useCodeMirror(editorProps, editor);
  return (
    <CodeEditorWrapper onClick={onClick ? (e) => view && onClick(e, view) : undefined}>
      {!disabled && view && props.widgetPopup?.(view)}
      {children}
      <PopupCard
        cardStyle={cardStyle}
        editorFocus={!disabled && isFocus && canShowCard(props)}
        title={props.cardTitle}
        content={props.cardContent}
        richContent={props.cardRichContent?.(props.cardContent ?? "")}
        tips={props.cardTips}
        hasError={props.hasError}
      />
    </CodeEditorWrapper>
  );
}

// for the standalone code editor, eliminating some styles
function CodeEditorForPanel(props: CodeEditorProps) {
  const editor = useRef<HTMLDivElement>();
  return (
    <CodeEditorCommon {...props} editor={editor} cardStyle={{ borderRadius: "8px" }}>
      <CodeEditorPanelContainer
        styleName={props.styleName}
        ref={editor as MutableRefObject<HTMLDivElement>}
        enableClickCompName={props.enableClickCompName}
      />
    </CodeEditorCommon>
  );
}

/**
 * encapsulate CodeMirror: https://codemirror.net/6/
 */
export function CodeEditor(props: CodeEditorProps) {
  const editor = useRef<HTMLDivElement>();
  const { expandable = true, ...editorProps } = props;
  const [disabled, setDisabled] = useState(false);
  return (
    <CodeEditorCommon {...editorProps} editor={editor} disabled={disabled}>
      <Container
        styleName={props.styleName}
        bordered={props.bordered}
        disabled={disabled}
        error={props.hasError}
        ref={editor as MutableRefObject<HTMLDivElement>}
        enableClickCompName={props.enableClickCompName}
      >
        {expandable && (
          <CodeEditorPanel
            breadcrumb={[props.label ?? ""]}
            editor={<CodeEditorForPanel {...props} styleName="window" showLineNum />}
            onVisibleChange={(visible) => setDisabled(visible)}
          />
        )}
      </Container>
    </CodeEditorCommon>
  );
}

const Container = styled.div<{
  disabled?: boolean;
  error?: boolean;
  bordered?: boolean;
  styleName?: StyleName;
  enableClickCompName?: boolean;
}>`
  position: relative;
  height: 100%;

  :hover {
    .code-editor-panel-open-button {
      display: block;
    }
  }

  .cm-editor:hover {
    border: 1px solid ${(props) => (props.error ? "#f73131" : "#8B8FA3")};
  }

  .cm-editor.cm-focused {
    border: 1px solid ${(props) => (props.error ? "#f73131" : "#3377ff")};
    box-shadow: 0 0 0 2px ${(props) => (props.error ? "#feeaea" : "#d6e4ff")};
  }

  .cm-editor {
    border: 1px solid ${(props) => (props.error ? "#f73131" : "#d7d9e0")};
    border-radius: ${(props) => (props.bordered ? "4px" : "")};
  }

  .cm-line {
    padding-right: 8px;
  }

  .cm-editor {
    min-height: ${(props) => getStyle(props.styleName).minHeight};
  }
  .cm-content,
  .cm-gutter {
    min-height: ${(props) => getStyle(props.styleName).minHeight};
    min-height: calc(${(props) => getStyle(props.styleName).minHeight} - 2px);
  }

  .cm-editor {
    overflow: hidden;
    max-height: ${(props) => getStyle(props.styleName).maxHeight};
  }

  ${(props) => {
    if (props.disabled) {
      return css`
        pointer-events: none;

        .cm-editor {
          background-color: #f5f5f6;
          color: #b8b9bf;
        }
      `;
    }
  }}
  ${(props) => clickCompNameCss(props.enableClickCompName)}
`;
