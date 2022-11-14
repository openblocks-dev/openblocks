import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { ReactComponent as PackUpIcon } from "icons/icon-Pack-up.svg";
import styled from "styled-components";
import React from "react";

const SelectWrapper = styled.div<{ border?: boolean }>`
  .ant-select-open {
    .ant-select-arrow {
      transform: rotate(0deg);

      svg g path {
        fill: #4965f2;
      }
    }
  }

  .ant-select .ant-select-selector {
    border: ${(props) => (props.border ? "1px solid transparent" : "1px solid #d7d9e0")};
    border-radius: 4px;
    padding: ${(props) => (props.border ? "0px" : "0 0 0 12px")};
    height: 100%;
    align-items: center;
    margin-right: 8px;

    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }

  .ant-select-focused.ant-select.ant-select-show-arrow {
    .ant-select-selector {
      border: ${(props) => (props.border ? "1px solid transparent" : "1px solid #3377ff")};
      border-radius: 4px;
      box-shadow: 0 0 0 2px ${(props) => (props.border ? "transparent" : "rgba(51,119,255,0.20)")};
    }
  }

  .ant-select:hover,
  .ant-select-disabled:hover {
    .ant-select-selector {
      border: ${(props) => (props.border ? "1px solid transparent" : "1px solid #8b8fa3")};
      border-radius: 4px;
    }
  }

  .ant-select-arrow {
    width: 20px;
    height: 20px;
    right: 8px;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(180deg);
  }

  .ant-select-disabled.ant-select {
    .ant-select-selector {
      background: ${(props) => (props.border ? "#ffffff" : "#fdfdfd")};
      border-radius: 4px;
      color: #b8b9bf;
    }

    .ant-select-arrow svg g path {
      fill: #b8b9bf;
    }
  }

  .ant-select-clear {
    right: 32px;
  }
`;

export type CustomSelectProps = {
  children?: JSX.Element | React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement> | undefined;
  border?: boolean;
};

function CustomSelect(props: CustomSelectProps & AntdSelectProps) {
  const {
    children,
    innerRef,
    className,
    border,
    dropdownClassName = "custom-ant-select-dropdown",
    ...restProps
  } = props;
  return (
    <SelectWrapper className={className} ref={innerRef} border={border}>
      <AntdSelect
        dropdownClassName={dropdownClassName}
        dropdownMatchSelectWidth={false}
        suffixIcon={<PackUpIcon />}
        {...restProps}
      >
        {children}
      </AntdSelect>
    </SelectWrapper>
  );
}

CustomSelect.Option = AntdSelect.Option;
export { CustomSelect };
