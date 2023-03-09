import { Picker } from "antd-mobile";
import { CanvasContainerID } from "constants/domLocators";
import type { TimeCompViewProps } from "./timeComp";
import moment from "moment";
import { TIME_12_FORMAT, TIME_FORMAT, TimeParser } from "util/dateTimeUtils";
import { range } from "lodash";
import styled from "styled-components";
import { DateTimeStyleType } from "comps/controls/styleControlConstants";
import { getMobileStyle } from "comps/comps/dateComp/dateCompUtil";
import { trans } from "i18n";
import type { TimeUIViewProps } from "comps/comps/dateComp/timeUIView";
import { TimeRangeUIViewProps } from "comps/comps/dateComp/timeRangeUIView";
import { SwapRightOutlined } from "@ant-design/icons";
import React from "react";

const HoursColumns = (step: number = 1) => [
  ...range(0, 24, step).map((v) => {
    const val = (v < 10 ? "0" : "") + v;
    return {
      label: val,
      value: val,
    };
  }),
];
const Hours12Columns = (step: number = 1) => [
  ...range(0, 12, step).map((v) => {
    const val = (v < 10 ? "0" : "") + v;
    return {
      label: val,
      value: val,
    };
  }),
];
const MinuteColumns = (step: number = 1) =>
  range(0, 60, step).map((v) => {
    const val = (v < 10 ? "0" : "") + v;
    return {
      label: val,
      value: val,
    };
  });
const AmPm = [
  {
    label: "AM",
    value: "am",
  },
  {
    label: "PM",
    value: "pm",
  },
];

const handleClick = (
  params: Pick<
    TimeCompViewProps,
    "hourStep" | "minuteStep" | "secondStep" | "use12Hours" | "disabledTime" | "onFocus" | "onBlur"
  > & {
    value: moment.Moment | null;
    onChange: (value: moment.Moment | null) => void;
  }
) => {
  const { disabledHours, disabledMinutes, disabledSeconds } = params.disabledTime();

  Picker.prompt({
    getContainer: () => document.querySelector(`#${CanvasContainerID}`) || document.body,
    mouseWheel: true,
    destroyOnClose: true,
    closeOnMaskClick: true,
    columns: (values) => {
      const time = moment(values.join(":"), TimeParser);
      return [
        (params.use12Hours ? Hours12Columns : HoursColumns)(params.hourStep).filter(
          ({ label, value }) =>
            !disabledHours().includes(Number(value) + (values[3] === "pm" ? 12 : 0))
        ),
        MinuteColumns(params.minuteStep).filter(
          ({ label, value }) => !disabledMinutes(time.hour()).includes(Number(value))
        ),
        MinuteColumns(params.secondStep).filter(
          ({ label, value }) => !disabledSeconds(time.hour(), time.minute()).includes(Number(value))
        ),
        ...(params.use12Hours ? [AmPm] : []),
      ];
    },
    defaultValue: params.value
      ? params.value.format(params.use12Hours ? TIME_12_FORMAT : TIME_FORMAT).split(":")
      : undefined,
    onConfirm: (value) => {
      const time = moment(value.join(":"), TimeParser);
      params.onChange(time);
    },
    onClose: params.onBlur,
  });

  params.onFocus();
};

const MobileView = styled.div<{
  $style: DateTimeStyleType;
}>`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #d7d9e0;

  ${(props) => props.$style && getMobileStyle(props.$style)}
`;

const TimeItem = styled.div`
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export const TimeMobileUIView = (props: TimeUIViewProps) => (
  <MobileView
    ref={props.viewRef}
    $style={props.$style}
    onClick={() => {
      handleClick(props);
    }}
  >
    <TimeItem>
      {props.value ? props.value.format(props.format || TIME_FORMAT) : trans("time.placeholder")}
    </TimeItem>
    {props.suffixIcon}
  </MobileView>
);

export const TimeRangeMobileUIView = (props: TimeRangeUIViewProps) => (
  <MobileView ref={props.viewRef} $style={props.$style}>
    <TimeItem
      onClick={() =>
        handleClick({
          ...props,
          value: props.start,
          onChange: (value) => props.onChange(value, props.end),
        })
      }
    >
      {props.start ? props.start.format(props.format || TIME_FORMAT) : trans("time.startTime")}
    </TimeItem>
    <SwapRightOutlined />
    <TimeItem
      onClick={() =>
        handleClick({
          ...props,
          value: props.end,
          onChange: (value) => props.onChange(props.start, value),
        })
      }
    >
      {props.end ? props.end.format(props.format || TIME_FORMAT) : trans("time.endTime")}
    </TimeItem>
    {props.suffixIcon}
  </MobileView>
);
