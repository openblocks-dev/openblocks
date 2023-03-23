import { DropdownContainer, OptionsType, ValueFromOption } from "components/Dropdown";
import { SimpleComp } from "openblocks-core";
import { ControlParams, ControlPlacement } from "./controlParams";
import { ReactNode } from "react";
import { Tooltip, ToolTipLabel } from "components/toolTip";
import { CustomSelect } from "components/customSelect";
import styled from "styled-components";
import { EllipsisTextCss } from "components/Label";
import _ from "lodash";

const LabelWrapper = styled.div<{ placement: ControlPlacement }>`
  flex-shrink: 0;
  width: ${(props) => (props.placement === "right" ? "96px" : "bottom" ? "112px" : "136px")};
`;

const DropDownItemLabel = styled.div`
  ${EllipsisTextCss};
  width: 100%;
  font-size: 13px;
  line-height: 15px;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  align-items: center;

  .ant-select .ant-select-selector {
    margin: 0;
  }

  .ant-select-selection-item {
    height: 26px;
  }
`;

export function multiSelectControl<T extends OptionsType>(
  options: T,
  defaultValue: ValueFromOption<T>[]
) {
  return class extends SimpleComp<ValueFromOption<T>[]> {
    override getDefaultValue() {
      return defaultValue;
    }

    propertyView(
      params: ControlParams & {
        border?: boolean;
        disabled?: boolean;
        // parent comp may batch dispatch in some cases
        disableDispatchValueChange?: boolean;
        onChange?: (value: string) => void;
      }
    ): ReactNode {
      const { placement = "right" } = params;
      const valueInfoMap = _.fromPairs(options.map((option) => [option.value, option]));

      return (
        <FlexDiv>
          {params.label && (
            <LabelWrapper placement={placement}>
              <ToolTipLabel title={params.tooltip} label={params.label} />
            </LabelWrapper>
          )}

          <Tooltip title={!params.label ? params.tooltip : undefined}>
            <DropdownContainer placement={placement}>
              <CustomSelect
                mode={"multiple"}
                dropdownClassName="ob-dropdown-control-select"
                filterOption={(input, option) => {
                  if (!option?.value) {
                    return false;
                  }
                  const label = valueInfoMap[option.value].label;
                  if (
                    typeof label === "number" ||
                    typeof label === "string" ||
                    typeof label === "boolean"
                  ) {
                    return label.toString().toLowerCase().includes(input);
                  }
                  return false;
                }}
                border={params.border}
                defaultValue={this.getDefaultValue()}
                value={this.value}
                style={{ width: "100%" }}
                onChange={(value) => {
                  if (!params.disableDispatchValueChange) {
                    this.dispatchChangeValueAction(value);
                  }
                  params.onChange?.(value);
                }}
                disabled={params.disabled}
                allowClear={true}
                placeholder={params.placeholder}
                optionLabelProp="children"
              >
                {options.map((item) => (
                  <CustomSelect.Option key={item.value} value={item.value}>
                    <DropDownItemLabel>{item.label}</DropDownItemLabel>
                  </CustomSelect.Option>
                ))}
              </CustomSelect>
            </DropdownContainer>
          </Tooltip>
        </FlexDiv>
      );
    }

    getPropertyView(): ReactNode {
      throw new Error("Method not implemented.");
    }
  };
}
