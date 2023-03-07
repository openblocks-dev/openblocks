import styled from "styled-components";
import { DateTimeStyleType } from "comps/controls/styleControlConstants";
import { getMobileStyle } from "comps/comps/dateComp/dateCompUtil";
import moment from "moment";
import { DATE_FORMAT, DATE_TIME_FORMAT, DateParser } from "util/dateTimeUtils";
import { CanvasContainerID } from "constants/domLocators";
import { trans } from "i18n";
import React from "react";
import { DataUIViewProps } from "comps/comps/dateComp/dateUIView";
import { SwapRightOutlined } from "@ant-design/icons";
import { DateRangeUIViewProps } from "comps/comps/dateComp/dateRangeUIView";
import { DateCompViewProps } from "comps/comps/dateComp/dateComp";

const handleClick = async (
  params: Pick<
    DateCompViewProps,
    "showTime" | "minDate" | "maxDate" | "disabledTime" | "onFocus" | "onBlur"
  > & {
    value: moment.Moment | null;
    onChange: (value: moment.Moment | null) => void;
  }
) => {
  const MobileDatePicker = (await import("antd-mobile/es/components/date-picker")).default;

  const min = moment(params.minDate, DateParser);
  const max = moment(params.maxDate, DateParser);

  const { disabledHours, disabledMinutes, disabledSeconds } = params.disabledTime();

  MobileDatePicker.prompt({
    getContainer: () => document.querySelector(`#${CanvasContainerID}`) || document.body,
    mouseWheel: true,
    destroyOnClose: true,
    closeOnMaskClick: true,
    min: min.isValid() ? min.toDate() : undefined,
    max: max.isValid() ? max.toDate() : undefined,
    precision: params.showTime ? "second" : "day",
    defaultValue: params.value ? params.value.toDate() : undefined,
    filter: {
      hour: (val) => !disabledHours().includes(val),
      minute: (val, { date }) => !disabledMinutes(date.getHours()).includes(val),
      second: (val, { date }) => !disabledSeconds(date.getHours(), date.getMinutes()).includes(val),
    },
    onConfirm: (value) => {
      const time = moment(value);
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

const DateItem = styled.div`
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export const DateMobileUIView = (props: DataUIViewProps) => (
  <MobileView ref={props.viewRef} $style={props.$style} onClick={() => handleClick(props)}>
    <DateItem>
      {props.value
        ? props.value.format(props.format || (props.showTime ? DATE_TIME_FORMAT : DATE_FORMAT))
        : trans("date.placeholder")}
    </DateItem>
    {props.suffixIcon}
  </MobileView>
);

export const DateRangeMobileUIView = (props: DateRangeUIViewProps) => (
  <MobileView ref={props.viewRef} $style={props.$style}>
    <DateItem
      onClick={() =>
        handleClick({
          ...props,
          value: props.start,
          onChange: (value) => props.onChange(value, props.end),
        })
      }
    >
      {props.start
        ? props.start.format(props.format || (props.showTime ? DATE_TIME_FORMAT : DATE_FORMAT))
        : trans("date.startDate")}
    </DateItem>
    <SwapRightOutlined />
    <DateItem
      onClick={() =>
        handleClick({
          ...props,
          value: props.end,
          onChange: (value) => props.onChange(props.start, value),
        })
      }
    >
      {props.end
        ? props.end.format(props.format || (props.showTime ? DATE_TIME_FORMAT : DATE_FORMAT))
        : trans("date.endDate")}
    </DateItem>
    {props.suffixIcon}
  </MobileView>
);
