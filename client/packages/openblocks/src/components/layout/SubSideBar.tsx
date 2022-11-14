import { PropsWithChildren } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 227px;
  width: 227px;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 32px 24px 0 24px;

  h2 {
    font-weight: 500;
    font-size: 18px;
    color: #222222;
    line-height: 18px;
    margin: 0 0 20px 12px;
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
