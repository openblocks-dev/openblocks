import {
  isValidColor,
  NameConfig,
  NameConfigHidden,
  BoolControl,
  UICompBuilder,
  withDefault,
  withExposingConfigs,
  NumberControl,
  StringControl,
  hiddenPropertyView,
  ChangeEventHandlerControl,
  Section,
  sectionNames,
  dropdownControl,
  styleControl,
  ThemeContext,
  CalendarStyle,
  DateParser,
  CustomModal,
  jsonValueExposingStateControl,
  CalendarDeleteIcon,
  Tooltip,
} from "openblocks-sdk";
import { Input, Form } from "antd";
import { trans, getCalendarLocale } from "../../i18n/comps";
import { createRef, useContext, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import allLocales from "@fullcalendar/core/locales-all";
import { EventContentArg, DateSelectArg } from "@fullcalendar/core";
import momentPlugin from "@fullcalendar/moment";
import {
  DefaultViewOptions,
  FirstDayOptions,
  Wrapper,
  Event,
  Remove,
  EventType,
  defaultData,
  ViewType,
  buttonText,
  headerToolbar,
  views,
  slotLabelFormat,
  viewClassNames,
  FormWrapper,
} from "./calendarConstants";
import moment from "moment";

const childrenMap = {
  events: jsonValueExposingStateControl("events", defaultData),
  onEvent: ChangeEventHandlerControl,

  editable: withDefault(BoolControl, true),
  defaultDate: withDefault(StringControl, "{{ new Date() }}"),
  defaultView: dropdownControl(DefaultViewOptions, "timeGridWeek"),
  firstDay: dropdownControl(FirstDayOptions, "1"),
  showEventTime: withDefault(BoolControl, true),
  showWeekends: withDefault(BoolControl, true),
  showAllDay: withDefault(BoolControl, true),
  dayMaxEvents: withDefault(NumberControl, 2),
  eventMaxStack: withDefault(NumberControl, 0),
  style: styleControl(CalendarStyle),
};

let CalendarBasicComp = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    const theme = useContext(ThemeContext);
    const ref = createRef<HTMLDivElement>();
    const editEvent = useRef<EventType>();
    const [form] = Form.useForm();
    const [left, setLeft] = useState<number | undefined>(undefined);

    const events = props.events.value.map((item: EventType) => {
      return {
        title: item.title,
        id: item.id,
        start: moment(item.start, DateParser).format(),
        end: moment(item.end, DateParser).format(),
        allDay: item.allDay,
        color: isValidColor(item.color || "") ? item.color : theme?.theme?.primary,
        ...(item.groupId ? { groupId: item.groupId } : null),
      };
    });

    const {
      defaultDate,
      defaultView,
      showEventTime,
      showWeekends,
      showAllDay,
      dayMaxEvents,
      eventMaxStack,
      style,
      firstDay,
      editable,
    } = props;

    function renderEventContent(eventInfo: EventContentArg) {
      const isList = eventInfo.view.type === "listWeek";
      let sizeClass = "";
      if ([ViewType.WEEK, ViewType.DAY].includes(eventInfo.view.type as ViewType)) {
        const duration = moment(eventInfo.event.end).diff(moment(eventInfo.event.start), "minutes");
        if (duration <= 30 || eventInfo.event.allDay) {
          sizeClass = "small";
        } else if (duration <= 60) {
          sizeClass = "middle";
        } else {
          sizeClass = "large";
        }
      }
      const stateClass =
        moment().isAfter(moment(eventInfo.event.end)) &&
        (eventInfo.view.type as ViewType) !== ViewType.MONTH
          ? "past"
          : "";

      return (
        <Event
          className={`event ${sizeClass} ${stateClass}`}
          isList={isList}
          bg={eventInfo.backgroundColor}
          theme={theme?.theme}
          $style={props.style}
        >
          <div className="event-time">{eventInfo.timeText}</div>
          <div className="event-title">{eventInfo.event.title}</div>
          <Remove
            isList={isList}
            className="event-remove"
            onClick={(e) => {
              e.stopPropagation();
              props.onEvent("change");
              const event = events.filter((item: EventType) => item.id !== eventInfo.event.id);
              props.events.onChange(event);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <CalendarDeleteIcon />
          </Remove>
        </Event>
      );
    }

    const handleDbClick = () => {
      const event = props.events.value.find(
        (item: EventType) => item.id === editEvent.current?.id
      ) as EventType;
      if (!editable || !editEvent.current) {
        return;
      }
      if (event) {
        const { title, groupId, color, id } = event;
        const eventInfo = {
          title,
          groupId,
          color,
          id,
        };
        showModal(eventInfo, true);
      } else {
        showModal(editEvent.current, false);
      }
    };

    const handleCreate = (info: DateSelectArg) => {
      const event = {
        allDay: info.allDay,
        start: info.startStr,
        end: info.endStr,
      };
      const view = info.view.type as ViewType;
      const duration = moment(info.end).diff(moment(info.start), "minutes");
      const singleClick =
        (view === ViewType.MONTH && duration === 1440) ||
        ([ViewType.WEEK, ViewType.DAY].includes(view) && duration === 30) ||
        (info.allDay && duration === 1440);
      if (singleClick) {
        editEvent.current = event;
        setTimeout(() => {
          editEvent.current = undefined;
        }, 500);
        return;
      }
      showModal(event, false);
    };

    const showModal = (event: EventType, ifEdit: boolean) => {
      const modalTitle = ifEdit ? trans("calendar.editEvent") : trans("calendar.creatEvent");
      form && form.setFieldsValue(event);
      const eventId = editEvent.current?.id;
      CustomModal.confirm({
        title: modalTitle,
        content: (
          <FormWrapper form={form}>
            <Form.Item
              label={
                <Tooltip title={trans("calendar.eventIdTooltip")}>
                  {trans("calendar.eventId")}
                </Tooltip>
              }
              name="id"
              rules={[{ required: true, message: trans("calendar.eventIdRequire") }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={trans("calendar.eventName")}
              name="title"
              rules={[{ required: true, message: trans("calendar.eventNameRequire") }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={trans("calendar.eventColor")} name="color">
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <Tooltip title={trans("calendar.groupIdTooltip")}>
                  {trans("calendar.eventGroupId")}
                </Tooltip>
              }
              name="groupId"
            >
              <Input />
            </Form.Item>
          </FormWrapper>
        ),
        onConfirm: () => {
          form.submit();
          return form.validateFields().then(() => {
            const { id, groupId, color, title = "" } = form.getFieldsValue();
            const idExist = props.events.value.findIndex((item: EventType) => item.id === id);
            if (idExist > -1 && id !== eventId) {
              form.setFields([{ name: "id", errors: [trans("calendar.eventIdExist")] }]);
              throw new Error();
            }
            if (ifEdit) {
              const changeEvents = props.events.value.map((item: EventType) => {
                if (item.id === eventId) {
                  return {
                    ...item,
                    title,
                    id,
                    ...(groupId !== undefined ? { groupId } : null),
                    ...(color !== undefined ? { color } : null),
                  };
                } else {
                  return item;
                }
              });
              props.events.onChange(changeEvents);
            } else {
              const createInfo = {
                allDay: event.allDay,
                start: event.start,
                end: event.end,
                id,
                title,
                ...(groupId !== undefined ? { groupId } : null),
                ...(color !== undefined ? { color } : null),
              };
              props.events.onChange([...props.events.value, createInfo]);
            }
            props.onEvent("change");
            form.resetFields();
          });
        },
        onCancel: () => {
          form.resetFields();
        },
      });
    };

    let initialDate = defaultDate;
    try {
      initialDate = new Date(defaultDate).toISOString();
    } catch (error) {
      initialDate = undefined;
    }

    return (
      <Wrapper
        ref={ref}
        editable={editable}
        $style={style}
        theme={theme?.theme}
        onDoubleClick={handleDbClick}
        left={left}
        key={initialDate ? defaultView + initialDate : defaultView}
      >
        <FullCalendar
          slotEventOverlap={false}
          events={events}
          expandRows={true}
          height={"100%"}
          locale={getCalendarLocale()}
          locales={allLocales}
          firstDay={Number(firstDay)}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, momentPlugin]}
          headerToolbar={headerToolbar}
          moreLinkClick={(info) => {
            let left = 0;
            const ele = info.jsEvent.target as HTMLElement;
            if (info.view.type === ViewType.DAY) {
              if (info.allDay) {
                left = ele.offsetParent?.parentElement?.offsetLeft || 0;
              } else {
                left = ele.parentElement?.offsetLeft || 0;
              }
            } else {
              if (info.allDay) {
                left = ele.offsetParent?.parentElement?.parentElement?.offsetLeft || 0;
              } else {
                left =
                  ele.offsetParent?.parentElement?.parentElement?.parentElement?.offsetLeft || 0;
              }
            }
            setLeft(left);
          }}
          buttonText={buttonText}
          views={views}
          eventClassNames={() => (!showEventTime ? "no-time" : "")}
          slotLabelFormat={slotLabelFormat}
          viewClassNames={viewClassNames}
          moreLinkText={trans("calendar.more")}
          initialDate={initialDate}
          initialView={defaultView}
          editable={editable}
          selectable={editable}
          selectMirror={false}
          displayEventTime={showEventTime}
          dayMaxEvents={dayMaxEvents}
          eventMaxStack={eventMaxStack || undefined}
          weekends={showWeekends}
          allDaySlot={showAllDay}
          eventContent={renderEventContent}
          select={(info) => handleCreate(info)}
          eventClick={(info) => {
            const event = events.find((item: EventType) => item.id === info.event.id);
            editEvent.current = event;
            setTimeout(() => {
              editEvent.current = undefined;
            }, 500);
          }}
          eventsSet={(info) => {
            let needChange = false;
            let changeEvents: EventType[] = [];
            info.forEach((item) => {
              const event = events.find((i: EventType) => i.id === item.id);
              const start = moment(item.start, DateParser).format();
              const end = moment(item.end, DateParser).format();
              if (
                start !== event?.start ||
                end !== event?.end ||
                !!item.allDay !== !!event?.allDay
              ) {
                needChange = true;
                changeEvents.push({
                  ...event,
                  allDay: item.allDay,
                  start: item.startStr,
                  end: item.endStr,
                });
              } else {
                changeEvents.push(event);
              }
            });
            if (needChange) {
              props.events.onChange(changeEvents);
              props.onEvent("change");
            }
          }}
        />
      </Wrapper>
    );
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>{children.events.propertyView({})}</Section>
          <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>
          <Section name={sectionNames.advanced}>
            {children.editable.propertyView({
              label: trans("calendar.editable"),
            })}
            {children.defaultDate.propertyView({
              label: trans("calendar.defaultDate"),
              tooltip: trans("calendar.defaultDateTooltip"),
            })}
            {children.defaultView.propertyView({
              label: trans("calendar.defaultView"),
              tooltip: trans("calendar.defaultViewTooltip"),
            })}
            {children.firstDay.propertyView({
              label: trans("calendar.startWeek"),
            })}
            {children.showEventTime.propertyView({
              label: trans("calendar.showEventTime"),
              tooltip: trans("calendar.showEventTimeTooltip"),
            })}
            {children.showWeekends.propertyView({
              label: trans("calendar.showWeekends"),
            })}
            {children.showAllDay.propertyView({
              label: trans("calendar.showAllDay"),
              tooltip: trans("calendar.showAllDayTooltip"),
            })}
            {children.dayMaxEvents.propertyView({
              label: trans("calendar.dayMaxEvents"),
              tooltip: trans("calendar.dayMaxEventsTooltip"),
            })}
            {children.eventMaxStack.propertyView({
              label: trans("calendar.eventMaxStack"),
              tooltip: trans("calendar.eventMaxStackTooltip"),
            })}
          </Section>
          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .build();
})();

CalendarBasicComp = class extends CalendarBasicComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const CalendarComp = withExposingConfigs(CalendarBasicComp, [
  new NameConfig("events", trans("calendar.events")),
  NameConfigHidden,
]);
