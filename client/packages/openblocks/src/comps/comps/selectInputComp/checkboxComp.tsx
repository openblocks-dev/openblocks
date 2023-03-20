import { Checkbox } from "antd";
import { SelectInputOptionControl } from "comps/controls/optionsControl";
import { BoolCodeControl } from "../../controls/codeControl";
import { arrayStringExposingStateControl } from "../../controls/codeStateControl";
import { LabelControl } from "../../controls/labelControl";
import { ChangeEventHandlerControl } from "../../controls/eventHandlerControl";
import { UICompBuilder } from "../../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import styled, { css } from "styled-components";
import {
  selectDivRefMethods,
  SelectInputInvalidConfig,
  SelectInputValidationChildren,
  useSelectInputValidate,
} from "./selectInputConstants";
import { formDataChildren } from "../formComp/formDataConstants";
import { styleControl } from "comps/controls/styleControl";
import { CheckboxStyle, CheckboxStyleType } from "comps/controls/styleControlConstants";
import { RadioLayoutOptions, RadioPropertyView } from "./radioCompConstants";
import { dropdownControl } from "../../controls/dropdownControl";
import { ValueFromOption } from "openblocks-design";
import { EllipsisTextCss } from "openblocks-design";
import { trans } from "i18n";
import { RefControl } from "comps/controls/refControl";

export const getStyle = (style: CheckboxStyleType) => {
  return css`
    &,
    .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled) {
      color: ${style.staticText};
      max-width: calc(100% - 8px);

      span:not(.ant-checkbox) {
        ${EllipsisTextCss};
      }

      .ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${style.checkedBackground};
          border-color: ${style.checkedBackground};

          &::after {
            border-color: ${style.checked};
          }
        }

        &::after {
          border-color: ${style.checkedBackground};
          border-radius: ${style.radius};
        }
      }

      .ant-checkbox-inner {
        border-radius: ${style.radius};
        background-color: ${style.uncheckedBackground};
        border-color: ${style.uncheckedBorder};
      }

      &:hover .ant-checkbox-inner,
      .ant-checkbox:hover .ant-checkbox-inner,
      .ant-checkbox-input:focus + .ant-checkbox-inner {
        border-color: ${style.checkedBackground};
      }
    }

    .ant-checkbox-wrapper {
      .ant-checkbox-inner,
      .ant-checkbox-checked::after {
        border-radius: ${style.radius};
      }
    }
  `;
};

const CheckboxGroup = styled(Checkbox.Group)<{
  $style: CheckboxStyleType;
  $layout: ValueFromOption<typeof RadioLayoutOptions>;
}>`
  min-height: 32px;
  ${(props) => props.$style && getStyle(props.$style)}
  ${(props) => {
    if (props.$layout === "horizontal") {
      return css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      `;
    } else if (props.$layout === "vertical") {
      return css`
        display: flex;
        flex-direction: column;
      `;
    } else if (props.$layout === "auto_columns") {
      return css`
        break-inside: avoid;
        columns: 160px;
      `;
    }
  }}
`;

const CheckboxBasicComp = (function () {
  const childrenMap = {
    value: arrayStringExposingStateControl("value", ["1"]),
    label: LabelControl,
    disabled: BoolCodeControl,
    onEvent: ChangeEventHandlerControl,
    options: SelectInputOptionControl,
    style: styleControl(CheckboxStyle),
    layout: dropdownControl(RadioLayoutOptions, "horizontal"),
    viewRef: RefControl<HTMLDivElement>,

    ...SelectInputValidationChildren,
    ...formDataChildren,
  };
  return new UICompBuilder(childrenMap, (props) => {
    const [validateState, handleValidate] = useSelectInputValidate(props);
    return props.label({
      required: props.required,
      style: props.style,
      children: (
        <CheckboxGroup
          ref={props.viewRef}
          disabled={props.disabled}
          value={props.value.value}
          $style={props.style}
          $layout={props.layout}
          options={props.options
            .filter((option) => option.value !== undefined && !option.hidden)
            .map((option) => ({
              label: option.label,
              value: option.value,
              disabled: option.disabled,
            }))}
          onChange={(values) => {
            handleValidate(values as string[]);
            props.value.onChange(values as string[]);
            props.onEvent("change");
          }}
        />
      ),
      ...validateState,
    });
  })
    .setPropertyViewFn((children) => <RadioPropertyView {...children} />)
    .setExposeMethodConfigs(selectDivRefMethods)
    .build();
})();

export const CheckboxComp = withExposingConfigs(CheckboxBasicComp, [
  new NameConfig("value", trans("selectInput.valueDesc")),
  SelectInputInvalidConfig,
  ...CommonNameConfig,
]);
