import {
  NameConfig,
  NameConfigPlaceHolder,
  NameConfigRequired,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { Section, sectionNames } from "openblocks-design";
import { BoolControl } from "../../controls/boolControl";
import { AutoHeightControl } from "../../controls/autoHeightControl";
import { UICompBuilder } from "../../generators";
import { FormDataPropertyView } from "../formComp/formDataConstants";
import {
  getStyle,
  TextInputBasicSection,
  textInputChildren,
  TextInputConfigs,
  TextInputInteractionSection,
  textInputProps,
  textInputValidate,
  TextInputValidationSection,
} from "./textInputConstants";
import { MethodConfigFocus, withMethodExposing } from "../../generators/withMethodExposing";
import { styleControl } from "comps/controls/styleControl";
import styled from "styled-components";
import { InputLikeStyle, InputLikeStyleType } from "comps/controls/styleControlConstants";
import { TextArea } from "components/TextArea";
import {
  allowClearPropertyView,
  hiddenPropertyView,
  readOnlyPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";

const TextAreaStyled = styled(TextArea)<{
  $style: InputLikeStyleType;
}>`
  ${(props) => props.$style && getStyle(props.$style)}
`;

let TextAreaTmpComp = (function () {
  const childrenMap = {
    ...textInputChildren,
    allowClear: BoolControl,
    autoHeight: AutoHeightControl,
    style: styleControl(InputLikeStyle),
  };
  return new UICompBuilder(childrenMap, (props) =>
    props.label({
      required: props.required,
      children: (
        <TextAreaStyled
          {...textInputProps(props)}
          allowClear={props.allowClear}
          autoSize={props.autoHeight}
          style={{ height: "100%", maxHeight: "100%", resize: "none" }}
          $style={props.style}
        />
      ),
      style: props.style,
      ...textInputValidate(props),
    })
  )
    .setPropertyViewFn((children) => (
      <>
        <TextInputBasicSection {...children} />
        <FormDataPropertyView {...children} />
        {children.label.getPropertyView()}

        <TextInputInteractionSection {...children} />

        <Section name={sectionNames.advanced}>
          {allowClearPropertyView(children)}
          {readOnlyPropertyView(children)}
        </Section>

        <TextInputValidationSection {...children} />

        <Section name={sectionNames.layout}>
          {children.autoHeight.getPropertyView()}
          {hiddenPropertyView(children)}
        </Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

TextAreaTmpComp = class extends TextAreaTmpComp {
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
};

const TextareaTmp2Comp = withMethodExposing(TextAreaTmpComp, MethodConfigFocus);

export const TextAreaComp = withExposingConfigs(TextareaTmp2Comp, [
  new NameConfig("value", trans("export.inputValueDesc")),
  NameConfigPlaceHolder,
  NameConfigRequired,
  ...TextInputConfigs,
]);
