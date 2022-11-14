import Column from "antd/lib/table/Column";
import OrgApi from "api/orgApi";
import { GroupUser, MEMBER_ROLE, OrgUser } from "constants/orgConstants";
import { CheckBox, CustomModal } from "openblocks-design";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { AppState } from "redux/reducers";
import { fetchGroupUsersAction, fetchOrgUsersAction } from "redux/reduxActions/orgActions";
import styled from "styled-components";
import { StyledTable, UserTableCellWrapper } from "./styledComponents";
import { formatTimestamp } from "util/dateTimeUtils";
import ProfileImage from "pages/common/profileImage";
import { isGroupAdmin } from "util/permissionUtils";
import { SuperUserIcon } from "openblocks-design";
import { EmptyContent } from "pages/common/styledComponent";
import { trans } from "i18n";

const TableWrapper = styled.div`
  margin-right: -16px;

  .table-action-cell {
    padding: 0 16px 0 0;
  }
`;

function AddGroupUserDialog(props: {
  groupId: string;
  orgId: string;
  trigger: ReactNode;
  orgUsers: OrgUser[];
  orgUsersFetching: boolean;
  groupUsers: GroupUser[];
  style?: CSSProperties;
}) {
  const { orgId, orgUsers, orgUsersFetching, groupUsers, groupId } = props;
  const groupUserIdMap = new Map(groupUsers.map((gUser) => [gUser.userId, gUser]));
  const [dialogVisible, setDialogVisible] = useState(false);
  const addableUsers = orgUsers.filter((user) => !groupUserIdMap.has(user.userId));
  const toAddUserIdRecord = useRef<Record<string, boolean>>({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dialogVisible) {
      dispatch(fetchOrgUsersAction(orgId));
    } else {
      toAddUserIdRecord.current = {};
      setConfirmLoading(false);
    }
  }, [dialogVisible, dispatch, orgId]);

  return (
    <>
      {props.trigger && (
        <div
          style={props.style}
          onClick={() => {
            setDialogVisible(true);
          }}
        >
          {props.trigger}
        </div>
      )}
      <CustomModal
        title={trans("memberSettings.addMember")}
        visible={dialogVisible}
        destroyOnClose
        onCancel={() => {
          setDialogVisible(false);
        }}
        okButtonProps={{ loading: confirmLoading }}
        showCancelButton={false}
        width="440px"
        okText={trans("finish")}
        onOk={async () => {
          setConfirmLoading(true);
          for (let [userId, checked] of Object.entries(toAddUserIdRecord.current)) {
            if (checked) {
              await OrgApi.addGroupUser({
                userId: userId,
                groupId: groupId,
                role: MEMBER_ROLE,
              });
            }
          }
          dispatch(fetchGroupUsersAction({ groupId }));
          setDialogVisible(false);
        }}
      >
        {!addableUsers || addableUsers.length === 0 ? (
          <EmptyContent />
        ) : (
          <TableWrapper>
            <StyledTable
              style={{ width: "100%" }}
              dataSource={addableUsers}
              rowKey="userId"
              pagination={false}
              loading={orgUsersFetching}
              showHeader={false}
              scroll={{ y: 309 }}
            >
              <Column
                width="170px"
                title={trans("memberSettings.nameColumn")}
                dataIndex="name"
                key="name"
                ellipsis
                render={(value, record: OrgUser) => (
                  <UserTableCellWrapper>
                    <ProfileImage source={record.avatarUrl} userName={record.name} side={32} />
                    <span title={record.name}>{record.name}</span>
                    {isGroupAdmin(record.role) && <SuperUserIcon />}
                  </UserTableCellWrapper>
                )}
              />
              <Column
                width="138px"
                title={trans("memberSettings.joinTimeColumn")}
                dataIndex="joinTime"
                key="joinTime"
                render={(value) => <span>{formatTimestamp(value)}</span>}
                ellipsis
              />
              <Column
                align="right"
                width="40px"
                title={trans("memberSettings.actionColumn")}
                key="action"
                className="table-action-cell"
                render={(value, record: OrgUser) => {
                  return (
                    <CheckBox
                      onChange={(e) => {
                        toAddUserIdRecord.current[record.userId] = e.target.checked;
                      }}
                    />
                  );
                }}
              />
            </StyledTable>
          </TableWrapper>
        )}
      </CustomModal>
    </>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    orgUsersFetching: state.ui.org.orgUsersFetching,
    orgUsers: state.ui.org.orgUsers,
  };
};

export default connect(mapStateToProps)(AddGroupUserDialog);
