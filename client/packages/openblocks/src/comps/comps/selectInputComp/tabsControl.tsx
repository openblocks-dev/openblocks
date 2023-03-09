import { Avatar, Segmented as AntdSegmented } from "antd";
import { BoolCodeControl } from "comps/controls/codeControl";
import { stringExposingStateControl } from "comps/controls/codeStateControl";
import { ChangeEventHandlerControl } from "comps/controls/eventHandlerControl";
import { LabelControl } from "comps/controls/tabsLabelControl";
import { SelectInputOptionControl } from "comps/controls/tabsOptionsControl";
import { styleControl } from "comps/controls/styleControl";
import {
  SegmentStyle,
  SegmentStyleType,
} from "comps/controls/styleControlConstants";
import { dropdownControl } from "comps/controls/dropdownControl";

import styled, { css } from "styled-components";
import { UICompBuilder } from "../../generators";
import {
  CommonNameConfig,
  NameConfig,
  withExposingConfigs,
} from "../../generators/withExposing";
import {
  formDataChildren,
  FormDataPropertyView,
} from "../formComp/formDataConstants";
import {
  SelectInputInvalidConfig,
  SelectInputValidationChildren,
  SelectInputValidationSection,
  useSelectInputValidate,
} from "./selectInputConstants";
import { Section, sectionNames } from "openblocks-design";
import {
  hiddenPropertyView,
  disabledPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { useEffect } from "react";
const getStyle = (style: SegmentStyleType, orientation: string) => {
  return css`
    &.ant-segmented:not(.ant-segmented-disabled) {
      background-color: ${style.background};
      &,
      .ant-segmented-item-selected,
      .ant-segmented-thumb,
      .ant-segmented-item:hover,
      .ant-segmented-item:focus {
        color: ${style.text};
        border-radius: ${style.radius};
      }
      .ant-segmented-item-selected,
      .ant-segmented-thumb {
        background-color: ${style.indicatorBackground};
      }
    }
    &.ant-segmented,
    .ant-segmented-item-selected {
      border-radius: ${style.radius};
    }
    .ant-segmented-group {
      flex-direction: ${orientation};
    }
  `;
};

const orientationOptions = [
  {
    label: "Horizontal",
    value: "horizontal",
  },
  {
    label: "Vertical",
    value: "vertical",
  },
] as const;

const Segmented = styled(AntdSegmented)<{
  $style: SegmentStyleType;
  $orientation: string;
}>`
  width: 100%;
  height: 32px; // keep the height unchanged when there are no options
  ${(props) => props.$style && getStyle(props.$style, props.$orientation)}
`;
export const SegmentChildrenMap = {
  value: stringExposingStateControl("value"),
  orientation: dropdownControl(orientationOptions, "horizontal"),
  label: LabelControl,
  disabled: BoolCodeControl,
  onEvent: ChangeEventHandlerControl,
  options: SelectInputOptionControl,
  style: styleControl(SegmentStyle),
  ...SelectInputValidationChildren,
  ...formDataChildren,
};
export const SegmentedControlBasicComp = (function () {
  return new UICompBuilder(SegmentChildrenMap, (props) => {
    const [validateState, handleValidate] = useSelectInputValidate(props);
    useEffect(() => {
      const elements = document.getElementsByClassName(
        "ant-segmented-thumb-motion-appear"
      );

      setTimeout(() => {
        // Modify the style of the element to remove the specific style you want to remove
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          if (props.orientation === "vertical") {
            element.style.removeProperty("transform");
            element.style.removeProperty("width");
          }
        }
      }, 10);
    }, [props.value.onChange]);
    return props.label({
      required: props.required,
      style: props.style,
      children: (
        <Segmented
          block
          disabled={props.disabled}
          value={props.value.value}
          $style={props.style}
          onChange={(value) => {
            handleValidate(value.toString());
            props.value.onChange(value.toString());
            props.onEvent("change");
          }}
          $orientation={props.orientation === "horizontal" ? "row" : "column"}
          style={{
            height: "100%",
          }}
          options={props.options
            .filter((option) => option.value !== undefined && !option.hidden)
            .map((option) => ({
              label: (
                <div style={{ padding: "4px" }}>
                  {option.image && <Avatar shape={option.imageShape} src={option.image} />}
                  <div>{option.label}</div>
                </div>
              ),
              value: option.value,
              disabled: option.disabled,
            }))}
        />
      ),
      ...validateState,
    });
  })
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.options.propertyView({})}
          {children.value.propertyView({ label: trans("prop.defaultValue") })}
        </Section>
        <FormDataPropertyView {...children} />
        {children.label.getPropertyView()}
        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {disabledPropertyView(children)}
        </Section>
        <SelectInputValidationSection {...children} />
        <Section name={sectionNames.layout}>
          {children.orientation.propertyView({
            label: trans("prop.orientation"),
          })}
          {hiddenPropertyView(children)}
        </Section>
        <Section name={sectionNames.style}>
          {children.style.getPropertyView()}
        </Section>
      </>
    ))
    .build();
})();
export const TabsControlComp = withExposingConfigs(SegmentedControlBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  SelectInputInvalidConfig,
  ...CommonNameConfig,
]);
