import { Tabs as AntdTabs } from "antd";
import { GreyTextColor, TabActiveColor } from "constants/style";
import { ReactNode } from "react";
import styled from "styled-components";

export const Tabs = styled(AntdTabs)`
  .ant-tabs-nav {
    margin-bottom: 12px;
  }
  .ant-tabs-tab {
    padding: 0 0 10px;
    line-height: 1;
  }
  .ant-tabs-ink-bar {
    border-radius: 2px;
    background-color: ${TabActiveColor};
  }
  .ant-tabs-tab .ant-tabs-tab-btn {
    color: ${GreyTextColor};
    &:hover {
      color: ${TabActiveColor};
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${TabActiveColor};
  }
  &.ant-tabs-top > .ant-tabs-nav::before {
    border-color: transparent;
    border-bottom-color: transparent;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 24px;
  }
`;

const TabTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TabTitleProps {
  icon?: ReactNode;
  text: ReactNode;
}

export const TabTitle = function TabTitle(props: TabTitleProps) {
  const { icon, text } = props;
  return (
    <TabTitleWrapper>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {text}
    </TabTitleWrapper>
  );
};
