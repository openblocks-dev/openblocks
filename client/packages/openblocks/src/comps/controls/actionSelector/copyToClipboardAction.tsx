import { StringControl } from "comps/controls/codeControl";
import { MultiCompBuilder } from "comps/generators/multi";
import copy from "copy-to-clipboard";
import { BranchDiv } from "openblocks-design";
import { trans } from "i18n";

export const CopyToClipboardAction = (function () {
  const childrenMap = {
    value: StringControl,
  };
  return new MultiCompBuilder(childrenMap, (props) => () => copy(props.value))
    .setPropertyViewFn((children) => {
      return (
        <>
          <BranchDiv>
            {children.value.propertyView({
              label: trans("eventHandler.copyToClipboardValue"),
              layout: "vertical",
            })}
          </BranchDiv>
        </>
      );
    })
    .build();
})();
