import ApplicationSelect from "components/ApplicationSelect";
import { StringControl } from "comps/controls/codeControl";
import { MultiCompBuilder } from "comps/generators/multi";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { trans } from "i18n";

const childrenMap = {
  applicationId: StringControl,
};

export default new MultiCompBuilder(childrenMap, (props) => props.applicationId)
  .setPropertyViewFn((children) => (
    <ControlPropertyViewWrapper label={trans("prop.selectApp")} layout="vertical">
      <ApplicationSelect
        highlightCurrent
        value={children.applicationId.getView()}
        onChange={(id) => {
          children.applicationId.dispatchChangeValueAction(id);
        }}
      />
    </ControlPropertyViewWrapper>
  ))
  .build();
