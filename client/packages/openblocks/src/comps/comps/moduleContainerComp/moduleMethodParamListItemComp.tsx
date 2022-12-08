import {
  JSONValueControl,
  StringControl,
  NumberControl,
  BoolCodeControl,
} from "comps/controls/codeControl";
import CompNameControl from "comps/controls/compNameControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { withType, MultiCompBuilder } from "comps/generators";
import { Fragment, useEffect } from "react";
import { trans } from "i18n";

export const paramControls = {
  JSONValue: JSONValueControl,
  string: StringControl,
  number: NumberControl,
  boolean: BoolCodeControl,
};

const typeOptions = [
  {
    label: trans("module.data"),
    value: "JSONValue",
  },
  {
    label: trans("module.string"),
    value: "string",
  },
  {
    label: trans("module.number"),
    value: "number",
  },
  {
    label: trans("module.boolean"),
    value: "boolean",
  },
];

export type ModuleMethodParamType = keyof typeof paramControls;

interface TestViewProps {
  itemComp: ParamListItemComp;
}

function TestView(props: TestViewProps) {
  const { itemComp } = props;
  const { name, type } = itemComp.getView();
  const testType = itemComp.children.test.children.compType.getView();
  const defaultType = itemComp.children.defaultValue.children.compType.getView();

  useEffect(() => {
    if (!type) {
      return;
    }
    if (testType !== type) {
      itemComp.children.test.dispatchChangeValueAction({ compType: type as ModuleMethodParamType });
    }
    if (defaultType !== type) {
      itemComp.children.defaultValue.dispatchChangeValueAction({
        compType: type as ModuleMethodParamType,
      });
    }
  }, [defaultType, itemComp.children.defaultValue, itemComp.children.test, testType, type]);

  return <Fragment>{itemComp.children.test.children.comp.propertyView({ label: name })}</Fragment>;
}

const childrenMap = {
  name: CompNameControl,
  description: StringControl,
  type: dropdownControl(typeOptions, "JSONValue"),
  defaultValue: withType(paramControls, "JSONValue"),
  test: withType(paramControls, "JSONValue"),
};

const ParamListItemCompBase = new MultiCompBuilder(childrenMap, (props) => {
  return props;
}).build();

class ParamListItemComp extends ParamListItemCompBase {
  getTestView() {
    const { name } = this.getView();
    return <TestView key={name} itemComp={this} />;
  }
}

export const getParamOptionLabel = (value: ModuleMethodParamType) => {
  return typeOptions.find((i) => i.value === value)?.label || value;
};

export default ParamListItemComp;
