import { StringControl } from "comps/controls/codeControl";
import { BoolControl } from "comps/controls/boolControl";
import { MultiCompBuilder } from "comps/generators/multi";
import { BranchDiv } from "openblocks-design";
import { trans } from "i18n";

export const GoToURLAction = (function () {
  const childrenMap = {
    url: StringControl,
    inNewTab: BoolControl,
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return () => {
      window.open(props.url, props.inNewTab ? "_blank" : "_self");
    };
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <BranchDiv>
            {children.url.propertyView({
              label: "URL",
              layout: "vertical",
            })}
          </BranchDiv>
          <BranchDiv $type="switch">
            {children.inNewTab.propertyView({
              label: trans("eventHandler.openInNewTab"),
            })}
          </BranchDiv>
        </>
      );
    })
    .build();
})();
