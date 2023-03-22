import { Section, sectionNames } from "openblocks-design";
import { UICompBuilder } from "../../generators";
import { NameConfigHidden, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import { defaultData } from "./jsonConstants";
import styled from "styled-components";
import { jsonValueExposingStateControl } from "comps/controls/codeStateControl";
import { ChangeEventHandlerControl } from "comps/controls/eventHandlerControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { LabelControl } from "comps/controls/labelControl";
import { formDataChildren, FormDataPropertyView } from "../formComp/formDataConstants";
import { JsonEditorStyle } from "comps/controls/styleControlConstants";
import { styleControl } from "comps/controls/styleControl";
import { migrateOldData, withDefault } from "comps/generators/simpleGenerators";
import { useRef, useEffect } from "react";
import {
  EditorState,
  EditorView,
  type EditorView as EditorViewType,
} from "base/codeEditor/codeMirror";
import { useExtensions } from "base/codeEditor/extensions";
import { getJsonFormatter } from "base/codeEditor/autoFormat";

/**
 * JsonEditor Comp
 */

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
`;

/**
 * Compatible with old data 2022-10-19
 */
function fixOldData(oldData: any) {
  if (oldData && !oldData.hasOwnProperty("label")) {
    return {
      ...oldData,
      label: {
        text: "",
      },
    };
  }
  return oldData;
}

/**
 * Compatible with old data 2022-11-18
 */
function fixOldDataSecond(oldData: any) {
  if (oldData && oldData.hasOwnProperty("default")) {
    return {
      ...oldData,
      value: oldData.default,
    };
  }
  return oldData;
}

const childrenMap = {
  value: jsonValueExposingStateControl("value", defaultData),
  onEvent: ChangeEventHandlerControl,
  label: withDefault(LabelControl, { position: "column" }),
  style: styleControl(JsonEditorStyle),

  ...formDataChildren,
};

let JsonEditorTmpComp = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const view = useRef<EditorViewType | null>(null);
    const editContent = useRef<string>();
    const { extensions } = useExtensions({
      codeType: "PureJSON",
      language: "json",
      showLineNum: true,
      enableClickCompName: false,
      onFocus: (focused) => {
        if (focused) {
          wrapperRef.current?.click();
        }
      },
      onChange: (state) => {
        editContent.current = state.doc.toString();
        try {
          const value = JSON.parse(state.doc.toString());
          props.value.onChange(value);
          props.onEvent("change");
        } catch (error) {}
      },
    });

    useEffect(() => {
      if (wrapperRef.current && !view.current) {
        const state = EditorState.create({
          doc: JSON.stringify(props.value.value, null, 2),
          extensions,
        });
        view.current = new EditorView({ state, parent: wrapperRef.current });
      }
    }, [wrapperRef.current]);

    if (wrapperRef.current && view.current && !editContent.current) {
      const state = EditorState.create({
        doc: JSON.stringify(props.value.value, null, 2),
        extensions,
      });
      view.current?.setState(state);
    }
    if (editContent.current) {
      editContent.current = undefined;
    }
    return props.label({
      style: props.style,
      children: <Wrapper ref={wrapperRef} onFocus={() => (editContent.current = "focus")} />,
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.value.propertyView({ label: trans("prop.defaultValue") })}
          </Section>
          <FormDataPropertyView {...children} />
          {children.label.getPropertyView()}
          <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>
          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .build();
})();

JsonEditorTmpComp = migrateOldData(JsonEditorTmpComp, fixOldData);

JsonEditorTmpComp = migrateOldData(JsonEditorTmpComp, fixOldDataSecond);

JsonEditorTmpComp = class extends JsonEditorTmpComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const JsonEditorComp = withExposingConfigs(JsonEditorTmpComp, [
  new NameConfig("value", trans("export.jsonEditorDesc")),
  NameConfigHidden,
]);
