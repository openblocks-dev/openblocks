import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Desc, Title2 } from "./Styled";
import { BorderContext } from "./BorderContext";
interface IProps {
  title: string;
  description?: React.ReactNode;
}
const Wrapper = styled.div`
  margin-bottom: 28px;
  .ant-tabs-nav {
    margin-bottom: 12px;
  }
  .ant-tabs-tab {
    padding-top: 0;
    line-height: 1;
    font-size: 16px;
    color: #8b8fa3;
    &:hover,
    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #4965f2;
      font-weight: 500;
    }
    & + .ant-tabs-tab {
      margin-left: 24px;
    }
  }

  .ant-tabs-ink-bar {
    border-radius: 2px;
    background-color: #4965f2;
  }
  .ant-tabs-nav-wrap::before {
    border: 0;
  }
`;
export default function ExampleGroup(props: React.PropsWithChildren<IProps>) {
  const { title, description, children } = props;
  const tabs = React.Children.map(children as ReactElement, (child: ReactElement) => {
    return {
      title: child.props.title,
      child,
    };
  });
  const [isBorderShow, showBorder] = useState(false);
  return (
    <Wrapper>
      <Title2>{title}</Title2>
      <Desc>{description}</Desc>
      <div>
        {tabs.map((i) => (
          <div key={i.title}>
            <div style={{ marginBottom: 8, marginTop: 16 }}>{i.title}</div>
            <BorderContext.Provider value={{ isBorderShow, showBorder }}>
              {i.child}
            </BorderContext.Provider>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
