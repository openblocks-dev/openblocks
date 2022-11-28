import { EditorContext } from "comps/editorState";
import { MultiCompBuilder, valueComp } from "comps/generators";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { Dropdown } from "openblocks-design";
import { useContext } from "react";
import { ControlParams } from "./controlParams";

interface IProps {
  value: string;
  onChange: (name: string) => void;
}

function QuerySelect(props: IProps) {
  const { onChange, value } = props;
  const editorState = useContext(EditorContext);
  return (
    <Dropdown
      showSearch={true}
      allowClear
      value={value}
      options={editorState.queryCompInfoList().map((info) => ({
        label: info.name,
        value: info.name,
      }))}
      onChange={onChange}
    />
  );
}

const childrenMap = {
  value: valueComp<string>(""),
};

const QuerySelectControlBase = new MultiCompBuilder(childrenMap, (props) => {
  return {
    ...props,
  };
}).build();

class QuerySelectControl extends QuerySelectControlBase {
  propertyView(options: ControlParams) {
    return (
      <ControlPropertyViewWrapper {...options}>
        <QuerySelect
          value={this.children.value.getView()}
          onChange={(value) => {
            this.dispatchChangeValueAction({ value });
          }}
        />
      </ControlPropertyViewWrapper>
    );
  }
}

export default QuerySelectControl;
