import moment, { Moment } from "moment/moment";
import { DateParser, TimeParser } from "util/dateTimeUtils";
import { range } from "lodash";
import { DateTimeStyleType } from "../../controls/styleControlConstants";
import { css } from "styled-components";
import { isDarkColor, lightenColor } from "components/colorSelect/colorUtils";
import { CommonPickerMethods } from "antd/lib/date-picker/generatePicker/interface";
import { blurMethod, focusMethod } from "comps/utils/methodUtils";
import { refMethods } from "comps/generators/withMethodExposing";

export const handleDateChange = (
  time: string,
  onChange: (value: string) => Promise<unknown>,
  onEvent: (event: string) => void
) => {
  onChange(time).then(() => onEvent("change"));
};

export const disabledDate = (current: Moment, min: string, max: string) => {
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

export const getMobileStyle = (style: DateTimeStyleType) =>
  css`
    color: ${style.text};
    background-color: ${style.background};
    border-radius: ${style.radius};
    border-color: ${style.border};
  `;

export const dateRefMethods = refMethods<CommonPickerMethods>([focusMethod, blurMethod]);
