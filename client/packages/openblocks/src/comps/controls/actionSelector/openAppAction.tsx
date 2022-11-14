import { MultiCompBuilder } from "comps/generators/multi";
import { withDefault } from "comps/generators/simpleGenerators";
import { BranchDiv } from "openblocks-design";
import { KeyValue } from "types/common";
import ApplicationSelectControl from "../appSelectControl";
import { BoolControl } from "../boolControl";
import { keyValueListControl } from "../keyValueControl";
import { keyValueListToSearchStr, openApp } from "../../../util/appUtils";
import { trans } from "i18n";

const childrenMap = {
  applicationId: ApplicationSelectControl,
  query: withDefault(keyValueListControl(false, [], "string"), [{ key: "", value: "" }]),
  hash: withDefault(keyValueListControl(false, [], "string"), [{ key: "", value: "" }]),
  inNewTab: BoolControl,
};

export const OpenAppPageAction = new MultiCompBuilder(childrenMap, (props) => {
  return () => {
    openApp({
      applicationId: props.applicationId as string,
      queryParams: keyValueListToSearchStr(props.query.map((i) => i.getView() as KeyValue)),
      hashParams: keyValueListToSearchStr(props.hash.map((i) => i.getView() as KeyValue)),
      newTab: props.inNewTab as boolean,
    });
  };
})
  .setPropertyViewFn((children) => {
    return (
      <>
        <BranchDiv>{children.applicationId.getPropertyView()}</BranchDiv>
        <BranchDiv>
          {children.query.propertyView({
            label: trans("eventHandler.queryParams"),
            layout: "vertical",
          })}
        </BranchDiv>
        <BranchDiv>
          {children.hash.propertyView({
            label: trans("eventHandler.hashParams"),
            layout: "vertical",
          })}
        </BranchDiv>
        <BranchDiv $type="switch">
          {children.inNewTab.propertyView({
            label: trans("eventHandler.openInNewTab"),
            layout: "vertical",
          })}
        </BranchDiv>
      </>
    );
  })
  .build();
