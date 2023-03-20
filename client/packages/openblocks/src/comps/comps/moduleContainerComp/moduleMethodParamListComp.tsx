import { KeyValueItem, KeyValueItemListWithNewCreateState } from "components/KeyValueItemList";
import { StringControl } from "comps/controls/codeControl";
import CompNameControl from "comps/controls/compNameControl";
import { ControlParams } from "comps/controls/controlParams";
import { dropdownControl } from "comps/controls/dropdownControl";
import { list } from "comps/generators/list";
import { NameGenerator } from "comps/utils/nameGenerator";
import { trans } from "i18n";
import { multiChangeAction } from "openblocks-core";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { useEffect } from "react";
import ParamListItemComp, {
  getParamOptionLabel,
  ModuleMethodParamType,
} from "./moduleMethodParamListItemComp";

const ParamListCompBase = list(ParamListItemComp);

class ModuleMethodParamListComp extends ParamListCompBase {
  nameGen = new NameGenerator();

  handleAdd() {
    const names = this.getView().map((i) => i.children.name.getView());
    const name = this.nameGen.init(names).genItemName("param");
    this.dispatch(
      this.pushAction({
        name,
        description: "",
      })
    );
  }

  handleDelete(idx: number) {
    this.dispatch(this.deleteAction(idx));
  }

  handleChangeType(idx: number, type: ModuleMethodParamType) {
    const item = this.getView()[idx];
    item.dispatch(
      multiChangeAction({
        defaultValue: item.children.defaultValue.changeValueAction({ compType: type }),
        test: item.children.test.changeValueAction({ compType: type }),
        type: item.children.type.changeValueAction(type),
      })
    );
  }
  propertyView(
    params: ControlParams & {
      onParamsConfigChange: () => void;
    }
  ): JSX.Element {
    const { onParamsConfigChange, ...otherParams } = params;
    return (
      <ControlPropertyViewWrapper {...otherParams}>
        <PropertyView
          onAdd={() => this.handleAdd()}
          onDelete={(i) => this.handleDelete(i)}
          onParamsConfigChange={onParamsConfigChange}
          onTypeChange={(i, type) => this.handleChangeType(i, type)}
          comp={this}
        />
      </ControlPropertyViewWrapper>
    );
  }

  getTestView() {
    const children = this.getView();
    const fields = children.map((i: any) => i.getTestView());
    if (fields.length === 0) {
      return null;
    }
    return <>{fields}</>;
  }

  getParamsData() {
    const ret: Record<string, any> = {};
    this.getView().forEach((i) => {
      const name = i.children.name.getView();
      const testValue = i.children.test.getView();
      const defaultValue = i.children.defaultValue.getView();
      if (!!i.children.test.children.comp.unevaledValue) {
        ret[name] = testValue;
        return;
      }
      return (ret[name] = defaultValue);
    });
    return ret;
  }

  getParams() {
    const params = this.getView().map((i) => {
      const defaultValue = i.children.defaultValue.getView();
      const testValue = i.children.test.getView();
      if (!!i.children.test.children.comp.unevaledValue) {
        return testValue;
      }
      return defaultValue;
    });
    return params;
  }
}

export default ModuleMethodParamListComp;

interface PropertyViewProps {
  onAdd: () => void;
  onDelete: (idx: number) => void;
  onTypeChange: (idx: number, type: ModuleMethodParamType) => void;
  onParamsConfigChange: () => void;
  comp: InstanceType<typeof ModuleMethodParamListComp>;
}

function PropertyView(props: PropertyViewProps) {
  const { onDelete, onTypeChange, onAdd, onParamsConfigChange, comp } = props;
  const items = comp.getView();

  useEffect(() => {
    onParamsConfigChange();
  }, [comp, onParamsConfigChange]);

  return (
    <div>
      <KeyValueItemListWithNewCreateState
        title={trans("module.params")}
        keyTitle={trans("module.name")}
        valueTitle={trans("prop.type")}
        emptyText={trans("module.emptyParams")}
        onAdd={onAdd}
      >
        {(newIdx) =>
          items.map((i, idx) => (
            <ParamItem
              key={idx}
              {...i.children}
              onDelete={() => onDelete(idx)}
              onTypeChange={(value) => onTypeChange(idx, value as ModuleMethodParamType)}
              defaultShowPopover={idx === newIdx}
            />
          ))
        }
      </KeyValueItemListWithNewCreateState>
    </div>
  );
}

interface ParamItemProps {
  name: InstanceType<typeof CompNameControl>;
  defaultValue: any;
  type: InstanceType<ReturnType<typeof dropdownControl>>;
  description: InstanceType<typeof StringControl>;
  onDelete: () => void;
  onTypeChange: (value: string) => void;
  defaultShowPopover: boolean;
}

function ParamItem(props: ParamItemProps) {
  const { name, type, description, defaultValue, onDelete, onTypeChange } = props;
  const label = getParamOptionLabel(type.getView() as ModuleMethodParamType);
  const [cnLabel] = label.split(" ");

  const content = (
    <>
      {name.propertyView({ label: trans("module.name") })}
      {type.propertyView({
        label: trans("prop.type"),
        onChange: onTypeChange,
        disableDispatchValueChange: true,
      })}
      {defaultValue.children.comp.propertyView({ label: trans("prop.defaultValue") })}
      {description.propertyView({ label: trans("labelProp.tooltip") })}
    </>
  );

  return (
    <KeyValueItem
      del={onDelete}
      name={name.getView()}
      value={cnLabel}
      clickPopoverContent={content}
      defaultShowPopover={props.defaultShowPopover}
    />
  );
}
