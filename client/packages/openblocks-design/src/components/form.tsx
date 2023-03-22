import {
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Radio,
  Select,
  SelectProps,
} from "antd";
import { ReactNode } from "react";
import { CheckBox } from "./checkBox";
import { CustomSelect } from "./customSelect";
import { EllipsisTextCss, labelCss } from "./Label";
import { ToolTipLabel } from "./toolTip";
import styled from "styled-components";
import { ReactComponent as Star } from "icons/icon-star.svg";
import { FormItemProps as AntdFormItemProps } from "antd/lib/form/FormItem";
import _ from "lodash";
import { KeyValueList } from "./keyValueList";
import { OptionsType, ValueFromOption } from "./Dropdown";
import { RadioGroupProps } from "antd/lib/radio/interface";
import { TextAreaProps } from "antd/lib/input";

export type FormSize = "middle" | "small";

const FormItem = styled(Form.Item)`
  min-width: 0;
  flex-grow: 1;
  margin: 0;
  line-height: 13px;

  .ant-form-item-explain {
    font-size: 12px;
  }

  .ant-form-item-control-input {
    min-height: auto;
  }

  .ant-input {
    width: 100%;
  }
`;
const FormInput = styled(Input)`
  &:not(.ant-input-affix-wrapper-disabled) {
    background: #ffffff;
  }

  border: 1px solid #d7d9e0;
  border-radius: 4px;
`;

const FormNumberInput = styled(InputNumber)`
  &:not(.ant-input-number-affix-wrapper-disabled) &:not(.ant-input-number-disabled) {
    background: #ffffff;
  }

  border: 1px solid #d7d9e0;
  border-radius: 4px;
`;

const FormInputPassword = styled(Input)`
  &:not(.ant-input-affix-wrapper-disabled) {
    background: #ffffff;
  }

  border: 1px solid #d7d9e0;
  border-radius: 4px;
`;

const FormTextArea = styled(Input.TextArea)`
  background: #ffffff;
`;

const FormCheckbox = styled(CheckBox)`
  width: 448px;
  height: 16px;

  font-size: 13px;
  color: #8b8fa3;
  line-height: 13px;
`;

const StartIcon = styled(Star)`
  margin-right: 4px;
  flex-shrink: 0;
`;
const LabelDiv = styled.div<{ width?: number }>`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  margin-right: 8px;
  width: ${(props) => props.width || 122}px;
  flex-shrink: 0;
`;
const FormItemContain = styled.div`
  width: 100%;
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: nowrap;

  div > .ant-input:hover {
    border: 1px solid #8b8fa3;
  }

  div > .ant-input:focus,
  div > .ant-input-focused {
    border: 1px solid #3377ff;
    box-shadow: 0 0 0 2px #d6e4ff;
  }

  div > .ant-input[disabled] {
    background-color: #f5f5f6;
  }

  div > .ant-input[disabled]:hover {
    border-color: #d7d9e0;
  }
`;
export const FormSectionLabel = styled.label`
  ${labelCss};

  font-size: 13px;
  color: #8b8fa3;
  line-height: 13px;
  user-select: text;
  margin-right: auto;
  overflow: hidden;
  max-width: 100px;
`;
export const FormSection = styled.div<{ size?: FormSize }>`
  width: 100%;

  .taco-form-item-wrapper {
    padding-left: ${(props) => (props.size === "middle" ? "24px" : "0")};
  }
`;

export interface FormItemProps extends AntdFormItemProps {
  disabled?: boolean;
  label?: ReactNode;
  required?: boolean;
  placeholder?: string;
  help?: ReactNode;
  labelWidth?: number;
}

const FormItemLabel = (props: Partial<FormItemProps>) => {
  const isRequired =
    props.required || !!props.rules?.find((i) => typeof i === "object" && i.required);
  return (
    <LabelDiv width={props.labelWidth}>
      <StartIcon style={{ visibility: isRequired ? "visible" : "hidden" }} />
      <ToolTipLabel title={props.help} label={props.label} labelStyle={{ fontSize: "14px" }} />
    </LabelDiv>
  );
};

export const FormNumberInputItem = (props: FormItemProps & InputNumberProps) => {
  const { labelWidth, initialValue, ...restProps } = props;
  return (
    <FormItemContain className={"taco-form-item-wrapper"}>
      {props.label && <FormItemLabel {...props} />}
      <FormItem
        name={props.name}
        rules={props.rules}
        initialValue={props.initialValue}
        validateFirst={true}
        hasFeedback={true}
      >
        <FormNumberInput
          {...restProps}
          autoComplete={"off"}
          disabled={props.disabled}
          placeholder={props.placeholder}
        />
      </FormItem>
    </FormItemContain>
  );
};

export const FormInputItem = (props: FormItemProps & InputProps) => {
  const { labelWidth, initialValue, ...restProps } = props;
  return (
    <FormItemContain className={"taco-form-item-wrapper"}>
      {props.label && <FormItemLabel {...props} />}
      <FormItem
        name={props.name}
        rules={props.rules}
        initialValue={props.initialValue}
        validateFirst={true}
        hasFeedback={true}
      >
        <FormInput
          {...restProps}
          autoComplete={"off"}
          disabled={props.disabled}
          placeholder={props.placeholder}
        />
      </FormItem>
    </FormItemContain>
  );
};

export const FormInputPasswordItem = (props: FormItemProps) => (
  <FormItemContain className={"taco-form-item-wrapper"}>
    <FormItemLabel {...props} />
    <FormItem
      rules={props.rules}
      name={props.name}
      initialValue={props.initialValue}
      validateFirst={true}
      hasFeedback={true}
    >
      <FormInputPassword
        type={"password"}
        autoComplete={"one-time-code"}
        disabled={props.disabled}
        placeholder={props.placeholder || "••••••••••••"}
      />
    </FormItem>
  </FormItemContain>
);

export const FormTextAreaItem = (props: FormItemProps & TextAreaProps) => (
  <FormItemContain className={"taco-form-item-wrapper"} style={{ alignItems: "center" }}>
    <FormItemLabel {...props} />
    <FormItem
      rules={props.rules}
      name={props.name}
      initialValue={props.initialValue}
      validateFirst={true}
      hasFeedback={true}
    >
      <FormTextArea
        autoComplete={"off"}
        disabled={props.disabled}
        placeholder={props.placeholder}
        autoSize={props.autoSize}
      />
    </FormItem>
  </FormItemContain>
);

const CustomCheckbox = (props: any) => {
  const { value, onChange } = props;
  return (
    <FormCheckbox
      disabled={props.disabled}
      defaultChecked={props.initialValue}
      checked={value}
      onChange={(v) => onChange(v?.target?.checked)}
    >
      <ToolTipLabel title={props.tooltip} label={props.label} />
    </FormCheckbox>
  );
};

export const FormCheckboxItem = (props: FormItemProps) => {
  return (
    <FormItemContain className={"taco-form-item-wrapper"}>
      <LabelDiv width={props.labelWidth} />
      <FormItem
        rules={props.rules}
        name={props.name}
        initialValue={props.initialValue}
        validateFirst={true}
      >
        <CustomCheckbox {...props} />
      </FormItem>
    </FormItemContain>
  );
};

export const FormRadioItem = (props: FormItemProps & RadioGroupProps) => {
  return (
    <FormItemContain className={"taco-form-item-wrapper"}>
      <FormItemLabel {...props} />
      <FormItem
        rules={props.rules}
        name={props.name}
        initialValue={props.initialValue}
        validateFirst={true}
      >
        <Radio.Group options={props.options}></Radio.Group>
      </FormItem>
    </FormItemContain>
  );
};

const SelectWrapper = styled.div`
  height: 32px;
  caret-color: transparent;
  flex-grow: 0;

  .ant-select .ant-select-selector {
    padding: 0 0 0 8px;
    margin: 0;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    font-size: 13px;
    line-height: 13px;
  }

  .ant-select-selection-item {
    height: 30px;
  }
`;

const SelectLabel = styled.div`
  ${EllipsisTextCss}
`;

const FormSelect = (props: any) => {
  const { value, onChange } = props;

  return (
    <SelectWrapper>
      <CustomSelect
        open={props.open}
        mode={props.mode}
        value={value}
        style={{
          width: "100%",
          minWidth: "120px",
          maxWidth: "100%",
        }}
        maxTagCount={"responsive" as const}
        onChange={(x) => {
          onChange(x);
          props.afterChange && props.afterChange(x);
        }}
        dropdownMatchSelectWidth={false}
        placeholder={props.placeholder}
        dropdownRender={props.dropdownRender}
      >
        {props.options?.map((item: any) => {
          return (
            <Select.Option key={item.value} value={item.value}>
              <SelectLabel>{item.label}</SelectLabel>
            </Select.Option>
          );
        })}
      </CustomSelect>
    </SelectWrapper>
  );
};

export interface FormSelectItemProps<T extends OptionsType>
  extends FormItemProps,
    Pick<SelectProps, "mode" | "open"> {
  options: T;
  afterChange?: (value: ValueFromOption<T>) => void;
}

export function FormSelectItem<T extends OptionsType>(props: FormSelectItemProps<T>) {
  return (
    <FormItemContain className={"taco-form-item-wrapper"}>
      {props.label && <FormItemLabel {...props} />}
      <FormItem
        rules={props.rules}
        name={props.name}
        initialValue={props.initialValue}
        validateFirst={true}
      >
        <FormSelect {...props} />
      </FormItem>
    </FormItemContain>
  );
}

const KeyInput = styled(FormInput)`
  width: 160px;
  margin-right: 8px;
`;
const ValueInput = styled(FormInput)`
  width: 256px;
`;
const FormKeyValueList = (props: any) => {
  const { value, onChange } = props;

  let items = value;
  if (_.isEmpty(items)) {
    items = [{ key: "", value: "" }];
  }
  return (
    <KeyValueList
      list={items.map((item: { key: string; value: string }, index: number) => (
        <>
          <KeyInput
            value={item.key}
            placeholder={"key"}
            onChange={(event) => {
              items[index].key = event.target.value;
              onChange([...items]);
            }}
          />
          <ValueInput
            value={item.value}
            placeholder={"value"}
            onChange={(event) => {
              items[index].value = event.target.value;
              onChange([...items]);
            }}
          />
        </>
      ))}
      onAdd={() => onChange([...items, { key: "", value: "" }])}
      onDelete={(item, index) => {
        if (items.length <= 1) {
          return;
        }
        items.splice(index, 1);
        onChange([...items]);
      }}
    />
  );
};
export const FormKeyValueItem = (props: FormItemProps) => (
  <FormItemContain className={"taco-form-item-wrapper"}>
    <FormItemLabel {...props} />
    <FormItem
      rules={props.rules}
      name={props.name}
      initialValue={props.initialValue}
      validateFirst={true}
    >
      <FormKeyValueList />
    </FormItem>
  </FormItemContain>
);

export const DatasourceForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
