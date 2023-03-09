import { PropsWithChildren } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 232px;
  width: 232px;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 26px 16px 0 16px;

  h2 {
    font-weight: 500;
    font-size: 20px;
    color: #222222;
    margin: 0 0 20px 20px;
  }
  .ant-menu-inline .ant-menu-item {
    margin: 4px 0;
    padding: 10px 20px !important;
  }
  .ant-menu-item:hover, .ant-menu-item-selected {
    border-radius: 4px;
  }
`;

interface IProps {
  title?: string;
}

export default function SubSideBar(props: PropsWithChildren<IProps>) {
  const { title, children } = props;
  return (
    <Wrapper>
      {title && <h2>{title}</h2>}
      {children}
    </Wrapper>
  );
}
