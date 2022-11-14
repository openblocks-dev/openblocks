import React from "react";
import styled, { css } from "styled-components";
import { PointIcon, DragIcon, PencilIcon } from "icons";
import { labelCss } from "./Label";

interface IItem {
  width?: number;
  colorChange?: number;
}
const Item = styled.div<IItem>`
  width: ${(props) => (props.width ? props.width : 280)}px;
  height: 32px;
  background: #f5f5f6;
  background: ${(props) => (props.colorChange ? "#E1E3EB" : "#f5f5f6")};
  border-radius: 4px;
  float: right;
  margin-right: 16px;
  margin-top: 2px;
  margin-bottom: 2px;
`;
const IconCss = css`
  height: 16px;
  width: 16px;
  color: #8b8fa3;
  :hover {
    cursor: pointer;
  }
`;
const StyledDragIcon = styled(DragIcon)`
  ${IconCss}
  margin-left: 12px;
  margin-top: 8px;
`;
const TextCss = css`
  ${labelCss}
  line-height: 32px;
  display: inline-block;
  vertical-align: top;
`;
const Text = styled.span`
  ${TextCss}
  color: #333333;
`;
interface IMenuItem {
  label: string;
  width?: number;
  colorChange?: number;
}
export const MenuItem = (props: IMenuItem) => {
  const { label, width, colorChange } = props;
  return (
    <Item width={width} colorChange={colorChange}>
      <StyledDragIcon />
      <Text>{label}</Text>
    </Item>
  );
};
const FormContain = styled.div`
  width: 280px;
  background-color: #ffffff;
  border: 1px solid #d7d9e0;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 6px;
  overflow: hidden;
`;
const FormItemContain = styled.div`
  width: 280px;
  height: 32px;
  background-color: #ffffff;
`;
const FormText = styled.span`
  ${TextCss}
  color: #333333;
  margin-left: 12px;
`;
const GrayText = styled.span`
  ${TextCss}
  color: #8b8fa3;
  margin-left: 8px;
`;
const StyledPencilIcon = styled(PencilIcon)`
  ${IconCss}
  margin-top: 8px;
  float: right;
`;
const StyledPointIcon = styled(PointIcon)`
  ${IconCss}
  margin-left: 16px;
  margin-top: 8px;
  float: right;
  margin-right: 16px;
`;
interface Iformconfig {
  title: string;
  label: string;
}
interface Iform {
  config: Array<Iformconfig>;
}
export const FormItem = (props: Iform) => {
  const { config } = props;
  return (
    <FormContain>
      {config.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <FormItemContain>
              <FormText>{item.title}</FormText>
              <GrayText>{item.label}</GrayText>
              <StyledPointIcon />
              <StyledPencilIcon />
            </FormItemContain>
          </React.Fragment>
        );
      })}
    </FormContain>
  );
};
