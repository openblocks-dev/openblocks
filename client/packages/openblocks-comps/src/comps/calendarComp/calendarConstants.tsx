import { trans } from "../../i18n/comps";
import {
  backgroundToBorder,
  CalendarStyleType,
  contrastText,
  contrastColor,
  handleToCalendarHeadSelectBg,
  handleToCalendarToday,
  genHoverColor,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  ThemeDetail,
  isDarkColor,
  darkenColor,
  lightenColor,
  toHex,
  UnderlineCss,
} from "openblocks-sdk";
import styled from "styled-components";
import moment from "moment";
import {
  DayHeaderContentArg,
  FormatterInput,
  SlotLabelContentArg,
  ViewContentArg,
} from "@fullcalendar/core";
import { Form } from "antd";

export const Wrapper = styled.div<{
  editable: boolean;
  $style: CalendarStyleType;
  theme?: ThemeDetail;
  left?: number;
}>`
  position: relative;
  height: 100%;
  overflow: hidden;
  color: ${(props) => props.$style.text};
  .fc-theme-standard .fc-list-day-cushion,
  .fc .fc-timegrid-col.fc-day-today,
  .fc .fc-daygrid-day.fc-day-today {
    background-color: ${(props) => props.$style.background};
  }
  .fc .fc-highlight {
    background-color: ${(props) => props.$style.selectBackground};
  }
  a {
    color: ${(props) => props.$style.text};
  }

  .fc .fc-timegrid-slot {
    height: 28px;
  }

  // day
  .fc-timeGridDay-view {
    .fc-col-header-cell {
      font-size: 20px;
      font-weight: 500;
      a {
        line-height: 67px;
      }
    }
  }

  // list
  .fc-list {
    .fc-list-table {
      table-layout: fixed;
      th {
        background-color: ${(props) => props.$style.background};
      }
    }
    .fc-list-event-graphic {
      display: none;
    }
    .fc-list-day-cushion {
      font-size: 16px;
      font-weight: 500;
      line-height: 32px;
      padding: 0 24px;
    }
    .fc-list-day-side-text {
      float: left;
      margin-left: 24px;
    }
    .fc-list-day {
      th {
        padding: 8px 0 3px 0;
      }
      > th {
        border: none;
      }
      &:not(:nth-of-type(1)) .fc-list-day-cushion {
        border-top: 1px solid
          ${(props) =>
            toHex(props.$style.border) === "#D7D9E0"
              ? "#E1E3EB"
              : lightenColor(props.$style.border, 0.03)};
      }
    }
    .fc-event + .fc-list-day th {
      padding-top: 11px;
      .fc-list-day-cushion {
        padding-top: 8px;
      }
    }
    .fc-event {
      .fc-list-event-time,
      .fc-list-event-title {
        border: none;
      }
      &:hover .event {
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        border-width: 1px;
        margin: 2px 5px;
        height: 20px;
        .event-title {
          margin-left: 15px;
        }
        &::before {
          left: 2px;
        }
      }
    }
    .fc-event {
      font-size: 13px;
      line-height: 20px;
      display: flex;
      align-items: center;
      &.no-time {
        padding-left: 19px;
      }
    }
    .fc-list-event-time {
      padding: 0px 16px 0 24px;
      vertical-align: middle;
      min-width: 87px;
      width: 87px;
      box-sizing: content-box;
    }
    .fc-list-event-title {
      min-width: 266px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 14px 0 0;
      cursor: pointer;
      .event {
        font-size: 13px;
        height: 18px;
        line-height: 18px;
        margin: 3px 5px;
        border-width: 0;
        align-items: center;
        &::before {
          height: 14px;
          top: 2px;
          left: 3px;
        }
        .event-time {
          display: none;
        }
        .event-title {
          margin-left: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .event-remove {
          background-color: inherit;
        }
      }
    }
    .fc-event:hover td {
      background-color: inherit;
    }
  }

  // month
  .fc-dayGridMonth-view {
    .fc-daygrid-day-frame {
      min-height: 95px;
      height: 100%;
    }
    .fc-col-header-cell {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      padding-left: 16px;
      a {
        padding: 0;
        line-height: 39px;
      }
    }
    .fc-daygrid-day-number {
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
      padding: 0 6px;
      border-radius: 11px;
      margin: 12px 0 0 10px;
    }
    .fc-daygrid-day-top {
      flex-direction: inherit;
    }
    .fc-day-today .fc-daygrid-day-number {
      background-color: ${(props) => props.theme.primary};
      color: ${(props) =>
        contrastText(props.theme.primary || "", props.theme.textDark, props.theme.textLight)};
    }
    .fc-daygrid-day-events {
      padding: 1px 0 5px 0;
      min-height: unset;
      .fc-event {
        margin: 2px 4px 2px 12px;
        padding: 0;
        &:hover .event {
          padding-right: 20px;
        }
        .event {
          font-size: 13px;
          line-height: 18px;
          padding-right: 0;
          .event-time {
            display: none;
          }
          .event-title {
            margin-left: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &::before {
            height: 14px;
          }
        }
      }
      .fc-daygrid-day-bottom {
        padding: 2px 2px 0 10px;
      }
    }
    .fc-day-other {
      color: ${(props) => props.$style.text};
      .fc-daygrid-day-top,
      .fc-daygrid-day-events {
        opacity: 0.35;
      }
      .event::before {
        background-color: ${(props) => props.$style.text};
      }
    }
  }
  // month drag event
  .fc > .fc-event {
    visibility: hidden;
  }

  // more link
  .fc-view-harness-active .fc-more-popover {
    border-radius: 4px;
    box-shadow: 0 0px 10px 4px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    left: ${(props) => `min(${props.left}px, calc(100% - 210px)) !important`};
    .fc-popover-body {
      padding: 4px 0;
      min-width: 200px;
      width: 200px;
      .fc-daygrid-event-harness {
        margin: 4px;
        .fc-event {
          margin: 0;
          .event {
            height: fit-content;
            .event-title {
              white-space: pre-wrap;
            }
            .event-time {
              margin-top: 0;
            }
          }
        }
      }
    }
    .fc-popover-header,
    .fc-popover-body {
      background-color: ${(props) => props.$style.background};
    }
    .fc-popover-header .fc-popover-close {
      color: #8b8fa3;
      &:hover {
        color: #222;
      }
    }
  }

  .fc-direction-ltr .fc-timegrid-more-link {
    border: 1px solid ${(props) => props.$style.border};
    border-radius: 4px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
    font-size: 13px;
    display: inline-block;
    font-weight: 500;
    background-color: ${(props) => lightenColor(props.$style.background, 0.1)};
  }

  .fc-dayGridMonth-view .fc-more-link {
    margin: 0 2px 2px 2px !important;
  }
  .fc-timeGridWeek-view .fc-more-link,
  .fc-timeGridDay-view .fc-more-link {
    margin: 2px !important;
  }
  .fc-daygrid-day-events {
    margin: 0 !important;
    padding: 2px 0;
    .fc-event {
      margin: 2px 4px;
    }
    .fc-daygrid-day-bottom {
      line-height: 16px;
      padding: 0;
      .fc-more-link {
        width: calc(100% - 4px);
        border: 1px solid ${(props) => props.$style.border};
        border-radius: 4px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        font-size: 13px;
        display: inline-block;
        height: 20px;
        padding-left: 15px;
        font-weight: 500;
        background-color: ${(props) => lightenColor(props.$style.background, 0.1)};
      }
    }
  }

  // on resize
  .fc-media-screen {
    height: 100% !important;
  }
  .fc-scroller {
    overflow: hidden auto !important;
    overflow: hidden overlay !important;
  }
  .fc-col-header,
  .fc-scroller > div,
  .fc-scroller > div > table,
  .fc-scrollgrid-sync-table,
  .fc-timegrid-cols > table,
  .fc .fc-scrollgrid,
  .fc .fc-scrollgrid table {
    width: 100% !important;
  }

  // event
  .fc-timegrid-event .fc-event-main {
    padding: 4px 0 4px 1px;
  }
  .fc-event {
    position: relative;
    height: 100%;
    background-color: unset !important;
    border: none !important;
    box-shadow: none !important;
    .event-remove {
      color: ${(props) => props.$style.text};
    }
    &:hover {
      .event-remove {
        opacity: ${(props) => props.editable && 1};
      }
    }
  }

  // left time
  .time.past {
    opacity: 0.35;
  }

  .past .time {
    opacity: 0.35;
  }

  .future .time {
    opacity: 1;
  }

  .fc-scrollgrid-liquid > tbody {
    & > tr:nth-of-type(2) {
      display: none;
    }
  }
  .fc .fc-timegrid-slot-label-cushion {
    padding: 0 15px;
  }

  // border-radius, bg
  .fc-theme-standard .fc-list {
    background-color: ${(props) => props.$style.background};
    border-radius: ${(props) => `0 0 ${props.$style.radius} ${props.$style.radius}`};
    border-color: ${(props) => props.$style.border};
    border-top-color: ${(props) =>
      toHex(props.$style.border) === "#D7D9E0"
        ? "#E1E3EB"
        : lightenColor(props.$style.border, 0.03)};
  }
  .fc-scrollgrid-liquid {
    border-radius: ${(props) => `0 0 ${props.$style.radius} ${props.$style.radius}`};
    overflow: hidden;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-color: ${(props) => props.$style.border};
    > thead,
    > tbody > tr:nth-of-type(1),
    .fc-scrollgrid-section-liquid > td {
      background-color: ${(props) => props.$style.background};
    }
  }
  .fc-scrollgrid-section-liquid > td,
  .fc-scrollgrid-liquid .fc-scrollgrid-section-header > th {
    border: none;
  }
  .fc-scrollgrid-liquid > tbody > tr:nth-of-type(1) > td {
    border-right: none;
  }
  .fc-theme-standard .fc-scrollgrid {
    border-color: ${(props) =>
      toHex(props.$style.border) === "#D7D9E0"
        ? "#E1E3EB"
        : lightenColor(props.$style.border, 0.03)};
  }
  .fc .fc-scrollgrid {
    border-bottom-width: 1px;
    border-right-width: 1px;
  }

  .fc-day-sat,
  .fc-day-sun {
    &.fc-timegrid-col,
    &.fc-daygrid-day {
      background-color: ${(props) =>
        isDarkColor(props.$style.background)
          ? darkenColor(props.$style.background, 0.06)
          : darkenColor(props.$style.background, 0.02)};
    }
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: ${(props) =>
      toHex(props.$style.border) === "#D7D9E0"
        ? "#E1E3EB"
        : lightenColor(props.$style.border, 0.03)};
  }

  // header
  .fc .fc-toolbar.fc-header-toolbar {
    padding: 16px;
    margin-bottom: 0;
    border: 1px solid ${(props) => props.$style.border};
    border-bottom: none;
    border-radius: ${(props) => `${props.$style.radius} ${props.$style.radius} 0 0`};
    background-color: ${(props) => props.$style.background};
  }
  .fc-toolbar-title {
    color: ${(props) => props.$style.title};
    font-size: 24px;
    line-height: 24px;
    display: inline-flex;
  }
  .fc-toolbar-chunk {
    display: inline-flex;
    align-items: center;
  }
  .fc .fc-toolbar-chunk .fc-button.fc-button-primary {
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:disabled):not(.fc-button-active) {
      &:hover,
      &:active {
        color: ${(props) => props.$style.btnText};
        background-color: ${(props) =>
          toHex(props.$style.headerBtnBackground) === "#FFFFFF"
            ? "#F5F5F6"
            : genHoverColor(props.$style.headerBtnBackground)};
        border-color: ${(props) =>
          toHex(props.$style.headerBtnBackground) === "#FFFFFF"
            ? "#D7D9E0"
            : backgroundToBorder(genHoverColor(props.$style.headerBtnBackground))};
      }
    }
    &:not(:disabled):focus {
      box-shadow: none;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 1;
      &,
      &:hover {
        background-color: ${(props) => props.$style.headerBtnBackground};
        border-color: ${(props) => backgroundToBorder(props.$style.headerBtnBackground)};
        color: ${(props) =>
          toHex(props.$style.btnText) === "#222222"
            ? "#B8B9BF"
            : contrastColor(props.$style.btnText)};
      }
    }
  }
  .fc .fc-button-primary:not(:disabled).fc-button-active:focus,
  .fc .fc-button-primary:not(:disabled):active:focus {
    box-shadow: none;
  }
  .fc-toolbar-chunk:nth-of-type(3) .fc-button-primary {
    height: 28px;
    display: inline-flex;
    font-size: 14px;
    margin-left: 8px;
    background-color: ${(props) => props.$style.headerBtnBackground};
    border-color: ${(props) => backgroundToBorder(props.$style.headerBtnBackground)};
    color: ${(props) => props.$style.btnText};
    &.fc-today-button {
      min-width: 52px;
    }
    &.fc-prev-button,
    &.fc-next-button {
      padding: 0;
      width: 28px;
      color: ${(props) => lightenColor(props.$style.btnText, 0.4)};
    }
    &.fc-prev-button {
      margin-left: 12px;
    }
  }
  .fc-toolbar-chunk:nth-of-type(3) .fc-button-group {
    background-color: ${(props) =>
      toHex(props.$style.headerBtnBackground) === "#FFFFFF"
        ? "#EFEFF1"
        : isDarkColor(props.$style.headerBtnBackground)
        ? props.$style.headerBtnBackground
        : darkenColor(props.$style.headerBtnBackground, 0.1)};
    border-radius: 4px;
    margin-left: 16px;
    .fc-button-primary {
      background-color: transparent;
      min-width: 60px;
      border-radius: 4px;
      margin: 2px;
      border: none;
      color: ${(props) =>
        toHex(props.$style.btnText) === "#222222"
          ? "#8B8FA3"
          : lightenColor(props.$style.btnText, 0.4)};
      font-weight: 500;

      &.fc-button-active {
        background-color: ${(props) =>
          isDarkColor(props.$style.headerBtnBackground)
            ? lightenColor(props.$style.headerBtnBackground, 0.1)
            : props.$style.headerBtnBackground};
        color: ${(props) => props.$style.btnText};
      }
    }
  }

  // week head
  .fc-timeGridWeek-view {
    .week-head {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      font-weight: 400;
      &.past span {
        opacity: 0.35;
      }
      .week {
        padding-bottom: 3px;
      }
      .day {
        font-size: 20px;
        font-weight: 500;
        line-height: 22px;
      }
    }
    .fc-day-today.fc-col-header-cell {
      background-color: ${(props) =>
        isDarkColor(props.$style.background) ? "#ffffff19" : toHex(props.theme.primary!) + "19"};
      a {
        color: ${(props) =>
          !isDarkColor(props.$style.background) && darkenColor(props.theme.primary!, 0.1)};
      }
    }
    .fc-col-header-cell-cushion {
      padding: 8px 0 13px 0;
    }
  }

  // week left
  .fc .fc-timegrid-axis-cushion {
    min-width: 62px;
    min-height: 52px;
    max-width: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .fc-direction-ltr .fc-timegrid-slot-label-frame {
    text-align: center;
  }
  .fc .fc-timegrid-slot-label {
    border: none;
  }

  // time can doubleClick
  .fc-timegrid-bg-harness,
  .fc-daygrid-day-bg {
    pointer-events: none;
  }
`;

export const Remove = styled.div<{ isList: boolean }>`
  position: absolute;
  pointer-events: auto;
  top: 0;
  right: 0;
  display: flex;
  padding: 5px;
  opacity: 0;
  cursor: pointer;
  &:hover {
    g {
      stroke: #315efb;
    }
  }
`;

export const Event = styled.div<{
  bg: string;
  theme: Object;
  isList: boolean;
  $style: CalendarStyleType;
}>`
  height: 100%;
  width: 100%;
  pointer-events: none;
  border-radius: 4px;
  box-shadow: ${(props) => !props.isList && "0 0 5px 0 rgba(0, 0, 0, 0.15)"};
  border: 1px solid ${(props) => props.$style.border};
  display: ${(props) => props.isList && "flex"};
  background-color: ${(props) => !props.isList && lightenColor(props.$style.background, 0.1)};
  overflow: hidden;
  font-size: 13px;
  line-height: 19px;
  padding-right: 20px;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 5px;
    height: calc(100% - 4px);
    left: 2px;
    top: 2px;
    border-radius: 3px;
    background-color: ${(props) => props.bg};
  }

  .event-time {
    color: ${(props) =>
      !props.isList &&
      (isDarkColor(props.$style.text) ? lightenColor(props.$style.text, 0.2) : props.$style.text)};
    margin-left: 15px;
    white-space: pre-wrap;
    margin-top: 2px;
  }
  .event-title {
    color: ${(props) => !props.isList && props.$style.text};
    font-weight: 500;
    margin-left: 15px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  &.small {
    height: 20px;
    .event-time {
      display: none;
    }
    .event-title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  &.middle {
    padding-top: 2px;
    .event-time,
    .event-title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  &.large {
    .event-time {
      margin-top: 13px;
    }
  }
  &.past {
    background-color: ${(props) => isDarkColor(props.$style.background) && props.$style.background};
    &::before {
      background-color: ${(props) =>
        toHex(props.$style.text) === "#3C3C3C"
          ? "#8B8FA3"
          : isDarkColor(props.$style.text)
          ? lightenColor(props.$style.text, 0.3)
          : props.$style.text};
    }
    &::before,
    .event-title,
    .event-time {
      opacity: 0.35;
    }
  }
`;

export const FormWrapper = styled(Form)`
  .ant-form-item-label {
    width: 100px;
    text-align: left;
    line-height: 18px;
    label:not(.ant-form-item-required) {
      margin-left: 11px;
    }
    label span {
      ${UnderlineCss}
    }
  }
`;

export type EventType = {
  id?: string;
  label?: string;
  title?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  color?: string;
  groupId?: string;
  value?: string;
};

export enum ViewType {
  MONTH = "dayGridMonth",
  WEEK = "timeGridWeek",
  DAY = "timeGridDay",
  LIST = "listWeek",
}

export const DefaultViewOptions = [
  {
    label: trans("calendar.month"),
    value: "dayGridMonth",
  },
  {
    label: trans("calendar.week"),
    value: "timeGridWeek",
  },
  {
    label: trans("calendar.day"),
    value: "timeGridDay",
  },
  {
    label: trans("calendar.list"),
    value: "listWeek",
  },
] as const;

export const FirstDayOptions = [
  {
    label: trans("calendar.monday"),
    value: "1",
  },
  {
    label: trans("calendar.tuesday"),
    value: "2",
  },
  {
    label: trans("calendar.wednesday"),
    value: "3",
  },
  {
    label: trans("calendar.thursday"),
    value: "4",
  },
  {
    label: trans("calendar.friday"),
    value: "5",
  },
  {
    label: trans("calendar.saturday"),
    value: "6",
  },
  {
    label: trans("calendar.sunday"),
    value: "0",
  },
];

export const defaultData = [
  {
    id: "1",
    title: "Coding",
    start: moment().hours(10).minutes(0).second(0).format(DATE_TIME_FORMAT),
    end: moment().hours(11).minutes(30).second(0).format(DATE_TIME_FORMAT),
    color: "#079968",
  },
  {
    id: "2",
    title: "Rest",
    start: moment().hours(24).format(DATE_FORMAT),
    end: moment().hours(48).format(DATE_FORMAT),
    allDay: true,
  },
];

export const buttonText = {
  today: trans("calendar.today"),
  month: trans("calendar.month"),
  week: trans("calendar.week"),
  day: trans("calendar.day"),
  list: trans("calendar.list"),
};

export const headerToolbar = {
  left: "title",
  right: "prev today next dayGridMonth,timeGridWeek,timeGridDay,listWeek",
};

const weekHeadContent = (info: DayHeaderContentArg) => {
  const text = info.text.split(" ");
  return {
    html: `<span class="week-head ${info.isPast && "past"} ${info.isToday && "today"}">
  <span class="week">${text[0]}</span>
  <span class="day">${text[1]}</span>
  </span>`,
  };
};

const leftTimeContent = (info: SlotLabelContentArg) => {
  let isPast = false;
  if (info.view.type === ViewType.WEEK) {
    isPast = moment().isAfter(moment(moment().format("YYYY MM DD " + info.text)));
  } else if (info.view.type === ViewType.DAY) {
    isPast = moment().isAfter(
      moment(moment(info.view.activeStart).format("YYYY MM DD " + info.text))
    );
  }
  return {
    html: `<span class="time ${isPast && "past"}">${info.text}</span>`,
  };
};

export const views = {
  [ViewType.WEEK]: {
    dayHeaderFormat: "ddd DD",
    dayHeaderContent: (info: DayHeaderContentArg) => weekHeadContent(info),
    slotLabelContent: (info: SlotLabelContentArg) => leftTimeContent(info),
  },
  [ViewType.DAY]: {
    slotLabelContent: (info: SlotLabelContentArg) => leftTimeContent(info),
  },
  [ViewType.LIST]: {
    listDayFormat: { weekday: "short" },
  },
} as const;

export const slotLabelFormat = [
  {
    hour: "2-digit",
    minute: "2-digit",
  },
] as FormatterInput[];

export const viewClassNames = (info: ViewContentArg) => {
  let className = "";
  if ([ViewType.WEEK, ViewType.DAY].includes(info.view.type as ViewType)) {
    if (moment().isAfter(info.view.activeEnd)) {
      className = "past";
    } else if (moment().isBefore(info.view.activeStart)) {
      className = "future";
    }
  }
  return className;
};
