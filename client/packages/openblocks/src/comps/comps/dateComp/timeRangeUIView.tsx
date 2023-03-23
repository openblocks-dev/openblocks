import styled from "styled-components";
import { TimePicker } from "antd";
import { DateTimeStyleType } from "../../controls/styleControlConstants";
import { getStyle } from "comps/comps/dateComp/dateCompUtil";
import { useUIView } from "../../utils/useUIView";
import { checkIsMobile } from "util/commonUtils";
import React, { useContext } from "react";
import type { TimeCompViewProps } from "./timeComp";
import { EditorContext } from "../../editorState";
import moment from "moment/moment";
import { hasIcon } from "comps/utils";
import { omit } from "lodash";

const RangePickerStyled = styled(TimePicker.RangePicker)<{ $style: DateTimeStyleType }>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const TimeRangeMobileUIView = React.lazy(() =>
  import("./timeMobileUIView").then((m) => ({ default: m.TimeRangeMobileUIView }))
);

export interface TimeRangeUIViewProps extends TimeCompViewProps {
  start: moment.Moment | null;
  end: moment.Moment | null;
  onChange: (start?: moment.Moment | null, end?: moment.Moment | null) => void;
}

export const TimeRangeUIView = (props: TimeRangeUIViewProps) => {
  const editorState = useContext(EditorContext);

  return useUIView(
    <TimeRangeMobileUIView {...props} />,
    <RangePickerStyled
      {...omit(props, "onChange")}
      value={[props.start, props.end]}
      order={true}
      hideDisabledOptions
      onCalendarChange={(time) => {
        props.onChange(time?.[0], time?.[1]);
      }}
      inputReadOnly={checkIsMobile(editorState?.getAppSettings().maxWidth)}
      suffixIcon={hasIcon(props.suffixIcon) && props.suffixIcon}
    />
  );
};
