import { DatePicker } from "antd";
import _, { noop, range } from "lodash";
import moment, { Moment } from "moment";
import { isDarkColor, lightenColor, Section, sectionNames } from "openblocks-design";
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
import { LabelControl } from "../controls/labelControl";
import { stringExposingStateControl } from "../controls/codeStateControl";
import { UICompBuilder, withDefault } from "../generators";
import { CommonNameConfig, depsConfig, withExposingConfigs } from "../generators/withExposing";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";
import { styleControl } from "comps/controls/styleControl";
import { DateTimeStyle, DateTimeStyleType } from "comps/controls/styleControlConstants";
import styled, { css } from "styled-components";
import { withMethodExposing } from "../generators/withMethodExposing";
import {
  disabledPropertyView,
  formatPropertyView,
  hiddenPropertyView,
  hourStepPropertyView,
  maxDatePropertyView,
  maxTimePropertyView,
  minDatePropertyView,
  minTimePropertyView,
  minuteStepPropertyView,
  requiredPropertyView,
  SecondStepPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DateParser,
  PickerMode,
  TimeParser,
} from "util/dateTimeUtils";
import { checkIsMobile } from "util/commonUtils";
import { useContext } from "react";
import { EditorContext } from "comps/editorState";
import { IconControl } from "comps/controls/iconControl";
import { hasIcon } from "comps/utils";

const EventOptions = [changeEvent, focusEvent, blurEvent] as const;

const validationChildren = {
  required: BoolControl,
  minDate: StringControl,
  maxDate: StringControl,
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
  suffixIcon: withDefault(IconControl, "/icon:regular/calendar"),
  ...validationChildren,
};
type CommonChildrenType = RecordConstructorToComp<typeof commonChildren>;

const datePickerProps = (props: RecordConstructorToView<typeof commonChildren>) =>
  _.pick(props, "format", "showTime", "use12Hours", "hourStep", "minuteStep", "secondStep");

const timeFields = (children: CommonChildrenType, isDate: boolean = true) => {
  if (isDate && children.showTime.getView()) {
    return (
      <>
        {children.showTime.propertyView({ label: trans("date.showTime") })}
        {children.use12Hours.propertyView({ label: trans("prop.use12Hours") })}
      </>
    );
  } else if (isDate) {
    return <> {children.showTime.propertyView({ label: trans("date.showTime") })}</>;
  }
};

const commonAdvanceSection = (children: CommonChildrenType, isDate: boolean = true) => {
  if (isDate && children.showTime.getView()) {
    return (
      <Section name={sectionNames.advanced}>
        {hourStepPropertyView(children)}
        {minuteStepPropertyView(children)}
        {SecondStepPropertyView(children)}
      </Section>
    );
  }
};

const dateValidationFields = (children: CommonChildrenType, dateType: PickerMode = "date") => {
  if (dateType === "date") {
    return (
      <>
        {minDatePropertyView(children)}
        {maxDatePropertyView(children)}
      </>
    );
  }
};

const timeValidationFields = (children: CommonChildrenType, dateType: PickerMode = "date") => {
  if (dateType === "date" && children.showTime.getView()) {
    return (
      <>
        {minTimePropertyView(children)}
        {maxTimePropertyView(children)}
      </>
    );
  }
};

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

  const currentDateTime = moment(props.value.value, DATE_TIME_FORMAT);

  if (props.required && !currentDateTime.isValid()) {
    return { validateStatus: "error", help: trans("prop.required") };
  }

  return { validateStatus: "success" };
}

const disabledDate = (current: Moment, min: string, max: string) => {
  const maxDate = moment(max, DateParser);
  const minDate = moment(min, DateParser);
  return (
    current &&
    current.isValid() &&
    (current.isAfter(maxDate, "date") || current.isBefore(minDate, "date"))
  );
};

export const disabledTime = (min: string, max: string) => {
  const maxTime = moment(max, TimeParser);
  const minTime = moment(min, TimeParser);
  return {
    disabledHours: () => {
      let disabledHours: number[] = [];
      if (minTime.isValid()) {
        disabledHours = [...disabledHours, ...range(0, minTime.hours())];
      }
      if (maxTime.isValid()) {
        disabledHours = [...disabledHours, ...range(maxTime.hours() + 1, 24)];
      }
      return disabledHours;
    },
    disabledMinutes: (hour: number) => {
      if (minTime.isValid() && minTime.hour() === hour) {
        return range(0, minTime.minutes());
      }
      if (maxTime.isValid() && maxTime.hour() === hour) {
        return range(maxTime.minutes() + 1, 60);
      }
      return [];
    },
    disabledSeconds: (hour: number, minute: number) => {
      if (minTime.isValid() && minTime.hour() === hour && minTime.minute() === minute) {
        return range(0, minTime.seconds());
      }
      if (maxTime.isValid() && maxTime.hours() === hour && maxTime.minute() === minute) {
        return range(maxTime.seconds() + 1, 60);
      }
      return [];
    },
  };
};

const handleChange = (
  time: string,
  onChange: (value: string) => Promise<unknown>,
  onEvent: (event: string) => void
) => {
  onChange(time).then(() => onEvent("change"));
};

export const getStyle = (style: DateTimeStyleType) => {
  return css`
    border-radius: ${style.radius};

    &:not(.ant-picker-disabled) {
      border-color: ${style.border};
      background-color: ${style.background};

      input {
        color: ${style.text};

        &::-webkit-input-placeholder {
          color: ${style.text};
          opacity: 0.25;
        }
      }

      &.ant-picker-focused,
      &:hover {
        border-color: ${style.accent};
      }

      .ant-picker-suffix,
      .ant-picker-clear,
      .ant-picker-separator {
        background-color: ${style.background};
        color: ${style.text === "#222222"
          ? "#8B8FA3"
          : isDarkColor(style.text)
          ? lightenColor(style.text, 0.2)
          : style.text};
      }

      .ant-picker-clear:hover {
        color: ${style.text === "#222222"
          ? "#8B8FA3"
          : isDarkColor(style.text)
          ? lightenColor(style.text, 0.1)
          : style.text};
      }

      .ant-picker-active-bar {
        background-color: ${style.accent};
      }
    }
  `;
};

const DatePickerStyled = styled(DatePicker)<{ $style: DateTimeStyleType }>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const RangePickerStyled = styled(DatePicker.RangePicker)<{ $style: DateTimeStyleType }>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

export const datePickerControl = (function () {
  const dateTypeOptions = [
    { label: trans("date.date"), value: "date" },
    { label: trans("date.week"), value: "week" },
    { label: trans("date.month"), value: "month" },
    { label: trans("date.quarter"), value: "quarter" },
    { label: trans("date.year"), value: "year" },
  ] as const;

  const childrenMap = {
    value: stringExposingStateControl("value"),
    // dateType: dropdownControl(dateTypeOptions, "date"), todo: temp remove
    ...commonChildren,
    ...formDataChildren,
  };

  return new UICompBuilder(childrenMap, (props) => {
    const editorState = useContext(EditorContext);

    const children = (
      <>
        <DatePickerStyled
          disabledDate={(current) => disabledDate(current, props.minDate, props.maxDate)}
          disabledTime={() => disabledTime(props.minTime, props.maxTime)}
          $style={props.style}
          disabled={props.disabled}
          {...datePickerProps(props)}
          value={(() => {
            const time = moment(props.value.value, DateParser);
            return time.isValid() ? time : undefined;
          })()}
          picker={"date"}
          onChange={(time) => {
            handleChange(
              time && time.isValid()
                ? time.format(props.showTime ? DATE_TIME_FORMAT : DATE_FORMAT)
                : "",
              props.value.onChange,
              props.onEvent
            );
          }}
          onPanelChange={() => {
            handleChange("", props.value.onChange, noop);
          }}
          onFocus={() => props.onEvent("focus")}
          onBlur={() => props.onEvent("blur")}
          inputReadOnly={checkIsMobile(editorState?.getAppSettings().maxWidth)}
          suffixIcon={hasIcon(props.suffixIcon) && props.suffixIcon}
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
          {children.value.propertyView({
            label: trans("prop.defaultValue"),
            placeholder: "2022-04-07 21:39:59",
            tooltip: trans("date.formatTip"),
          })}
          {formatPropertyView({ children })}
          {/*{children.dateType.propertyView({ label: "date type" })}*/}
          {/*{timeFields(children, children.dateType.value === "date")}*/}
          {timeFields(children)}
        </Section>

        <FormDataPropertyView {...children} />

        {children.label.getPropertyView()}

        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {disabledPropertyView(children)}
        </Section>

        <Section name={sectionNames.validation}>
          {requiredPropertyView(children)}
          {dateValidationFields(children)}
          {timeValidationFields(children)}
          {children.customRule.propertyView({})}
        </Section>

        {/*{commonAdvanceSection(children, children.dateType.value === "date")}*/}
        {commonAdvanceSection(children)}

        <Section name={sectionNames.layout}>
          {children.suffixIcon.propertyView({ label: trans("button.suffixIcon") })}
          {hiddenPropertyView(children)}
        </Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

export const dateRangeControl = (function () {
  const childrenMap = {
    start: stringExposingStateControl("start"),
    end: stringExposingStateControl("end"),
    ...commonChildren,
  };

  return new UICompBuilder(childrenMap, (props) => {
    const editorState = useContext(EditorContext);
    const children = (
      <>
        <RangePickerStyled
          $style={props.style}
          disabled={props.disabled}
          {...datePickerProps(props)}
          value={(() => {
            const start = moment(props.start.value, DateParser);
            const end = moment(props.end.value, DateParser);
            return [start.isValid() ? start : null, end.isValid() ? end : null];
          })()}
          disabledDate={(current) => disabledDate(current, props.minDate, props.maxDate)}
          disabledTime={() => disabledTime(props.minTime, props.maxTime)}
          onChange={(time) => {
            const start = time && time[0] ? moment(time[0]) : null;
            const end = time && time[1] ? moment(time[1]) : null;
            props.start.onChange(
              start && start.isValid()
                ? start.format(props.showTime ? DATE_TIME_FORMAT : DATE_FORMAT)
                : ""
            );
            props.end.onChange(
              end && end.isValid()
                ? end.format(props.showTime ? DATE_TIME_FORMAT : DATE_FORMAT)
                : ""
            );
            props.onEvent("change");
          }}
          onPanelChange={(_, mode) => {
            mode[0] !== "date" && handleChange("", props.start.onChange, noop);
            mode[1] !== "date" && handleChange("", props.end.onChange, noop);
          }}
          onFocus={() => props.onEvent("focus")}
          onBlur={() => props.onEvent("blur")}
          inputReadOnly={checkIsMobile(editorState?.getAppSettings().maxWidth)}
          suffixIcon={hasIcon(props.suffixIcon) && props.suffixIcon}
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
            label: trans("date.start"),
            placeholder: "2022-04-07 21:39:59",
            tooltip: trans("date.formatTip"),
          })}
          {children.end.propertyView({
            label: trans("date.end"),
            placeholder: "2022-04-07 21:39:59",
            tooltip: trans("date.formatTip"),
          })}
          {formatPropertyView({ children })}
          {timeFields(children)}
        </Section>

        {children.label.getPropertyView()}

        <Section name={sectionNames.interaction}>
          {children.onEvent.getPropertyView()}
          {disabledPropertyView(children)}
        </Section>

        <Section name={sectionNames.validation}>
          {requiredPropertyView(children)}
          {dateValidationFields(children)}
          {timeValidationFields(children)}
          {children.customRule.propertyView({})}
        </Section>

        {commonAdvanceSection(children)}

        <Section name={sectionNames.layout}>
          {children.suffixIcon.propertyView({ label: trans("button.suffixIcon") })}
          {hiddenPropertyView(children)}
        </Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

export const DatePickerComp = withExposingConfigs(datePickerControl, [
  depsConfig({
    name: "value",
    desc: trans("export.datePickerValueDesc"),
    depKeys: ["value", "showTime"],
    func: (input) => {
      const mom = moment(input.value, DateParser);
      return mom.isValid() ? mom.format(input.showTime ? DATE_TIME_FORMAT : DATE_FORMAT) : "";
    },
  }),
  depsConfig({
    name: "formattedValue",
    desc: trans("export.datePickerFormattedValueDesc"),
    depKeys: ["value", "format"],
    func: (input) => {
      const mom = moment(input.value, DateParser);
      return mom.isValid() ? mom.format(input.format) : "";
    },
  }),
  depsConfig({
    name: "timestamp",
    desc: trans("export.datePickerTimestampDesc"),
    depKeys: ["value"],
    func: (input) => {
      const mom = moment(input.value, DateParser);
      return mom.isValid() ? mom.unix() : "";
    },
  }),
  depsConfig({
    name: "invalid",
    desc: trans("export.invalidDesc"),
    depKeys: ["value", "required", "minTime", "maxTime", "minDate", "maxDate", "customRule"],
    func: (input) =>
      validate({
        ...input,
        value: { value: input.value },
      } as any).validateStatus !== "success",
  }),
  ...CommonNameConfig,
]);

export let DateRangeComp = withExposingConfigs(dateRangeControl, [
  depsConfig({
    name: "start",
    desc: trans("export.dateRangeStartDesc"),
    depKeys: ["start", "showTime"],
    func: (input) => {
      const mom = moment(input.start, DateParser);
      return mom.isValid() ? mom.format(input.showTime ? DATE_TIME_FORMAT : DATE_FORMAT) : "";
    },
  }),
  depsConfig({
    name: "end",
    desc: trans("export.dateRangeEndDesc"),
    depKeys: ["end", "showTime"],
    func: (input) => {
      const mom = moment(input.end, DateParser);
      return mom.isValid() ? mom.format(input.showTime ? DATE_TIME_FORMAT : DATE_FORMAT) : "";
    },
  }),
  depsConfig({
    name: "startTimestamp",
    desc: trans("export.dateRangeStartTimestampDesc"),
    depKeys: ["start"],
    func: (input) => {
      const mom = moment(input.start, DateParser);
      return mom.isValid() ? mom.unix() : "";
    },
  }),
  depsConfig({
    name: "endTimestamp",
    desc: trans("export.dateRangeEndTimestampDesc"),
    depKeys: ["end"],
    func: (input) => {
      const mom = moment(input.end, DateParser);
      return mom.isValid() ? mom.unix() : "";
    },
  }),
  depsConfig({
    name: "formattedValue",
    desc: trans("export.dateRangeFormattedValueDesc"),
    depKeys: ["start", "end", "format"],
    func: (input) => {
      const start = moment(input.start, DateParser);
      const end = moment(input.end, DateParser);
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
    desc: trans("export.dateRangeFormattedStartValueDesc"),
    depKeys: ["start", "format"],
    func: (input) => {
      const start = moment(input.start, DateParser);
      return start.isValid() && start.format(input.format);
    },
  }),
  depsConfig({
    name: "formattedEndValue",
    desc: trans("export.dateRangeFormattedEndValueDesc"),
    depKeys: ["end", "format"],
    func: (input) => {
      const end = moment(input.end, DateParser);
      return end.isValid() && end.format(input.format);
    },
  }),
  depsConfig({
    name: "invalid",
    desc: trans("export.invalidDesc"),
    depKeys: ["start", "end", "required", "minTime", "maxTime", "minDate", "maxDate", "customRule"],
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

DateRangeComp = withMethodExposing(DateRangeComp, [
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
