import { MultiCompBuilder } from "comps/generators";
import { CompAction, CompActionTypes } from "openblocks-core";
import { OptionsType, ValueFromOption } from "openblocks-design";
import { ReactNode } from "react";
import { ControlPlacement } from "./controlParams";
import { dropdownControl } from "./dropdownControl";
import { numberSimpleControl } from "./numberSimpleControl";

interface DropdownInputControlParams {
  dropdownLabel?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  placement?: ControlPlacement;
  min?: number;
  lastNode?: ReactNode;
  labelStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export function dropdownInputSimpleControl(
  options: OptionsType,
  userDefineValue: string,
  dropdownDefaultValue: ValueFromOption<OptionsType>,
  inputDefaultValue?: number
) {
  const childrenMap = {
    dropdown: dropdownControl(options, dropdownDefaultValue),
    input: numberSimpleControl(inputDefaultValue),
  };
  const DropdownInputAbstractControl = new MultiCompBuilder(childrenMap, (props) => {
    const dropdownValue = props.dropdown;
    return dropdownValue === userDefineValue ? props.input?.toString() : dropdownValue;
  })
    .setPropertyViewFn(() => <></>)
    .build();

  class DropdownInputControl extends DropdownInputAbstractControl {
    propertyView(params: DropdownInputControlParams) {
      const dropdownPropertyView = this.children.dropdown.propertyView({
        ...params,
        label: params.dropdownLabel,
      });
      const dropdownValue = this.children.dropdown.getView();
      if (dropdownValue !== userDefineValue) {
        return dropdownPropertyView;
      }
      const inputPropertyView = this.children.input.propertyView({
        ...params,
        label: params.inputLabel,
        placeholder: params.inputPlaceholder,
      });
      return (
        <>
          {dropdownPropertyView}
          {inputPropertyView}
        </>
      );
    }
    override reduce(action: CompAction): this {
      let comp = super.reduce(action);
      if (
        action.type === CompActionTypes.CHANGE_VALUE &&
        action.path?.[0] === "dropdown" &&
        action.value !== userDefineValue
      ) {
        // change input and dropdown synchronously
        comp = comp.reduce(comp.changeChildAction("input", action.value));
      }
      return comp;
    }
  }

  return DropdownInputControl;
}
