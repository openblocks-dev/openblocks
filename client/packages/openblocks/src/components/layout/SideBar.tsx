import { Layout, SiderProps } from "antd";
import { TopHeaderHeight } from "constants/style";
import styled from "styled-components";

const Sider = styled(Layout.Sider)`
  height: calc(100vh - ${TopHeaderHeight});
  background: #f9f9fa;
  padding: 0 24px 0 24px;

  .ant-menu {
    background: transparent;
    .ant-menu-item-selected {
      background-color: #eef0f3 !important;
    }

    .ant-menu-item {
      border-radius: 8px;
      &:hover {
        background: #eef0f3;
      }
    }
  }
`;

export default function SideBar(props: SiderProps) {
  const { children, ...otherProps } = props;
  return (
    <Sider theme="light" width={244} {...otherProps}>
      {props.children}
    </Sider>
  );
}
