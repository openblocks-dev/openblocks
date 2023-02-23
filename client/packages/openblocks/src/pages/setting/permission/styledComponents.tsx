import { Popover, Table as AntdTable } from "antd";
import {
  CustomModal,
  LockIcon,
  ManualIcon,
  PointIcon,
  QuestionIcon,
  SuspensionBox,
  TacoButton,
  Tooltip,
  WarnIcon,
  WhiteLoading,
} from "openblocks-design";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { i18nObjs, trans } from "i18n";
import { Table } from "components/Table";
import UserApi from "api/userApi";
import { validateResponse } from "api/apiUtils";
import ReactJson from "react-json-view";
import { StyledLink } from "pages/common/styledComponent";
import _ from "lodash";

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
    height: 36px;

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
  margin: 0 12px 15px 12px;
  height: 32px;

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

export function GroupNameView(props: {
  name: string;
  lock?: boolean;
  toolTip?: string | false;
  suffix?: React.ReactNode;
  warn?: boolean;
  syncGroup?: boolean;
}) {
  return (
    <GroupNameWrapper>
      {props.name}
      {props.lock && <LockIcon />}
      {props.toolTip && <QuestionTooltip title={props.toolTip} />}
      {props.suffix}
      {props.warn && (
        <Tooltip title={trans("memberSettings.syncDeleteTip")}>
          <WarnIcon />
        </Tooltip>
      )}
      {props.syncGroup && !props.warn && (
        <Tooltip title={trans("memberSettings.syncGroupTip")}>
          <ManualIcon />
        </Tooltip>
      )}
    </GroupNameWrapper>
  );
}

export const DevGroupTip = trans("memberSettings.devGroupTip");
export const LAST_ADMIN_QUIT = trans("memberSettings.lastAdminQuit");
export const QuestionTooltip = (props: { title: string }) => {
  return (
    <Tooltip title={props.title}>
      <QuestionIcon style={{ marginLeft: "2px" }} />
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

  > span:nth-of-type(2),
  > div {
    color: #222222;
    font-weight: 500;
    font-size: 20px;
  }

  > svg {
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
  min-width: 52px;
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
      display: flex;
      align-items: center;

      > * {
        margin-right: 8px;
      }

      span {
        cursor: pointer;
        font-size: 14px;
        color: #f73131;
        text-align: right;
        line-height: 14px;
      }
    }

    tr > td.ant-table-cell-row-hover {
      background: unset;

      .operation-cell-div-wrapper {
        visibility: unset;
      }
    }
  }
`;

const OperationLink = styled(StyledLink)`
  font-size: 14px;
`;

const UserDetailPopWrapper = styled.div`
  min-height: 150px;

  .loading-class {
    height: 150px;
  }
`;

export function UserDetailPopup(props: { userId: string; title: string }) {
  const { userId, title } = props;
  const [userInfo, setUserInfo] = useState({ success: false, view: <></> });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!userInfo.success && visible) {
      setUserInfo({ success: false, view: <WhiteLoading className="loading-class" /> });
      UserApi.getUserDetail(userId)
        .then((resp) => {
          if (validateResponse(resp)) {
            setUserInfo({
              success: true,
              view: (
                <ReactJson
                  name={false}
                  src={resp.data.data}
                  collapsed={3}
                  style={{ wordBreak: "break-word" }}
                />
              ),
            });
          }
        })
        .catch((e) => {
          setUserInfo({
            success: false,
            view: <span>{e.message}</span>,
          });
        });
    }
  }, [visible]);

  return (
    <>
      <OperationLink
        onClick={(e) => {
          setVisible(true);
        }}
      >
        {trans("memberSettings.userDetail")}
      </OperationLink>
      <CustomModal
        width={550}
        bodyStyle={{ maxHeight: "500px", overflow: "auto", maxWidth: "550px", width: "550px" }}
        visible={visible}
        onCancel={() => setVisible(false)}
        title={title}
        showOkButton={false}
        showCancelButton={false}
      >
        <UserDetailPopWrapper>{userInfo.view}</UserDetailPopWrapper>
      </CustomModal>
    </>
  );
}
