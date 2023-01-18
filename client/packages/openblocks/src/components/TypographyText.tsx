import { Typography } from "antd";
import React from "react";
import styled from "styled-components";

const AntdTypographyText = styled(Typography.Text)`
  font-size: 14px;
  color: #333333;
  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;

  :is(.ant-typography-edit-content) {
    color: red;
    padding: unset;
    margin: unset !important;
    left: unset;
  }

  .ant-input,
  .ant-input:focus,
  .ant-input-focused {
    height: 24px !important;
    min-height: 24px;
    background: #ffffff;
    border: 1px solid #3377ff;
    border-radius: 4px;
    padding: 4px 8px;
    margin: -5px 0 3px -9px;
    white-space: nowrap;

    font-size: 14px;
    color: #333333;
    line-height: 14px;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const TypographyText = (props: {
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) => (
  <AntdTypographyText
    title={props.value}
    ellipsis={true}
    editable={{
      enterIcon: null,
      tooltip: false,
      editing: props.editing,
      icon: null,
      triggerType: ["text"],
      onChange: props.onChange,
    }}
  >
    {props.value}
  </AntdTypographyText>
);
