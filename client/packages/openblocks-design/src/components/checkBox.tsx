import { Checkbox as AntdCheckBox } from "antd";
import styled from "styled-components";

const CheckBox = styled(AntdCheckBox)`
  width: 16px;
  height: 16px;
  align-items: center;

  .ant-checkbox {
    top: 0;
  }

  &:hover:enabled .ant-checkbox .ant-checkbox-inner {
    border-color: #4965f2 !important;
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #d9d9d9;
  }

  .ant-checkbox-checked::after {
    border: unset;
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }

    .ant-checkbox-inner::after {
      border: 2px solid #4965f2;
      border-top: 0;
      border-left: 0;
    }
  }

  .ant-checkbox + span {
    font-size: 13px;
    color: #333333;
    line-height: 13px;
  }

  .ant-checkbox-inner {
    border-radius: 4px;
  }
`;
export { CheckBox };
