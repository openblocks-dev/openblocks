import { Section, sectionNames } from "openblocks-design";
import { UICompBuilder } from "../../generators";
import { NameConfigHidden, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import { defaultData } from "./jsonConstants";
import styled from "styled-components";
import { JSONValue } from "util/jsonTypes";
import { jsonValueExposingStateControl } from "comps/controls/codeStateControl";
import { ChangeEventHandlerControl } from "comps/controls/eventHandlerControl";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { jsonValueControl } from "comps/controls/codeControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { LabelControl } from "comps/controls/labelControl";
import { formDataChildren, FormDataPropertyView } from "../formComp/formDataConstants";
import { JsonEditorStyle } from "comps/controls/styleControlConstants";
import { styleControl } from "comps/controls/styleControl";
import { migrateOldData, withDefault } from "comps/generators/simpleGenerators";

/**
 * JsonEditor Comp
 */

const JsonEditorContainer = styled.div`
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  .decorationsOverviewRuler {
    display: none !important;
  }
  .monaco-scrollable-element > .scrollbar > .slider {
    border-radius: 10px;
    left: -8px;
  }
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

const childrenMap = {
  value: jsonValueExposingStateControl("value", defaultData),
  default: jsonValueControl(defaultData),
  onEvent: ChangeEventHandlerControl,
  label: withDefault(LabelControl, { position: "column" }),
  style: styleControl(JsonEditorStyle),

  ...formDataChildren,
};

let JsonEditorTmpComp = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    const [value, setValue] = useState("");
    useEffect(() => {
      setValue(JSON.stringify(props.default, null, 2));
    }, [props.default]);
    const handleChange = (v: JSONValue) => {
      props.value.onChange(v);
      props.onEvent("change");
    };
    return props.label({
      style: props.style,
      children: (
        <JsonEditorContainer>
          <Editor
            height="100%"
            defaultLanguage="json"
            value={value}
            loading=""
            onChange={(v: string | undefined) => {
              setValue(v || "");
              try {
                handleChange(JSON.parse(v === undefined ? "" : v));
              } catch (error) {}
            }}
            options={{
              contextmenu: false,
              hideCursorInOverviewRuler: true,
              wordWrap: true,
              quickSuggestions: false,
              scrollBeyondLastLine: false,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                horizontal: "hidden",
                scrollByPage: false,
                verticalSliderSize: 6,
              },
            }}
          />
        </JsonEditorContainer>
      ),
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.default.propertyView({ label: trans("prop.defaultValue") })}
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

JsonEditorTmpComp = class extends JsonEditorTmpComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const JsonEditorComp = withExposingConfigs(JsonEditorTmpComp, [
  new NameConfig("value", trans("export.jsonEditorDesc")),
  NameConfigHidden,
]);
