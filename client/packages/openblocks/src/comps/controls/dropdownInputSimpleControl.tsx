import { CompAction, changeChildAction, CompActionTypes } from "openblocks-core";
import { MultiCompBuilder } from "comps/generators";
import { OptionsType, ValueFromOption } from "openblocks-design";
import { ControlPlacement } from "./controlParams";
import { dropdownControl } from "./dropdownControl";
import { stringSimpleControl } from "./stringSimpleControl";

interface DropdownInputControlParams {
  dropdownLabel?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  placement?: ControlPlacement;
}

export function dropdownInputSimpleControl(
  options: OptionsType,
  userDefineValue: string,
  dropdownDefaultValue: ValueFromOption<OptionsType>,
  inputDefaultValue?: string
) {
  const childrenMap = {
    dropdown: dropdownControl(options, dropdownDefaultValue),
    input: stringSimpleControl(inputDefaultValue),
  };
  const DropdownInputAbstractControl = new MultiCompBuilder(childrenMap, (props) => {
    const dropdownValue = props.dropdown;
    return dropdownValue === userDefineValue ? props.input : dropdownValue;
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
        comp = comp.reduce(changeChildAction("input", action.value));
      }
      return comp;
    }
  }

  return DropdownInputControl;
}
