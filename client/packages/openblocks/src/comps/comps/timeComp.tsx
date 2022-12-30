import { TimePicker } from "antd";
import _ from "lodash";
import moment from "moment";
import { Section, sectionNames } from "openblocks-design";
import { RecordConstructorToComp, RecordConstructorToView } from "openblocks-core";
import {
  BoolCodeControl,
  CustomRuleControl,
  RangeControl,
  StringControl,
} from "../controls/codeControl";
import { BoolControl } from "../controls/boolControl";
import {
  blurEvent,
  changeEvent,
  eventHandlerControl,
  focusEvent,
} from "../controls/eventHandlerControl";
import { stringExposingStateControl } from "../controls/codeStateControl";
import { LabelControl } from "../controls/labelControl";
import { UICompBuilder } from "../generators";
import {
  CommonNameConfig,
  depsConfig,
  NameConfig,
  withExposingConfigs,
} from "../generators/withExposing";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";
import { styleControl } from "comps/controls/styleControl";
import { DateTimeStyle, DateTimeStyleType } from "comps/controls/styleControlConstants";
import styled from "styled-components";
import { getStyle } from "./dateComp";
import { withMethodExposing } from "../generators/withMethodExposing";
import {
  hiddenPropertyView,
  disabledPropertyView,
  requiredPropertyView,
  hourStepPropertyView,
  minuteStepPropertyView,
  SecondStepPropertyView,
  minTimePropertyView,
  maxTimePropertyView,
  formatPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { TIME_FORMAT, TimeParser } from "util/dateTimeUtils";
import { useContext } from "react";
import { EditorContext } from "comps/editorState";
import { checkIsMobile } from "util/commonUtils";

const EventOptions = [changeEvent, focusEvent, blurEvent] as const;

const validationChildren = {
  required: BoolControl,
  minTime: StringControl,
  maxTime: StringControl,
  customRule: CustomRuleControl,
};

const commonChildren = {
  label: LabelControl,
  format: StringControl,
  disabled: BoolCodeControl,
  onEvent: eventHandlerControl(EventOptions),
  showTime: BoolControl,
  use12Hours: BoolControl,
  hourStep: RangeControl.closed(1, 24, 1),
  minuteStep: RangeControl.closed(1, 60, 1),
  secondStep: RangeControl.closed(1, 60, 1),
  style: styleControl(DateTimeStyle),
  ...validationChildren,
};

const timePickerComps = (props: RecordConstructorToView<typeof commonChildren>) =>
  _.pick(props, "format", "use12Hours", "hourStep", "minuteStep", "secondStep");

const commonBasicSection = (children: RecordConstructorToComp<typeof commonChildren>) => (
  <>
    {formatPropertyView({ children })}
    {children.use12Hours.propertyView({ label: trans("prop.use12Hours") })}
  </>
);

const commonAdvanceSection = (children: RecordConstructorToComp<typeof commonChildren>) => (
  <>
    {hourStepPropertyView(children)}
    {minuteStepPropertyView(children)}
    {SecondStepPropertyView(children)}
  </>
);

function validate(
  props: RecordConstructorToView<typeof validationChildren> & {
    value: { value: string };
  }
): {
  validateStatus: "success" | "warning" | "error";
  help?: string;
} {
  if (props.customRule) {
    return { validateStatus: "error", help: props.customRule };
  }

  const current = moment(props.value.value, TIME_FORMAT);
  const maxTime = moment(props.maxTime, TIME_FORMAT);
  const minTime = moment(props.minTime, TIME_FORMAT);
  if (props.required && !current.isValid()) {
    return { validateStatus: "error", help: trans("prop.required") };
  }
  if (maxTime.isValid() && current.isAfter(maxTime)) {
    return {
      validateStatus: "error",
      help: trans("validationDesc.maxTime", {
        time: props.value.value,
        maxTime: maxTime.format(TIME_FORMAT),
      }),
    };
  }
  if (minTime.isValid() && current.isBefore(minTime)) {
    return {
      validateStatus: "error",
      help: trans("validationDesc.minTime", {
        time: props.value.value,
        minTime: minTime.format(TIME_FORMAT),
      }),
    };
  }
  return { validateStatus: "success" };
}

const TimePickerStyled = styled(TimePicker)<{ $style: DateTimeStyleType }>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const RangePickerStyled = styled(TimePicker.RangePicker)<{ $style: DateTimeStyleType }>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

export const timePickerControl = (function () {
  const childrenMap = {
    value: stringExposingStateControl("value"),
    ...commonChildren,
    ...formDataChildren,
  };

  return new UICompBuilder(childrenMap, (props, dispatch) => {
    const editorState = useContext(EditorContext);
    const children = (
      <>
        <TimePickerStyled
          $style={props.style}
          disabled={props.disabled}
          value={(() => {
            const time = moment(props.value.value, TimeParser);
            return time.isValid() ? time : null;
          })()}
          {...timePickerComps(props)}
          onChange={(time) => {
            const mom = time ? moment(time) : null;
            props.value.onChange(mom && mom.isValid() ? mom.format(TIME_FORMAT) : "");
            props.onEvent("change");
          }}
          onFocus={() => props.onEvent("focus")}
          onBlur={() => props.onEvent("blur")}
          inputReadOnly={checkIsMobile(editorState?.getAppSettings().maxWidth)}
        />
      </>
    );

    return props.label({
      required: props.required,
      style: props.style,
      children: children,
      ...validate(props),
    });
  })
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.value.propertyView({ label: trans("prop.defaultValue") })}
          {commonBasicSection(children)}
        </Section>
        <FormDataPropertyView {...children} />
        {children.label.getPropertyView()}

        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {disabledPropertyView(children)}
        </Section>

        <Section name={sectionNames.validation}>
          {requiredPropertyView(children)}
          {minTimePropertyView(children)}
          {maxTimePropertyView(children)}
          {children.customRule.propertyView({})}
        </Section>

        <Section name={sectionNames.advanced}>{commonAdvanceSection(children)}</Section>

        <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

export const timeRangeControl = (function () {
  const childrenMap = {
    start: stringExposingStateControl("start"),
    end: stringExposingStateControl("end"),
    ...commonChildren,
  };

  return new UICompBuilder(childrenMap, (props, dispatch) => {
    const editorState = useContext(EditorContext);
    const children = (
      <>
        <RangePickerStyled
          $style={props.style}
          disabled={props.disabled}
          value={(() => {
            const start = moment(props.start.value, TimeParser);
            const end = moment(props.end.value, TimeParser);
            return [start.isValid() ? start : null, end.isValid() ? end : null];
          })()}
          {...timePickerComps(props)}
          order={false}
          onChange={(time) => {
            const start = time && time[0] ? moment(time[0]) : null;
            const end = time && time[1] ? moment(time[1]) : null;
            props.start.onChange(start && start.isValid() ? start.format(TIME_FORMAT) : "");
            props.end.onChange(end && end.isValid() ? end.format(TIME_FORMAT) : "");
            props.onEvent("change");
          }}
          onFocus={() => props.onEvent("focus")}
          onBlur={() => props.onEvent("blur")}
          inputReadOnly={checkIsMobile(editorState?.getAppSettings().maxWidth)}
        />
      </>
    );

    const startResult = validate({ ...props, value: props.start });
    const endResult = validate({ ...props, value: props.end });

    return props.label({
      required: props.required,
      style: props.style,
      children: children,
      ...(startResult.validateStatus !== "success"
        ? startResult
        : endResult.validateStatus !== "success"
        ? endResult
        : startResult),
    });
  })
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.start.propertyView({
            label: trans("time.start"),
          })}
          {children.end.propertyView({
            label: trans("time.end"),
          })}
          {commonBasicSection(children)}
        </Section>

        {children.label.getPropertyView()}

        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {disabledPropertyView(children)}
        </Section>

        <Section name={sectionNames.validation}>
          {requiredPropertyView(children)}
          {minTimePropertyView(children)}
          {maxTimePropertyView(children)}
          {children.customRule.propertyView({})}
        </Section>

        <Section name={sectionNames.advanced}>{commonAdvanceSection(children)}</Section>

        <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

export const TimePickerComp = withExposingConfigs(timePickerControl, [
  new NameConfig("value", trans("export.timePickerValueDesc")),
  depsConfig({
    name: "formattedValue",
    desc: trans("export.timePickerFormattedValueDesc"),
    depKeys: ["value", "format"],
    func: (input) => {
      const mom = moment(input.value, TimeParser);
      return mom.isValid() ? mom.format(input.format) : "";
    },
  }),
  depsConfig({
    name: "invalid",
    desc: trans("export.invalidDesc"),
    depKeys: ["value", "required", "minTime", "maxTime", "customRule"],
    func: (input) =>
      validate({
        ...input,
        value: { value: input.value },
      } as any).validateStatus !== "success",
  }),
  ...CommonNameConfig,
]);

export let TimeRangeComp = withExposingConfigs(timeRangeControl, [
  new NameConfig("start", trans("export.timeRangeStartDesc")),
  new NameConfig("end", trans("export.timeRangeEndDesc")),
  depsConfig({
    name: "formattedValue",
    desc: trans("export.timeRangeFormattedValueDesc"),
    depKeys: ["start", "end", "format"],
    func: (input) => {
      const start = moment(input.start, TimeParser);
      const end = moment(input.end, TimeParser);
      return [
        start.isValid() && start.format(input.format),
        end.isValid() && end.format(input.format),
      ]
        .filter((item) => item)
        .join(" - ");
    },
  }),
  depsConfig({
    name: "formattedStartValue",
    desc: trans("export.timeRangeFormattedStartValueDesc"),
    depKeys: ["start", "format"],
    func: (input) => {
      const start = moment(input.start, TimeParser);
      return start.isValid() && start.format(input.format);
    },
  }),
  depsConfig({
    name: "formattedEndValue",
    desc: trans("export.timeRangeFormattedEndValueDesc"),
    depKeys: ["end", "format"],
    func: (input) => {
      const end = moment(input.end, TimeParser);
      return end.isValid() && end.format(input.format);
    },
  }),
  depsConfig({
    name: "invalid",
    desc: trans("export.invalidDesc"),
    depKeys: ["start", "end", "required", "minTime", "maxTime", "customRule"],
    func: (input) =>
      validate({
        ...input,
        value: { value: input.start },
      }).validateStatus !== "success" ||
      validate({
        ...input,
        value: { value: input.end },
      }).validateStatus !== "success",
  }),
  ...CommonNameConfig,
]);

TimeRangeComp = withMethodExposing(TimeRangeComp, [
  {
    method: {
      name: "clearAll",
      description: trans("date.clearAllDesc"),
      params: [],
    },
    execute: (comp) => {
      comp.children.start.getView().onChange("");
      comp.children.end.getView().onChange("");
    },
  },
  {
    method: {
      name: "resetAll",
      description: trans("date.resetAllDesc"),
      params: [],
    },
    execute: (comp) => {
      comp.children.start.getView().reset();
      comp.children.end.getView().reset();
    },
  },
]);
