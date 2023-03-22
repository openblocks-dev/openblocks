import {
  changeChildAction,
  DispatchType,
  RecordConstructorToComp,
  RecordConstructorToView,
} from "openblocks-core";
import { BoolControl } from "../../controls/boolControl";
import { LabelControl } from "../../controls/labelControl";
import { BoolCodeControl, StringControl } from "../../controls/codeControl";
import {
  ControlNode,
  isDarkColor,
  lightenColor,
  MultiselectTagIcon,
  Section,
  sectionNames,
} from "openblocks-design";
import { SelectOptionControl } from "../../controls/optionsControl";
import { SelectEventHandlerControl } from "../../controls/eventHandlerControl";
import { Select as AntdSelect } from "antd";
import { ControlParams } from "../../controls/controlParams";
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  SelectInputValidationChildren,
  SelectInputValidationSection,
} from "./selectInputConstants";
import { formDataChildren, FormDataPropertyView } from "../formComp/formDataConstants";
import {
  CascaderStyleType,
  MultiSelectStyleType,
  SelectStyleType,
  TreeSelectStyleType,
} from "comps/controls/styleControlConstants";
import { stateComp } from "../../generators";
import {
  allowClearPropertyView,
  disabledPropertyView,
  hiddenPropertyView,
  placeholderPropertyView,
  showSearchPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { hasIcon } from "comps/utils";
import { RefControl } from "comps/controls/refControl";
import { BaseSelectRef } from "rc-select";
import { refMethods } from "comps/generators/withMethodExposing";
import { blurMethod, focusMethod } from "comps/utils/methodUtils";

export const getStyle = (
  style: SelectStyleType | MultiSelectStyleType | CascaderStyleType | TreeSelectStyleType
) => {
  return css`
    &.ant-select .ant-select-selector,
    &.ant-select-multiple .ant-select-selection-item {
      border-radius: ${style.radius};
    }

    &.ant-select:not(.ant-select-disabled) {
      color: ${style.text};

      .ant-select-selection-placeholder,
      &.ant-select-single.ant-select-open .ant-select-selection-item {
        color: ${style.text};
        opacity: 0.4;
      }

      .ant-select-selector {
        background-color: ${style.background};
        border-color: ${style.border};
      }

      &.ant-select-focused,
      &:hover {
        .ant-select-selector {
          border-color: ${style.accent};
        }
      }

      .ant-select-arrow,
      .ant-select-clear {
        background-color: ${style.background};
        color: ${style.text === "#222222"
          ? "#8B8FA3"
          : isDarkColor(style.text)
          ? lightenColor(style.text, 0.2)
          : style.text};
      }

      .ant-select-clear:hover {
        color: ${style.text === "#222222"
          ? "#8B8FA3"
          : isDarkColor(style.text)
          ? lightenColor(style.text, 0.1)
          : style.text};
      }

      &.ant-select-multiple .ant-select-selection-item {
        border: none;
        background-color: ${(style as MultiSelectStyleType).tags};
        color: ${(style as MultiSelectStyleType).tagsText};
        border-radius: ${style.radius};

        .ant-select-selection-item-remove {
          color: ${(style as MultiSelectStyleType).tagsText};
          opacity: 0.5;
        }
      }
    }
  `;
};

const getDropdownStyle = (style: MultiSelectStyleType) => {
  return css`
    padding: 8px 0;

    .ant-select-item-option-selected {
      font-weight: 600;
      background-color: transparent;
    }

    .ant-select-item {
      border-radius: 4px;
      margin: 0 8px;
      padding: 5px 8px;

      :hover {
        background-color: rgb(242, 247, 252);
      }

      .ant-select-item-option-state {
        display: inline-flex;
        align-items: center;

        path {
          fill: ${style.multiIcon};
        }
      }
    }
  `;
};

const Select = styled(AntdSelect)<{ $style: SelectStyleType & MultiSelectStyleType }>`
  width: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const DropdownStyled = styled.div<{ $style: MultiSelectStyleType }>`
  ${(props) => props.$style && getDropdownStyle(props.$style)}
  .option-label img {
    min-width: 14px;
    margin-right: 0;
  }
`;

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  img {
    margin-right: -6px;
  }
`;

export const SelectChildrenMap = {
  label: LabelControl,
  placeholder: StringControl,
  disabled: BoolCodeControl,
  onEvent: SelectEventHandlerControl,
  options: SelectOptionControl,
  allowClear: BoolControl,
  inputValue: stateComp<string>(""), // user's input value when search
  showSearch: BoolControl.DEFAULT_TRUE,
  viewRef: RefControl<BaseSelectRef>,
  ...SelectInputValidationChildren,
  ...formDataChildren,
};

export const SelectUIView = (
  props: RecordConstructorToView<typeof SelectChildrenMap> & {
    mode?: "multiple" | "tags";
    value: any;
    style: SelectStyleType | MultiSelectStyleType;
    onChange: (value: any) => void;
    dispatch: DispatchType;
  }
) => (
  <Select
    ref={props.viewRef}
    mode={props.mode}
    $style={props.style as SelectStyleType & MultiSelectStyleType}
    disabled={props.disabled}
    allowClear={props.allowClear}
    placeholder={props.placeholder}
    value={props.value}
    showSearch={props.showSearch}
    filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
    dropdownRender={(originNode: ReactNode) => (
      <DropdownStyled $style={props.style as MultiSelectStyleType}>{originNode}</DropdownStyled>
    )}
    dropdownStyle={{
      padding: 0,
    }}
    menuItemSelectedIcon={props.mode ? <MultiselectTagIcon title="" /> : ""}
    onChange={props.onChange}
    onFocus={() => props.onEvent("focus")}
    onBlur={() => props.onEvent("blur")}
    onSearch={
      props.showSearch
        ? (value) => {
            props.dispatch(changeChildAction("inputValue", value, false));
          }
        : undefined
    }
  >
    {props.options
      .filter((option) => option.value !== undefined && !option.hidden)
      .map((option) => (
        <Select.Option
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          key={option.value}
        >
          <Wrapper className="option-label">
            {props.options.findIndex((option) => hasIcon(option.prefixIcon)) > -1 &&
              option.prefixIcon}
            {<span>{option.label}</span>}
          </Wrapper>
        </Select.Option>
      ))}
  </Select>
);

export const SelectPropertyView = (
  children: RecordConstructorToComp<
    typeof SelectChildrenMap & {
      hidden: typeof BoolCodeControl;
    }
  > & {
    value: { propertyView: (params: ControlParams) => ControlNode };
    style: { getPropertyView: () => ControlNode };
  }
) => (
  <>
    <Section name={sectionNames.basic}>
      {children.options.propertyView({})}
      {children.value.propertyView({ label: trans("prop.defaultValue") })}
      {placeholderPropertyView(children)}
    </Section>
    <FormDataPropertyView {...children} />
    {children.label.getPropertyView()}

    <Section name={sectionNames.interaction}>
      {children.onEvent.getPropertyView()}
      {disabledPropertyView(children)}
    </Section>

    <Section name={sectionNames.advanced}>
      {allowClearPropertyView(children)}
      {showSearchPropertyView(children)}
    </Section>

    <SelectInputValidationSection {...children} />

    <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
    <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
  </>
);

export const baseSelectRefMethods = refMethods<BaseSelectRef>([focusMethod, blurMethod]);
