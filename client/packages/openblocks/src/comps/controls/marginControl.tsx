import { StringControl } from "comps/controls/codeControl";
import { withDefault } from "comps/generators";
import { MultiCompBuilder } from "comps/generators/multi";
import { trans } from "i18n";
import styled from "styled-components";

const MarginContainer = styled.div<{}>`
  display: flex;
  justify-content: space-between;
  .hUXIwu {
    flex: 0 0 36px;
  }
  .fgbLEe {
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;
export const MarginControl = (function () {
  const childrenMap = {
    left: withDefault(StringControl, ""),
    right: withDefault(StringControl, ""),
    top: withDefault(StringControl, ""),
    bottom: withDefault(StringControl, ""),
  };
  return new MultiCompBuilder(childrenMap, (props) => props)
    .setPropertyViewFn((children) => (
      <>
        {children.top.propertyView({
          label: trans("componentDoc.top"),
        })}
        {children.right.propertyView({
          label: trans("componentDoc.right"),
        })}
        {children.bottom.propertyView({
          label: trans("componentDoc.bottom"),
        })}
        {children.left.propertyView({
          label: trans("componentDoc.left"),
        })}
      </>
    ))
    .build();
})();
