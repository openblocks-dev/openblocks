import { StringControl } from "comps/controls/codeControl";
import { BoolControl } from "comps/controls/boolControl";
import { stringExposingStateControl } from "comps/controls/codeStateControl";
import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { ChangeEventHandlerControl } from "comps/controls/eventHandlerControl";
import { UICompBuilder, withDefault } from "comps/generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "comps/generators/withExposing";
import { Section, sectionNames } from "openblocks-design";
import React, { Suspense, useEffect, useRef, useState } from "react";
import type ReactQuill from "react-quill";
import { useDebounce } from "react-use";
import styled, { css } from "styled-components";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";
import { INPUT_DEFAULT_ONCHANGE_DEBOUNCE } from "constants/perf";
import {
  hiddenPropertyView,
  placeholderPropertyView,
  readOnlyPropertyView,
} from "comps/utils/propertyUtils";
import _ from "lodash";
import { trans } from "i18n";
import { Skeleton } from "antd";
import { styleControl } from "comps/controls/styleControl";
import { RichTextEditorStyle, RichTextEditorStyleType } from "comps/controls/styleControlConstants";

const localizeStyle = css`
  & .ql-snow {
    .ql-picker.ql-header {
      .ql-picker-label::before,
      .ql-picker-item::before {
        content: "${trans("richTextEditor.content")}";
      }

      .ql-picker-label[data-value="1"]::before,
      .ql-picker-item[data-value="1"]::before {
        content: "${trans("richTextEditor.title")} 1";
      }

      .ql-picker-label[data-value="2"]::before,
      .ql-picker-item[data-value="2"]::before {
        content: "${trans("richTextEditor.title")} 2";
      }

      .ql-picker-label[data-value="3"]::before,
      .ql-picker-item[data-value="3"]::before {
        content: "${trans("richTextEditor.title")} 3";
      }

      .ql-picker-item[data-value="1"]::before {
        font-size: 26px;
      }

      .ql-picker-item[data-value="3"]::before {
        font-size: 19px;
      }

      .ql-picker-item[data-value="3"]::before {
        font-size: 15px;
      }
    }
    & .ql-tooltip.ql-editing a.ql-action::after {
      content: "${trans("richTextEditor.save")}";
    }
    & .ql-tooltip::before {
      content: "${trans("richTextEditor.link")}";
    }
    & .ql-tooltip {
      a.ql-action::after {
        content: "${trans("richTextEditor.edit")}";
      }
      a.ql-remove::before {
        content: "${trans("richTextEditor.remove")}";
      }
    }
  }
`;

const commonStyle = (style: RichTextEditorStyleType) => css`
  height: 100%;

  & .ql-editor {
    min-height: 85px;
  }
  & .ql-snow .ql-tooltip.ql-editing {
    input[type="text"] {
      width: 130px;
    }
  }
  & .ql-snow {
    &.ql-container,
    &.ql-toolbar {
      border-color: ${style.border};
      background-color: #ffffff;
    }
  }
  & .ql-toolbar {
    border-radius: ${style.radius} ${style.radius} 0 0;
  }
  & .ql-container {
    border-radius: 0 0 ${style.radius} ${style.radius};
  }
`;

const hideToolbarStyle = (style: RichTextEditorStyleType) => css`
  .ql-snow.ql-toolbar {
    height: 0;
    overflow: hidden;
    padding: 0;
    border-bottom: 0;
    border: none;
  }
  .quill .ql-snow.ql-container {
    border-radius: ${style.radius};
    border: 1px solid ${style.border};
  }
`;

interface Props {
  hideToolbar: boolean;
  $style: RichTextEditorStyleType;
}

const AutoHeightReactQuill = styled.div<Props>`
  ${localizeStyle}
  ${(props) => commonStyle(props.$style)}
  & .ql-container .ql-editor {
    min-height: 125px;
  }
  ${(props) => (props.hideToolbar ? hideToolbarStyle(props.$style) : "")};
`;

const FixHeightReactQuill = styled.div<Props>`
  ${localizeStyle}
  ${(props) => commonStyle(props.$style)}
  & .quill {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  & .ql-snow {
    &.ql-container {
      flex: 1;
      overflow: auto;
    }
  }
  ${(props) => (props.hideToolbar ? hideToolbarStyle(props.$style) : "")};
`;

const childrenMap = {
  value: stringExposingStateControl("value"),
  hideToolbar: BoolControl,
  readOnly: BoolControl,
  autoHeight: AutoHeightControl,
  placeholder: withDefault(StringControl, trans("richTextEditor.placeholder")),
  onEvent: ChangeEventHandlerControl,
  style: styleControl(RichTextEditorStyle),

  ...formDataChildren,
};

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ color: [] }, { background: [] }, { align: [] }],
  ["link", "image"],
  ["clean"],
];

interface IProps {
  value: string;
  placeholder: string;
  hideToolbar: boolean;
  readOnly: boolean;
  autoHeight: boolean;
  onChange: (value: string) => void;
  $style: RichTextEditorStyleType;
}

const ReactQuillEditor = React.lazy(() => import("react-quill"));

function RichTextEditor(props: IProps) {
  const [key, setKey] = useState(0);
  const [content, setContent] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<ReactQuill>(null);
  const isTypingRef = useRef(0);

  const debounce = INPUT_DEFAULT_ONCHANGE_DEBOUNCE;

  const originOnChangeRef = useRef(props.onChange);
  originOnChangeRef.current = props.onChange;

  const onChangeRef = useRef(
    debounce > 0
      ? _.debounce((v: string) => {
          window.clearTimeout(isTypingRef.current);
          isTypingRef.current = window.setTimeout(() => (isTypingRef.current = 0), 100);
          originOnChangeRef.current?.(v);
        })
      : (v: string) => originOnChangeRef.current?.(v)
  );

  // react-quill will not take effect after the placeholder is updated
  // re-mount the comp with debounce to solve the problem
  useDebounce(
    () => {
      setKey(Math.random());
    },
    500,
    [props.placeholder]
  );

  const contains = (parent: HTMLElement, descendant: HTMLElement) => {
    try {
      // Firefox inserts inaccessible nodes around video elements
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      descendant.parentNode;
    } catch (e) {
      return false;
    }
    return parent.contains(descendant);
  };

  const handleChange = (value: string) => {
    setContent(value);
    // props.onChange(value);
    onChangeRef.current(value);
  };

  useEffect(() => {
    let finalValue = props.value;
    if (!/^<\w+>.+<\/\w+>$/.test(props.value)) {
      finalValue = `<p class="">${props.value}</p>`;
    }
    setContent(finalValue);
  }, [props.value]);

  const handleClickWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    // grid item prevents bubbling, quill can't listen to events on document.body, so it can't close the toolbar drop-down box
    // Refer to the source code of quill, actively close
    // https://github.com/quilljs/quill/blob/4262023ad1/themes/base.js#L71
    const editor = editorRef.current?.editor as any;
    editor.theme.pickers?.forEach((i: any) => {
      if (!contains(i.container, e.nativeEvent.target as HTMLElement)) {
        i.close();
      }
    });
  };

  const id = "rtf-editor";
  const Wrapper = props.autoHeight ? AutoHeightReactQuill : FixHeightReactQuill;
  return (
    <Wrapper
      id={id}
      onClick={handleClickWrapper}
      ref={wrapperRef}
      hideToolbar={props.hideToolbar}
      $style={props.$style}
    >
      <Suspense fallback={<Skeleton />}>
        <ReactQuillEditor
          key={key}
          ref={editorRef}
          bounds={`#${id}`}
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          value={content}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          onChange={handleChange}
        />
      </Suspense>
    </Wrapper>
  );
}

const RichTextEditorCompBase = new UICompBuilder(childrenMap, (props) => {
  const handleChange = (v: string) => {
    props.value.onChange(v);
    props.onEvent("change");
  };

  return (
    <RichTextEditor
      autoHeight={props.autoHeight}
      hideToolbar={props.hideToolbar}
      readOnly={props.readOnly}
      value={props.value.value}
      placeholder={props.placeholder}
      onChange={handleChange}
      $style={props.style}
    />
  );
})
  .setPropertyViewFn((children) => {
    return (
      <>
        <Section name={sectionNames.basic}>
          {children.value.propertyView({ label: trans("prop.defaultValue") })}
          {placeholderPropertyView(children)}
        </Section>
        <FormDataPropertyView {...children} />
        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {readOnlyPropertyView(children)}
        </Section>
        <Section name={sectionNames.layout}>
          {children.hideToolbar.propertyView({ label: trans("richTextEditor.hideToolbar") })}
          {children.autoHeight.getPropertyView()}
          {hiddenPropertyView(children)}
        </Section>
        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    );
  })
  .build();

class RichTextEditorCompAutoHeight extends RichTextEditorCompBase {
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
}

export const RichTextEditorComp = withExposingConfigs(RichTextEditorCompAutoHeight, [
  new NameConfig("value", trans("export.richTextEditorValueDesc")),
  new NameConfig("readOnly", trans("export.richTextEditorReadOnlyDesc")),
  new NameConfig("hideToolbar", trans("export.richTextEditorHideToolBarDesc")),
  NameConfigHidden,
]);
