import { Section, sectionNames } from "openblocks-design";
import { UICompBuilder, withDefault } from "../../generators";
import { NameConfigHidden, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import ReactJson, { ThemeKeys } from "react-json-view";
import { defaultData } from "./jsonConstants";
import styled from "styled-components";
import { BoolControl } from "comps/controls/boolControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { ArrayOrJSONObjectControl, NumberControl } from "comps/controls/codeControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";

/**
 * JsonExplorer Comp
 */

const themeOptions = [
  { label: trans("jsonExplorer.default"), value: "shapeshifter:inverted" },
  { label: trans("jsonExplorer.defaultDark"), value: "shapeshifter" },
  { label: trans("jsonExplorer.neutralLight"), value: "grayscale:inverted" },
  { label: trans("jsonExplorer.neutralDark"), value: "grayscale" },
  { label: trans("jsonExplorer.azure"), value: "apathy:inverted" },
  { label: trans("jsonExplorer.darkBlue"), value: "flat" },
];

const bgColorMap = {
  "shapeshifter:inverted": "#ffffff",
  shapeshifter: "#000000",
  "grayscale:inverted": "#ffffff",
  grayscale: "#000000",
  "apathy:inverted": "#efffff",
  flat: "#2c3e50",
};

const JsonExplorerContainer = styled.div<{ $theme: keyof typeof bgColorMap }>`
  height: 100%;
  overflow-y: scroll;
  background-color: ${(props) => bgColorMap[props.$theme] || "#ffffff"};
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  padding: 10px;
`;

let JsonExplorerTmpComp = (function () {
  const childrenMap = {
    value: withDefault(ArrayOrJSONObjectControl, JSON.stringify(defaultData, null, 2)),
    indent: withDefault(NumberControl, 4),
    expandToggle: BoolControl.DEFAULT_TRUE,
    theme: dropdownControl(themeOptions, "shapeshifter:inverted"),
  };
  return new UICompBuilder(childrenMap, (props) => (
    <JsonExplorerContainer $theme={props.theme as keyof typeof bgColorMap}>
      <ReactJson
        name={false}
        src={props.value}
        theme={props.theme as ThemeKeys}
        collapsed={!props.expandToggle}
        displayDataTypes={false}
        indentWidth={props.indent}
      />
    </JsonExplorerContainer>
  ))
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.value.propertyView({
              label: trans("data"),
            })}
            {children.indent.propertyView({ label: trans("jsonExplorer.indent") })}
            {children.expandToggle.propertyView({ label: trans("jsonExplorer.expandToggle") })}
          </Section>

          <Section name={sectionNames.style}>
            {children.theme.propertyView({
              label: trans("jsonExplorer.theme"),
            })}
          </Section>

          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
        </>
      );
    })
    .build();
})();

JsonExplorerTmpComp = class extends JsonExplorerTmpComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const JsonExplorerComp = withExposingConfigs(JsonExplorerTmpComp, [
  new NameConfig("value", trans("jsonExplorer.valueDesc")),
  NameConfigHidden,
]);
