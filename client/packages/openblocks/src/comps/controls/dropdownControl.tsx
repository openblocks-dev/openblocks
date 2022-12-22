import { SimpleAbstractComp } from "openblocks-core";
import {
  AlignBottom,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignTop,
  Dropdown,
  OptionsType,
  ValueFromOption,
} from "openblocks-design";
import { ReactNode } from "react";
import { ControlParams } from "./controlParams";

/**
 * Leave a getView method unimplemented, because the type cannot be changed by inheritance
 */
export function dropdownAbstractControl<T extends OptionsType>(
  options: T,
  defaultValue: ValueFromOption<T>
) {
  abstract class DropdownControl extends SimpleAbstractComp<ValueFromOption<T>> {
    override getDefaultValue(): ValueFromOption<T> {
      return defaultValue;
    }

    propertyView(
      params: ControlParams & {
        radioButton?: boolean;
        border?: boolean;
        type?: "oneline";
        disabled?: boolean;
        // parent comp may batch dispatch in some cases
        disableDispatchValueChange?: boolean;
        onChange?: (value: string) => void;
        options?: T;
        showSearch?: boolean;
      }
    ): ReactNode {
      let finalOptions = options;
      if (finalOptions.length === 0 && params.options) {
        finalOptions = params.options;
      }
      return (
        <Dropdown
          placement={params.placement}
          toolTip={params.tooltip}
          value={this.value}
          options={finalOptions}
          radioButton={params.radioButton}
          border={params.border}
          type={params.type}
          label={params.label}
          showSearch={params.showSearch}
          onChange={(value) => {
            if (!params.disableDispatchValueChange) {
              this.dispatchChangeValueAction(value);
            }
            params.onChange?.(value);
          }}
          disabled={params.disabled}
        />
      );
    }

    getPropertyView(): ReactNode {
      throw new Error("Method not implemented.");
    }
  }

  return DropdownControl;
}

export function dropdownControl<T extends OptionsType>(
  options: T,
  defaultValue: ValueFromOption<T>
) {
  return class extends dropdownAbstractControl(options, defaultValue) {
    override getView() {
      return this.value;
    }
  };
}

const alignOptions = [
  { label: <AlignLeft />, value: "left" },
  { label: <AlignCenter />, value: "center" },
  { label: <AlignRight />, value: "right" },
] as const;

const positionOptions = [
  { label: <AlignTop />, value: "top" },
  { label: <AlignBottom />, value: "bottom" },
  { label: <AlignLeft />, value: "left" },
  { label: <AlignRight />, value: "right" },
] as const;

const sideOptions = [
  { label: <AlignLeft />, value: "left" },
  { label: <AlignRight />, value: "right" },
] as const;

const alignWithStretchOptions = [
  { label: <AlignLeft />, value: "left" },
  { label: <AlignCenter />, value: "center" },
  { label: <AlignRight />, value: "right" },
  { label: <AlignJustify />, value: "stretch" },
] as const;

export const HorizontalAlignmentControl = dropdownControl(alignOptions, "left");

export const PositionControl = dropdownControl(positionOptions, "right");

export const LeftRightControl = dropdownControl(sideOptions, "right");

export const AlignWithStretchControl = dropdownControl(alignWithStretchOptions, "stretch");
