import styled, { css } from "styled-components";
import { ReactComponent as Folded } from "icons/icon-folded.svg";
import { DataNode, TreeProps } from "antd/lib/tree";
import DirectoryTree from "antd/lib/tree/DirectoryTree";

export const Treediv = styled.div<{ $height?: number }>`
  padding-left: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 0px;
    height: calc(100% - 12px);
    top: 0px;
    bottom: 0px;
    left: 8px;
    border-left: 1.5px solid #d7d9e0;
    border-radius: 8px;
  }
`;

const BranchStyle = css`
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 0px;
    height: 8px;
    top: 40px;
    left: -12px;
    bottom: 0px;
    border-left: 1.5px solid #d7d9e0;
    transform: rotate(90deg);
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 4px;
    top: 42px;
    left: -9px;
    bottom: 0px;
    transform: rotate(90deg);
    border-radius: 100%;
    background-color: #d7d9e0;
  }
`;
export const BranchDiv = styled.div<{ $type?: "inline" | "switch" }>`
  position: relative;
  ${BranchStyle}
  ${(props) => {
    switch (props.$type) {
      case "inline":
        return css`
          &::before {
            top: auto;
            bottom: 15px;
          }

          &::after {
            top: auto;
            bottom: 17px;
          }
        `;
      case "switch":
        return css`
          &::before {
            top: auto;
            bottom: 9px;
          }

          &::after {
            top: auto;
            bottom: 11px;
          }
        `;
      default:
        return css``;
    }
  }}
`;

const StyledTree = styled(DirectoryTree<DataNode>)`
  .ant-tree-switcher {
    height: 23px;
    width: 12px;
    margin-left: 8px;
    line-height: 23px;
  }

  .ant-tree-treenode {
    border-radius: 4px;
    padding: 0;
  }

  .ant-tree-list-holder-inner > div:hover {
    background-color: #f2f7fc80;
  }

  .ant-tree-node-content-wrapper {
    padding: 0 0 0 2px;
    height: 23px;
    line-height: 23px;
    min-height: 23px;
  }

  .ant-tree-indent {
    width: 0;
  }

  .ant-tree-treenode-switcher-close,
  .ant-tree-treenode-switcher-open {
    font-weight: 500;
  }

  &.ant-tree-directory .ant-tree-treenode .ant-tree-node-content-wrapper.ant-tree-node-selected {
    color: #333333;
  }

  &.ant-tree-directory .ant-tree-treenode-selected:hover::before,
  &.ant-tree-directory .ant-tree-treenode-selected::before,
  &.ant-tree-directory .ant-tree-treenode:hover::before,
  &.ant-tree-directory .ant-tree-treenode::before {
    background: none;
  }
  .ant-tree-switcher .ant-tree-switcher-icon {
    vertical-align: revert;
    transform: translateY(1px);
  }
`;

export const CustomTree = (props: TreeProps<DataNode>) => {
  return (
    <StyledTree
      autoExpandParent={true}
      blockNode={true}
      multiple={true}
      showIcon={false}
      switcherIcon={
        <div>
          <Folded />
        </div>
      }
      {...props}
    />
  );
};
