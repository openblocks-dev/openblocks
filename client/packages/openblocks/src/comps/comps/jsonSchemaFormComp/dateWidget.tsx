import { WidgetProps } from "@rjsf/core";
import { DatePicker } from "antd";
import moment from "moment";

const DATE_PICKER_STYLE = {
  width: "100%",
};

const DateWidget = (showTime: boolean) => (props: WidgetProps) => {
  const formContextReadonly = props.formContext.readonlyAsDisabled;
  const readonlyAsDisabled = formContextReadonly === void 0 ? true : formContextReadonly;

  const handleChange = (nextValue: any) => {
    return props.onChange(
      nextValue && (showTime ? nextValue.toISOString() : nextValue.format("YYYY-MM-DD"))
    );
  };

  return (
    <DatePicker
      disabled={props.disabled || (readonlyAsDisabled && props.readonly)}
      getPopupContainer={(node: any) => node.parentNode}
      id={props.id}
      name={props.id}
      onBlur={!props.readonly ? () => props.onBlur(props.id, props.value) : undefined}
      onChange={!props.readonly ? handleChange : undefined}
      onFocus={!props.readonly ? () => props.onFocus(props.id, props.value) : undefined}
      placeholder={props.placeholder}
      showTime={showTime}
      style={DATE_PICKER_STYLE}
      value={props.value && moment(props.value)}
    />
  );
};

export default DateWidget;
