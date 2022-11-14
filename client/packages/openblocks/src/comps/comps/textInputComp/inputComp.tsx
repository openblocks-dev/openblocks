import { Input } from "openblocks-design";
import { BoolControl } from "comps/controls/boolControl";
import { styleControl } from "comps/controls/styleControl";
import { InputLikeStyle, InputLikeStyleType } from "comps/controls/styleControlConstants";
import {
  NameConfig,
  NameConfigPlaceHolder,
  NameConfigRequired,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { MethodConfigFocus, withMethodExposing } from "comps/generators/withMethodExposing";
import { Section, sectionNames } from "openblocks-design";
import styled from "styled-components";
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
import {
  allowClearPropertyView,
  hiddenPropertyView,
  readOnlyPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";

/**
 * Input Comp
 */

const InputStyle = styled(Input)<{ $style: InputLikeStyleType }>`
  ${(props) => props.$style && getStyle(props.$style)}
`;

const InputTmpComp = (function () {
  const childrenMap = {
    ...textInputChildren,
    showCount: BoolControl,
    allowClear: BoolControl,
    style: styleControl(InputLikeStyle),
  };
  return new UICompBuilder(childrenMap, (props) => {
    return props.label({
      required: props.required,
      children: (
        <InputStyle
          {...textInputProps(props)}
          showCount={props.showCount}
          allowClear={props.allowClear}
          $style={props.style}
        />
      ),
      style: props.style,
      ...textInputValidate(props),
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <TextInputBasicSection {...children} />
          <FormDataPropertyView {...children} />
          {children.label.getPropertyView()}

          <TextInputInteractionSection {...children} />

          <Section name={sectionNames.advanced}>
            {children.showCount.propertyView({ label: trans("prop.showCount") })}
            {allowClearPropertyView(children)}
            {readOnlyPropertyView(children)}
          </Section>

          <TextInputValidationSection {...children} />

          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .build();
})();

const InputTmp2Comp = withMethodExposing(InputTmpComp, MethodConfigFocus);

export const InputComp = withExposingConfigs(InputTmp2Comp, [
  new NameConfig("value", trans("export.inputValueDesc")),
  NameConfigPlaceHolder,
  NameConfigRequired,
  ...TextInputConfigs,
]);
