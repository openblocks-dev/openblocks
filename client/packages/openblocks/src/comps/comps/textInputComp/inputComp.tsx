import { Input, Section, sectionNames } from "openblocks-design";
import { BoolControl } from "comps/controls/boolControl";
import { styleControl } from "comps/controls/styleControl";
import { InputLikeStyle, InputLikeStyleType } from "comps/controls/styleControlConstants";
import {
  NameConfig,
  NameConfigPlaceHolder,
  NameConfigRequired,
} from "comps/generators/withExposing";
import styled from "styled-components";
import { UICompBuilder } from "../../generators";
import { FormDataPropertyView } from "../formComp/formDataConstants";
import {
  getStyle,
  inputRefMethods,
  TextInputBasicSection,
  textInputChildren,
  TextInputConfigs,
  TextInputInteractionSection,
  TextInputValidationSection,
  useTextInputProps,
} from "./textInputConstants";
import {
  allowClearPropertyView,
  hiddenPropertyView,
  readOnlyPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { IconControl } from "comps/controls/iconControl";
import { hasIcon } from "comps/utils";
import { InputRef } from "antd";
import { RefControl } from "comps/controls/refControl";

/**
 * Input Comp
 */

const InputStyle = styled(Input)<{ $style: InputLikeStyleType }>`
  ${(props) => props.$style && getStyle(props.$style)}
`;

const childrenMap = {
  ...textInputChildren,
  viewRef: RefControl<InputRef>,
  showCount: BoolControl,
  allowClear: BoolControl,
  style: styleControl(InputLikeStyle),
  prefixIcon: IconControl,
  suffixIcon: IconControl,
};

export const InputComp = new UICompBuilder(childrenMap, (props) => {
  const [inputProps, validateState] = useTextInputProps(props);
  return props.label({
    required: props.required,
    children: (
      <InputStyle
        {...inputProps}
        ref={props.viewRef}
        showCount={props.showCount}
        allowClear={props.allowClear}
        $style={props.style}
        prefix={hasIcon(props.prefixIcon) && props.prefixIcon}
        suffix={hasIcon(props.suffixIcon) && props.suffixIcon}
      />
    ),
    style: props.style,
    ...validateState,
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
          {children.prefixIcon.propertyView({ label: trans("button.prefixIcon") })}
          {children.suffixIcon.propertyView({ label: trans("button.suffixIcon") })}
        </Section>

        <TextInputValidationSection {...children} />

        <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    );
  })
  .setExposeMethodConfigs(inputRefMethods)
  .setExposeStateConfigs([
    new NameConfig("value", trans("export.inputValueDesc")),
    NameConfigPlaceHolder,
    NameConfigRequired,
    ...TextInputConfigs,
  ])
  .build();
