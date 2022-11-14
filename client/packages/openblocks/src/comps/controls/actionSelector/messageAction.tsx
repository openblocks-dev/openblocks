import { message } from "antd";
import { StringControl } from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { MultiCompBuilder } from "comps/generators/multi";
import { BranchDiv } from "openblocks-design";
import { trans } from "i18n";
import { millisecondsControl } from "../millisecondControl";

const childrenMap = {
  text: StringControl,
  level: dropdownControl(
    [
      { label: trans("information"), value: "info" },
      { label: trans("success"), value: "success" },
      { label: trans("warning"), value: "warn" },
      { label: trans("error"), value: "error" },
    ] as const,
    "info"
  ),
  duration: millisecondsControl({ left: 0, right: 10, defaultValue: 3, unit: "s" }),
};

export const MessageAction = new MultiCompBuilder(
  childrenMap,
  (props) => () => message[props.level](props.text, props.duration / 1000)
)
  .setPropertyViewFn((children) => (
    <>
      <BranchDiv>
        {children.text.propertyView({
          label: trans("eventHandler.text"),
          layout: "vertical",
        })}
      </BranchDiv>
      <BranchDiv $type={"inline"}>
        {children.level.propertyView({
          label: trans("eventHandler.level"),
        })}
      </BranchDiv>
      <BranchDiv>
        {children.duration.propertyView({
          label: trans("eventHandler.duration"),
          layout: "vertical",
          placeholder: "3s",
          tooltip: trans("eventHandler.notifyDurationTooltip", { max: 10 }),
        })}
      </BranchDiv>
    </>
  ))
  .build();
