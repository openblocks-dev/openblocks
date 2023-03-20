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
import { numberExposingStateControl } from "comps/controls/codeStateControl";
import NP from "number-precision";

import {
  CommonNameConfig,
  depsConfig,
  NameConfigPlaceHolder,
  NameConfigRequired,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { Section, sectionNames, ValueFromOption } from "openblocks-design";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { RecordConstructorToView } from "openblocks-core";
import { InputEventHandlerControl } from "../../controls/eventHandlerControl";
import { UICompBuilder, withDefault } from "../../generators";
import { formDataChildren, FormDataPropertyView } from "../formComp/formDataConstants";
import { withMethodExposing, refMethods } from "../../generators/withMethodExposing";
import { RefControl } from "../../controls/refControl";
import { styleControl } from "comps/controls/styleControl";
import { InputLikeStyle, InputLikeStyleType } from "comps/controls/styleControlConstants";
import {
  disabledPropertyView,
  hiddenPropertyView,
  placeholderPropertyView,
  readOnlyPropertyView,
  requiredPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { IconControl } from "comps/controls/iconControl";
import { hasIcon } from "comps/utils";
import {
  blurMethod,
  clickMethod,
  focusWithOptions,
  selectMethod,
  setRangeTextMethod,
  setSelectionRangeMethod,
} from "comps/utils/methodUtils";

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

const FormatterOptions = [
  {
    label: trans("numberInput.standard"),
    value: "standard",
  },
  {
    label: trans("numberInput.percent"),
    value: "percent",
  },
] as const;

type Formatter = ValueFromOption<typeof FormatterOptions>;

function parseNumber(value: string, allowNull?: boolean): number {
  // only keep numbers, decimal points, minus signs
  const v = value.replace(/[^\d.-]/g, "");
  if (v) {
    const num = Number(v);
    if (isFinite(num)) {
      return num;
    }
  }
  return allowNull ? Number.NaN : 0;
}

function addThousandsSeparator(value: string) {
  // https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group
  // value?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") ?? "0";
  // safari does not support backward search, so divide the integer part by the decimal point and add it
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function format(
  value: number,
  allowNull: boolean,
  formatter: Formatter,
  precision: number,
  thousandsSeparator: boolean
) {
  const num = value;
  if (isNaN(num)) {
    return "";
  }
  let v = num.toFixed(precision);
  if (thousandsSeparator) {
    v = addThousandsSeparator(v);
  }
  switch (formatter) {
    case "standard":
      return v;
    case "percent":
      return v + "%";
  }
}

function toNumberValue(value: number, allowNull: boolean, formatter: Formatter) {
  const num = value;
  if (isNaN(num)) {
    return allowNull ? null : 0;
  }
  switch (formatter) {
    case "standard":
      return num;
    case "percent":
      return NP.divide(num, 100);
  }
}

type ValidationParams = {
  value: { value: number };
  allowNull: boolean;
  required: boolean;
  min?: number;
  max?: number;
  customRule: string;
};

function validate(props: ValidationParams): {
  validateStatus: "success" | "warning" | "error" | "";
  help?: string;
} {
  if (props.customRule) {
    return { validateStatus: "error", help: props.customRule };
  }
  const value = props.value.value;
  if (isNaN(value)) {
    if (props.required) {
      return { validateStatus: "error", help: trans("prop.required") };
    }
    return { validateStatus: "" };
  }
  if (props.max !== undefined && value > props.max) {
    return {
      validateStatus: "error",
      help: trans("validationDesc.maxValue", { value, max: props.max }),
    };
  }
  if (props.min !== undefined && value < props.min) {
    return {
      validateStatus: "error",
      help: trans("validationDesc.minValue", { value, min: props.min }),
    };
  }
  return { validateStatus: "" };
}

const UndefinedNumberControl = codeControl<number | undefined>((value: any) => {
  if (typeof value === "number") {
    return value;
  }
  const result = Number(value);
  return !value || isNaN(result) ? undefined : result;
});

const childrenMap = {
  value: numberExposingStateControl("value"), // It is more convenient for string to handle various states, save raw input here
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
  viewRef: RefControl<HTMLInputElement>,
  style: styleControl(InputLikeStyle),
  prefixIcon: IconControl,

  // validation
  required: BoolControl,
  min: UndefinedNumberControl,
  max: UndefinedNumberControl,
  customRule: CustomRuleControl,

  ...formDataChildren,
};

const CustomInputNumber = (props: RecordConstructorToView<typeof childrenMap>) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const formatFn = (value: number) =>
    format(value, props.allowNull, props.formatter, props.precision, props.thousandsSeparator);

  const [tmpValue, setTmpValue] = useState(formatFn(props.value.value));

  const handleFinish = () => {
    const oldValue = props.value.value;
    const newValue = parseNumber(tmpValue, props.allowNull);
    props.value.onChange(newValue);
    oldValue !== newValue && props.onEvent("change");
  };

  useEffect(() => {
    setTmpValue(formatFn(props.value.value));
  }, [
    props.value.value,
    props.allowNull,
    props.formatter,
    props.precision,
    props.thousandsSeparator,
  ]);

  return (
    <InputNumber
      ref={(input) => {
        props.viewRef(input);
        ref.current = input;
      }}
      value={tmpValue}
      controls={props.controls}
      step={props.step}
      disabled={props.disabled}
      readOnly={props.readOnly}
      placeholder={props.placeholder}
      stringMode={true}
      precision={props.precision}
      $style={props.style}
      prefix={hasIcon(props.prefixIcon) && props.prefixIcon}
      onPressEnter={() => {
        handleFinish();
        props.onEvent("submit");
      }}
      onChangeCapture={(e: any) => {
        // eslint-disable-next-line only-ascii/only-ascii
        setTmpValue((e.target.value?.toString() ?? "").replace("。", "."));
      }}
      onStep={(_, info) => {
        // since percentage mode needs to be handled manually
        const v = NP.plus(
          parseNumber(tmpValue),
          NP.times(info.type === "up" ? 1 : -1, Number(info.offset))
        );
        props.value.onChange(v);
        props.onEvent("change");
      }}
      onFocus={() => {
        props.onEvent("focus");
      }}
      onBlur={() => {
        handleFinish();
        props.onEvent("blur");
      }}
      onKeyPress={(event) => {
        const value = tmpValue;
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
          // eslint-disable-next-line only-ascii/only-ascii
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
          {children.prefixIcon.propertyView({ label: trans("button.prefixIcon") })}
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

const NumberInputTmp2Comp = withMethodExposing(
  NumberInputTmpComp,
  refMethods([
    focusWithOptions,
    blurMethod,
    clickMethod,
    selectMethod,
    setSelectionRangeMethod,
    setRangeTextMethod,
  ])
);

export const NumberInputComp = withExposingConfigs(NumberInputTmp2Comp, [
  depsConfig({
    name: "value",
    desc: trans("export.inputValueDesc"),
    depKeys: ["value", "allowNull", "formatter"],
    func: (input) => toNumberValue(input.value, input.allowNull, input.formatter),
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
