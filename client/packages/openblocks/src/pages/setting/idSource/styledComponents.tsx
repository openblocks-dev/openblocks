import styled, { css } from "styled-components";
import { Table } from "components/Table";
import { Button, Checkbox, Form } from "antd";
import { UnderlineCss } from "openblocks-design";

const btnLoadingCss = css`
  > .ant-btn-loading-icon .anticon {
    width: 16px;
    height: 16px;
    padding-right: 0;
    margin-right: 4px;
  }

  &::before {
    opacity: 0;
  }
`;

export const ManualWapper = styled.div`
  font-size: 13px;
  line-height: 19px;
  color: #222222;

  .tip {
    font-size: 12px;
    color: #8b8fa3;
    line-height: 12px;
    margin-top: 8px;
    font-weight: 400;
  }

  .ant-btn {
    cursor: pointer;
    border: 1px solid #d7d9e0;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    color: #333333;
    text-align: center;
    margin-top: 5px;
    padding: 4px 8px;

    svg {
      margin-right: 4px;
    }

    &:hover,
    &.ant-btn-loading {
      background: #f5f5f6;
    }

    ${btnLoadingCss}
  }
`;

export const SpanStyled = styled.div<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 100%;

  img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    opacity: ${(props) => props.disabled && "0.4"};
  }

  > span:nth-of-type(1) {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
    color: ${(props) => props.disabled && "#B8B9BF"};
  }

  > span:nth-of-type(2) {
    opacity: ${(props) => props.disabled && "0.4"};
  }
`;

export const TableStyled = styled(Table)`
  .ant-table-tbody > tr > td {
    padding: 0 12px;
    height: 56px;
  }

  .ant-table-row.row-disabled {
    cursor: auto;

    td:nth-of-type(2) span,
    td:nth-of-type(3) span {
      color: #b8b9bf;

      .ant-badge-status-success {
        opacity: 0.4;
      }
    }
  }
`;

export const Header = styled.div`
  margin: 0 0 36px 24px;
`;

export const Content = styled.div`
  margin-left: 24px;
  padding-bottom: 75px;

  .ant-divider-horizontal {
    margin: 28px 0 24px 0;
  }
`;

export const CheckboxStyled = styled(Checkbox)`
  display: flex;
  font-size: 13px;

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: #d7d9e0;
    background-color: #fff;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #4965f2;
  }
`;

export const SaveButton = styled(Button)`
  min-width: 84px;
  display: block;
  padding: 4px 8px;
  background: #fafbff;
  border: 1px solid #c9d1fc;
  font-size: 13px;
  color: #4965f2;

  &:hover,
  &.ant-btn-loading {
    color: #315efb;
    background: #f5faff;
    border-color: #c2d6ff;
  }

  ${btnLoadingCss}
  &.ant-btn[disabled], &.ant-btn[disabled]:hover, &.ant-btn[disabled]:focus, &.ant-btn[disabled]:active {
    color: rgba(73, 101, 242, 0.3);
    background: #f9fbff;
    border-color: #dee9ff;
  }
`;

export const FormStyled = styled(Form)`
  .ant-form-item-control-input-content > input,
  .ant-input-password {
    &:hover {
      border-color: #8b8fa3;
    }

    &:focus,
    &.ant-input-affix-wrapper-focused {
      border-color: #3377ff;
    }
  }

  .ant-form-item-label > label {
    font-size: 13px;
    line-height: 19px;
    .has-tip {
      ${UnderlineCss};
    }
  }

  .ant-input-password-icon.anticon {
    color: #8b8fa3;

    &:hover {
      color: #222;
    }
  }

  &.ant-form-vertical .ant-form-item-label {
    padding-bottom: 4px;
  }

  .ant-form-item-explain-error {
    font-size: 12px;
    color: #f73131;
    line-height: 20px;
  }

  .ant-form-item-label
    > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    color: #f73131;
  }

  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
    border-color: #f73131;
  }

  .register {
    margin: -4px 0 20px 0;
  }

  .ant-input-prefix {
    margin-right: 8px;
    svg {
      path,
      rect:nth-of-type(1) {
        stroke: #8b8fa3;
      }
      rect:nth-of-type(2) {
        fill: #8b8fa3;
      }
    }
  }
  .lock {
    margin-bottom: 0;
    .ant-input-affix-wrapper {
      .ant-input-prefix {
        cursor: pointer;
      }
    }
  }
  .lock-tip {
    font-size: 12px;
    line-height: 20px;
    color: #b8b9bf;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    svg {
      width: 12px;
      height: 12px;
      margin: 0 4px;
    }
  }
`;

export const PasswordLabel = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    margin: 0 4px 0 10px;
    g {
      fill: #d7d9e0;
    }
  }
`;

export const DeleteWrapper = styled.div`
  font-size: 13px;
  line-height: 19px;

  .danger-tip {
    height: 32px;
    padding: 0 16px 0 8px;
    margin: 5px 0 8px 0;
    background: #fff3f1;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  }

  .ant-btn {
    min-width: 84px;
    display: block;
    padding: 4px 8px;
    background: #fef4f4;
    border: 1px solid #fccdcd;
    font-size: 13px;
    color: #f73131;

    &:hover,
    &.ant-btn-loading {
      background: #feecec;
    }

    ${btnLoadingCss}
  }
`;

export const StatusSpan = styled.span`
  .ant-badge-status-default {
    background: #d7d9e0;
  }

  .ant-badge-status-success {
    background: #0ebe98;
  }

  .ant-badge-status-text {
    margin-left: 10px;
    color: #8b8fa3;
  }
`;
