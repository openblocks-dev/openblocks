import { Table as AntdTable } from "antd";
import { PointIcon, TacoButton, Tooltip } from "openblocks-design";
import styled from "styled-components";
import React from "react";
import { LockIcon } from "openblocks-design";
import { QuestionIcon } from "openblocks-design";
import { trans } from "i18n";
import { Table } from "components/Table";

export const StyledTable = styled(AntdTable)`
  .ant-table-cell {
    padding: 0;
    border-bottom: unset;

    font-size: 14px;
    color: #333333;
    line-height: 14px;
    height: 60px;
  }

  .ant-table-thead > tr > th {
    padding: 8px 0;
    height: 30px;

    font-size: 14px;
    color: #8b8fa3;
    line-height: 14px;
    background: #ffffff;
    border-bottom: 1px solid #e1e3eb;
  }

  .ant-table-thead > tr > th::before {
    display: none;
  }

  .ant-table-body {
    ::-webkit-scrollbar {
      width: 16px;
    }

    ::-webkit-scrollbar-thumb {
      border: 5px solid transparent;
      background-clip: content-box;
      border-radius: 9999px;
      background-color: rgba(139, 143, 163, 0.12);
    }
  }

  .ant-table-tbody:before {
    content: "@";
    display: block;
    line-height: 4px;
    text-indent: -99999px;
  }

  .ant-table-tbody {
    .operation-cell-div-wrapper {
      visibility: hidden;

      span {
        cursor: pointer;
        font-size: 14px;
        color: #f73131;
        text-align: right;
        line-height: 14px;
      }
    }

    tr.ant-table-row:hover {
      background-image: linear-gradient(
        90deg,
        #ffffff 0%,
        #fafbfc 3%,
        #fafbfc 48%,
        #fafbfc 98%,
        #ffffff 100%
      );
    }

    tr > td.ant-table-cell-row-hover {
      background: unset;

      .operation-cell-div-wrapper {
        visibility: unset;
      }
    }
  }
`;

export const UserTableCellWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  line-height: 16px;
  display: flex;
  align-items: center;
  min-width: 200px;

  > * {
    margin-left: 12px;
  }

  > *:first-child {
    margin-left: 0;
  }

  svg {
    margin-left: 8px;
  }

  > span {
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
`;

export const PermissionHeaderWrapper = styled.div`
  display: flex;
  margin: 0 12px 6px 12px;

  .ant-typography {
    display: flex;
    padding: 8px 0;
    height: 32px;
    width: fit-content;
    font-weight: 500;
    font-size: 16px;
    color: #222222;
    line-height: 16px;
  }

  .ant-typography-edit-content {
    padding: unset;
    margin: unset;
    left: unset;
  }

  .ant-typography-edit {
    height: 16px;
    width: 16px;
  }

  .ant-input,
  .ant-input:focus,
  .ant-input-focused {
    height: 32px !important;
    background: #ffffff;
    border: 1px solid #3377ff;
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    color: #222222;
    line-height: 16px;
    padding: 7px 12px;
    white-space: nowrap;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const RoleSelectSubTitle = styled.div`
  font-size: 13px;
  color: #8b8fa3;
  line-height: 16px;
  margin-top: 6px;
  word-break: keep-all;
  white-space: normal;
  display: inline-block;
`;

export const RoleSelectTitle = styled.div`
  font-size: 14px;
  line-height: 14px;
`;

export const AddMemberButton = styled(TacoButton)`
  height: 32px;
  padding: 8px 12px;

  svg {
    height: 16px;
    width: 16px;
    margin-right: 4px;
  }
`;

const GroupNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333333;
  font-weight: 500;
`;

export function GroupNameView(props: { name: string; toolTip?: string | false; lock?: boolean }) {
  return (
    <GroupNameWrapper>
      {props.name}
      {props.lock && <LockIcon />}
      {props.toolTip && <QuestionTooltip title={props.toolTip} />}
    </GroupNameWrapper>
  );
}

export const DevGroupTip = trans("memberSettings.devGroupTip");
export const LAST_ADMIN_QUIT = trans("memberSettings.lastAdminQuit");
export const QuestionTooltip = (props: { title: string }) => {
  return (
    <Tooltip title={props.title}>
      <QuestionIcon />
    </Tooltip>
  );
};

export const HeaderBack = styled.div`
  font-size: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  > span:nth-of-type(1) {
    color: #8b8fa3;
    cursor: pointer;
  }
  > span:nth-of-type(2), > div {
    color: #222222;
    font-weight: 500;
    font-size: 20px;
  }
  svg {
    margin: 0 8px;
  }
`;

export const OperationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const EditBtn = styled(TacoButton)`
  opacity: 0;
  width: 52px;
  height: 24px;
  margin-right: 52px;
`;

export const PopoverIcon = styled(PointIcon)`
  cursor: pointer;
  flex-shrink: 0;

  g {
    fill: #8b8fa3;
  }

  :hover {
    background-color: #e1e3eb;
    border-radius: 4px;
    cursor: pointer;

    g {
      fill: #3377ff;
    }
  }
`;

export const CreateButton = styled(TacoButton)`
  svg {
    margin-right: 2px;
    width: 12px;
    height: 12px;
  }
  box-shadow: none;
`;

export const TableStyled = styled(Table)`
  .ant-table-tbody > tr > td {
    padding: 11px 12px;
  }
  .ant-table-tbody {
    .operation-cell-div-wrapper {
      visibility: hidden;

      span {
        cursor: pointer;
        font-size: 14px;
        color: #f73131;
        text-align: right;
        line-height: 14px;
      }
    }
  }
  tr > td.ant-table-cell-row-hover {
    background: unset;

    .operation-cell-div-wrapper {
      visibility: unset;
    }
  }
`;
