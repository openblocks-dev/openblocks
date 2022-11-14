import styled, { css } from "styled-components";
import React from "react";

const HeaderDiv = styled.div`
  width: 312px;
  height: 40px;
  background: #f5f5f6;
  user-select: none;
`;

const IconCss = css`
  height: 16px;
  width: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const IconAndName = styled.div<{ isActive: boolean }>`
  padding: 0;
  display: inline-block;
  margin-left: 17px;
  cursor: pointer;
  position: relative;
  vertical-align: top;
  height: 40px;
  transition: all 0.2s ease;
  border-bottom: 2px solid ${(props) => (props.isActive ? "#222222" : "transparent")};

  &:hover path {
    transition: all 0.2s ease;
    fill: #222222;
  }

  &:hover p {
    transition: all 0.2s ease;
    color: #222222;
  }

  svg {
    ${IconCss};

    path {
      fill: ${(props) => (props.isActive ? "#222222" : "#8b8fa3")};
    }
  }
`;

const Text = styled.p<{
  color: string;
}>`
  user-select: none;
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  margin-left: 5px;
  margin-bottom: 0;
  color: ${(props) => props.color || "#222222"};
  vertical-align: top;
`;

const ChildDiv = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
`;

interface ITabsConfig {
  key: string;
  title: string;
  icon: JSX.Element;
  content: React.ReactNode | JSX.Element;
}

interface ITabs {
  tabsConfig: Array<ITabsConfig>;
  onChange: (key: string) => void;
  activeKey: string;
}

const Tabs = (props: ITabs) => {
  const { onChange, tabsConfig, activeKey } = props;
  const activeTab = tabsConfig.find((c) => c.key === activeKey) || tabsConfig[0];

  return (
    <>
      <HeaderDiv>
        {props.tabsConfig.map((tab) => {
          const isActive = activeTab.key === tab.key;
          return (
            <IconAndName key={tab.key} onClick={() => onChange(tab.key)} isActive={isActive}>
              {tab.icon}
              <Text color={isActive ? "#222222" : "#8b8fa3"}>{tab.title}</Text>
            </IconAndName>
          );
        })}
      </HeaderDiv>
      <ChildDiv>{activeTab.content}</ChildDiv>
    </>
  );
};

export { Tabs };
