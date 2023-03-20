import { BoolControl } from "comps/controls/boolControl";
import {
  BoolCodeControl,
  NumberControl,
  RangeControl,
  RegexControl,
  StringControl,
} from "comps/controls/codeControl";
import { language, trans } from "i18n";
import { Comp } from "openblocks-core";
import { ReactNode } from "react";

export function isCompWithPropertyView<C extends Comp<any> = Comp<any>>(
  comp: C
): comp is C & { propertyView: (params: any) => ReactNode } {
  return "propertyView" in comp && typeof (comp as any)["propertyView"] === "function";
}

export const hiddenPropertyView = (children: { hidden: InstanceType<typeof BoolCodeControl> }) =>
  children.hidden.propertyView({ label: trans("prop.hide") });

export const loadingPropertyView = (children: { loading: InstanceType<typeof BoolCodeControl> }) =>
  children.loading.propertyView({ label: trans("prop.loading") });

export const disabledPropertyView = (children: {
  disabled: InstanceType<typeof BoolCodeControl | typeof BoolControl>;
}) => children.disabled.propertyView({ label: trans("prop.disabled") });

export const placeholderPropertyView = (children: {
  placeholder: InstanceType<typeof StringControl>;
}) => children.placeholder.propertyView({ label: trans("prop.placeholder") });

export const allowClearPropertyView = (children: {
  allowClear: InstanceType<typeof BoolControl>;
}) => children.allowClear.propertyView({ label: trans("prop.showClear") });

export const showSearchPropertyView = (children: {
  showSearch: InstanceType<typeof BoolControl>;
}) => children.showSearch.propertyView({ label: trans("prop.showSearch") });

export const requiredPropertyView = (children: { required: InstanceType<typeof BoolControl> }) =>
  children.required.propertyView({ label: trans("prop.required") });

export const readOnlyPropertyView = (children: { readOnly: InstanceType<typeof BoolControl> }) =>
  children.readOnly.propertyView({
    label: trans("prop.readOnly"),
    tooltip: trans("prop.readOnlyTooltip"),
  });

export const regexPropertyView = (children: { regex: InstanceType<typeof RegexControl> }) =>
  children.regex.propertyView({ label: trans("prop.regex"), placeholder: ".*" });

export const minLengthPropertyView = (children: {
  minLength: InstanceType<typeof NumberControl>;
}) => children.minLength.propertyView({ label: trans("prop.minLength") });

export const maxLengthPropertyView = (children: {
  maxLength: InstanceType<typeof NumberControl>;
}) => children.maxLength.propertyView({ label: trans("prop.maxLength") });

export const hourStepPropertyView = (children: {
  hourStep: InstanceType<ReturnType<typeof RangeControl["closed"]>>;
}) => children.hourStep.propertyView({ label: trans("prop.hourStep") });

export const minuteStepPropertyView = (children: {
  minuteStep: InstanceType<ReturnType<typeof RangeControl["closed"]>>;
}) => children.minuteStep.propertyView({ label: trans("prop.minuteStep") });

export const SecondStepPropertyView = (children: {
  secondStep: InstanceType<ReturnType<typeof RangeControl["closed"]>>;
}) => children.secondStep.propertyView({ label: trans("prop.secondStep") });

export const minDatePropertyView = (children: { minDate: InstanceType<typeof StringControl> }) =>
  children.minDate.propertyView({
    label: trans("prop.minDate"),
    tooltip: trans("date.formatTip"),
  });

export const maxDatePropertyView = (children: { maxDate: InstanceType<typeof StringControl> }) =>
  children.maxDate.propertyView({
    label: trans("prop.maxDate"),
    tooltip: trans("date.formatTip"),
  });

export const minTimePropertyView = (children: { minTime: InstanceType<typeof StringControl> }) =>
  children.minTime.propertyView({
    label: trans("prop.minTime"),
    tooltip: trans("time.formatTip"),
  });

export const maxTimePropertyView = (children: { maxTime: InstanceType<typeof StringControl> }) =>
  children.maxTime.propertyView({
    label: trans("prop.maxTime"),
    tooltip: trans("time.formatTip"),
  });

export const showLabelPropertyView = (children: { showLabel: InstanceType<typeof BoolControl> }) =>
  children.showLabel.propertyView({ label: trans("prop.showLabel") });

export const formatPropertyView = (params: {
  children: { format: InstanceType<typeof StringControl> };
  placeholder?: string;
}) =>
  params.children.format.propertyView({
    label: trans("date.format"),
    placeholder: params.placeholder,
    tooltip: (
      <>
        {trans("date.reference")} &nbsp;
        <a
          href={`${
            language === "zh" ? "http://momentjs.cn" : "http://momentjs.com"
          }/docs/#/displaying/format/`}
          target={"_blank"}
          rel="noreferrer"
        >
          momentjs format
        </a>
      </>
    ),
  }); // FIXME: need verification
