import { SimpleAbstractComp } from "openblocks-core";
import {
  AlignBottom,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignTop,
  controlItem,
  Dropdown,
  OptionsType,
  ValueFromOption,
} from "openblocks-design";
import { ReactNode, useEffect, useState } from "react";
import { ControlParams } from "./controlParams";

type DropdownOptions<T extends OptionsType> = T | (() => Promise<T>);

interface DropdownControlParams<T extends OptionsType> extends ControlParams {
  radioButton?: boolean;
  border?: boolean;
  type?: "oneline";
  disabled?: boolean;
  // parent comp may batch dispatch in some cases
  disableDispatchValueChange?: boolean;
  onChange?: (value: string) => void;
  options?: T;
  showSearch?: boolean;
  dropdownStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

interface DropdownPropertyViewProps<T extends OptionsType>
  extends Omit<DropdownControlParams<T>, "options"> {
  options: DropdownOptions<T>;
  onChange: (value: ValueFromOption<T>) => void;
  value: ValueFromOption<T>;
}

function DropdownPropertyView<T extends OptionsType>(props: DropdownPropertyViewProps<T>) {
  const { options, onChange, value, ...params } = props;
  const [finalOptions, setFinalOptions] = useState<T>(
    typeof options === "function" ? ([] as unknown as T) : options
  );

  useEffect(() => {
    if (typeof options !== "function") {
      setFinalOptions(options);
      return;
    }
    if (!finalOptions?.length) {
      options().then((items) => setFinalOptions(items));
    }
  }, [finalOptions.length, options]);

  return (
    <Dropdown
      placement={params.placement}
      toolTip={params.tooltip}
      value={value}
      options={finalOptions}
      radioButton={params.radioButton}
      border={params.border}
      type={params.type}
      label={params.label}
      showSearch={params.showSearch}
      onChange={onChange}
      disabled={params.disabled}
      dropdownStyle={props.dropdownStyle}
      labelStyle={props.labelStyle}
    />
  );
}

/**
 * Leave a getView method unimplemented, because the type cannot be changed by inheritance
 */
export function dropdownAbstractControl<T extends OptionsType>(
  options: T | (() => Promise<T>),
  defaultValue: ValueFromOption<T>
) {
  abstract class DropdownControl extends SimpleAbstractComp<ValueFromOption<T>> {
    override getDefaultValue(): ValueFromOption<T> {
      return defaultValue;
    }

    propertyView(params: DropdownControlParams<T>) {
      let finalOptions = options;
      if (finalOptions.length === 0 && typeof finalOptions !== "function" && params.options) {
        finalOptions = params.options;
      }
      return controlItem(
        { filterText: params.label },
        <DropdownPropertyView<T>
          value={this.value}
          options={finalOptions}
          onChange={(value) => {
            if (!params.disableDispatchValueChange) {
              this.dispatchChangeValueAction(value);
            }
            params.onChange?.(value);
          }}
          {...params}
        />
      );
    }

    getPropertyView(): ReactNode {
      throw new Error("Method not implemented.");
    }
  }

  return DropdownControl;
}

export type DropdownControlType = ReturnType<typeof dropdownControl>;

export function dropdownControl<T extends OptionsType>(
  options: T | (() => Promise<T>),
  defaultValue: ValueFromOption<T>
) {
  return class extends dropdownAbstractControl(options, defaultValue) {
    override getView() {
      return this.value;
    }
  };
}

export const alignOptions = [
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
