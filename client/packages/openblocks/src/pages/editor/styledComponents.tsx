import { Tree } from "antd";
import styled from "styled-components";

export const DirectoryTreeStyle = styled(Tree.DirectoryTree)`
  font-size: 13px;
  color: #333;
  .ant-tree-treenode {
    position: relative;
  }
  .ant-tree-switcher {
    width: 12px;
    margin: 0 2px;
    height: 26px;
    display: flex;
    align-items: center;
  }
  .ant-tree-title {
    padding-right: 6px;
    width: 100%;
  }
  .ant-tree-node-content-wrapper {
    padding: 0;
    display: flex;
    min-height: 26px;
    position: unset;
    .ant-tree-iconEle {
      width: 16px;
      height: 26px;
      margin-right: 4px;
      display: flex;
      align-items: center;
    }
  }
  .ant-tree-treenode {
    padding: 0;
    max-width: 288px;
  }
  .ant-tree-indent-unit {
    width: 16px;
  }
  &.ant-tree.ant-tree-directory {
    .ant-tree-treenode:hover::before,
    .ant-tree-treenode-selected::before {
      bottom: 0;
    }
    .ant-tree-treenode:hover {
      &::before {
        background-color: rgba(242, 247, 252, 0.5);
      }
      .ant-tree-title svg {
        visibility: visible;
      }
    }
    .ant-tree-treenode.ant-tree-treenode-selected::before {
      background-color: #f2f7fc;
      height: 26px;
    }
    .ant-tree-node-content-wrapper.ant-tree-node-selected {
      color: #333;
    }
  }
`;

export const Node = styled.span`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  > span {
    span {
      height: 26px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex: 1;
      width: 0;
    }
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .no-data svg,
  .show-data svg {
    width: 40px;
    padding: 0 14px;
    height: 26px;
  }
  .show-data {
    height: 26px;
  }
  .no-data {
    visibility: hidden;
    height: 26px;
    &:hover {
      g {
        stroke: #222;
      }
    }
  }
  .show-data:hover svg{
    path {
      fill: #222;
    }
  }
`;

export const CollapseWrapper = styled.div<{ clientX?: number }>`
  width: 256px;
  border: 1px solid #E1E3EB;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  padding: 4px 0;
  margin: 4px -16px 4px ${(props) => props.clientX && `calc(-${props.clientX}px + 16px)`};
  .simplebar-content > div {
    > .ant-collapse > .ant-collapse-item {
      > .ant-collapse-header {
        display: none;
      }
      > .ant-collapse-content > .ant-collapse-content-box {
        padding-left: 1px;
      }
    }
    &:hover,
    .ant-collapse-content-box > div > div:hover {
      background-color: #fff;
    }
  }
  .simplebar-track.simplebar-horizontal {
    display: none;
  }
  .simplebar-content > div {
    padding: 0;
  }
`;
