import { Segmented as AntdSegmented, SelectProps } from "antd";
import { GreyTextColor } from "constants/style";
import _ from "lodash";
import { ReactNode } from "react";
import styled from "styled-components";
import { CustomSelect } from "./customSelect";
import { EllipsisTextCss } from "./Label";
import { TacoMarkDown } from "./markdown";
import { Tooltip, ToolTipLabel } from "./toolTip";

type ControlPlacement = "bottom" | "right" | "modal";

export const DropdownContainer = styled.div<{ placement: ControlPlacement }>`
  display: flex;
  height: 32px;
  width: ${(props) =>
    props.placement === "right"
      ? "calc(100% - 96px)"
      : "bottom"
      ? "calc(100% - 112px)"
      : "calc(100% - 136px"};
  flex-grow: 1;

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    font-size: 13px;
    line-height: 13px;
  }

  .ant-select-selection-item {
    height: 30px;
  }

  .ant-select-show-search:not(.ant-select-open) .ant-select-selector {
    cursor: pointer !important;
  }

  > div {
    width: 100%;
  }

  ${(props) =>
    props.placement === "bottom" &&
    `
    > div {
      width: 184px;
      flex-grow: 1;
    }
    
    ::after {
      content: "";
      width: 264px;
      flex-grow: 1;
    }`}
`;

const DropDownItemLabel = styled.div`
  ${EllipsisTextCss};
  width: 100%;
  font-size: 13px;
  line-height: 15px;
`;

const SegmentedWrapper = styled.div<{ placement: ControlPlacement }>`
  display: flex;
  height: 28px;
  width: ${(props) => (props.placement === "right" ? "calc(100% - 96px)" : "100% - 112px")};
  flex-grow: 1;

  ${(props) =>
    props.placement === "bottom" &&
    `
    > div {
      width: 184px;
      flex-grow: 1;
    }
    
    ::after {
      content: "";
      width: 264px;
      flex-grow: 1;
    }`}
`;
const Segmented = styled(AntdSegmented)`
  width: 100%;
  max-width: 280px;
  height: 100%;
  border-radius: 6px;
  background-color: #efeff1;

  color: #8b8fa3;
  font-size: 12px;

  .ant-segmented-item-selected {
    height: 100%;
    border-radius: 4px;
    font-weight: 500;
    color: #222222;

    g {
      stroke: #222222;
    }
  }

  .ant-segmented-item-label {
    height: 100%;
    min-height: 24px;
    line-height: 24px;
  }

  svg {
    height: 100%;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const LabelWrapper = styled.div<{ placement: ControlPlacement }>`
  flex-shrink: 0;
  width: ${(props) => (props.placement === "right" ? "96px" : "bottom" ? "112px" : "136px")};
`;

export type OptionType = {
  readonly label: ReactNode;
  readonly value: string;
  [key: string]: any;
};
export type OptionsType = readonly OptionType[];
export type ValueFromOption<Options extends OptionsType> = Options[number]["value"];

interface DropdownProps<T extends OptionsType> extends Omit<SelectProps, "placement" | "options"> {
  label?: ReactNode;
  options: T;
  defaultValue?: ValueFromOption<T>;
  value?: ValueFromOption<T>;
  onChange: (value: ValueFromOption<T>) => void;
  radioButton?: boolean;
  border?: boolean;
  type?: "oneline";
  toolTip?: string | React.ReactNode;
  placement?: ControlPlacement;
  itemNode?: (value: string) => JSX.Element;
  preNode?: () => JSX.Element;
  lineHeight?: number;
  labelStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  className?: string;
}

export function Dropdown<T extends OptionsType>(props: DropdownProps<T>) {
  const { placement = "right" } = props;
  const valueInfoMap = _.fromPairs(props.options.map((option) => [option.value, option]));
  return (
    <FlexDiv style={props.style} className={props.className}>
      {props.label && (
        <LabelWrapper placement={placement} style={props.labelStyle}>
          <ToolTipLabel title={props.toolTip} label={props.label} />
        </LabelWrapper>
      )}

      {!props.radioButton && (
        <Tooltip title={!props.label ? props.toolTip : undefined}>
          <DropdownContainer placement={placement} style={props.dropdownStyle}>
            <CustomSelect
              open={props.open}
              listHeight={props.lineHeight}
              dropdownClassName="ob-dropdown-control-select"
              showSearch={props.showSearch}
              filterOption={(input, option) => {
                if (props.optionFilterProp) {
                  const value = (option as any)[props.optionFilterProp];
                  if (value && typeof value === "string") {
                    return value.toLowerCase().includes(input.toLowerCase());
                  }
                }

                if (!option?.value) {
                  return false;
                }
                const label = valueInfoMap[option.value].label;
                if (
                  typeof label === "number" ||
                  typeof label === "string" ||
                  typeof label === "boolean"
                ) {
                  return label.toString().toLowerCase().includes(input.toLowerCase());
                }
                return false;
              }}
              border={props.border}
              defaultValue={props.defaultValue}
              value={props.value}
              style={{ width: "100%" }}
              onChange={(x) => props.onChange(x)}
              disabled={props.disabled}
              allowClear={props.allowClear}
              placeholder={props.placeholder}
              optionLabelProp={props.optionLabelProp}
              dropdownRender={(menu) =>
                props.preNode ? (
                  <>
                    {props.preNode()}
                    {menu}
                  </>
                ) : (
                  menu
                )
              }
            >
              {props.options.map((item) => {
                const { value, label, ...others } = item;
                return (
                  <CustomSelect.Option key={value} value={value} {...others}>
                    {props.itemNode ? (
                      props.itemNode(value)
                    ) : (
                      <DropDownItemLabel>{label}</DropDownItemLabel>
                    )}
                  </CustomSelect.Option>
                );
              })}
            </CustomSelect>
          </DropdownContainer>
        </Tooltip>
      )}

      {props.radioButton && (
        <SegmentedWrapper placement={placement}>
          <Segmented
            block={true}
            onChange={(value) => props.onChange(value.toString())}
            defaultValue={props.defaultValue}
            value={props.value}
            options={props.options as any}
          />
        </SegmentedWrapper>
      )}
    </FlexDiv>
  );
}

interface DropdownOptionLabelWithDescProps {
  label: string;
  description: string;
}

const DropdownOptionDesc = styled.div`
  font-size: 12px;
  max-width: 600px;
  white-space: normal;

  .markdown-body {
    font-size: 12px;
    background-color: transparent;

    p {
      margin-bottom: 4px;
      color: ${GreyTextColor};
    }
  }
`;

export function DropdownOptionLabelWithDesc(props: DropdownOptionLabelWithDescProps) {
  const { label, description } = props;
  return (
    <div style={{ padding: 0 }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {description && (
        <DropdownOptionDesc>
          <TacoMarkDown>{description}</TacoMarkDown>
        </DropdownOptionDesc>
      )}
    </div>
  );
}
