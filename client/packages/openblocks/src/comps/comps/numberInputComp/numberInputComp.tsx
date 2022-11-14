import { InputNumber as AntdInputNumber } from "antd";
import {
  BoolCodeControl,
  codeControl,
  CustomRuleControl,
  NumberControl,
  RangeControl,
  StringControl,
} from "comps/controls/codeControl";
import { BoolControl } from "comps/controls/boolControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { LabelControl } from "comps/controls/labelControl";
import { stringExposingStateControl } from "comps/controls/codeStateControl";

import {
  CommonNameConfig,
  depsConfig,
  NameConfigPlaceHolder,
  NameConfigRequired,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { Section, sectionNames } from "openblocks-design";
import _, { isEmpty, isNaN } from "lodash";
import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { RecordConstructorToView } from "openblocks-core";
import { InputEventHandlerControl } from "../../controls/eventHandlerControl";
import { UICompBuilder, withDefault } from "../../generators";
import Big from "big.js";
import { formDataChildren, FormDataPropertyView } from "../formComp/formDataConstants";
import { MethodConfigFocus, withMethodExposing } from "../../generators/withMethodExposing";
import { RefControl } from "../../controls/refControl";
import { styleControl } from "comps/controls/styleControl";
import { InputLikeStyle, InputLikeStyleType } from "comps/controls/styleControlConstants";
import {
  hiddenPropertyView,
  disabledPropertyView,
  placeholderPropertyView,
  requiredPropertyView,
  readOnlyPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";

const getStyle = (style: InputLikeStyleType) => {
  return css`
    border-radius: ${style.radius};
    // still use antd style when disabled
    &:not(.ant-input-number-disabled) {
      color: ${style.text};
      background-color: ${style.background};
      border-color: ${style.border};

      &.ant-input-number-focused {
        border-color: ${style.accent};
      }

      &:hover {
        border-color: ${style.accent};
      }

      &::-webkit-input-placeholder {
        color: ${style.text};
        opacity: 0.4;
      }

      .ant-input-number-handler-wrap {
        background-color: ${style.background};
        border-radius: 0 ${style.radius} ${style.radius} 0;

        .ant-input-number-handler span {
          color: ${style.text};
          opacity: 0.45;

          &:hover {
            opacity: 1;
          }
        }

        .ant-input-number-handler-up {
          border-top-right-radius: ${style.radius};
        }

        .ant-input-number-handler-down {
          border-bottom-right-radius: ${style.radius};
        }
      }
    }
  `;
};

const InputNumber = styled(AntdInputNumber)<{
  $style: InputLikeStyleType;
}>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const toBig = (value: string) => {
  const num = numberParser(value);
  return isEmpty(num) ? Big(0) : Big(num);
};

const FormatterOptions = [
  {
    label: trans("numberInput.standard"),
    value: "standard",
    formatter: (allowNull: boolean, precision: number, value: string): string =>
      isEmpty(value) ? (allowNull ? "" : "0") : toBig(value).toFixed(precision),
    parser: (value?: string): string => value ?? "",
  },
  {
    label: trans("numberInput.percent"),
    value: "percent",
    formatter: (allowNull: boolean, precision: number, value: string): string =>
      isEmpty(value) ? (allowNull ? "" : "0") : `${toBig(value).toFixed(precision)}%`,
    parser: (value?: string) => (isEmpty(value) ? "" : Number(value) / 100),
  },
] as const;

const thousandsSeparatorFormatter = (value: string | number): string => {
  // https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group
  // value?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") ?? "0";
  // safari does not support backward search, so divide the integer part by the decimal point and add it
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
const numberParser = (value: string) => value.replace(/[^\d.-]/g, ""); // keep only numbers, decimal points, minus signs

const valueInfoMap = _.fromPairs(FormatterOptions.map((option) => [option.value, option]));

type ValidationParams = {
  value: { value: string };
  allowNull: boolean;
  required: boolean;
  min?: number;
  max?: number;
  customRule: string;
};
const validate = (
  props: ValidationParams
): {
  validateStatus: "success" | "warning" | "error" | "";
  help?: string;
} => {
  if (props.customRule) {
    return { validateStatus: "error", help: props.customRule };
  }
  if (props.allowNull && props.required && isEmpty(props.value.value)) {
    return { validateStatus: "error", help: trans("prop.required") };
  }
  if (!numberParser(props.value.value)) {
    return { validateStatus: "" };
  }

  const value = toBig(props.value.value);
  if (props.max !== undefined && value.gt(props.max)) {
    return {
      validateStatus: "error",
      help: trans("validationDesc.maxValue", {
        value: value.toString(),
        max: props.max,
      }),
    };
  }
  if (props.min !== undefined && value.lt(props.min)) {
    return {
      validateStatus: "error",
      help: trans("validationDesc.minValue", {
        value: value.toString(),
        min: props.min,
      }),
    };
  }
  return { validateStatus: "" };
};

const UndefinedNumberControl = codeControl<number | undefined>((value: any) => {
  if (typeof value === "number") {
    return value;
  }
  const result = Number(value);
  return !value || isNaN(result) ? undefined : result;
});

const childrenMap = {
  value: stringExposingStateControl("value"), // It is more convenient for string to handle various states, save the original input here
  placeholder: StringControl,
  disabled: BoolCodeControl,
  readOnly: BoolControl,
  label: LabelControl,
  formatter: dropdownControl(FormatterOptions, "standard"),
  step: withDefault(NumberControl, 1),
  controls: BoolControl.DEFAULT_TRUE, // Whether to display the increase or decrease button
  precision: RangeControl.closed(0, 20, 0),
  thousandsSeparator: BoolControl.DEFAULT_TRUE, // Whether to display the thousand separator
  allowNull: BoolControl,
  onEvent: InputEventHandlerControl,
  viewRef: RefControl,
  style: styleControl(InputLikeStyle),

  // validation
  required: BoolControl,
  min: UndefinedNumberControl,
  max: UndefinedNumberControl,
  customRule: CustomRuleControl,

  ...formDataChildren,
};

const CustomInputNumber = (props: RecordConstructorToView<typeof childrenMap>) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [editing, setEditing] = useState(false);

  const formatterFn = (initValue: string) => {
    const value = valueInfoMap[props.formatter].formatter(
      props.allowNull,
      props.precision,
      initValue
    );
    return props.thousandsSeparator ? thousandsSeparatorFormatter(value) : value;
  };

  return (
    <InputNumber
      ref={(input) => {
        props.viewRef(input);
        ref.current = input;
      }}
      value={editing ? props.value.value : formatterFn(numberParser(props.value.value))}
      controls={props.controls}
      step={props.step}
      disabled={props.disabled}
      readOnly={props.readOnly}
      placeholder={props.placeholder}
      stringMode={true}
      precision={props.precision}
      $style={props.style}
      onPressEnter={() => props.onEvent("submit")}
      onChangeCapture={(e: any) => {
        // save full input if triggered here
        let value = e.target.value?.toString() ?? "";
        value = value.replace("。", "."); // replace Chinese period
        props.value.onChange(value);
      }}
      onStep={(_, info) => {
        // since percentage mode needs to be handled manually
        const { type } = info;
        let offset = Number(info.offset);
        if (type === "down") {
          offset = Number(offset) * -1;
        }
        const initValue = toBig(props.value.value).plus(offset);
        const value = formatterFn(initValue.toString()); // direct format after step
        props.value.onChange(value);
      }}
      onChange={() => props.onEvent("change")}
      onFocus={() => {
        setEditing(true);
        props.onEvent("focus");
      }}
      onBlur={() => {
        setEditing(false);
        props.onEvent("blur");
      }}
      onKeyPress={(event) => {
        const value = props.value.value;
        const cursor = ref.current?.selectionStart;
        if (/\d/.test(event.key)) {
          return;
        }
        if (cursor === 0 && event.key === "-" && !/-/.test(value)) {
          return;
        }
        if (cursor !== 0 && props.thousandsSeparator && event.key === ",") {
          return;
        }
        if (
          cursor !== 0 &&
          props.precision > 0 &&
          (event.key === "." || event.key === "。") &&
          !/[.]/.test(value)
        ) {
          return;
        }
        event.preventDefault();
      }}
    />
  );
};

const NumberInputTmpComp = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    return props.label({
      required: props.required,
      children: <CustomInputNumber {...props} />,
      style: props.style,
      ...validate(props),
    });
  })
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.value.propertyView({ label: trans("prop.defaultValue") })}
          {placeholderPropertyView(children)}
          {children.formatter.propertyView({ label: trans("numberInput.formatter") })}
          {children.precision.propertyView({ label: trans("numberInput.precision") })}
          {children.allowNull.propertyView({ label: trans("numberInput.allowNull") })}
          {children.thousandsSeparator.propertyView({
            label: trans("numberInput.thousandsSeparator"),
          })}
          {children.controls.propertyView({ label: trans("numberInput.controls") })}
        </Section>

        <FormDataPropertyView {...children} />

        {children.label.getPropertyView()}

        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {disabledPropertyView(children)}
        </Section>

        <Section name={sectionNames.advanced}>
          {children.step.propertyView({ label: trans("numberInput.step") })}
          {readOnlyPropertyView(children)}
        </Section>

        <Section name={sectionNames.validation}>
          {requiredPropertyView(children)}
          {children.min.propertyView({ label: trans("prop.minimum") })}
          {children.max.propertyView({ label: trans("prop.maximum") })}
          {children.customRule.propertyView({})}
        </Section>

        <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

const NumberInputTmp2Comp = withMethodExposing(NumberInputTmpComp, MethodConfigFocus);

export const NumberInputComp = withExposingConfigs(NumberInputTmp2Comp, [
  depsConfig({
    name: "value",
    desc: trans("export.inputValueDesc"),
    depKeys: ["value", "allowNull", "formatter"],
    func: (input) => {
      const value = input.value;
      const num = Number(valueInfoMap[input.formatter].parser(numberParser(value)));
      if (isEmpty(value) || isNaN(num)) {
        return input.allowNull ? null : 0;
      }
      return num;
    },
  }),
  NameConfigPlaceHolder,
  NameConfigRequired,
  depsConfig({
    name: "invalid",
    desc: trans("export.invalidDesc"),
    depKeys: ["value", "required", "min", "max", "allowNull", "customRule"],
    func: (input) =>
      validate({
        ...input,
        value: { value: input.value },
      }).validateStatus !== "",
  }),
  ...CommonNameConfig,
]);
